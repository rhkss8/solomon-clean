import assert from "node:assert/strict";
import test from "node:test";
import { isManagedEstimatePhotoKey, normalizeEstimatePhotoKeys } from "../src/domain/admin-estimate.ts";
test("normalizes legacy double-encoded photo key arrays",()=>{assert.deepEqual(normalizeEstimatePhotoKeys('[]'),[]);assert.deepEqual(normalizeEstimatePhotoKeys('"[\\"estimates/id/photo.jpg\\"]"'),["estimates/id/photo.jpg"]);assert.deepEqual(normalizeEstimatePhotoKeys(null),[]);});
test("only estimate-owned blob paths are eligible for deletion",()=>{const id="8ffb1eb3-eeac-4fb0-8f17-d19cd7b538ef";assert.equal(isManagedEstimatePhotoKey(`estimates/${id}/${id}.webp`),true);assert.equal(isManagedEstimatePhotoKey(`work-cases/${id}/before-${id}.webp`),false);assert.equal(isManagedEstimatePhotoKey("estimates/../../other.jpg"),false);});
