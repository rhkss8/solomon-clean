import assert from "node:assert/strict";
import test from "node:test";
import { normalizeEstimatePhotoKeys } from "../src/domain/admin-estimate.ts";
test("normalizes legacy double-encoded photo key arrays",()=>{assert.deepEqual(normalizeEstimatePhotoKeys('[]'),[]);assert.deepEqual(normalizeEstimatePhotoKeys('"[\\"estimates/id/photo.jpg\\"]"'),["estimates/id/photo.jpg"]);assert.deepEqual(normalizeEstimatePhotoKeys(null),[]);});
