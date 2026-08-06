import Link from "next/link";
import { formatPhoneNumber, navigation, siteConfig } from "@/src/domain/site";
import { BrandLogo } from "./BrandLogo";
import { MobileMenuDrawer } from "./MobileMenuDrawer";

function PhoneIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="22" viewBox="0 0 24 24" width="22">
      <path d="M7.1 3.5 9.4 7a1.6 1.6 0 0 1-.2 2l-1.4 1.4a15.8 15.8 0 0 0 5.8 5.8l1.4-1.4a1.6 1.6 0 0 1 2-.2l3.5 2.3a1.6 1.6 0 0 1 .7 1.7l-.4 2a1.8 1.8 0 0 1-1.8 1.4C9.6 22 2 14.4 2 5a1.8 1.8 0 0 1 1.4-1.8l2-.4a1.6 1.6 0 0 1 1.7.7Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function KakaoSymbol() {
  return <span aria-hidden="true" className="kakao-symbol"><i /><i /><i /></span>;
}

/** Shared responsive navigation for all public pages. */
export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__top">
        <BrandLogo />
        <nav aria-label="상단 메뉴" className="header-utility">
          <Link href="/prices">비용문의</Link>
          <Link href="/portfolio">작업사례</Link>
          <a href={`tel:${siteConfig.phone}`}>전화 {formatPhoneNumber(siteConfig.phone)}</a>
          <a className="header-kakao-link" href={siteConfig.kakaoUrl} rel="noreferrer" target="_blank"><KakaoSymbol />카카오 상담</a>
        </nav>
        <div className="mobile-header-actions">
          <a className="mobile-phone-action" aria-label="전화 상담" href={`tel:${siteConfig.phone}`}><PhoneIcon /></a>
          <a className="mobile-kakao-action" aria-label="카카오 상담" href={siteConfig.kakaoUrl} rel="noreferrer" target="_blank"><KakaoSymbol /></a>
        </div>
        <MobileMenuDrawer />
      </div>
      <div className="site-header__nav-row">
        <nav aria-label="주요 메뉴" className="container desktop-nav">
          <Link className="header-estimate" href="/estimate">1분 무료견적 ⚡</Link>
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
