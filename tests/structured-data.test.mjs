import assert from "node:assert/strict";
import test from "node:test";
import { serviceRegions } from "../src/domain/regions.ts";
import { services, siteConfig } from "../src/domain/site.ts";
import { buildFaqSchema, buildLocalBusinessSchema, buildRegionServiceSchema, buildServiceSchema } from "../src/domain/structured-data.ts";

test("local business schema contains only verified central contact claims", () => { const schema = buildLocalBusinessSchema(); assert.equal(schema["@type"], "LocalBusiness"); assert.equal(schema.telephone, siteConfig.phone); assert.equal(schema.email, siteConfig.email); assert.match(schema["@id"], /#business$/); assert.equal("address" in schema, false); });
test("every service schema has canonical URL and references the primary business", () => { for (const service of services) { const schema = buildServiceSchema(service); assert.equal(schema.url, `${siteConfig.url}/services/${service.slug}`); assert.equal(schema.provider["@id"], `${siteConfig.url}/#business`); } });
test("FAQ and regional schemas mirror visible domain data", () => { const faqs = [{ question: "질문", answer: "답변" }]; assert.equal(buildFaqSchema(faqs).mainEntity[0].name, faqs[0].question); const region = serviceRegions[0]; assert.deepEqual(buildRegionServiceSchema(region).areaServed.map((area) => area.name), region.coverage); });
