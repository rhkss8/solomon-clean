import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/src/components/SiteFooter";
import { SiteHeader } from "@/src/components/SiteHeader";
import { siteConfig } from "@/src/domain/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | 전국 청소·폐기물 무료견적`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.shareDescription,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "청소 서비스",
  keywords: ["입주청소", "이사청소", "상가청소", "특수청소", "폐기물처리", "청소견적", "청소하는사람들"],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: siteConfig.name,
    title: siteConfig.shareTitle,
    description: siteConfig.shareDescription,
    url: siteConfig.url,
    images: [{ url: siteConfig.shareImage, width: 1200, height: 630, alt: `${siteConfig.name} 전문 청소팀` }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.shareTitle,
    description: siteConfig.shareDescription,
    images: [siteConfig.shareImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <div className="mobile-contact-bar" aria-label="빠른 상담">
          <Link href="/">홈으로</Link>
          <Link href="/estimate">무료견적 신청</Link>
          {siteConfig.kakaoUrl ? (
            <a href={siteConfig.kakaoUrl} rel="noreferrer" target="_blank">24시 카톡상담</a>
          ) : (
            <a href={`mailto:${siteConfig.email}`}>이메일 상담</a>
          )}
          <Link href="/portfolio">작업사례</Link>
        </div>
      </body>
    </html>
  );
}
