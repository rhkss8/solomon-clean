"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { services } from "@/src/domain/site";

type SubmissionState = "idle" | "success";

/** Client estimate draft; real delivery is attached through a server adapter later. */
export default function EstimatePage() {
  const searchParams = useSearchParams();
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionState("success");
  }

  if (submissionState === "success") {
    return <main><section className="page-hero"><div className="container narrow success-panel"><span className="success-mark">✓</span><h1>견적 요청이 준비됐습니다.</h1><p>현재는 개발 단계라 실제 전송되지 않았습니다. 담당 이메일과 저장 방식을 연결하면 접수번호와 알림이 발송됩니다.</p><button className="button button--secondary" onClick={()=>setSubmissionState("idle")} type="button">다시 작성</button></div></section></main>;
  }

  return <main><section className="page-hero"><div className="container narrow"><span className="eyebrow">FREE ESTIMATE</span><h1>현장 정보를 알려주세요.</h1><p>필수 정보만 먼저 받고, 세부 내용은 상담 과정에서 확인합니다.</p></div></section><section className="section"><div className="container narrow"><form className="estimate-form" onSubmit={handleSubmit}><label>필요한 서비스<select defaultValue={searchParams.get("service") ?? ""} name="service" required><option disabled value="">서비스 선택</option>{services.map(service=><option key={service.slug} value={service.slug}>{service.name}</option>)}</select></label><div className="form-grid"><label>성함<input name="name" placeholder="성함" required /></label><label>연락처<input inputMode="tel" name="phone" placeholder="010-0000-0000" required /></label></div><label>서비스 지역<input name="area" placeholder="예: 서울 마포구" required /></label><label>현장 설명<textarea name="description" placeholder="공간, 평수, 오염 상태, 폐기물량 등 알고 있는 내용을 적어주세요." rows={6} required /></label><label>희망일<input name="preferredDate" type="date" /></label><label className="file-field">현장 사진<input accept="image/jpeg,image/png,image/webp" multiple name="photos" type="file" /><small>JPG, PNG, WebP · 실제 저장소 연결 전에는 전송되지 않습니다.</small></label><label className="check-field"><input name="privacy" required type="checkbox" /> 개인정보 수집 및 상담 연락에 동의합니다.</label><button className="button button--primary button--large" type="submit">견적 요청 확인</button></form></div></section></main>;
}
