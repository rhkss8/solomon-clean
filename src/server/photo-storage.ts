const MAX_PHOTO_COUNT = 8;
const MAX_PHOTO_BYTES = 10 * 1024 * 1024;
const photoExtensions = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" } as const;

export type StoredPhoto = { key: string; contentType: keyof typeof photoExtensions; size: number };
export type PhotoValidationResult = { success: true; files: File[] } | { success: false; message: string };
export interface PhotoStorage { save(estimateId: string, files: readonly File[]): Promise<StoredPhoto[]>; }
export interface PrivatePhotoBucket { put(key: string, value: ArrayBuffer, options: { httpMetadata: { contentType: string } }): Promise<unknown>; }

/** Rejects oversized, excessive, empty, or unsupported photo uploads before storage. */
export function validateEstimatePhotos(files: readonly File[]): PhotoValidationResult {
  if (files.length > MAX_PHOTO_COUNT) return { success: false, message: `사진은 최대 ${MAX_PHOTO_COUNT}장까지 첨부할 수 있습니다.` };
  for (const file of files) {
    if (!(file.type in photoExtensions)) return { success: false, message: "JPG, PNG, WebP 사진만 첨부할 수 있습니다." };
    if (file.size === 0 || file.size > MAX_PHOTO_BYTES) return { success: false, message: "사진 한 장은 10MB 이하여야 합니다." };
  }
  return { success: true, files: [...files] };
}

/** Stores private estimate photos under random keys without exposing original filenames. */
export class R2PhotoStorage implements PhotoStorage {
  private readonly bucket: PrivatePhotoBucket;
  constructor(bucket: PrivatePhotoBucket) { this.bucket = bucket; }
  async save(estimateId: string, files: readonly File[]): Promise<StoredPhoto[]> {
    const validation = validateEstimatePhotos(files);
    if (!validation.success) throw new Error(validation.message);
    return Promise.all(validation.files.map(async (file) => {
      const contentType = file.type as keyof typeof photoExtensions;
      const key = `estimates/${estimateId}/${crypto.randomUUID()}.${photoExtensions[contentType]}`;
      await this.bucket.put(key, await file.arrayBuffer(), { httpMetadata: { contentType } });
      return { key, contentType, size: file.size };
    }));
  }
}

/** Fails closed when a deployment has no private photo bucket binding. */
export class DisabledPhotoStorage implements PhotoStorage {
  async save(_estimateId: string, files: readonly File[]): Promise<StoredPhoto[]> {
    if (files.length === 0) return [];
    throw new Error("사진 저장소가 아직 연결되지 않았습니다.");
  }
}
