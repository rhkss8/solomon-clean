"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const stories = [
  {
    id: "one-stop",
    number: "01",
    shortTitle: "통합 서비스",
    eyebrow: "ONE-STOP SERVICE",
    title: <>청소부터 폐기와 정리까지<br />한 번에 상담하세요.</>,
    description: "여러 업체를 따로 알아보지 않아도 됩니다. 현장에 필요한 청소, 폐기물 처리와 정리 범위를 함께 확인해 작업 순서를 안내합니다.",
    image: "/illustrations/one-stop-service.png",
    imageAlt: "청소, 폐기물 처리와 정리를 함께 진행하는 솔로몬 작업팀 일러스트",
    href: "/services",
    linkLabel: "서비스 한눈에 보기",
  },
  {
    id: "photo-estimate",
    number: "02",
    shortTitle: "사진 견적",
    eyebrow: "PHOTO ESTIMATE",
    title: <>사진으로 먼저 확인하고<br />필요한 범위를 정합니다.</>,
    description: "공간과 오염 상태, 폐기물량을 사진으로 보내주시면 상담에 필요한 조건을 먼저 정리합니다. 현장 상황에 맞는 작업만 차분하게 안내합니다.",
    image: "/illustrations/photo-estimate.png",
    imageAlt: "현장 사진을 보며 청소 범위를 상담하는 솔로몬 직원 일러스트",
    href: "/estimate",
    linkLabel: "사진으로 무료견적 요청",
  },
] as const;

export function ServiceStoryShowcase() {
  const [activeId, setActiveId] = useState<(typeof stories)[number]["id"]>(stories[0].id);
  const active = stories.find((story) => story.id === activeId) ?? stories[0];

  return (
    <section className="section story-showcase">
      <div className="container">
        <div className="story-showcase__heading">
          <div><span className="eyebrow">HOW SOLOMON WORKS</span><h2>복잡한 현장도<br />쉽게 시작할 수 있도록.</h2></div>
          <p>필요한 서비스를 한 번에 찾고, 사진으로 먼저 상담하는 솔로몬의 작업 방식을 확인하세요.</p>
        </div>
        <div className="story-stage">
          <div className="story-stage__tabs" role="tablist" aria-label="솔로몬 서비스 방식">
            {stories.map((story) => {
              const selected = story.id === active.id;
              return <button aria-controls={`story-panel-${story.id}`} aria-selected={selected} className={selected ? "is-active" : ""} id={`story-tab-${story.id}`} key={story.id} onClick={() => setActiveId(story.id)} role="tab" type="button"><span>{story.number}</span><strong>{story.shortTitle}</strong><i aria-hidden="true">→</i></button>;
            })}
          </div>
          <div aria-labelledby={`story-tab-${active.id}`} className="story-stage__panel" id={`story-panel-${active.id}`} key={active.id} role="tabpanel">
            <div className="story-stage__copy">
              <span className="eyebrow">{active.eyebrow}</span>
              <h3>{active.title}</h3>
              <p>{active.description}</p>
              <Link className="story-stage__link" href={active.href}>{active.linkLabel}<span aria-hidden="true">↗</span></Link>
            </div>
            <div className="story-stage__art"><Image alt={active.imageAlt} fill priority={active.id === "one-stop"} sizes="(max-width: 900px) 100vw, 58vw" src={active.image} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
