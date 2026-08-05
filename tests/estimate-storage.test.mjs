import assert from "node:assert/strict";
import test from "node:test";
import { PostgresEstimateStorage, DisabledEstimateStorage } from "../src/server/estimate-storage.ts";
const draft = { service: "move-in-cleaning", name: "홍길동", phone: "01012345678", area: "서울", description: "입주청소 상담을 요청합니다.", preferredDate: "", privacy: true };
test("stores normalized estimates and private photo keys", async () => { const calls = []; const stored = await new PostgresEstimateStorage({ async unsafe(query, values) { assert.match(query, /INSERT INTO estimates/); calls.push(values); } }).save(draft, ["estimates/id/photo.jpg"]); assert.match(stored.reference, /^SC-\d{8}-[0-9A-F]{6}$/); assert.match(calls[0][8], /photo\.jpg/); });
test("fails closed without a database", async () => { await assert.rejects(() => new DisabledEstimateStorage().save(draft, [])); });
