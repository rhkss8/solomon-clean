import { getServiceBySlug } from "./site.ts";

export type PriceGuideInput = {
  serviceSlug: string;
  scale: "small" | "medium" | "large";
  condition: "light" | "normal" | "heavy";
  access: "easy" | "limited";
  hasExtraWork: boolean;
};

export type PriceGuideResult = {
  level: "basic" | "detailed" | "site-visit";
  title: string;
  description: string;
  reasons: string[];
};

const weight = {
  scale: { small: 0, medium: 1, large: 2 },
  condition: { light: 0, normal: 1, heavy: 3 },
  access: { easy: 0, limited: 2 },
} as const;

/** Evaluates how much evidence is needed before a reliable quote can be issued. */
export function calculatePriceGuide(input: PriceGuideInput): PriceGuideResult {
  const service = getServiceBySlug(input.serviceSlug);
  if (!service) throw new Error("지원하지 않는 서비스입니다.");

  const score = weight.scale[input.scale] + weight.condition[input.condition] + weight.access[input.access] + (input.hasExtraWork ? 2 : 0);
  const reasons = [
    service.priceBasis,
    ...(input.scale === "large" ? ["현장 규모가 커 작업 인원과 시간이 달라질 수 있습니다."] : []),
    ...(input.condition === "heavy" ? ["오염도가 높아 집중 작업 범위를 사진으로 확인해야 합니다."] : []),
    ...(input.access === "limited" ? ["주차·엘리베이터·상차 동선이 비용에 영향을 줄 수 있습니다."] : []),
    ...(input.hasExtraWork ? ["기본 범위 외 작업을 구분해 안내해야 합니다."] : []),
  ];

  if (score >= 6) return { level: "site-visit", title: "현장 확인을 권장합니다", description: "사진만으로 작업 범위가 달라질 가능성이 높아 방문 또는 상세 영상 상담 후 견적을 확정합니다.", reasons };
  if (score >= 3) return { level: "detailed", title: "상세 사진이 필요합니다", description: "전체 공간과 집중 오염, 작업 동선을 보여주는 사진을 보내주시면 견적 정확도가 높아집니다.", reasons };
  return { level: "basic", title: "기본 정보로 1차 상담이 가능합니다", description: "현장 규모와 대표 사진을 접수하면 기본 범위와 추가 확인사항을 안내합니다.", reasons };
}
