import assert from "node:assert/strict";
import test from "node:test";
import { DisabledPhotoStorage, R2PhotoStorage, validateEstimatePhotos } from "../src/server/photo-storage.ts";

const photo = new File([new Uint8Array([1, 2, 3])], "현장사진.jpg", { type: "image/jpeg" });
test("validates supported private photo uploads", () => { assert.equal(validateEstimatePhotos([photo]).success, true); assert.equal(validateEstimatePhotos([new File(["x"], "x.gif", { type: "image/gif" })]).success, false); });
test("stores photos under random keys without the original filename", async () => { const writes = []; const storage = new R2PhotoStorage({ async put(key, value, options) { writes.push({ key, value, options }); } }); const stored = await storage.save("estimate-1", [photo]); assert.match(stored[0].key, /^estimates\/estimate-1\/[0-9a-f-]+\.jpg$/); assert.doesNotMatch(stored[0].key, /현장사진/); assert.equal(writes[0].options.httpMetadata.contentType, "image/jpeg"); });
test("fails closed when storage is disabled", async () => { await assert.rejects(() => new DisabledPhotoStorage().save("estimate-1", [photo])); assert.deepEqual(await new DisabledPhotoStorage().save("estimate-1", []), []); });
