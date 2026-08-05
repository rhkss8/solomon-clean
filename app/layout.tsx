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
  description: siteConfig.description,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: siteConfig.name,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <div className="mobile-contact-bar" aria-label="빠른 상담">
          <a href={`tel:${siteConfig.phone}`}>전화상담</a>
          {siteConfig.kakaoUrl ? (
            <a href={siteConfig.kakaoUrl} rel="noreferrer" target="_blank">
              카카오 상담
            </a>
          ) : (
            <a href={`mailto:${siteConfig.email}`}>이메일 상담</a>
          )}
          <Link href="/estimate">무료견적</Link>
        </div>
      </body>
    </html>
  );
}
