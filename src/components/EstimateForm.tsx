"use client";

import { upload } from "@vercel/blob/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { getEstimateQuestions, type EstimateQuestion } from "@/src/config/estimate/questions";
import type { EstimateField } from "@/src/domain/estimate";
import { formatKoreanPhoneNumber, isValidKoreanPhoneNumber } from "@/src/domain/phone";
import { formatFileSize, MAX_ESTIMATE_PHOTO_COUNT, optimizeEstimatePhoto } from "@/src/domain/photo-optimization";
import { formatPhoneNumber, isServiceSlug, services, siteConfig, type ServiceSlug } from "@/src/domain/site";
import { validateEstimatePhotos, type UploadedPhoto } from "@/src/server/photo-storage";

type SubmissionState = "idle" | "submitting" | "success" | "error";
type SubmitResponse = { success?: boolean; reference?: string; message?: string; fieldErrors?: Partial<Record<EstimateField, string>> };
type Answers = Record<string, string | string[]>;

const extensions = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" } as const;
const wasteCategoryAnswers: Readonly<Record<string, string>> = {
  industrial: "사업장 폐기물",
  home: "가구·가전",
  living: "생활 폐기물",
  moving: "이사 폐기물",
};
const residentialSizes = ["10평 이하", "11~20평", "21~30평", "31~40평", "41평 이상"] as const;

function answerLabel(value: string | string[] | undefined) { return Array.isArray(value) ? value.join(", ") : value ?? ""; }
function findNextUnansweredStep(questions: readonly EstimateQuestion[], start: number, answers: Answers) {
  let nextStep = start;
  while (nextStep < questions.length && answerLabel(answers[questions[nextStep].id]).trim()) nextStep += 1;
  return nextStep;
}

export function EstimateForm({ initialService }: { initialService?: ServiceSlug }) {
  const searchParams = useSearchParams();
  const queryService = searchParams.get("service") ?? "";
  const presetService = initialService ?? (isServiceSlug(queryService) ? queryService : "");
  const presetWasteType = presetService === "waste-disposal" ? wasteCategoryAnswers[searchParams.get("category") ?? ""] : undefined;
  const querySize = searchParams.get("size") ?? "";
  const presetResidentialSize = presetService === "residential-cleaning" && residentialSizes.some((size) => size === querySize) ? querySize : undefined;
  const queryDifficulty = searchParams.get("difficulty") ?? "";
  const queryExtras = searchParams.get("extras") ?? "";
  const presetDescription = presetService === "residential-cleaning"
    ? [`오염 난이도: ${queryDifficulty || "미선택"}`, queryExtras ? `추가 작업: ${queryExtras}` : ""].filter(Boolean).join("\n")
    : undefined;
  const presetHoardingCare = presetService === "hoarding-cleanup" ? searchParams.getAll("care").filter(Boolean) : [];
  const presetHoardingSpace = presetService === "hoarding-cleanup" ? searchParams.get("space") ?? "" : "";
  const presetHoardingLevel = presetService === "hoarding-cleanup" ? searchParams.get("level") ?? "" : "";
  const presetDeepContamination = presetService === "deep-cleaning" ? searchParams.get("contamination") ?? "" : "";
  const presetDeepSpace = presetService === "deep-cleaning" ? searchParams.get("space") ?? "" : "";
  const presetDeepPeriod = presetService === "deep-cleaning" ? searchParams.get("period") ?? "" : "";
  const presetEstateSpace = presetService === "estate-clearing" ? searchParams.get("space") ?? "" : "";
  const presetEstateVolume = presetService === "estate-clearing" ? searchParams.get("volume") ?? "" : "";
  const presetEstateWork = presetService === "estate-clearing" ? searchParams.getAll("work").filter(Boolean) : [];
  const presetOrganizingZones = presetService === "home-organizing" ? searchParams.getAll("zone").filter(Boolean) : [];
  const presetOrganizingSize = presetService === "home-organizing" ? searchParams.get("size") ?? "" : "";
  const presetOrganizingGoals = presetService === "home-organizing" ? searchParams.getAll("goal").filter(Boolean) : [];
  const presetAnswers: Answers = {
    ...(presetWasteType ? { wasteType: [presetWasteType] } : {}),
    ...(presetResidentialSize ? { size: presetResidentialSize } : {}),
    ...(presetDescription ? { description: presetDescription } : {}),
    ...(presetHoardingCare.length ? { care: presetHoardingCare } : {}),
    ...(presetHoardingSpace ? { space: presetHoardingSpace } : {}),
    ...(presetHoardingLevel ? { level: presetHoardingLevel } : {}),
    ...(presetDeepContamination ? { contamination: [presetDeepContamination] } : {}),
    ...(presetDeepSpace ? { space: presetDeepSpace } : {}),
    ...(presetDeepPeriod ? { period: presetDeepPeriod } : {}),
    ...(presetEstateSpace ? { space: presetEstateSpace } : {}),
    ...(presetEstateVolume ? { volume: presetEstateVolume } : {}),
    ...(presetEstateWork.length ? { estateWork: presetEstateWork } : {}),
    ...(presetOrganizingZones.length ? { organizingSpace: presetOrganizingZones } : {}),
    ...(presetOrganizingSize ? { size: presetOrganizingSize } : {}),
    ...(presetOrganizingGoals.length ? { goal: presetOrganizingGoals } : {}),
  };
  const presetQuestions = presetService ? getEstimateQuestions(presetService) : [];
  const presetStep = findNextUnansweredStep(presetQuestions, 0, presetAnswers);
  const [service, setService] = useState<ServiceSlug | "">(presetService);
  const [step, setStep] = useState(presetStep);
  const [answers, setAnswers] = useState<Answers>(presetAnswers);
  const [photos, setPhotos] = useState<File[]>([]);
  const [originalPhotoBytes, setOriginalPhotoBytes] = useState(0);
  const [isOptimizingPhotos, setIsOptimizingPhotos] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [optimizationTotal, setOptimizationTotal] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [state, setState] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");
  const advanceTimer = useRef<number | null>(null);

  const selectedService = services.find((item) => item.slug === service);
  const questions = service ? getEstimateQuestions(service) : [];
  const currentQuestion = questions[step];
  const isContactStep = Boolean(service) && step === questions.length;
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;

  useEffect(() => () => { if (advanceTimer.current) window.clearTimeout(advanceTimer.current); }, []);
  useEffect(() => {
    if (state === "success") window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [state]);

  function clearAdvanceTimer() {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    advanceTimer.current = null;
  }
  function scheduleAdvance(delay: number, nextAnswers: Answers) {
    clearAdvanceTimer();
    const currentStep = step;
    const targetStep = findNextUnansweredStep(questions, currentStep + 1, nextAnswers);
    advanceTimer.current = window.setTimeout(() => setStep((value) => value === currentStep ? targetStep : value), delay);
  }
  function chooseService(slug: ServiceSlug) { clearAdvanceTimer(); setService(slug); setStep(0); setAnswers({}); setMessage(""); }
  function selectOption(question: EstimateQuestion, option: string) {
    setMessage("");
    const selected = Array.isArray(currentAnswer) ? currentAnswer : [];
    const nextAnswer = question.type === "multiple" ? (selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option]) : option;
    const nextAnswers = { ...answers, [question.id]: nextAnswer };
    setAnswers(nextAnswers);
    if (question.type === "single") scheduleAdvance(180, nextAnswers);
    else if (nextAnswer.length > 0) scheduleAdvance(900, nextAnswers);
    else clearAdvanceTimer();
  }
  function submitTextAnswer() {
    if (!currentQuestion || answerLabel(currentAnswer).trim().length === 0) return;
    clearAdvanceTimer(); setStep(findNextUnansweredStep(questions, step + 1, answers));
  }
  function handleTextKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== "Enter" || event.shiftKey) return;
    event.preventDefault(); submitTextAnswer();
  }
  function editAnswer(index: number) { clearAdvanceTimer(); setMessage(""); setStep(index); }
  function resetFlow() {
    const hasProgress = step > 0 || Object.keys(answers).length > 0 || Boolean(name || phone || photos.length);
    if (hasProgress && !window.confirm("입력한 내용을 모두 지우고 처음부터 다시 시작할까요?")) return;
    clearAdvanceTimer(); setService(presetService); setStep(presetStep); setAnswers(presetAnswers); setPhotos([]); setOriginalPhotoBytes(0); setName(""); setPhone(""); setPrivacy(false); setState("idle"); setMessage(""); setReference("");
  }

  async function handlePhotoSelection(files: FileList | null) {
    const selected = Array.from(files ?? []);
    setMessage("");
    if (selected.length > MAX_ESTIMATE_PHOTO_COUNT) { setMessage(`사진은 최대 ${MAX_ESTIMATE_PHOTO_COUNT}장까지 선택할 수 있습니다.`); return; }
    if (!selected.length) { setPhotos([]); setOriginalPhotoBytes(0); return; }
    setIsOptimizingPhotos(true); setOptimizationProgress(0); setOptimizationTotal(selected.length);
    try {
      const optimized: File[] = [];
      for (const [index, file] of selected.entries()) {
        optimized.push(await optimizeEstimatePhoto(file));
        setOptimizationProgress(index + 1);
      }
      setOriginalPhotoBytes(selected.reduce((sum, file) => sum + file.size, 0));
      setPhotos(optimized);
    } catch (error) {
      setPhotos([]); setOriginalPhotoBytes(0); setMessage(error instanceof Error ? error.message : "사진을 최적화하지 못했습니다.");
    } finally { setIsOptimizingPhotos(false); setOptimizationTotal(0); }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (name.trim().length < 2 || !isValidKoreanPhoneNumber(phone) || !privacy) { setMessage("성함, 연락처와 개인정보 동의를 확인해주세요."); return; }
    setState("submitting"); setMessage("");
    const photoValidation = validateEstimatePhotos(photos);
    if (!photoValidation.success) { setMessage(photoValidation.message); setState("error"); return; }
    try {
      const uploadId = crypto.randomUUID();
      const uploadedPhotos: UploadedPhoto[] = await Promise.all(photoValidation.files.map(async (file) => {
        const contentType = file.type as keyof typeof extensions;
        const pathname = `estimates/${uploadId}/${crypto.randomUUID()}.${extensions[contentType]}`;
        const blob = await upload(pathname, file, { access: "private", handleUploadUrl: "/api/estimates/upload", contentType });
        return { pathname: blob.pathname, contentType, size: file.size };
      }));
      const area = answerLabel(answers.area);
      const preferredDateText = answerLabel(answers.preferredDate);
      const preferredDate = /^\d{4}-\d{2}-\d{2}$/.test(preferredDateText) ? preferredDateText : "";
      const description = questions.filter((question) => question.id !== "area").map((question) => `${question.prompt}: ${answerLabel(answers[question.id])}`).join("\n");
      const response = await fetch("/api/estimates", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ service, name, phone, area, description, preferredDate, privacy, photos: uploadedPhotos }) });
      const result = await response.json() as SubmitResponse;
      if (!response.ok) { setMessage(result.message ?? "입력 내용을 확인해주세요."); setState("error"); return; }
      setReference(result.reference ?? ""); setState("success");
    } catch { setMessage("서버와 통신하지 못했습니다. 잠시 후 다시 시도해주세요."); setState("error"); }
  }

  if (state === "success") return <main className="quote-chat-page"><section className="quote-chat"><div className="quote-chat__success"><span>✓</span><h1>무료견적 요청이 접수됐습니다.</h1><p>접수번호 <strong>{reference}</strong><br />담당자가 내용을 확인한 뒤 연락드리겠습니다.</p><Link href="/">홈으로 돌아가기</Link></div></section></main>;

  return <main className="quote-chat-page"><section className="quote-chat">
    <header className="quote-chat__header"><div><span>1분 무료견적</span><div><strong>{selectedService?.name ?? "서비스 선택"}</strong><button onClick={resetFlow} type="button">처음부터</button></div></div><div className="quote-chat__progress"><i style={{ width: service ? `${Math.max(8, ((step + 1) / (questions.length + 1)) * 100)}%` : "4%" }} /></div></header>
    <div className="quote-chat__body">
      <div className="quote-bubble quote-bubble--guide"><strong>몇 가지 정보만 알려주시면 무료견적을 받을 수 있어요.</strong><span>전화 상담은 <a href={`tel:${siteConfig.phone}`}>{formatPhoneNumber(siteConfig.phone)}</a>로 연락 주세요.</span></div>

      {!service ? <div className="quote-question"><h1>원하시는 서비스를 선택해주세요.</h1><div className="quote-service-options">{services.map((item) => <button key={item.slug} onClick={() => chooseService(item.slug)} type="button"><span>{item.name}</span><small>{item.shortDescription}</small></button>)}</div></div> : <>
        {questions.slice(0, step).map((question, index) => <div className="quote-history" key={question.id}><div className="quote-bubble quote-bubble--question">{question.prompt}</div><button className="quote-bubble quote-bubble--answer" onClick={() => editAnswer(index)} type="button"><span>{answerLabel(answers[question.id])}</span><small>수정</small></button></div>)}
        {currentQuestion ? <div className="quote-question" key={currentQuestion.id}><h1>{currentQuestion.prompt}</h1>
          {currentQuestion.type === "text" ? <div className="quote-text-answer"><textarea autoFocus onChange={(event) => setAnswers((current) => ({ ...current, [currentQuestion.id]: event.target.value }))} onKeyDown={handleTextKeyDown} placeholder={currentQuestion.placeholder} rows={3} value={answerLabel(currentAnswer)} /><button aria-label="답변 전송" disabled={!answerLabel(currentAnswer).trim()} onClick={submitTextAnswer} type="button">↑</button></div> : <><div className="quote-option-list">{currentQuestion.options?.map((option) => { const selected = Array.isArray(currentAnswer) ? currentAnswer.includes(option) : currentAnswer === option; return <button aria-pressed={selected} className={selected ? "is-selected" : ""} key={option} onClick={() => selectOption(currentQuestion, option)} type="button"><i>{selected ? "✓" : ""}</i><span>{option}</span></button>; })}</div><small className="quote-question__hint">{currentQuestion.type === "multiple" ? "복수 선택 가능 · 선택을 마치면 자동으로 넘어갑니다" : "선택하면 바로 다음 질문으로 넘어갑니다"}</small></>}
        </div> : null}

        {isContactStep ? <form className="quote-question quote-contact" onSubmit={handleSubmit}>
          <h1>마지막으로 연락받을 정보를 알려주세요.</h1>
          <label>현장 사진 <input accept="image/*,.heic,.heif" disabled={isOptimizingPhotos} multiple onChange={(event) => void handlePhotoSelection(event.target.files)} type="file" /><small>{isOptimizingPhotos ? `${Math.min(optimizationProgress + 1, optimizationTotal)} / ${optimizationTotal}장 자동 최적화 중…` : photos.length ? `${photos.length}장 · ${formatFileSize(originalPhotoBytes)} → ${formatFileSize(photos.reduce((sum, file) => sum + file.size, 0))}로 축소됨` : "선택사항 · 휴대폰 원본 그대로 선택하면 자동으로 용량을 줄입니다 (최대 8장)"}</small></label>
          <div className="quote-contact__grid"><label>성함<input autoComplete="name" onChange={(event) => setName(event.target.value)} placeholder="성함" value={name} /></label><label>연락처<input autoComplete="tel" inputMode="numeric" maxLength={14} onChange={(event) => setPhone(formatKoreanPhoneNumber(event.target.value))} pattern="[0-9-]*" placeholder="010-0000-0000" type="tel" value={phone} /></label></div>
          <label className="quote-contact__privacy"><input checked={privacy} onChange={(event) => setPrivacy(event.target.checked)} type="checkbox" /><span><Link href="/privacy" target="_blank">개인정보 수집 및 이용 안내</Link>를 확인했으며 상담 연락에 동의합니다.</span></label>
          {message ? <p className="form-error" role="alert">{message}</p> : null}
          <button className="quote-contact__submit" disabled={state === "submitting" || isOptimizingPhotos} type="submit">{isOptimizingPhotos ? "사진 최적화 중…" : state === "submitting" ? "접수 중…" : "무료견적 요청"}</button>
        </form> : null}
      </>}
    </div>
  </section></main>;
}
