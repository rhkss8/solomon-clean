import { getVatPolicyLabel, pricePolicy } from "@/src/domain/price-policy";

/** Presents the current public price and VAT contract without inventing rates. */
export function PricePolicyNotice() {
  return (
    <aside className="price-policy" aria-labelledby="price-policy-title">
      <span className="eyebrow">PRICE POLICY</span>
      <h2 id="price-policy-title">현재는 상담 견적제로 운영합니다.</h2>
      <p>
        현장 조건에 따라 작업 범위와 투입 인원이 달라져, 확인되지 않은 정액 단가는
        공개하지 않습니다.
      </p>
      <dl>
        <div>
          <dt>견적 기준</dt>
          <dd>{pricePolicy.quoteFactors.join(" · ")}</dd>
        </div>
        <div>
          <dt>부가세</dt>
          <dd>{getVatPolicyLabel(pricePolicy.vatStatus)}</dd>
        </div>
      </dl>
    </aside>
  );
}
