import type { Metadata } from "next";
import { isDatabaseConfigured } from "@/db";
import { AdminNavigation } from "@/src/components/admin/AdminNavigation";
import { getAdminSession } from "@/src/server/admin-session";
import { getAdminNavigationCounts } from "@/src/server/admin-navigation";
import { logoutAdmin } from "./actions";

export const metadata: Metadata = { title: "운영 관리", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  if (!session) return <div className="admin-root">{children}</div>;
  const counts = isDatabaseConfigured() ? await getAdminNavigationCounts() : { estimates: 0, workCases: 0 };
  return <div className="admin-root"><header className="admin-topbar"><div className="admin-brand"><i>S</i><span><strong>운영 관리</strong><small>{session.email}</small></span></div><form action={logoutAdmin}><button type="submit">로그아웃</button></form></header><div className="admin-workspace"><AdminNavigation counts={counts} /><main className="admin-main">{children}</main></div></div>;
}
