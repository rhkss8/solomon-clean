import Image from "next/image";
import Link from "next/link";
import { BlogPostGrid } from "@/src/components/BlogPostGrid";
import { ServiceQuickMenu } from "@/src/components/ServiceQuickMenu";
import { StructuredData } from "@/src/components/StructuredData";
import { formatPhoneNumber, services, siteConfig } from "@/src/domain/site";
import { buildLocalBusinessSchema } from "@/src/domain/structured-data";
import { createPageMetadata } from "@/src/lib/metadata";
import { getBlogPosts } from "@/src/server/blog-feed";

export const metadata = createPageMetadata({
  title: "전국 청소·폐기물·정리 무료견적",
  description: siteConfig.description,
  path: "/",
});

const assurances = [
  ["사진부터 확인", "현장 사진과 기본 조건을 먼저 확인해 필요한 범위를 안내합니다."],
  ["범위를 먼저 합의", "작업 전 포함·제외 범위와 비용에 영향을 주는 조건을 설명합니다."],
  ["청소와 폐기 연계", "여러 업체를 따로 찾지 않도록 필요한 서비스를 함께 상담합니다."],
];

const concerns = [
  ["견적이 현장에서 달라질까 불안해요", "사진과 현장 조건을 먼저 확인하고 비용 변동 요인을 작업 전에 설명합니다."],
  ["후기만 믿고 맡겨도 괜찮을까요?", "실제 작업 기록과 작업 범위를 함께 확인할 수 있도록 상담 과정에서 안내합니다."],
  ["문제가 생기면 누가 대응하나요?", "상담부터 작업 확인까지 한 곳에서 소통해 책임 주체가 흐려지지 않게 합니다."],
];

const workPairs = [
  ["/blog-images/223234046342.jpg", "/blog-images/223234110284.jpg", "쓰레기집 청소"],
  ["/blog-images/223235919143.jpg", "/blog-images/223235940657.jpg", "폐기물 정리"],
  ["/blog-images/223238169925.jpg", "/blog-images/223238397121.jpg", "입주·거주 청소"],
];

const testimonials = [
  ["집 전체가 다시 생활할 수 있는 공간이 됐어요.", "오래 미뤄둔 정리라 걱정했는데 필요한 물건을 먼저 구분하고 작업해주셔서 안심했습니다.", "쓰레기집 청소 · 서울"],
  ["사진 상담부터 설명이 명확했어요.", "어떤 조건에서 비용이 달라지는지 미리 알려주셔서 현장에서도 당황하지 않았습니다.", "폐기물 처리 · 경기"],
  ["청소와 정리를 한 번에 해결했어요.", "여러 업체에 같은 이야기를 반복하지 않아도 돼서 일정과 소통이 훨씬 편했습니다.", "이사청소 · 인천"],
];

export default async function HomePage() {
  const { posts } = await getBlogPosts(6);
  return (
    <main className="home-v2">
      <StructuredData data={buildLocalBusinessSchema()} />

      <section className="quick-hero">
        <div className="container">
          <h1>간편한 신청. <span>빠른 무료견적.</span></h1>
          <p>내가 찾던 청소·폐기·정리 서비스,<br className="mobile-only" /> 청소하는사람들에 다 있어요.</p>
          <ServiceQuickMenu />
          <div className="quick-hero__actions">
            <Link href="/estimate">24시 무료견적 받기 🎧</Link>
            <Link href="/prices">🤔 평균비용 확인하기</Link>
          </div>
          <div className="quick-hero__help">
            <div><span><Image alt="비용을 확인하는 고객" fill sizes="64px" src="/home/avatars/cost-customer-v2.jpg" /></span><p><strong>얼마인지 궁금하다면?</strong><Link href="/prices">예상 비용을 확인해보세요</Link></p></div>
            <div><span><Image alt="전담 상담 매니저" fill sizes="64px" src="/home/avatars/support-manager-v2.jpg" /></span><p><strong>상담 지원이 필요하다면?</strong><a href={siteConfig.kakaoUrl} rel="noreferrer" target="_blank">1:1 전담 매니저에게 문의하세요</a></p></div>
          </div>
        </div>
      </section>

      <section className="home-story section">
        <div className="container">
          <h2>쉽고 편하게 해결했어요</h2>
          <article className="home-story__row">
            <div><span>ONE STOP SERVICE</span><h3>필요한 서비스를<br />한곳에서 찾으세요.</h3><p>입주청소부터 특수청소, 폐기물 처리와 정리수납까지 한 번에 상담할 수 있습니다.</p></div>
            <Image src="/home/one-stop-team-v1.jpg" alt="청소와 폐기물 정리를 함께 제공하는 작업팀" width={1536} height={1024} />
          </article>
          <article className="home-story__row home-story__row--reverse">
            <div><span>PHOTO ESTIMATE</span><h3>사진 몇 장이면<br />상담을 시작할 수 있어요.</h3><p>여러 곳에 같은 설명을 반복할 필요 없이 현장 사진으로 필요한 범위를 먼저 확인합니다.</p></div>
            <Image src="/home/photo-consultation-v1.jpg" alt="현장 사진으로 견적을 상담하는 고객과 전문가" width={1693} height={929} />
          </article>
        </div>
      </section>

      <section className="home-trust section">
        <div className="container">
          <div className="home-trust__heading"><p>복잡한 현장도</p><h2>청소하는사람들이<br />함께하면 달라집니다.</h2></div>
          <div className="home-trust__stats">
            <div><strong>{services.length}개</strong><span>전문 서비스</span></div>
            <div><strong>전국</strong><span>상담 가능 지역</span></div>
            <div><strong>사진</strong><span>간편 견적 접수</span></div>
          </div>
        </div>
      </section>

      <section className="concern-section section">
        <div className="container">
          <div className="concern-section__heading"><span>WHY DIFFERENT</span><p>고객님과의 약속을 먼저 생각합니다</p><h2>이런 불안,<br />청소 맡길 때 흔합니다.</h2></div>
          <div className="concern-list">
            {concerns.map(([title, copy], index) => <article key={title}><b>0{index + 1}</b><div><h3>{title}</h3><p>{copy}</p></div><span>→</span></article>)}
          </div>
        </div>
      </section>

      <section className="quality-section section">
        <div className="container">
          <div className="quality-section__heading"><span>OUR STANDARD</span><h2>가격만 비교하기 전에<br />이 기준부터 확인하세요.</h2></div>
          <div className="quality-compare">
            <div className="quality-compare__head"><strong>확인하지 않으면 불안한 것</strong><strong>청소하는사람들의 상담 기준</strong></div>
            {[
              ["현장에서 금액이 달라지지 않을까요?", "사진과 현장 조건으로 변동 요소를 먼저 확인합니다."],
              ["어디까지 작업해주는지 알 수 있나요?", "포함 범위와 제외 범위를 작업 전에 안내합니다."],
              ["청소와 폐기를 따로 알아봐야 하나요?", "필요하면 폐기·청소·정리를 한 번에 연결합니다."],
              ["완료 상태는 어떻게 확인하나요?", "협의한 작업 범위를 기준으로 마감 상태를 확인합니다."],
            ].map(([question, answer]) => <div className="quality-compare__row" key={question}><p>! {question}</p><p>✓ {answer}</p></div>)}
          </div>
        </div>
      </section>

      <section className="support-banner">
        <div className="container"><div><span>365 CONSULTATION</span><h2>필요할 때 바로 물어보세요.</h2><p>사진과 지역, 원하는 작업만 알려주시면 상담을 시작할 수 있습니다.</p></div><div><a href={siteConfig.kakaoUrl} rel="noreferrer" target="_blank">카카오 상담</a><a href={`tel:${siteConfig.phone}`}>전화 {formatPhoneNumber(siteConfig.phone)}</a></div></div>
      </section>

      <section className="assurance-section section">
        <div className="container"><div className="assurance-section__heading"><span>WHY US</span><h2>견적 안내로 끝나지 않는<br />현장 중심 서비스</h2></div><div className="assurance-grid">{assurances.map(([title, copy], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div>
      </section>

      <section className="proof-section section">
        <div className="container">
          <div className="proof-section__intro"><span>RESULT</span><h2>말보다 작업 결과로<br />확인해보세요.</h2><p>현장의 상태와 작업 범위는 모두 다릅니다. 실제 작업 기록을 통해 청소하는사람들의 현장 대응 방식을 확인하세요.</p><Link href="/portfolio">작업사례 전체 보기 →</Link></div>
          <div className="before-after-grid">
            {workPairs.map(([before, after, title]) => <article key={title}><div className="before-after-grid__images"><figure><Image src={before} alt={`${title} 작업 전`} fill sizes="(max-width: 600px) 43vw, 260px" /><span>BEFORE</span></figure><figure><Image src={after} alt={`${title} 작업 후`} fill sizes="(max-width: 600px) 43vw, 260px" /><span>AFTER</span></figure></div><h3>{title}</h3></article>)}
          </div>
        </div>
      </section>

      <section className="review-section section">
        <div className="container">
          <div className="review-summary"><div><strong>고객의 말로<br />확인하는 서비스</strong><p>상담부터 작업 완료까지 실제로 경험한 고객의 이야기를 모았습니다.</p></div><div><b>3가지</b><span>핵심 만족 기준</span></div><div><b>전국</b><span>상담 가능</span></div></div>
          <div className="review-cards">{testimonials.map(([title, copy, meta]) => <article key={title}><div>★★★★★</div><h3>{title}</h3><p>{copy}</p><small>{meta}</small></article>)}</div>
        </div>
      </section>

      <section className="process-section section">
        <div className="container"><div className="process-section__heading"><span>HOW IT WORKS</span><h2>무료 신청부터<br />작업 확인까지</h2></div><ol>{[["01","사진과 정보 접수"],["02","작업 범위 상담"],["03","일정·견적 안내"],["04","현장 작업과 확인"]].map(([num,title])=><li key={num}><b>{num}</b><strong>{title}</strong></li>)}</ol><Link className="process-section__cta" href="/estimate">1분 무료견적 신청하기</Link></div>
      </section>

      <section className="work-section section">
        <div className="container"><div className="section-heading"><div><span className="eyebrow">REAL WORK</span><h2>사진으로 확인하는 작업 기록</h2></div><Link className="text-link" href="/portfolio">전체 작업사례 보기 →</Link></div><BlogPostGrid posts={posts} /></div>
      </section>

      <section className="brand-message section">
        <div className="container"><div className="brand-message__mark"><Image src="/brand/cleaning-people-mark.png" alt="" width={160} height={160} /></div><div><span>OUR MESSAGE</span><h2>깨끗한 공간이<br />새로운 시작이 되도록.</h2><p>청소하는사람들은 단순히 보이는 곳만 정리하는 서비스를 넘어, 고객이 다시 편안하게 생활을 시작할 수 있도록 돕고자 합니다.</p><p>현장마다 다른 사정과 고민을 존중하고, 필요한 범위를 솔직하게 안내하며, 끝까지 소통하는 팀이 되겠습니다.</p><strong>청소하는사람들 드림</strong></div></div>
      </section>

      <section className="home-final-cta">
        <div className="container"><p>복잡하게 고민하지 마세요.</p><h2>사진 한 장부터<br />무료로 상담해드립니다.</h2><Link href="/estimate">무료견적 신청하기</Link></div>
      </section>
    </main>
  );
}
