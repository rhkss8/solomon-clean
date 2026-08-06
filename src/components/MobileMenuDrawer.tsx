"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { navigation, siteConfig } from "@/src/domain/site";

const subscribe = () => () => undefined;

export function MobileMenuDrawer() {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const drawer = (
    <div className={`mobile-menu__layer ${open ? "is-open" : ""}`}>
      <button className="mobile-menu__dim" type="button" aria-label="메뉴 닫기" onClick={() => setOpen(false)} />
      <aside className="mobile-menu__drawer" aria-hidden={!open} aria-label="모바일 메뉴" role="dialog" aria-modal={open}>
        <div className="mobile-menu__head">
          <strong>전체 메뉴</strong>
          <button type="button" aria-label="메뉴 닫기" onClick={() => setOpen(false)}>×</button>
        </div>
        <nav>
          {navigation.map((item) => <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}<span>→</span></Link>)}
        </nav>
        <div className="mobile-menu__actions">
          <Link href="/estimate" onClick={() => setOpen(false)}>무료견적 신청</Link>
          <a href={siteConfig.kakaoUrl} rel="noreferrer" target="_blank" onClick={() => setOpen(false)}>카카오 상담</a>
        </div>
      </aside>
    </div>
  );

  return (
    <div className="mobile-menu">
      <button className="mobile-menu__trigger" type="button" aria-expanded={open} aria-label="메뉴 열기" onClick={() => setOpen(true)}>
        <span /><span /><span />
      </button>
      {mounted ? createPortal(drawer, document.body) : null}
    </div>
  );
}
