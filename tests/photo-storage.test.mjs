import assert from "node:assert/strict";
import test from "node:test";
import { validateEstimatePhotos, validateUploadedPhotos } from "../src/server/photo-storage.ts";

const photo = new File([new Uint8Array([1, 2, 3])], "현장사진.jpg", { type: "image/jpeg" });
test("validates supported private photo uploads", () => { assert.equal(validateEstimatePhotos([photo]).success, true); assert.equal(validateEstimatePhotos([new File(["x"], "x.gif", { type: "image/gif" })]).success, false); });
test("accepts only scoped private Blob metadata", () => { const valid = validateUploadedPhotos([{ pathname: "estimates/550e8400-e29b-41d4-a716-446655440000/550e8400-e29b-41d4-a716-446655440001.jpg", contentType: "image/jpeg", size: 3 }]); assert.equal(valid.success, true); assert.equal(validateUploadedPhotos([{ pathname: "other/photo.jpg", contentType: "image/jpeg", size: 3 }]).success, false); });
