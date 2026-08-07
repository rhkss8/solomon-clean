export const wastePriceCategories = [
  {
    slug: "industrial",
    name: "산업폐기물",
    shortName: "산업",
    headline: "사업장 폐기물은 종류와 반출 조건부터 확인합니다.",
    description:
      "공장, 창고, 상가, 사무실에서 발생한 폐기물을 품목과 물량에 맞춰 상담합니다.",
    examples: ["집기·비품", "철거 잔재", "창고 적치물", "사업장 혼합 폐기물"],
    factors: [
      { title: "폐기물 종류", description: "목재·금속·혼합물 등 품목과 분리 상태를 확인합니다." },
      { title: "예상 물량", description: "사진과 규격을 바탕으로 필요한 차량과 횟수를 산정합니다." },
      { title: "현장 동선", description: "주차 위치, 층수, 승강기와 장비 사용 가능 여부를 확인합니다." },
      { title: "추가 작업", description: "철거, 분류, 포장이나 청소가 필요한지 함께 확인합니다." },
    ],
    checklist: ["전체 공간과 적치 상태 사진", "큰 품목의 가로·세로 규격", "사업장 층수와 승강기 유무", "차량 진입 및 주차 가능 여부"],
    faq: [
      { question: "사업장 폐기물도 사진으로 견적을 받을 수 있나요?", answer: "전체 물량과 주요 품목, 반출 동선이 보이는 사진을 보내주시면 1차 상담이 가능합니다. 현장 차이가 크면 방문 확인을 안내합니다." },
      { question: "철거와 폐기물 처리를 함께 요청할 수 있나요?", answer: "가능 여부를 현장별로 확인합니다. 철거 범위와 폐기물 종류를 분리해 견적서에 표시합니다." },
    ],
  },
  {
    slug: "home",
    name: "가정폐기물",
    shortName: "가정",
    headline: "집 안의 큰 물건부터 잔짐까지 한 번에 상담하세요.",
    description:
      "아파트, 빌라, 주택에서 나온 가구·가전·생활용품을 반출 조건에 맞춰 처리합니다.",
    examples: ["가구·가전", "대형 생활용품", "집 안 잔짐", "장기 적치 물품"],
    factors: [
      { title: "품목과 크기", description: "가구·가전의 수량과 큰 품목의 규격을 확인합니다." },
      { title: "분리 상태", description: "재사용 가능품과 폐기 대상이 구분되어 있는지 확인합니다." },
      { title: "반출 난이도", description: "층수, 승강기, 계단 폭과 현관 통과 가능 여부를 확인합니다." },
      { title: "작업 인원", description: "해체나 운반에 필요한 인원과 예상 시간을 산정합니다." },
    ],
    checklist: ["방마다 전체 물량 사진", "대형 가구·가전 사진", "층수와 승강기 사용 가능 여부", "주차 위치에서 현관까지 거리"],
    faq: [
      { question: "가구 한두 개만 있어도 요청할 수 있나요?", answer: "소량 수거 가능 여부와 방문 조건을 지역·일정별로 확인해 안내합니다." },
      { question: "집 안에서 직접 꺼내주시나요?", answer: "반출 작업도 상담할 수 있습니다. 해체 필요 여부와 이동 동선에 따라 인원 및 비용이 달라질 수 있습니다." },
    ],
  },
  {
    slug: "living",
    name: "생활폐기물",
    shortName: "생활",
    headline: "쌓인 생활폐기물은 물량과 분류 범위를 함께 봅니다.",
    description:
      "일상에서 발생한 혼합 폐기물과 정리 과정의 배출물을 수거·분류·청소 범위에 맞춰 상담합니다.",
    examples: ["혼합 생활쓰레기", "포장재·잡화", "정리 후 배출물", "소형 집기"],
    factors: [
      { title: "혼합 정도", description: "재활용품, 일반 폐기물과 별도 처리가 필요한 품목을 확인합니다." },
      { title: "부피와 무게", description: "봉투 수량만이 아니라 전체 부피와 무거운 품목을 함께 봅니다." },
      { title: "분류 작업", description: "수거 전 고객 분류 여부와 현장 분류 필요 범위를 확인합니다." },
      { title: "청소 연계", description: "수거 후 바닥 청소, 소독 또는 탈취가 필요한지 확인합니다." },
    ],
    checklist: ["공간 네 모서리에서 찍은 전체 사진", "봉투·박스 및 큰 품목 수량", "분류 완료 여부", "수거 후 청소 필요 여부"],
    faq: [
      { question: "분류하지 않은 상태로도 상담할 수 있나요?", answer: "가능합니다. 다만 현장 분류 범위와 투입 시간이 늘어날 수 있어 현재 상태를 사진으로 정확히 알려주세요." },
      { question: "수거 후 청소도 같이 진행하나요?", answer: "거주청소나 특수청소가 필요한 경우 별도 작업 범위로 함께 상담할 수 있습니다." },
    ],
  },
  {
    slug: "moving",
    name: "이사폐기물",
    shortName: "이사",
    headline: "이사 전후 남은 물건을 일정에 맞춰 정리합니다.",
    description:
      "이사하면서 버릴 가구, 가전과 잔짐을 날짜·물량·퇴거 조건에 맞춰 상담합니다.",
    examples: ["이사 전 버릴 물건", "퇴거 후 잔짐", "가구·가전", "포장 폐기물"],
    factors: [
      { title: "작업 날짜", description: "이사일, 퇴거 점검과 입주 일정 사이 가능한 시간을 확인합니다." },
      { title: "사전 분류", description: "이삿짐과 폐기 대상이 명확히 구분되어 있는지 확인합니다." },
      { title: "차량 조건", description: "예상 물량과 현장 진입 조건에 맞는 차량을 산정합니다." },
      { title: "청소 패키지", description: "폐기물 반출 후 이사청소가 필요한지 함께 확인합니다." },
    ],
    checklist: ["남길 물건과 버릴 물건 구분", "전체 폐기 대상 사진", "이사·퇴거 날짜와 가능 시간", "엘리베이터 예약 및 주차 조건"],
    faq: [
      { question: "이사 당일에도 작업할 수 있나요?", answer: "가능 일정은 상담 시 확인합니다. 이삿짐과 작업 동선이 겹치지 않도록 사전 시간을 확정하는 것이 좋습니다." },
      { question: "폐기물 처리와 이사청소를 같이 신청할 수 있나요?", answer: "함께 상담할 수 있습니다. 반출 완료 시점과 청소 시작 시간을 기준으로 각각의 작업 범위를 안내합니다." },
    ],
  },
] as const;

export type WastePriceCategorySlug = (typeof wastePriceCategories)[number]["slug"];

export function getWastePriceCategory(slug: string) {
  return wastePriceCategories.find((category) => category.slug === slug);
}

