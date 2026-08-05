import assert from "node:assert/strict";
import test from "node:test";
import { getServiceRegion, serviceRegions } from "../src/domain/regions.ts";

test("publishes unique nationwide service regions", () => { assert.equal(new Set(serviceRegions.map((region) => region.slug)).size, serviceRegions.length); assert.ok(serviceRegions.length >= 8); for (const region of serviceRegions) assert.ok(region.coverage.length >= 4); });
test("resolves known regions without guessing", () => { assert.equal(getServiceRegion("seoul")?.name, "서울"); assert.equal(getServiceRegion("unknown"), undefined); });
