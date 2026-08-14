import { MAX_ESTIMATE_PHOTO_COUNT } from "../domain/photo-optimization.ts";

const MAX_PHOTO_BYTES = 10 * 1024 * 1024;
const photoExtensions = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" } as const;

export type UploadedPhoto = { pathname: string; contentType: string; size: number };
export type PhotoValidationResult = { success: true; files: File[] } | { success: false; message: string };

/** Rejects oversized, excessive, empty, or unsupported photo uploads before storage. */
export function validateEstimatePhotos(files: readonly File[]): PhotoValidationResult {
  if (files.length > MAX_ESTIMATE_PHOTO_COUNT) return { success: false, message: `사진은 최대 ${MAX_ESTIMATE_PHOTO_COUNT}장까지 첨부할 수 있습니다.` };
  for (const file of files) {
    if (!(file.type in photoExtensions)) return { success: false, message: "JPG, PNG, WebP 사진만 첨부할 수 있습니다." };
    if (file.size === 0 || file.size > MAX_PHOTO_BYTES) return { success: false, message: "사진 한 장은 10MB 이하여야 합니다." };
  }
  return { success: true, files: [...files] };
}

export function validateUploadedPhotos(value: unknown): { success: true; photos: UploadedPhoto[] } | { success: false; message: string } {
  if (!Array.isArray(value) || value.length > MAX_ESTIMATE_PHOTO_COUNT) return { success: false, message: `사진은 최대 ${MAX_ESTIMATE_PHOTO_COUNT}장까지 첨부할 수 있습니다.` };
  const photos: UploadedPhoto[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") return { success: false, message: "첨부 사진 정보가 올바르지 않습니다." };
    const { pathname, contentType, size } = item as Partial<UploadedPhoto>;
    if (typeof pathname !== "string" || !/^estimates\/[0-9a-f-]{36}\/[0-9a-f-]+\.(jpg|png|webp)$/.test(pathname)) return { success: false, message: "첨부 사진 경로가 올바르지 않습니다." };
    if (typeof contentType !== "string" || !(contentType in photoExtensions)) return { success: false, message: "JPG, PNG, WebP 사진만 첨부할 수 있습니다." };
    if (typeof size !== "number" || size <= 0 || size > MAX_PHOTO_BYTES) return { success: false, message: "사진 한 장은 10MB 이하여야 합니다." };
    photos.push({ pathname, contentType, size });
  }
  return { success: true, photos };
}
