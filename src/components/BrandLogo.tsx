import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/src/domain/site";

/**
 * Owns all visible logo rendering until final brand artwork is supplied.
 */
export function BrandLogo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link className={`brand-logo ${inverse ? "brand-logo--inverse" : ""}`} href="/">
      <Image className="brand-logo__image" src={siteConfig.brand.markSrc} alt="" width={48} height={48} priority />
      <span>
        <strong>{siteConfig.shortName}</strong>
        <small>{siteConfig.brand.englishName}</small>
      </span>
    </Link>
  );
}
