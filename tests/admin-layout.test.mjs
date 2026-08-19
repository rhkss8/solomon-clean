import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("authenticated admin pages share one header and LNB", async () => {
  const [layout, navigation, estimates, workCases] = await Promise.all([
    readFile("app/admin/layout.tsx", "utf8"),
    readFile("src/components/admin/AdminNavigation.tsx", "utf8"),
    readFile("app/admin/page.tsx", "utf8"),
    readFile("app/admin/cases/page.tsx", "utf8"),
  ]);
  assert.match(layout, /admin-topbar/);
  assert.match(layout, /AdminNavigation/);
  assert.match(navigation, /견적 문의/);
  assert.match(navigation, /Before &amp; After/);
  assert.doesNotMatch(estimates, /admin-workspace/);
  assert.doesNotMatch(workCases, /admin-workspace/);
  assert.doesNotMatch(layout, /admin-case-entry/);
});
