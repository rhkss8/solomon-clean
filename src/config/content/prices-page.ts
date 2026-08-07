/**
 * Draft marketing content for the price hub.
 * Replace every value in this file with Solomon's approved operating data
 * before production launch. Components own presentation only.
 */
export const pricesPageContent = {
  status: "draft",
  servicePrices: {
    "move-in-cleaning": "150,000원 ~",
    "residential-cleaning": "150,000원 ~",
    "commercial-cleaning": "200,000원 ~",
    "floor-care": "200,000원 ~",
    "waste-disposal": "250,000원 ~",
    "hoarding-cleanup": "700,000원 ~",
    "deep-cleaning": "1,000,000원 ~",
    "estate-clearing": "600,000원 ~",
    "home-organizing": "350,000원 ~",
  },
  assurances: [
    { symbol: "01", title: "배상책임보험", value: "가입 증빙 확인 예정", description: "작업 중 발생할 수 있는 사고의 보장 범위와 적용 조건을 안내합니다." },
    { symbol: "02", title: "작업 후 A/S", value: "운영 기준 확정 예정", description: "작업 완료 확인과 재방문 적용 범위를 계약 전 명확히 안내합니다." },
    { symbol: "03", title: "전문 작업팀", value: "증빙 자료 반영 예정", description: "서비스 특성과 현장 난이도에 맞는 작업 인력과 장비를 배정합니다." },
  ],
  performance: {
    eyebrow: "WORK EXPERIENCE",
    headline: "수많은 현장의 변화가\n실력을 보여줍니다.",
    description: "실제 누적 실적과 정량 수치는 운영 자료 확인 후 이 영역에 반영됩니다.",
  },
  cases: [
    { before: "/blog-images/223234046342.jpg", after: "/blog-images/223234110284.jpg", title: "쓰레기집 청소", area: "전국 상담", scale: "주거공간", duration: "현장별 안내", price: "상담 견적" },
    { before: "/blog-images/223235919143.jpg", after: "/blog-images/223235940657.jpg", title: "폐기물 정리", area: "전국 상담", scale: "물량별 차량", duration: "현장별 안내", price: "상담 견적" },
    { before: "/blog-images/223238169925.jpg", after: "/blog-images/223238397121.jpg", title: "입주·거주 청소", area: "전국 상담", scale: "면적별 상담", duration: "현장별 안내", price: "상담 견적" },
  ],
  reviews: [
    { rating: "★★★★★", title: "상담부터 친절하게 안내받았어요.", body: "사진을 보내고 필요한 작업 범위를 하나씩 확인할 수 있어 준비하기 편했습니다.", customer: "청소 서비스 상담" },
    { rating: "★★★★★", title: "작업 범위를 미리 알 수 있었어요.", body: "어디까지 진행되는지 설명을 듣고 일정을 조율할 수 있어 안심됐습니다.", customer: "폐기물처리 상담" },
    { rating: "★★★★★", title: "여러 작업을 한 번에 상담했어요.", body: "정리와 폐기물, 청소까지 필요한 순서대로 안내받을 수 있었습니다.", customer: "종합청소 상담" },
  ],
} as const;

export type PricesPageContent = typeof pricesPageContent;

