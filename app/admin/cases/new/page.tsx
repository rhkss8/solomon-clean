import Link from "next/link";
import { redirect } from "next/navigation";
import { WorkCaseEditor } from "@/src/components/admin/WorkCaseEditor";
import { getAdminSession } from "@/src/server/admin-session";
export default async function NewWorkCasePage(){if(!await getAdminSession())redirect("/admin?error=session");return <main className="admin-shell"><div className="admin-detail admin-case-detail"><Link className="admin-back" href="/admin/cases">← 작업사례 목록</Link><header><div><h1>새 작업사례</h1><p>같은 현장의 작업 전·후 사진을 등록해주세요.</p></div></header><WorkCaseEditor draftId={crypto.randomUUID()}/></div></main>}
