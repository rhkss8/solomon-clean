"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import type { EstimateField } from "@/src/domain/estimate";
import { services } from "@/src/domain/site";

type SubmissionState = "idle" | "submitting" | "success" | "error";
type SubmitResponse = { success?: boolean; reference?: string; message?: string; fieldErrors?: Partial<Record<EstimateField, string>> };

/** Submits a multipart estimate to the server persistence boundary. */
export default function EstimatePage() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<SubmissionState>("idle");
  const [errors, setErrors] = useState<Partial<Record<EstimateField, string>>>({});
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setState("submitting"); setErrors({}); setMessage("");
    const formData = new FormData(event.currentTarget);
    formData.set("privacy", formData.get("privacy") === "on" ? "true" : "false");
    try {
      const response = await fetch("/api/estimates", { method: "POST", body: formData });
      const result = await response.json() as SubmitResponse;
      if (!response.ok) { setErrors(result.fieldErrors ?? {}); setMessage(result.message ?? "입력 내용을 확인해주세요."); setState("error"); return; }
      setReference(result.reference ?? ""); setState("success");
    } catch { setMessage("서버와 통신하지 못했습니다. 잠시 후 다시 시도해주세요."); setState("error"); }
  }

  if (state === "success") return <main><section className="page-hero"><div className="container narrow success-panel"><span className="success-mark">✓</span><h1>견적 요청이 접수됐습니다.</h1><p>접수번호 <strong>{reference}</strong><br />담당자가 현장 정보와 사진을 확인한 뒤 연락드립니다.</p><button className="button button--secondary" onClick={() => setState("idle")} type="button">추가 견적 작성</button></div></section></main>;
  const error = (field: EstimateField) => errors[field] && <small className="field-error">{errors[field]}</small>;

  return <main><section className="page-hero"><div className="container narrow"><span className="eyebrow">FREE ESTIMATE</span><h1>현장 정보를 알려주세요.</h1><p>필수 정보만 먼저 받고, 세부 내용은 상담 과정에서 확인합니다.</p></div></section><section className="section"><div className="container narrow"><form className="estimate-form" onSubmit={handleSubmit} noValidate><label>필요한 서비스<select defaultValue={searchParams.get("service") ?? ""} name="service"><option disabled value="">서비스 선택</option>{services.map((service) => <option key={service.slug} value={service.slug}>{service.name}</option>)}</select>{error("service")}</label><div className="form-grid"><label>성함<input name="name" placeholder="성함" />{error("name")}</label><label>연락처<input inputMode="tel" name="phone" placeholder="010-0000-0000" />{error("phone")}</label></div><label>서비스 지역<input name="area" placeholder="예: 서울 마포구" />{error("area")}</label><label>현장 설명<textarea name="description" placeholder="공간, 평수, 오염 상태, 폐기물량 등 알고 있는 내용을 적어주세요." rows={6} />{error("description")}</label><label>희망일<input name="preferredDate" type="date" />{error("preferredDate")}</label><label className="file-field">현장 사진<input accept="image/jpeg,image/png,image/webp" multiple name="photos" type="file" /><small>JPG, PNG, WebP · 최대 8장, 장당 10MB</small></label><label className="check-field"><input name="privacy" type="checkbox" /><span><Link className="text-link" href="/privacy" target="_blank">개인정보 수집 및 이용 안내</Link>를 확인했으며 상담 연락에 동의합니다.</span></label>{error("privacy")}<div aria-live="polite">{state === "error" && message && <p className="form-error">{message}</p>}</div><button className="button button--primary button--large" disabled={state === "submitting"} type="submit">{state === "submitting" ? "접수 중…" : "견적 요청 접수"}</button></form></div></section></main>;
}
