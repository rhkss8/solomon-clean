"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_MAX_AGE, createAdminSessionToken, validateAdminCredentials } from "@/src/server/admin-auth";
import { getAdminSession } from "@/src/server/admin-session";
import { isEstimateStatus, updateAdminEstimate } from "@/src/server/admin-estimates";

export async function loginAdmin(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!validateAdminCredentials(email, password)) redirect("/admin?error=login");
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, createAdminSessionToken(email), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: ADMIN_SESSION_MAX_AGE });
  redirect("/admin");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin");
}

export async function saveEstimate(formData: FormData) {
  if (!await getAdminSession()) redirect("/admin?error=session");
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const notes = String(formData.get("notes") ?? "");
  if (!/^[0-9a-f-]{36}$/i.test(id) || !isEstimateStatus(status)) redirect("/admin?error=invalid");
  await updateAdminEstimate(id, status, notes);
  redirect(`/admin/estimates/${id}?saved=1`);
}
