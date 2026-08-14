import assert from "node:assert/strict";
import test from "node:test";
import { createAdminSessionToken, validateAdminCredentials, verifyAdminSessionToken } from "../src/server/admin-auth.ts";

test("admin session is signed, expires, and rejects tampering", () => {
  const previous = { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD, secret: process.env.ADMIN_SESSION_SECRET };
  process.env.ADMIN_EMAIL = "rhkss8@gmail.com";
  process.env.ADMIN_PASSWORD = "a-test-password";
  process.env.ADMIN_SESSION_SECRET = "0123456789abcdef0123456789abcdef";
  try {
    assert.equal(validateAdminCredentials("RHKSS8@gmail.com", "a-test-password"), true);
    assert.equal(validateAdminCredentials("rhkss8@gmail.com", "wrong"), false);
    const token = createAdminSessionToken("rhkss8@gmail.com", 1_000);
    assert.equal(verifyAdminSessionToken(token, 2_000)?.email, "rhkss8@gmail.com");
    assert.equal(verifyAdminSessionToken(`${token}x`, 2_000), null);
    assert.equal(verifyAdminSessionToken(token, 1_000 + 8 * 60 * 60 * 1_000 + 1), null);
  } finally {
    if (previous.email === undefined) delete process.env.ADMIN_EMAIL; else process.env.ADMIN_EMAIL = previous.email;
    if (previous.password === undefined) delete process.env.ADMIN_PASSWORD; else process.env.ADMIN_PASSWORD = previous.password;
    if (previous.secret === undefined) delete process.env.ADMIN_SESSION_SECRET; else process.env.ADMIN_SESSION_SECRET = previous.secret;
  }
});
