import { contactConfig } from "../config/operations/contact.ts";

/**
 * Central brand and business configuration.
 *
 * Public pages, metadata, structured data, and contact actions consume this
 * object so a future logo or contact change has one predictable edit point.
 */
export const siteConfig = {
  name: "솔로몬 종합청소업체",
  shortName: "솔로몬",
  description:
    "입주·이사·상업공간·특수청소와 폐기물 처리까지 전국에서 상담할 수 있는 종합청소 서비스입니다.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3002",
  phone: process.env.NEXT_PUBLIC_PHONE ?? contactConfig.phone,
  kakaoUrl: process.env.NEXT_PUBLIC_KAKAO_URL ?? contactConfig.kakaoConsultationUrl,
  kakaoId: process.env.NEXT_PUBLIC_KAKAO_ID ?? contactConfig.kakaoId,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? contactConfig.email,
  blogUrl: "https://blog.naver.com/solomon_clean",
  rssUrl: "https://rss.blog.naver.com/solomon_clean.xml",
  serviceArea: "전국",
  brand: {
    logoMode: "wordmark" as const,
    logoLightSrc: "/brand/logo-light.svg",
    logoDarkSrc: "/brand/logo-dark.svg",
  },
} as const;

/** Formats a Korean mobile number for human-readable contact surfaces. */
export function formatPhoneNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");
  const match = digits.match(/^(01\d)(\d{3,4})(\d{4})$/);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : phone;
}

export type ServiceCategory =
  | "residential"
  | "commercial"
  | "waste"
  | "special"
  | "organizing";

export type CleaningService = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: ServiceCategory;
  symbol: string;
  highlights: readonly string[];
  priceBasis: string;
};

/**
 * Services are modeled as content data instead of hard-coded page branches.
 * Dynamic routes, navigation, sitemap entries, and estimate options share it.
 */
export const services: readonly CleaningService[] = [
  {
    slug: "move-in-cleaning",
    name: "입주·이사청소",
    shortDescription: "새로 시작하는 공간을 구석구석 깨끗하게",
    description:
      "아파트, 빌라, 오피스텔의 공사 먼지와 생활 오염을 공간별 작업 기준에 따라 정리합니다.",
    category: "residential",
    symbol: "01",
    highlights: ["공간별 체크리스트", "주방·욕실 집중 작업", "마감 확인"],
    priceBasis: "평수·오염도·추가 작업에 따라 상담",
  },
  {
    slug: "residential-cleaning",
    name: "거주·대청소",
    shortDescription: "생활 중 쌓인 묵은 오염을 한 번에",
    description:
      "현재 거주 중인 공간의 동선과 보관 물품을 고려해 필요한 구역을 선택적으로 청소합니다.",
    category: "residential",
    symbol: "02",
    highlights: ["거주환경 보호", "구역 선택 가능", "곰팡이·기름때 상담"],
    priceBasis: "평수·방/욕실 수·오염도에 따라 상담",
  },
  {
    slug: "commercial-cleaning",
    name: "상가·사무실청소",
    shortDescription: "영업과 업무에 맞춘 상업공간 청소",
    description:
      "상가, 사무실, 병원, 학원, 공장 등 공간 특성과 운영시간에 맞춰 작업합니다.",
    category: "commercial",
    symbol: "03",
    highlights: ["야간 일정 상담", "바닥·유리·집기", "정기관리 상담"],
    priceBasis: "면적·업종·작업시간에 따라 상담",
  },
  {
    slug: "floor-care",
    name: "바닥청소·왁스",
    shortDescription: "바닥 재질에 맞춘 세척과 코팅",
    description:
      "오염과 기존 코팅 상태를 확인하고 세척, 박리, 왁스 코팅 범위를 결정합니다.",
    category: "commercial",
    symbol: "04",
    highlights: ["재질별 작업", "세척·박리 상담", "왁스 코팅"],
    priceBasis: "면적·바닥 재질·코팅 상태에 따라 상담",
  },
  {
    slug: "waste-disposal",
    name: "폐기물처리",
    shortDescription: "가정·이사·사업장 폐기물을 신속하게",
    description:
      "폐기물 종류, 물량, 상차 조건을 확인해 적합한 차량과 작업 인원을 안내합니다.",
    category: "waste",
    symbol: "05",
    highlights: ["사진 견적", "물량별 차량 안내", "현장 조건 사전 확인"],
    priceBasis: "물량·성상·차량·상차 조건에 따라 상담",
  },
  {
    slug: "hoarding-cleanup",
    name: "쓰레기집청소",
    shortDescription: "비밀을 지키며 일상 회복까지",
    description:
      "대량 폐기물 수거부터 오염 청소, 소독과 탈취까지 현장 상태에 맞춰 계획합니다.",
    category: "special",
    symbol: "06",
    highlights: ["비밀상담", "폐기물·청소 연계", "소독·탈취 상담"],
    priceBasis: "폐기물량·오염도·청소 범위에 따라 상담",
  },
  {
    slug: "deep-cleaning",
    name: "특수청소",
    shortDescription: "일반 청소로 해결하기 어려운 현장",
    description:
      "심한 오염, 악취, 장기 방치 등 현장별 위험 요소를 확인하고 작업 범위를 정합니다.",
    category: "special",
    symbol: "07",
    highlights: ["현장별 안전계획", "특수 소독·탈취", "철거 연계 상담"],
    priceBasis: "오염 범위·위험도·폐기물·철거 여부에 따라 상담",
  },
  {
    slug: "estate-clearing",
    name: "유품정리",
    shortDescription: "남겨진 물건을 존중하며 정리",
    description:
      "보관할 물건과 정리할 물건을 구분하고, 폐기와 청소까지 차분하게 진행합니다.",
    category: "organizing",
    symbol: "08",
    highlights: ["보관품 구분", "폐기물 처리 연계", "정리 후 청소"],
    priceBasis: "공간·물량·분류 범위에 따라 상담",
  },
  {
    slug: "home-organizing",
    name: "정리수납",
    shortDescription: "생활 방식에 맞는 유지 가능한 정리",
    description:
      "물건의 사용 빈도와 가족 동선을 기준으로 공간을 분류하고 수납 체계를 만듭니다.",
    category: "organizing",
    symbol: "09",
    highlights: ["공간 진단", "분류·배치", "유지 방법 안내"],
    priceBasis: "공간 수·물량·작업 인원에 따라 상담",
  },
] as const;

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export const navigation = [
  { href: "/services", label: "서비스" },
  { href: "/prices", label: "비용안내" },
  { href: "/portfolio", label: "작업사례" },
  { href: "/reviews", label: "블로그 후기" },
  { href: "/regions", label: "서비스 지역" },
  { href: "/company", label: "회사소개" },
] as const;
