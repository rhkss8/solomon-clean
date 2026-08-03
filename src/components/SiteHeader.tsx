import Link from "next/link";
import { navigation } from "@/src/domain/site";
import { BrandLogo } from "./BrandLogo";

/** Shared responsive navigation for all public pages. */
export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <BrandLogo />
        <nav aria-label="주요 메뉴" className="desktop-nav">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="button button--primary header-cta" href="/estimate">
          무료견적
        </Link>
        <details className="mobile-menu">
          <summary aria-label="메뉴 열기">메뉴</summary>
          <nav aria-label="모바일 메뉴">
            {navigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/estimate">무료견적</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
