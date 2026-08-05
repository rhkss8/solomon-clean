import Link from "next/link";
import { BlogPostGrid } from "@/src/components/BlogPostGrid";
import { ServiceQuickMenu } from "@/src/components/ServiceQuickMenu";
import { ServiceStoryShowcase } from "@/src/components/ServiceStoryShowcase";
import { StructuredData } from "@/src/components/StructuredData";
import { services, siteConfig } from "@/src/domain/site";
import { buildLocalBusinessSchema } from "@/src/domain/structured-data";
import { createPageMetadata } from "@/src/lib/metadata";
import { getBlogPosts } from "@/src/server/blog-feed";

export const metadata = createPageMetadata({
  title: "전국 종합청소·폐기물 처리 무료견적",
  description: siteConfig.description,
  path: "/",
});

export default async function HomePage() {
  const { posts } = await getBlogPosts(3);
  return (
    <main>
      <StructuredData
        data={buildLocalBusinessSchema()}
      />
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__content">
            <span className="eyebrow">전국 종합청소 서비스</span>
            <h1>
              복잡한 청소와 폐기물,
              <br />
              <em>한 번에 해결하세요.</em>
            </h1>
            <p>
              입주·이사·상업공간부터 특수청소와 폐기물 처리까지.
              현장에 필요한 서비스를 확인하고 빠르게 상담받으세요.
            </p>
            <div className="button-row">
              <Link className="button button--primary button--large" href="/estimate">
                무료견적 요청
              </Link>
              <Link className="button button--secondary button--large" href="/prices">
                비용 기준 보기
              </Link>
            </div>
            <ul className="trust-line" aria-label="서비스 특징">
              <li>전국 상담</li>
              <li>사진 견적</li>
              <li>서비스별 전문 작업</li>
            </ul>
          </div>
          <div className="hero__visual" aria-label="솔로몬 작업사례 이미지 자리">
            <div className="visual-card visual-card--main">
              <span>SOLOMON CLEAN</span>
              <strong>현장에 맞춘<br />정확한 청소 계획</strong>
              <small>블로그 실제 작업사진 연동 예정</small>
            </div>
            <div className="visual-stat">
              <strong>{services.length}개</strong>
              <span>전문 서비스</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">SERVICE</span>
              <h2>어떤 도움이 필요하세요?</h2>
            </div>
            <Link className="text-link" href="/services">전체 서비스 보기 →</Link>
          </div>
          <ServiceQuickMenu />
        </div>
      </section>

      <ServiceStoryShowcase />

      <section className="section section--dark">
        <div className="container">
          <div className="section-heading section-heading--light">
            <div>
              <span className="eyebrow">WHY SOLOMON</span>
              <h2>가격만 안내하고 끝내지 않습니다.</h2>
            </div>
          </div>
          <div className="reason-grid">
            {[
              ["01", "현장 조건을 먼저 확인", "사진과 기본 정보를 바탕으로 필요한 범위를 먼저 정리합니다."],
              ["02", "서비스별 기준 안내", "평수, 물량, 오염도처럼 비용을 바꾸는 조건을 투명하게 설명합니다."],
              ["03", "청소와 폐기 연계", "여러 업체를 따로 찾지 않도록 필요한 작업을 함께 상담합니다."],
              ["04", "완료까지 확인", "작업 전 협의한 범위를 기준으로 마감 상태를 확인합니다."],
            ].map(([number, title, description]) => (
              <article className="reason-card" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split-section">
          <div>
            <span className="eyebrow">PRICE GUIDE</span>
            <h2>비용을 바꾸는 조건부터<br />쉽게 알려드립니다.</h2>
            <p>
              청소 비용은 서비스 이름만으로 정해지지 않습니다. 공간, 물량,
              오염도와 접근 조건을 함께 확인해야 정확합니다.
            </p>
            <Link className="button button--primary" href="/prices">비용 기준 확인</Link>
          </div>
          <div className="factor-list">
            {["공간 면적과 구조", "오염도와 작업 범위", "폐기물 종류와 물량", "엘리베이터·주차·상차 조건"].map(
              (factor, index) => (
                <div key={factor}><span>0{index + 1}</span><strong>{factor}</strong></div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="section section--subtle">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">WORK STORIES</span>
              <h2>사진으로 확인하는 실제 작업사례</h2>
            </div>
            <Link className="text-link" href="/portfolio">작업사례 전체보기 →</Link>
          </div>
          <BlogPostGrid posts={posts} />
        </div>
      </section>

      <section className="section final-cta">
        <div className="container final-cta__inner">
          <div><span className="eyebrow">FREE ESTIMATE</span><h2>사진과 기본 정보만 보내주세요.</h2><p>필요한 작업과 비용 기준을 확인해 안내해드립니다.</p></div>
          <Link className="button button--white button--large" href="/estimate">무료견적 시작</Link>
        </div>
      </section>
    </main>
  );
}
