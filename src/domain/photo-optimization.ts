export const MAX_ESTIMATE_PHOTO_COUNT = 8;
export const MAX_ORIGINAL_PHOTO_BYTES = 50 * 1024 * 1024;
export const MAX_OPTIMIZED_PHOTO_BYTES = 2 * 1024 * 1024;
export const MAX_PHOTO_EDGE = 1920;

export function fitImageDimensions(width: number, height: number, maxEdge = MAX_PHOTO_EDGE) {
  if (width <= maxEdge && height <= maxEdge) return { width, height };
  const scale = maxEdge / Math.max(width, height);
  return { width: Math.round(width * scale), height: Math.round(height * scale) };
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))}KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number) {
  return new Promise<Blob>((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("사진 변환에 실패했습니다.")), type, quality));
}

async function decodeImage(file: File): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof createImageBitmap === "function") return createImageBitmap(file, { imageOrientation: "from-image" });
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    await new Promise<void>((resolve, reject) => { image.onload = () => resolve(); image.onerror = () => reject(new Error("사진을 읽을 수 없습니다.")); image.src = url; });
    return image;
  } finally { URL.revokeObjectURL(url); }
}

export async function optimizeEstimatePhoto(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) throw new Error(`${file.name}: 사진 파일만 첨부할 수 있습니다.`);
  if (!file.size || file.size > MAX_ORIGINAL_PHOTO_BYTES) throw new Error(`${file.name}: 원본 사진은 50MB 이하여야 합니다.`);

  let source: ImageBitmap | HTMLImageElement;
  try { source = await decodeImage(file); }
  catch { throw new Error(`${file.name}: 이 기기에서 읽을 수 없는 사진 형식입니다. JPG로 변환해 다시 선택해주세요.`); }
  const sourceWidth = "naturalWidth" in source ? source.naturalWidth : source.width;
  const sourceHeight = "naturalHeight" in source ? source.naturalHeight : source.height;
  const dimensions = fitImageDimensions(sourceWidth, sourceHeight);
  const canvas = document.createElement("canvas");
  canvas.width = dimensions.width;
  canvas.height = dimensions.height;
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) throw new Error("사진 최적화를 시작할 수 없습니다.");
  context.fillStyle = "#fff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(source, 0, 0, canvas.width, canvas.height);
  if ("close" in source) source.close();

  let quality = .82;
  let blob = await canvasToBlob(canvas, "image/webp", quality);
  while (blob.size > MAX_OPTIMIZED_PHOTO_BYTES && quality > .5) {
    quality -= .08;
    blob = await canvasToBlob(canvas, "image/webp", quality);
  }
  const filename = `${file.name.replace(/\.[^.]+$/, "") || "estimate-photo"}.webp`;
  return new File([blob], filename, { type: "image/webp", lastModified: file.lastModified });
}
