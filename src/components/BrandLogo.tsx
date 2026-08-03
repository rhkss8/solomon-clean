import Link from "next/link";
import { siteConfig } from "@/src/domain/site";

/**
 * Owns all visible logo rendering until final brand artwork is supplied.
 */
export function BrandLogo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link className={`brand-logo ${inverse ? "brand-logo--inverse" : ""}`} href="/">
      <span className="brand-logo__mark" aria-hidden="true">
        S
      </span>
      <span>
        <strong>{siteConfig.shortName}</strong>
        <small>종합청소업체</small>
      </span>
    </Link>
  );
}
