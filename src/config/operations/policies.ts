export type PolicySection = { title: string; paragraphs: readonly string[] };
export type PolicyDocument = { title: string; effectiveDate: string; status: "draft" | "approved"; sections: readonly PolicySection[] };

const commonContact = "정책 관련 문의: 010-5207-1642 / school88@nate.com";

/** Values the representative must confirm before changing policy status to approved. */
export const policyOperationsConfig = {
  privacy: {
    // TODO: 예: "상담 종료 후 30일". 법정 보존기간과 실제 삭제 운영을 함께 확인하세요.
    retentionPeriod: "",
    // TODO: Vercel, 데이터베이스, 파일 저장소, 이메일 사업자 등 실제 처리위탁사를 입력하세요.
    processors: [] as readonly string[],
  },
  reservation: {
    // TODO: 예약금이 없으면 0, 있으면 원 단위 숫자를 입력하세요.
    depositAmount: null as number | null,
    // TODO: 예: { beforeHours: 48, refundPercent: 100 }
    cancellationRules: [] as readonly { beforeHours: number; refundPercent: number }[],
  },
} as const;

const retentionCopy = policyOperationsConfig.privacy.retentionPeriod || "실제 보유기간은 대표자 승인 전이며, 확정 전에는 운영 배포를 진행하지 않습니다.";
const processorCopy = policyOperationsConfig.privacy.processors.length > 0 ? policyOperationsConfig.privacy.processors.join(", ") : "실제 호스팅·데이터베이스·파일 저장소·이메일 전송 사업자 승인 전입니다.";
const reservationCopy = policyOperationsConfig.reservation.depositAmount === null || policyOperationsConfig.reservation.cancellationRules.length === 0 ? "예약금, 취소 시점별 비용, 일정 변경 가능 횟수는 실제 운영 기준 확정 전입니다." : `예약금은 ${policyOperationsConfig.reservation.depositAmount.toLocaleString("ko-KR")}원이며, 취소 기준은 계약서에 명시합니다.`;

/** Legal documents are centralized so approval and future revisions have one owner. */
export const legalDocuments = {
  privacy: {
    title: "개인정보처리방침", effectiveDate: "운영 승인 후 확정", status: "draft",
    sections: [
      { title: "1. 처리 목적", paragraphs: ["무료견적 접수, 현장 확인, 상담 연락, 작업 일정 협의와 분쟁 대응을 위해 개인정보를 처리합니다."] },
      { title: "2. 처리 항목", paragraphs: ["필수: 서비스 종류, 성명, 연락처, 서비스 지역, 현장 설명, 개인정보 수집 동의 여부", "선택: 희망일, 이용자가 첨부한 현장 사진"] },
      { title: "3. 보유 및 이용 기간", paragraphs: [`${retentionCopy} 관계 법령상 보존 의무가 있는 정보는 해당 기간 동안 별도 보관할 수 있습니다.`] },
      { title: "4. 제3자 제공과 처리위탁", paragraphs: [`현재 제3자 판매·광고 제공은 예정하지 않습니다. 처리위탁 현황: ${processorCopy}`] },
      { title: "5. 파기", paragraphs: ["보유기간이 끝나거나 처리 목적이 달성된 개인정보는 복구할 수 없는 방법으로 지체 없이 파기합니다. 법령에 따라 보존할 경우 다른 정보와 분리합니다."] },
      { title: "6. 정보주체의 권리", paragraphs: ["본인 개인정보의 열람, 정정·삭제, 처리정지와 동의 철회를 요청할 수 있습니다. 아래 연락처로 요청하면 본인 확인 후 처리합니다."] },
      { title: "7. 안전성 확보와 문의", paragraphs: ["접근 권한 제한, 비공개 사진 저장, 전송구간 보호 등 필요한 안전조치를 적용합니다.", commonContact] },
    ],
  },
  terms: {
    title: "이용약관", effectiveDate: "운영 승인 후 확정", status: "draft",
    sections: [
      { title: "1. 목적과 적용", paragraphs: ["이 약관은 솔로몬 종합청소업체 홈페이지의 견적 상담 및 청소·폐기물 관련 서비스 이용 조건을 정합니다."] },
      { title: "2. 견적 요청과 계약", paragraphs: ["홈페이지 견적 요청은 상담 접수이며 작업 예약이나 계약 확정이 아닙니다. 현장 조건, 작업 범위, 금액, 부가세, 일정, 결제 조건을 당사자 간 확인한 때 별도 계약이 성립합니다."] },
      { title: "3. 이용자 책임", paragraphs: ["이용자는 현장 접근 조건, 오염·폐기물 상태, 위험 요소를 사실에 맞게 알려야 하며 타인의 개인정보가 포함된 사진은 필요한 범위에서만 제공해야 합니다."] },
      { title: "4. 작업 범위 변경", paragraphs: ["접수 내용과 실제 현장 상태가 다른 경우 작업 전 변경 사유와 추가 비용을 설명하고 동의를 받은 뒤 진행합니다."] },
      { title: "5. 책임과 분쟁", paragraphs: ["고의 또는 과실에 따른 책임은 관계 법령과 개별 계약에 따릅니다. 소비자에게 법령상 인정되는 권리를 제한하지 않습니다.", commonContact] },
    ],
  },
  refund: {
    title: "예약·취소·환불 안내", effectiveDate: "운영 승인 후 확정", status: "draft",
    sections: [
      { title: "1. 견적 접수", paragraphs: ["무료견적 접수만으로 결제가 발생하거나 예약이 확정되지 않으므로 별도의 취소 수수료가 없습니다."] },
      { title: "2. 예약 확정 후 변경·취소", paragraphs: [`${reservationCopy} 계약 전 견적서 또는 별도 계약서에 기준을 명시하고 동의를 받습니다.`] },
      { title: "3. 작업 개시 후", paragraphs: ["작업이 시작된 뒤에는 이미 제공된 용역, 투입 인력·장비·처리 비용과 남은 작업 범위를 기준으로 정산할 수 있습니다. 관계 법령에서 인정하는 청약철회·해제 권리를 제한하지 않습니다."] },
      { title: "4. 환급", paragraphs: ["환급 사유가 확정되면 관계 법령과 결제수단의 처리 절차에 따라 진행하고, 구체적인 처리 내용은 고객에게 안내합니다.", commonContact] },
    ],
  },
} satisfies Record<string, PolicyDocument>;
