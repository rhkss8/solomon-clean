import Link from "next/link";
import { getVatPolicyLabel, pricePolicy, wasteCategoryRates, type WasteCategoryRate } from "@/src/config/operations/pricing";
import type { WastePriceCategorySlug } from "@/src/domain/waste-pricing";
import { wastePriceCategories } from "@/src/domain/waste-pricing";
import { siteConfig } from "@/src/domain/site";

type WastePriceCategory = (typeof wastePriceCategories)[number];

export function WastePriceCategoryPage({ category }: { category: WastePriceCategory }) {
  const rate: WasteCategoryRate = wasteCategoryRates[category.slug as WastePriceCategorySlug];
  const categoryUrl = new URL(`/prices-waste/${category.slug}`, siteConfig.url).toString();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${categoryUrl}#service`,
        name: `${category.name} 수거·처리`,
        description: category.description,
        areaServed: { "@type": "Country", name: "대한민국" },
        provider: { "@id": `${siteConfig.url}/#business` },
        url: categoryUrl,
      },
      {
        "@type": "FAQPage",
        "@id": `${categoryUrl}#faq`,
        mainEntity: category.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <section className="waste-price-hero">
        <div className="container">
          <nav className="waste-price-tabs" aria-label="폐기물 비용 카테고리">
            <Link href="/prices-waste">전체</Link>
            {wastePriceCategories.map((item) => (
              <Link key={item.slug} aria-current={item.slug === category.slug ? "page" : undefined} href={`/prices-waste/${item.slug}`}>
                {item.shortName}
              </Link>
            ))}
          </nav>
          <span className="eyebrow">{category.name.toUpperCase()} PRICE GUIDE</span>
          <h1>{category.headline}</h1>
          <p>{category.description}</p>
          <div className="waste-price-hero__actions">
            <Link className="button button--primary" href={`/estimate?service=waste-disposal&category=${category.slug}`}>사진 견적 요청</Link>
            <Link className="button button--secondary" href="/services/waste-disposal">서비스 범위 보기</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container waste-rate-summary">
          <div>
            <span className="eyebrow">CURRENT RATE</span>
            <h2>{rate.amount === null ? "현장 조건 확인 후 견적" : `${rate.amount.toLocaleString("ko-KR")}원 / ${rate.unit}`}</h2>
            <p>{rate.note}</p>
          </div>
          <dl>
            <div><dt>견적 방식</dt><dd>{pricePolicy.publicationStatus === "consultation-only" ? "사진·상담 후 개별 견적" : "공개 단가 기준"}</dd></div>
            <div><dt>부가세</dt><dd>{getVatPolicyLabel(pricePolicy.vatStatus)}</dd></div>
          </dl>
        </div>
      </section>

      <section className="section section--subtle">
        <div className="container">
          <div className="section-heading"><div><span className="eyebrow">PRICE FACTORS</span><h2>비용을 결정하는 기준</h2></div></div>
          <div className="waste-factor-grid">
            {category.factors.map((factor, index) => (
              <article key={factor.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{factor.title}</h3><p>{factor.description}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container waste-price-details">
          <div>
            <span className="eyebrow">TYPICAL ITEMS</span>
            <h2>이런 품목을 상담합니다.</h2>
            <ul>{category.examples.map((example) => <li key={example}>{example}</li>)}</ul>
          </div>
          <div>
            <span className="eyebrow">PHOTO CHECKLIST</span>
            <h2>견적 전에 준비해 주세요.</h2>
            <ol>{category.checklist.map((item, index) => <li key={item}><span>{index + 1}</span>{item}</li>)}</ol>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container waste-price-process">
          <div><span className="eyebrow">PROCESS</span><h2>사진 상담부터 작업 확인까지</h2></div>
          <ol>
            <li><span>01</span><div><strong>사진과 조건 전달</strong><p>품목, 물량, 층수와 주차 조건을 알려주세요.</p></div></li>
            <li><span>02</span><div><strong>범위별 견적 안내</strong><p>차량, 인원, 반출과 추가 작업을 구분해 안내합니다.</p></div></li>
            <li><span>03</span><div><strong>일정 확정</strong><p>현장과 고객 일정에 맞춰 작업 시간을 조율합니다.</p></div></li>
            <li><span>04</span><div><strong>작업 후 확인</strong><p>요청 범위의 반출과 마무리 상태를 함께 확인합니다.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container waste-price-faq">
          <div><span className="eyebrow">FAQ</span><h2>{category.name} 자주 묻는 질문</h2></div>
          <div>{category.faq.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
        </div>
      </section>

      <section className="waste-price-cta"><div className="container"><div><span className="eyebrow">FREE ESTIMATE</span><h2>사진이 많을수록 견적이 정확해집니다.</h2><p>확인되지 않은 금액을 먼저 약속하지 않고, 작업 범위를 나누어 안내합니다.</p></div><Link className="button button--light" href={`/estimate?service=waste-disposal&category=${category.slug}`}>무료견적 시작</Link></div></section>
    </main>
  );
}
