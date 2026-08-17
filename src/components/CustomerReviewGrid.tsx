import type { CustomerReview } from "@/src/domain/customer-review";

function formatReviewDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long", day: "numeric" }).format(new Date(`${value}T00:00:00+09:00`));
}

const reviewFaces = ["😍", "😄", "😊", "😘"] as const;

export function CustomerReviewGrid({ reviews, compact = false, featured = false }: { reviews: CustomerReview[]; compact?: boolean; featured?: boolean }) {
  if (reviews.length === 0) return <p className="customer-review-empty">선택한 서비스의 리뷰가 아직 없습니다.</p>;

  return (
    <div className={featured ? "review-showcase__list" : compact ? "review-cards" : "customer-review-grid"}>
      {reviews.map((review, index) => (
        <article key={review.id}>
          {featured && <span aria-hidden="true" className="review-showcase__face">{reviewFaces[index % reviewFaces.length]}</span>}
          <div className={featured ? "review-showcase__card" : "customer-review-card__body"}>
          <div className="customer-review-card__top">
            <span aria-label={`별점 ${review.rating}점`}>{"★".repeat(review.rating)}</span>
            {review.source === "placeholder" && !featured && <em>예시 데이터</em>}
          </div>
          <strong className="customer-review-card__service">{review.serviceLabel}</strong>
          <h3>{review.title}</h3>
          <p>{review.body}</p>
          <footer><span>{review.displayName} · {review.region}</span><time dateTime={review.publishedAt}>{formatReviewDate(review.publishedAt)}</time></footer>
          </div>
        </article>
      ))}
    </div>
  );
}
