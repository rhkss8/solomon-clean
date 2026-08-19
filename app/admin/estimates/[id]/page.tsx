import Image from "next/image";
import Link from "next/link";
import { DeleteEstimateButton } from "@/src/components/admin/DeleteEstimateButton";
import { formatKoreanPhoneNumber } from "@/src/domain/phone";
import { notFound, redirect } from "next/navigation";
import { isDatabaseConfigured } from "@/db";
import { services } from "@/src/domain/site";
import { estimateStatusLabels, estimateStatuses, getAdminEstimate } from "@/src/server/admin-estimates";
import { getAdminSession } from "@/src/server/admin-session";
import { logoutAdmin, saveEstimate } from "../../actions";

const serviceNames = new Map<string, string>(services.map((service) => [service.slug, service.name]));
function dateTime(value: string) { return new Intl.DateTimeFormat("ko-KR", { dateStyle: "long", timeStyle: "short", timeZone: "Asia/Seoul" }).format(new Date(value)); }

export default async function AdminEstimatePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  if (!await getAdminSession()) redirect("/admin?error=session");
  if (!isDatabaseConfigured()) redirect("/admin");
  const { id } = await params;
  const estimate = await getAdminEstimate(id);
  if (!estimate) notFound();
  const query = await searchParams;
  const formattedPhone = formatKoreanPhoneNumber(estimate.phone);
  return <main className="admin-shell"><header className="admin-topbar"><div className="admin-brand"><i>S</i><span><strong>견적 관리</strong><small>{estimate.reference}</small></span></div><form action={logoutAdmin}><button type="submit">로그아웃</button></form></header><div className="admin-detail"><Link className="admin-back" href="/admin">← 견적 목록</Link><header><div><h1>{estimate.customer_name} 고객 견적</h1><p>{dateTime(estimate.created_at)} 접수 · {serviceNames.get(estimate.service) ?? estimate.service}</p></div><a className="admin-call" href={`tel:${estimate.phone}`}>전화 {formattedPhone}</a></header>{query.saved ? <div className="admin-saved">변경사항을 저장했습니다.</div> : null}<div className="admin-detail-grid"><div><section className="admin-panel"><h2>고객 및 현장 정보</h2><dl><div><dt>접수번호</dt><dd>{estimate.reference}</dd></div><div><dt>지역</dt><dd>{estimate.area}</dd></div><div><dt>희망일</dt><dd>{estimate.preferred_date || "미입력"}</dd></div><div><dt>연락처</dt><dd><a href={`tel:${estimate.phone}`}>{formattedPhone}</a></dd></div></dl></section><section className="admin-panel"><h2>선택 조건</h2><pre>{estimate.description}</pre></section><section className="admin-panel"><h2>현장 사진 <span>{estimate.photo_keys.length}장</span></h2>{estimate.photo_keys.length ? <div className="admin-photo-grid">{estimate.photo_keys.map((key, index) => <a href={`/api/admin/photos?pathname=${encodeURIComponent(key)}`} key={key} rel="noreferrer" target="_blank"><Image alt={`현장 사진 ${index + 1}`} height={720} src={`/api/admin/photos?pathname=${encodeURIComponent(key)}`} unoptimized width={960} /></a>)}</div> : <p className="admin-muted">첨부된 사진이 없습니다.</p>}</section></div><aside className="admin-panel admin-editor"><h2>처리 상태</h2><form action={saveEstimate}><input name="id" type="hidden" value={estimate.id} /><label>진행 상태<select defaultValue={estimate.status} name="status">{estimateStatuses.map((status) => <option key={status} value={status}>{estimateStatusLabels[status]}</option>)}</select></label><label>내부 메모<textarea defaultValue={estimate.admin_notes} name="notes" placeholder="통화 내용, 안내 금액, 방문 일정 등 고객에게 노출되지 않는 메모" rows={10} /></label><button type="submit">변경사항 저장</button><small>마지막 변경 {dateTime(estimate.updated_at)}</small></form><DeleteEstimateButton id={estimate.id} reference={estimate.reference} /></aside></div></div></main>;
}
