import Link from "next/link";
import { notFound,redirect } from "next/navigation";
import { WorkCaseEditor } from "@/src/components/admin/WorkCaseEditor";
import { getAdminSession } from "@/src/server/admin-session";
import { getAdminWorkCase } from "@/src/server/work-cases";
export default async function EditWorkCasePage({params,searchParams}:{params:Promise<{id:string}>;searchParams:Promise<{saved?:string;error?:string}>}){if(!await getAdminSession())redirect("/admin?error=session");const item=await getAdminWorkCase((await params).id);if(!item)notFound();const query=await searchParams;return <div className="admin-detail admin-case-detail"><Link className="admin-back" href="/admin/cases">← 작업사례 목록</Link><header><div><h1>{item.title}</h1><p>공개 사진과 설명을 수정합니다.</p></div></header>{query.saved?<div className="admin-saved">변경사항을 저장했습니다.</div>:null}{query.error?<div className="admin-alert">제목, 카테고리와 작업 전·후 사진을 확인해주세요.</div>:null}<WorkCaseEditor item={item}/></div>}
