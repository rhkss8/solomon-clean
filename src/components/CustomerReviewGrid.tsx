import type { CustomerReview } from "@/src/domain/customer-review";

function formatReviewDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long", day: "numeric" }).format(new Date(`${value}T00:00:00+09:00`));
}

export function CustomerReviewGrid({ reviews, compact = false }: { reviews: CustomerReview[]; compact?: boolean }) {
  if (reviews.length === 0) return <p className="customer-review-empty">선택한 서비스의 리뷰가 아직 없습니다.</p>;

  return (
    <div className={compact ? "review-cards" : "customer-review-grid"}>
      {reviews.map((review) => (
        <article key={review.id}>
          <div className="customer-review-card__top">
            <span aria-label={`별점 ${review.rating}점`}>{"★".repeat(review.rating)}</span>
            {review.source === "placeholder" && <em>예시 데이터</em>}
          </div>
          <strong className="customer-review-card__service">{review.serviceLabel}</strong>
          <h3>{review.title}</h3>
          <p>{review.body}</p>
          <footer><span>{review.displayName} · {review.region}</span><time dateTime={review.publishedAt}>{formatReviewDate(review.publishedAt)}</time></footer>
        </article>
      ))}
    </div>
  );
}
