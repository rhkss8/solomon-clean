import type { Metadata } from "next";
import Link from "next/link";
import { getAdminSession } from "@/src/server/admin-session";

export const metadata: Metadata = { title: "견적 관리", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  return <div className="admin-root">{session ? <Link className="admin-case-entry" href="/admin/cases">작업사례 관리</Link> : null}{children}</div>;
}
