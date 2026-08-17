import Image from "next/image";

export function ReviewShowcaseIllustration() {
  return (
    <Image
      alt=""
      className="review-showcase__art"
      height={780}
      priority
      src="/reviews/real-review-header-v3.png"
      width={1320}
    />
  );
}
