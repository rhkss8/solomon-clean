import Link from "next/link";
import { BlogPostGrid } from "@/src/components/BlogPostGrid";
import { PriceGuideCalculator } from "@/src/components/PriceGuideCalculator";
import { PricePolicyNotice } from "@/src/components/PricePolicyNotice";
import { PriceServiceCatalog } from "@/src/components/PriceServiceCatalog";
import { StructuredData } from "@/src/components/StructuredData";
import { formatPhoneNumber, siteConfig } from "@/src/domain/site";
import { createPageMetadata } from "@/src/lib/metadata";
import { getBlogPosts } from "@/src/server/blog-feed";

export const metadata = createPageMetadata({
  title: "청소·폐기물 비용안내",
  description: "서비스별 비용을 결정하는 기준과 카테고리별 상세 안내를 확인하세요.",
  path: "/prices",
});

const estimatePrinciples = [
  { number: "01", title: "작업 범위를 먼저 구분", description: "기본 작업과 추가 작업을 나누어 견적 조건을 확인합니다." },
  { number: "02", title: "현장 조건을 사전 확인", description: "사진, 면적, 오염도와 반출 동선을 기준으로 상담합니다." },
  { number: "03", title: "확정 내용을 견적서에 표시", description: "작업 범위와 부가세 적용 여부를 최종 견적서에서 확인합니다." },
] as const;

const estimateComparison = [
  { concern: "총액만 전달되어 범위를 알기 어려움", response: "기본 작업과 추가 작업 범위를 나누어 확인" },
  { concern: "사진과 실제 현장이 달라 금액이 변경됨", response: "전체 사진과 현장 조건을 먼저 요청" },
  { concern: "부가세와 추가비용 적용 여부가 불명확함", response: "최종 견적서에서 적용 여부를 명시" },
  { concern: "어떤 장비와 인력이 오는지 알기 어려움", response: "현장 규모와 난이도에 맞춘 작업 조건 상담" },
] as const;

const priceFaq = [
  { question: "전화나 사진만으로 견적을 받을 수 있나요?", answer: "대표 사진과 공간 규모, 지역, 원하는 작업 범위를 보내주시면 1차 상담이 가능합니다. 사진과 현장의 차이가 크면 방문 확인을 안내할 수 있습니다." },
  { question: "표시된 상담 견적은 무슨 뜻인가요?", answer: "실제 운영 단가가 확정되기 전이거나 현장별 편차가 큰 서비스입니다. 확인되지 않은 숫자 대신 작업 범위 확인 후 견적서를 안내합니다." },
  { question: "현장에서 추가금이 생길 수 있나요?", answer: "접수한 내용과 실제 작업 범위가 다른 경우 작업 전에 변경 사유와 추가 범위를 설명하고 동의를 받은 뒤 진행합니다." },
  { question: "폐기물처리 비용은 어디에서 확인하나요?", answer: "폐기물처리 카드를 선택하면 산업·가정·생활·이사 폐기물별 견적 기준과 사진 체크리스트를 확인할 수 있습니다." },
] as const;

export default async function PricesPage() {
  const { posts, source } = await getBlogPosts(6);
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${new URL("/prices", siteConfig.url)}#faq`,
    mainEntity: priceFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <main className="prices-hub">
      <StructuredData data={faqStructuredData} />
      <section className="prices-hub__hero">
        <div className="container">
          <span className="eyebrow">PRICE & FREE ESTIMATE</span>
          <h1>예상비용.<br />무료 견적. 전국 상담.</h1>
          <p>필요한 서비스를 선택하면 비용이 달라지는 기준과 준비사항을 바로 확인할 수 있습니다.</p>
        </div>
      </section>

      <section className="prices-hub__catalog">
        <div className="container">
          <PriceServiceCatalog />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <PricePolicyNotice />
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="section-heading section-heading--light">
            <div><span className="eyebrow">CLEAR ESTIMATE</span><h2>가격만 안내하고 끝내지 않습니다.</h2></div>
            <p>사진 상담부터 작업 범위 확인까지 같은 기준으로 안내합니다.</p>
          </div>
          <div className="price-principle-grid">
            {estimatePrinciples.map((principle) => (
              <article key={principle.number}>
                <span>{principle.number}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--subtle">
        <div className="container">
          <div className="section-heading">
            <div><span className="eyebrow">QUOTE CHECK</span><h2>내 현장은 어떤 상담이 필요할까요?</h2></div>
            <p>간단한 조건을 선택하면 견적 정확도를 높이는 정보를 안내합니다.</p>
          </div>
          <PriceGuideCalculator />
        </div>
      </section>

      <section className="section prices-work-records">
        <div className="container">
          <div className="section-heading">
            <div><span className="eyebrow">REAL WORK & COST CONTEXT</span><h2>비슷한 현장의 작업 기록</h2></div>
            <p>실제 비용은 현장마다 다르지만, 작업 범위와 결과를 확인하면 상담 준비에 도움이 됩니다.</p>
          </div>
          {source === "fallback" && <p className="feed-notice">최신 블로그 연결이 지연되어 확인된 대표 작업을 표시합니다.</p>}
          <BlogPostGrid posts={posts} />
          <div className="centered-action"><Link className="text-link" href="/portfolio">작업사례 전체 보기 →</Link></div>
        </div>
      </section>

      <section className="section prices-comparison">
        <div className="container">
          <div className="section-heading">
            <div><span className="eyebrow">BEFORE YOU BOOK</span><h2>견적 전에 꼭 확인하세요.</h2></div>
            <p>가격이 낮아 보이는지보다, 무엇이 포함됐는지를 먼저 비교해야 합니다.</p>
          </div>
          <div className="prices-comparison__table" role="table" aria-label="견적 확인사항과 솔로몬 안내 방식">
            <div className="prices-comparison__head" role="row"><strong role="columnheader">확인해야 할 상황</strong><strong role="columnheader">솔로몬 안내 방식</strong></div>
            {estimateComparison.map((item) => <div key={item.concern} role="row"><p role="cell"><span>!</span>{item.concern}</p><p role="cell"><span>✓</span>{item.response}</p></div>)}
          </div>
        </div>
      </section>

      <section className="prices-consultation">
        <div className="container">
          <div><span className="eyebrow">NATIONWIDE CONSULTATION</span><h2>사진부터 보내도 괜찮습니다.</h2><p>서비스 종류를 모르더라도 현장 사진, 지역과 원하는 결과를 알려주시면 상담을 시작할 수 있습니다.</p></div>
          <div><a href={siteConfig.kakaoUrl} rel="noreferrer" target="_blank">카카오톡 상담</a><a href={`tel:${siteConfig.phone}`}>전화 {formatPhoneNumber(siteConfig.phone)}</a></div>
        </div>
      </section>

      <section className="section prices-faq">
        <div className="container">
          <div><span className="eyebrow">FAQ</span><h2>비용안내 자주 묻는 질문</h2><p>정확한 견적을 위해 접수 전 확인하면 좋은 내용입니다.</p></div>
          <div>{priceFaq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
        </div>
      </section>

      <section className="prices-hub__proof">
        <div className="container">
          <div><span className="eyebrow">WORK RECORDS</span><h2>비용만큼 중요한 건<br />실제 작업 결과입니다.</h2><p>공식 블로그에서 솔로몬의 현장 기록과 작업 과정을 직접 확인하세요.</p></div>
          <div className="prices-hub__proof-actions"><Link className="button button--primary" href="/portfolio">작업사례 확인</Link><Link className="button button--secondary" href="/estimate">무료견적 요청</Link></div>
        </div>
      </section>
    </main>
  );
}
