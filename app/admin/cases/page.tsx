import Link from "next/link";
import { redirect } from "next/navigation";
import { getWorkCaseImageSrc } from "@/src/components/WorkCaseGrid";
import { getAdminSession } from "@/src/server/admin-session";
import { listAdminWorkCases } from "@/src/server/work-cases";

export default async function AdminCasesPage({searchParams}:{searchParams:Promise<{deleted?:string}>}) {
  if(!await getAdminSession())redirect("/admin?error=session");
  const cases=await listAdminWorkCases(); const params=await searchParams;
  return <section className="admin-content admin-cases"><header><div><h1>Before &amp; After</h1><p>사진과 노출 상태를 한곳에서 관리합니다.</p></div><Link className="admin-primary-link" href="/admin/cases/new">새 작업사례</Link></header>{params.deleted?<div className="admin-saved">작업사례를 삭제했습니다.</div>:null}<div className="admin-case-list">{cases.map((item)=><Link href={`/admin/cases/${item.id}`} key={item.id}><div className="admin-case-list__photos"><img alt="" src={getWorkCaseImageSrc(item.before_image_url)}/><img alt="" src={getWorkCaseImageSrc(item.after_image_url)}/></div><div><span>{item.category}</span><h2>{item.title}</h2><p>{item.description||"설명 없음"}</p></div><div className="admin-case-list__state"><b className={item.published?"is-live":""}>{item.published?"공개":"비공개"}</b><small>순서 {item.display_order}</small></div></Link>)}{!cases.length?<div className="admin-empty">등록된 작업사례가 없습니다.</div>:null}</div></section>;
}
