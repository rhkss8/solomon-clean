import { primaryServiceCategories } from "@/src/config/primary-service-categories";

/**
 * Public content for `/prices`.
 * Replace prices and proof-backed claims here after business approval.
 * Presentation components must not invent operational facts.
 */
export const pricesPageContent = {
  status: "draft",
  services: primaryServiceCategories,
  trustStandards: [
    { mark: "범위", title: "작업 범위 사전 확인", description: "기본 작업과 추가 작업을 구분해 작업 전에 확인합니다." },
    { mark: "현장", title: "현장 조건별 상담", description: "면적, 오염도, 폐기물량과 이동 동선을 함께 살핍니다." },
    { mark: "완료", title: "완료 후 결과 확인", description: "요청한 작업 범위가 완료됐는지 현장에서 함께 확인합니다." },
  ],
  estimateStandards: [
    { title: "사진과 현장 조건 확인", description: "공간 전체, 오염 구역, 폐기물량과 작업 동선을 확인합니다." },
    { title: "포함·추가 작업 구분", description: "견적에 포함된 범위와 현장에서 달라질 수 있는 조건을 나누어 안내합니다." },
    { title: "변경 전 설명과 동의", description: "추가 범위가 확인되면 작업 전에 이유와 금액을 설명합니다." },
  ],
  consultationSteps: [
    { title: "현장 사진 보내기", description: "전체 공간과 문제가 되는 구역을 여러 방향에서 촬영해 주세요." },
    { title: "지역과 작업 범위 확인", description: "주소 지역, 원하는 작업, 희망 일정을 함께 알려주세요." },
    { title: "견적과 일정 안내", description: "확인한 조건을 바탕으로 예상 범위와 가능한 일정을 안내합니다." },
  ],
  cases: [
    { before: "/blog-images/223234046342.jpg", after: "/blog-images/223234110284.jpg", title: "주거공간 대청소", description: "생활 오염과 적치물을 정리한 현장", facts: ["거주 공간", "폐기물·청소 연계", "현장 확인 견적"] },
    { before: "/blog-images/223235919143.jpg", after: "/blog-images/223235940657.jpg", title: "폐기물 수거", description: "물량과 반출 동선을 확인한 현장", facts: ["차량 용량 산정", "상차 동선 확인", "품목별 분류"] },
    { before: "/blog-images/223238169925.jpg", after: "/blog-images/223238397121.jpg", title: "입주·이사청소", description: "공간별 오염을 정리한 현장", facts: ["평수 기준", "주방·욕실 집중", "추가 구역 협의"] },
    { before: "/blog-images/223244274542.jpg", after: "/blog-images/223244703170.jpg", title: "상가·사무실청소", description: "업무 공간과 바닥을 정비한 현장", facts: ["영업시간 협의", "바닥 상태 확인", "면적별 상담"] },
    { before: "/blog-images/223245400289.jpg", after: "/blog-images/223245649517.jpg", title: "특수 오염 청소", description: "현장 상태에 맞춰 작업한 기록", facts: ["오염 범위 확인", "소독·탈취 상담", "보호 작업 계획"] },
    { before: "/blog-images/223249984147.jpg", after: "/blog-images/223250016677.jpg", title: "정리와 공간 회복", description: "분류와 청소를 함께 진행한 현장", facts: ["보관품 구분", "공간별 분류", "청소 연계"] },
  ],
} as const;

export type PricesPageContent = typeof pricesPageContent;
