import assert from "node:assert/strict";
import test from "node:test";
import { legalDocuments } from "../src/config/operations/policies.ts";
test("keeps legal documents visibly unapproved until operating rules are confirmed", () => { for (const document of Object.values(legalDocuments)) { assert.equal(document.status, "draft"); assert.match(document.effectiveDate, /승인/); assert.ok(document.sections.length >= 4); } });
test("privacy draft identifies actual estimate data and missing retention approval", () => { const copy = JSON.stringify(legalDocuments.privacy); assert.match(copy, /성명/); assert.match(copy, /현장 사진/); assert.match(copy, /보유기간/); });
