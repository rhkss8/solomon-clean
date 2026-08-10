import type { ServiceSlug } from "@/src/domain/site";

export type EstimateQuestion = {
  id: string;
  prompt: string;
  type: "single" | "multiple" | "text";
  options?: readonly string[];
  placeholder?: string;
};

const commonProperty = ["아파트", "빌라·주택", "오피스텔", "상가·사무실", "기타"] as const;

/**
 * Service-owned questions. `satisfies Record<ServiceSlug, ...>` intentionally
 * fails the build when a service is added or renamed without a matching flow.
 */
export const questionsByService = {
  "move-in-cleaning": [
    { id: "cleaningKind", prompt: "어떤 청소가 필요하신가요?", type: "single", options: ["입주청소", "이사청소", "준공청소"] },
    { id: "property", prompt: "청소할 공간을 선택해주세요.", type: "single", options: commonProperty },
    { id: "size", prompt: "공간 크기를 알려주세요.", type: "single", options: ["10평 이하", "11~20평", "21~30평", "31~40평", "41평 이상", "잘 모르겠어요"] },
    { id: "extra", prompt: "추가로 확인할 부분이 있나요?", type: "multiple", options: ["곰팡이", "스티커·보양지", "공사 분진", "심한 기름때", "새집증후군", "특이사항 없음"] },
  ],
  "residential-cleaning": [
    { id: "property", prompt: "청소할 공간을 선택해주세요.", type: "single", options: commonProperty },
    { id: "size", prompt: "공간 크기는 어느 정도인가요?", type: "single", options: ["10평 이하", "11~20평", "21~30평", "31~40평", "41평 이상"] },
    { id: "focus", prompt: "집중 청소가 필요한 곳을 선택해주세요.", type: "multiple", options: ["주방", "욕실", "창틀", "베란다", "곰팡이", "전체 대청소"] },
  ],
  "commercial-cleaning": [
    { id: "businessType", prompt: "어떤 공간인가요?", type: "single", options: ["사무실", "상가·매장", "병원·학원", "공장·창고", "기타"] },
    { id: "size", prompt: "전체 면적을 알려주세요.", type: "single", options: ["30평 이하", "31~60평", "61~100평", "101평 이상", "잘 모르겠어요"] },
    { id: "schedule", prompt: "희망 작업 시간대가 있나요?", type: "multiple", options: ["영업 전", "영업 후", "야간", "주말", "시간 협의 가능"] },
  ],
  "floor-care": [
    { id: "floorType", prompt: "바닥 재질을 선택해주세요.", type: "single", options: ["데코타일", "대리석", "에폭시", "장판", "잘 모르겠어요"] },
    { id: "size", prompt: "작업 면적은 어느 정도인가요?", type: "single", options: ["30평 이하", "31~60평", "61~100평", "101평 이상"] },
    { id: "floorWork", prompt: "필요한 작업을 선택해주세요.", type: "multiple", options: ["기계 세척", "왁스 코팅", "기존 왁스 박리", "오염 제거", "상담 후 결정"] },
  ],
  "waste-disposal": [
    { id: "wasteType", prompt: "어떤 폐기물인가요?", type: "multiple", options: ["가구·가전", "생활 폐기물", "이사 폐기물", "사업장 폐기물", "철거 잔재물", "혼합 폐기물"] },
    { id: "volume", prompt: "폐기물 양은 어느 정도인가요?", type: "single", options: ["승용차 1대 분량 이하", "1톤 트럭 절반", "1톤 트럭 1대", "2.5톤 이상", "사진으로 확인해주세요"] },
    { id: "access", prompt: "반출 환경을 알려주세요.", type: "multiple", options: ["엘리베이터 있음", "계단 작업", "차량 진입 가능", "주차 거리가 멀어요", "해체가 필요해요"] },
  ],
  "hoarding-cleanup": [
    { id: "care", prompt: "원하시는 서비스를 선택해주세요.", type: "multiple", options: ["스페셜 케어 (3개월 이상 방치)", "동물 오염 청소", "벌레 제거 및 탈취·소독·방역", "가구·가전 버릴 게 있어요", "혈흔 제거·강력 탈취"] },
    { id: "space", prompt: "작업할 공간을 알려주세요.", type: "single", options: ["원룸", "투룸", "아파트·빌라", "주택", "상가·사무실"] },
    { id: "level", prompt: "현재 상태와 가장 가까운 것을 골라주세요.", type: "single", options: ["바닥에 일부 쌓임", "허리 높이까지 쌓임", "이동이 어려울 정도", "악취·해충이 심함", "사진으로 확인해주세요"] },
  ],
  "deep-cleaning": [
    { id: "contamination", prompt: "필요한 특수청소를 선택해주세요.", type: "multiple", options: ["고독사·유품 현장", "혈흔·체액 제거", "심한 악취", "해충·곰팡이", "장기 방치", "기타 오염"] },
    { id: "space", prompt: "작업 공간은 어디인가요?", type: "single", options: commonProperty },
    { id: "period", prompt: "오염이 발생하거나 방치된 기간을 알려주세요.", type: "single", options: ["1주 이내", "1개월 이내", "3개월 이내", "3개월 이상", "잘 모르겠어요"] },
  ],
  "estate-clearing": [
    { id: "space", prompt: "정리할 공간을 선택해주세요.", type: "single", options: commonProperty },
    { id: "estateWork", prompt: "필요한 작업을 선택해주세요.", type: "multiple", options: ["유품 분류", "보관품 포장", "가구·폐기물 반출", "청소", "소독·탈취"] },
    { id: "volume", prompt: "물품 양은 어느 정도인가요?", type: "single", options: ["방 1개 이하", "방 2~3개", "집 전체", "사진으로 확인해주세요"] },
  ],
  "home-organizing": [
    { id: "organizingSpace", prompt: "정리가 필요한 공간을 선택해주세요.", type: "multiple", options: ["옷방", "주방", "거실", "아이방", "창고·베란다", "집 전체"] },
    { id: "size", prompt: "공간 크기는 어느 정도인가요?", type: "single", options: ["10평 이하", "11~20평", "21~30평", "31평 이상"] },
    { id: "goal", prompt: "어떤 도움이 가장 필요한가요?", type: "multiple", options: ["물건 분류", "수납 위치 설계", "불필요품 정리", "수납용품 추천", "청소 연계"] },
  ],
} as const satisfies Record<ServiceSlug, readonly EstimateQuestion[]>;

/** Questions shared by every category and appended after its service flow. */
export const commonEstimateQuestions = [
  { id: "area", prompt: "서비스 받을 지역을 알려주세요.", type: "text", placeholder: "예: 서울 마포구" },
  { id: "preferredDate", prompt: "희망하는 날짜가 있나요?", type: "text", placeholder: "예: 8월 20일 또는 일정 협의" },
  { id: "description", prompt: "추가로 전달할 내용이 있다면 알려주세요.", type: "text", placeholder: "현장 상태나 요청사항을 자유롭게 적어주세요." },
] as const satisfies readonly EstimateQuestion[];

export function getEstimateQuestions(service: ServiceSlug): readonly EstimateQuestion[] {
  return [...questionsByService[service], ...commonEstimateQuestions];
}
