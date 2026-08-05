export type ServiceRegion = { slug: string; name: string; headline: string; description: string; coverage: readonly string[] };

export const serviceRegions: readonly ServiceRegion[] = [
  { slug: "seoul", name: "서울", headline: "서울 전 지역 청소·폐기물 상담", description: "주거 밀집지역부터 오피스·상가까지 건물 출입, 주차, 작업시간 조건을 함께 확인합니다.", coverage: ["강남·서초·송파", "마포·용산·성동", "영등포·구로·금천", "강북·노원·도봉"] },
  { slug: "gyeonggi", name: "경기", headline: "경기도 청소·폐기물 현장 상담", description: "신도시 입주 현장, 상업공간, 공장과 창고 등 다양한 규모에 맞춰 이동거리와 현장 조건을 확인합니다.", coverage: ["수원·용인·화성", "성남·하남·광주", "고양·파주·김포", "부천·안산·시흥"] },
  { slug: "incheon", name: "인천", headline: "인천 전 지역 종합청소 상담", description: "아파트·오피스텔 입주청소부터 상가, 공장, 폐기물 처리까지 반출과 차량 동선을 함께 안내합니다.", coverage: ["부평·계양", "남동·연수", "서구·검단", "중구·미추홀"] },
  { slug: "gangwon", name: "강원", headline: "강원권 출장 청소 상담", description: "현장 거리와 작업 규모를 먼저 확인해 출장 가능 일정과 필요한 인원·장비를 함께 협의합니다.", coverage: ["춘천·원주", "강릉·동해", "속초·양양", "홍천·횡성"] },
  { slug: "chungcheong", name: "충청", headline: "충청권 청소·폐기물 상담", description: "도심 주거·상업공간과 산업단지 현장을 구분해 작업 범위와 이동 일정을 계획합니다.", coverage: ["대전·세종", "청주·충주", "천안·아산", "공주·당진"] },
  { slug: "jeolla", name: "전라", headline: "전라권 출장 청소 상담", description: "광역시와 인근 지역의 현장 규모, 출장 일정, 폐기물 반출 조건을 확인해 상담합니다.", coverage: ["광주·나주", "전주·익산", "군산·정읍", "순천·여수"] },
  { slug: "gyeongsang", name: "경상", headline: "경상권 청소·폐기물 상담", description: "주거·상업공간과 공장·창고 현장에 맞춰 작업 인원, 차량, 장비 반입 조건을 확인합니다.", coverage: ["부산·울산", "대구·경산", "창원·김해", "포항·구미"] },
  { slug: "jeju", name: "제주", headline: "제주 지역 출장 가능 여부 상담", description: "출장 인력과 장비 운송이 필요한 지역으로 현장 규모와 일정을 충분히 확인한 뒤 가능 여부를 안내합니다.", coverage: ["제주시", "서귀포시", "동부권", "서부권"] },
] as const;

/** Resolves a supported nationwide service region without guessing unknown slugs. */
export function getServiceRegion(slug: string): ServiceRegion | undefined { return serviceRegions.find((region) => region.slug === slug); }
