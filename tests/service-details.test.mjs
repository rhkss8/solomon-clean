import assert from "node:assert/strict";
import test from "node:test";
import { getServiceDetail } from "../src/domain/service-details.ts";
import { services } from "../src/domain/site.ts";

test("every public service has complete detail content", () => {
  for (const service of services) {
    const detail = getServiceDetail(service.slug);
    assert.ok(detail, `missing detail for ${service.slug}`);
    assert.ok(detail.workScopes.length >= 3);
    assert.ok(detail.siteChecks.length >= 3);
    assert.ok(detail.exclusions.length >= 3);
    assert.equal(detail.process.length, 4);
    assert.ok(detail.faqs.length >= 2);
  }
});

test("does not invent detail content for an unknown service", () => {
  assert.equal(getServiceDetail("unknown-service"), undefined);
});
