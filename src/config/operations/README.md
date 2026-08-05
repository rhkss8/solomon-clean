# 운영 설정

대표자 확인이 필요한 운영값만 이 디렉터리에서 관리합니다.

- `contact.ts`: 전화, 이메일, 카카오톡 상담 링크
- `pricing.ts`: 서비스 단가와 VAT 포함·별도 정책
- `business.ts`: 사업자등록, 허가·신고, 보험, 실적 증빙
- `policies.ts`: 개인정보 보유기간, 처리위탁사, 예약금, 취소 기준

값을 채운 뒤 `pnpm typecheck`, `pnpm test`, `pnpm build`를 실행하세요.
증빙이 없는 광고 문구는 `verified`로 변경하지 않습니다.
