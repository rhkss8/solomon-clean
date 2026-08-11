import type { CustomerReview } from "../domain/customer-review.ts";

/** Layout-only sample content. Replace through the review server boundary before publishing real claims. */
export const customerReviewFallback: readonly CustomerReview[] = [
  { id: "sample-001", serviceSlug: "move-in-cleaning", serviceLabel: "입주·이사·준공청소", title: "사진으로 범위를 먼저 확인해서 준비하기 편했어요.", body: "이사 일정과 공간 사진을 보낸 뒤 필요한 작업과 추가로 확인할 부분을 구분해서 안내받는 흐름을 가정한 예시 리뷰입니다.", rating: 5, region: "서울", displayName: "김○○", publishedAt: "2026-07-28", source: "placeholder" },
  { id: "sample-002", serviceSlug: "waste-disposal", serviceLabel: "폐기물처리", title: "차량과 반출 조건 설명이 명확했어요.", body: "폐기물의 양과 층수, 주차 위치에 따라 견적이 달라지는 이유를 이해하기 쉽게 안내받았다는 상황을 표현한 예시 리뷰입니다.", rating: 5, region: "경기", displayName: "박○○", publishedAt: "2026-07-23", source: "placeholder" },
  { id: "sample-003", serviceSlug: "hoarding-cleanup", serviceLabel: "쓰레기집청소", title: "부담스러운 상황도 차분하게 상담할 수 있었어요.", body: "현장 상황을 존중하면서 보관할 물건과 정리할 물건을 먼저 확인하는 상담 경험을 보여주기 위한 예시 리뷰입니다.", rating: 5, region: "인천", displayName: "이○○", publishedAt: "2026-07-18", source: "placeholder" },
  { id: "sample-004", serviceSlug: "deep-cleaning", serviceLabel: "특수청소", title: "일반청소와 다른 작업 범위를 알 수 있었어요.", body: "오염 범위와 소독·탈취 작업을 구분하고 현장 확인이 필요한 이유를 안내받는 흐름을 담은 예시 리뷰입니다.", rating: 5, region: "대전", displayName: "최○○", publishedAt: "2026-07-11", source: "placeholder" },
  { id: "sample-005", serviceSlug: "estate-clearing", serviceLabel: "유품정리", title: "남겨둘 물건부터 하나씩 확인해주셨어요.", body: "보관품을 먼저 구분하고 폐기와 청소 범위를 차분히 협의하는 서비스 경험을 설명하기 위한 예시 리뷰입니다.", rating: 5, region: "충남", displayName: "정○○", publishedAt: "2026-07-03", source: "placeholder" },
  { id: "sample-006", serviceSlug: "home-organizing", serviceLabel: "정리수납", title: "생활 동선에 맞춘 정리 방법이 이해됐어요.", body: "물건의 사용 빈도와 공간별 역할을 기준으로 정리 방향을 상담하는 모습을 보여주기 위한 예시 리뷰입니다.", rating: 5, region: "서울", displayName: "윤○○", publishedAt: "2026-06-26", source: "placeholder" },
  { id: "sample-007", serviceSlug: "waste-disposal", serviceLabel: "폐기물처리", title: "수거와 마무리 범위를 미리 확인했어요.", body: "큰 가구와 생활폐기물 사진을 전달하고 처리·운반·인력 범위를 나누어 안내받는 상황의 예시 리뷰입니다.", rating: 5, region: "부산", displayName: "한○○", publishedAt: "2026-06-18", source: "placeholder" },
  { id: "sample-008", serviceSlug: "move-in-cleaning", serviceLabel: "입주·이사·준공청소", title: "주방과 욕실 집중 구역을 따로 정했어요.", body: "전체 청소와 집중 작업 구역을 구분해 견적을 확인하는 고객 경험을 표현하기 위한 예시 리뷰입니다.", rating: 5, region: "경기", displayName: "오○○", publishedAt: "2026-06-09", source: "placeholder" },
  { id: "sample-009", serviceSlug: "hoarding-cleanup", serviceLabel: "쓰레기집청소", title: "청소와 폐기물을 한 번에 상담할 수 있었어요.", body: "여러 업체에 반복해서 설명하지 않고 수거부터 청소까지 순서를 조율하는 상황을 담은 예시 리뷰입니다.", rating: 5, region: "광주", displayName: "서○○", publishedAt: "2026-05-30", source: "placeholder" },
] as const;
