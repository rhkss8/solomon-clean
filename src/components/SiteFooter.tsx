import Link from "next/link";
import { formatPhoneNumber, navigation, siteConfig } from "@/src/domain/site";
import { BrandLogo } from "./BrandLogo";

/** Shared business identity and policy navigation. */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <BrandLogo inverse />
          <p>{siteConfig.description}</p>
          <p className="footer-note">전국 상담</p>
          <a href={`tel:${siteConfig.phone}`}>전화 {formatPhoneNumber(siteConfig.phone)}</a>
          <a href={`mailto:${siteConfig.email}`}>이메일 {siteConfig.email}</a>
          <a href={siteConfig.kakaoUrl} rel="noreferrer" target="_blank">카카오톡 상담 · ID {siteConfig.kakaoId}</a>
        </div>
        <div>
          <strong>바로가기</strong>
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <strong>운영정책</strong>
          <Link href="/privacy">개인정보처리방침</Link>
          <Link href="/terms">이용약관</Link>
          <Link href="/refund-policy">예약·환불규정</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
