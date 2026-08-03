import type { Metadata } from "next";
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
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <div className="mobile-contact-bar" aria-label="빠른 상담">
          <a href={siteConfig.phone ? `tel:${siteConfig.phone}` : "/estimate"}>전화상담</a>
          <a href={siteConfig.kakaoUrl || "/estimate"}>카카오 상담</a>
          <LinkShim />
        </div>
      </body>
    </html>
  );
}

function LinkShim() {
  return <a href="/estimate">무료견적</a>;
}
