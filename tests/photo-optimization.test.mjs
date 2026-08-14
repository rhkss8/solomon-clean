import assert from "node:assert/strict";
import test from "node:test";
import { fitImageDimensions, formatFileSize } from "../src/domain/photo-optimization.ts";

test("large phone photos fit within 1920px without changing aspect ratio", () => {
  assert.deepEqual(fitImageDimensions(4032, 3024), { width: 1920, height: 1440 });
  assert.deepEqual(fitImageDimensions(3024, 4032), { width: 1440, height: 1920 });
  assert.deepEqual(fitImageDimensions(1280, 720), { width: 1280, height: 720 });
});

test("optimized size labels are readable", () => {
  assert.equal(formatFileSize(1_048_576), "1.0MB");
  assert.equal(formatFileSize(512_000), "500KB");
});
