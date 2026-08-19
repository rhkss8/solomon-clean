"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function AdminNavigation({counts}:{counts:{estimates:number;workCases:number}}){const pathname=usePathname();const isCases=pathname.startsWith("/admin/cases");return <aside className="admin-navigation"><strong>운영 메뉴</strong><nav aria-label="관리자 메뉴"><Link aria-current={!isCases?"page":undefined} className={!isCases?"is-active":""} href="/admin">견적 문의 <span>{counts.estimates}</span></Link><Link aria-current={isCases?"page":undefined} className={isCases?"is-active":""} href="/admin/cases">Before &amp; After <span>{counts.workCases}</span></Link></nav><p>견적 문의와 공개 작업사례를 한곳에서 관리합니다.</p></aside>}
