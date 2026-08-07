import Link from "next/link";
import { BusinessEvidencePanel } from "@/src/components/BusinessEvidencePanel";
import { createPageMetadata } from "@/src/lib/metadata";

export const metadata = createPageMetadata({
  title: "회사소개",
  description: "공간의 문제를 끝까지 해결하는 솔로몬종합청소를 소개합니다.",
  path: "/company",
});

const principles = [
  ["01", "사진부터 확인합니다", "현장 사진과 기본 조건을 먼저 살펴 필요한 작업과 확인할 부분을 정리합니다."],
  ["02", "범위를 먼저 합의합니다", "포함·제외 범위와 비용에 영향을 주는 조건을 작업 전에 설명합니다."],
  ["03", "필요한 일을 함께 연결합니다", "청소뿐 아니라 폐기와 정리가 필요한 현장도 한 곳에서 상담할 수 있도록 돕습니다."],
];

export default function CompanyPage() {
  return (
    <main className="company-page">
      <section className="company-hero">
        <div className="container company-hero__grid">
          <div>
            <span className="eyebrow">ABOUT SOLOMON CLEANING</span>
            <h1>깨끗한 공간을 넘어<br />다시 시작할 수 있도록.</h1>
            <p>생활공간과 사업장의 복잡한 청소·폐기·정리 문제를 한 번에 상담하는 전국 종합청소 서비스입니다.</p>
          </div>
          <dl aria-label="솔로몬종합청소의 서비스 원칙 요약">
            <div><dt>상담</dt><dd>사진과 현장 조건부터 확인</dd></div>
            <div><dt>안내</dt><dd>작업 범위와 변동 요소 설명</dd></div>
            <div><dt>연결</dt><dd>청소·폐기·정리를 한 번에</dd></div>
          </dl>
        </div>
      </section>

      <section className="section company-intro">
        <div className="container split-section">
          <div><span className="eyebrow">OUR STANDARD</span><h2>과장보다 과정,<br />가격보다 기준을 먼저.</h2></div>
          <div className="prose">
            <p>현장마다 필요한 청소는 다릅니다. 그래서 정해진 답부터 제시하기보다 사진과 기본 조건을 확인하고, 필요한 범위와 비용을 바꾸는 요소부터 설명합니다.</p>
            <p>고객이 무엇을 맡기는지 이해하고 결정할 수 있도록 상담부터 작업 확인까지 한 곳에서 소통하는 것이 저희의 기본입니다.</p>
          </div>
        </div>
      </section>

      <section className="section company-principles" aria-labelledby="principles-title">
        <div className="container">
          <div className="company-principles__heading">
            <span className="eyebrow">HOW WE WORK</span>
            <h2 id="principles-title">현장을 대하는 세 가지 원칙</h2>
            <p>상담이 빠르더라도 확인해야 할 과정은 생략하지 않습니다.</p>
          </div>
          <div className="company-principles__grid">
            {principles.map(([number, title, copy]) => (
              <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--subtle company-evidence">
        <div className="container"><BusinessEvidencePanel /></div>
      </section>

      <section className="company-cta">
        <div className="container">
          <div><span className="eyebrow">NEXT STEP</span><h2>말보다 실제 작업과 상담 과정으로<br />확인해보세요.</h2></div>
          <div><Link href="/portfolio">작업사례 보기</Link><Link href="/estimate">1분 무료견적 신청</Link></div>
        </div>
      </section>
    </main>
  );
}
