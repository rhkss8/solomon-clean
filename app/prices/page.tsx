import Image from "next/image";
import Link from "next/link";
import { BlogPostGrid } from "@/src/components/BlogPostGrid";
import { PriceServiceCatalog } from "@/src/components/PriceServiceCatalog";
import { ServiceQuickMenu } from "@/src/components/ServiceQuickMenu";
import { pricesPageContent } from "@/src/config/content/prices-page";
import { formatPhoneNumber, siteConfig } from "@/src/domain/site";
import { createPageMetadata } from "@/src/lib/metadata";
import { getBlogPosts } from "@/src/server/blog-feed";

export const metadata = createPageMetadata({
  title: "청소·폐기물 예상비용",
  description: "청소, 폐기물처리, 쓰레기집청소, 유품정리 서비스별 예상비용과 무료견적 안내를 확인하세요.",
  path: "/prices",
});

function ConsultationActions({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "price-actions price-actions--compact" : "price-actions"}>
      <Link className="price-action price-action--primary" href="/estimate">사진으로 무료견적</Link>
      <a className="price-action price-action--kakao" href={siteConfig.kakaoUrl} rel="noreferrer" target="_blank">카카오톡 상담</a>
      <a className="price-action price-action--outline" href={`tel:${siteConfig.phone}`}>전화 {formatPhoneNumber(siteConfig.phone)}</a>
    </div>
  );
}

export default async function PricesPage() {
  const { posts, source } = await getBlogPosts(6);

  return (
    <main className="prices-copy">
      <section className="prices-copy__catalog-section">
        <div className="container prices-copy__intro">
          <h1>예상비용. 무료 견적. 전국 상담.</h1>
          <p>서비스별 시작 비용을 확인하고, 현장 사진으로 정확한 범위를 상담받아보세요.</p>
        </div>
        <div className="container"><PriceServiceCatalog /></div>
      </section>

      <section className="prices-copy__promise">
        <div className="container">
          <div className="prices-copy__center-heading">
            <h2>가격 안내만 하지 않고,<br />작업이 끝날 때까지 확인합니다.</h2>
            <p>현장마다 다른 조건을 먼저 확인하고, 합의한 작업 범위에 맞춰 진행합니다.</p>
          </div>
          <div className="price-trust-grid">
            {pricesPageContent.trustStandards.map((item) => (
              <article key={item.title}>
                <span aria-hidden="true">{item.mark}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="prices-copy__results">
        <div className="container">
          <div className="prices-copy__split-heading">
            <h2>현장의 변화가<br />작업의 기준을 보여줍니다.</h2>
            <p>솔로몬 공식 블로그에 기록된 실제 현장 사진을 바탕으로 구성했습니다.</p>
          </div>
          <div className="price-result-grid">
            {pricesPageContent.cases.map((item) => (
              <article key={item.title}>
                <div className="price-result-grid__photos">
                  <figure><Image alt={`${item.title} 작업 전`} fill sizes="(max-width: 700px) 50vw, 320px" src={item.before} /><span>작업 전</span></figure>
                  <figure><Image alt={`${item.title} 작업 후`} fill sizes="(max-width: 700px) 50vw, 320px" src={item.after} /><span>작업 후</span></figure>
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul className="price-result-grid__facts">{item.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
          <div className="prices-copy__center-action"><Link href="/portfolio">작업사례 전체 보기</Link></div>
        </div>
      </section>

      <section className="prices-copy__responsibility">
        <div className="container prices-copy__responsibility-layout">
          <div>
            <h2>처음 안내한 범위와<br />현장 작업을 맞춥니다.</h2>
            <p>사진과 실제 현장이 다른 경우에는 작업을 시작하기 전에 변경 사유와 범위를 먼저 설명합니다.</p>
            <ConsultationActions compact />
          </div>
          <div className="price-standard-list">
            {pricesPageContent.estimateStandards.map((item) => (
              <article key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="prices-copy__process">
        <div className="container">
          <div className="prices-copy__center-heading"><h2>사진 몇 장이면 상담을 시작할 수 있어요.</h2><p>서비스 이름을 정확히 몰라도 괜찮습니다.</p></div>
          <ol className="price-process-list">
            {pricesPageContent.consultationSteps.map((item, index) => (
              <li key={item.title}><span>{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="prices-copy__contact">
        <div className="container">
          <div><h2>전국 어디서나 상담 가능합니다.</h2><p>카카오톡으로 현장 사진과 지역을 보내주세요. 순서대로 확인해 안내합니다.</p></div>
          <ConsultationActions compact />
        </div>
      </section>

      <section className="prices-copy__records">
        <div className="container">
          <div className="prices-copy__split-heading">
            <h2>실제 작업 기록을<br />직접 확인하세요.</h2>
            <p>과장된 임시 후기 대신 솔로몬 공식 블로그의 현장 기록을 연결했습니다.</p>
          </div>
          {source === "fallback" && <p className="feed-notice">최신 블로그 연결이 지연되어 저장된 대표 작업을 표시합니다.</p>}
          <BlogPostGrid posts={posts} />
        </div>
      </section>

      <section className="prices-copy__services">
        <div className="container">
          <div className="prices-copy__center-heading"><h2>어떤 서비스가 필요하세요?</h2><p>필요한 작업을 선택하거나, 바로 사진 상담을 시작하세요.</p></div>
          <ServiceQuickMenu destination="estimate" />
          <ConsultationActions />
        </div>
      </section>
    </main>
  );
}
