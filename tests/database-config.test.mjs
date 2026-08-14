import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { isDatabaseConfigured } from "../db/index.ts";

test("database configuration is explicit instead of throwing during admin rendering", () => {
  const previous = process.env.POSTGRES_URL;
  try {
    delete process.env.POSTGRES_URL;
    assert.equal(isDatabaseConfigured(), false);
    process.env.POSTGRES_URL = "postgres://example.invalid/database";
    assert.equal(isDatabaseConfigured(), true);
  } finally {
    if (previous === undefined) delete process.env.POSTGRES_URL;
    else process.env.POSTGRES_URL = previous;
  }
});

test("database setup steps keep each sentence in one grid content cell", async () => {
  const source = await readFile(new URL("../app/admin/page.tsx", import.meta.url), "utf8");
  const setupList = source.match(/<ol>(.*?)<\/ol>/s)?.[1] ?? "";
  assert.equal((setupList.match(/<li><div>/g) ?? []).length, 3);
  assert.equal(setupList.includes("<li><code>"), false);
});
