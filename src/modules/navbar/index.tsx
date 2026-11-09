"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import Logo from "~/components/logo";
import useHome from "~/contexts/home/useHome";
import { PortfolioSection } from "~/settings/constants";
import { AppTranslation } from "~/settings/i18n";

import * as styles from "./styles.css";

const links = [
  PortfolioSection.Projects,
  PortfolioSection.Tools,
  PortfolioSection.Experience,
  PortfolioSection.Contact,
];

type Position = { x: number; y: number; width: number };

// Wait for the current section to settle so a fast scroll glides once instead of hopping per link
const SETTLE_MS = 120;

// Sections without a nav link keep the indicator where it was (Education sits under Experience);
// the hero hides it.
const linkFor = (view: string, previous: string | null) =>
  links.includes(view) ? view : view === PortfolioSection.HeroBanner ? null : previous;

const Navbar = () => {
  const { currentView } = useHome();
  const t = useTranslations(`${AppTranslation.Portfolio}.navigation`);
  const t2 = useTranslations(AppTranslation.Common);
  const refs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const headerRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);
  // Last measured position, kept while hidden so the line fades in place instead of sliding from 0
  const [position, setPosition] = useState<Position | null>(null);
  const [canSlide, setCanSlide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setActive((prev) => linkFor(currentView, prev)), SETTLE_MS);
    return () => clearTimeout(timer);
  }, [currentView]);

  const measure = useCallback(() => {
    const link = active ? refs.current[active] : null;
    if (link) {
      // Keep the active link visible when the row scrolls sideways on narrow phones
      const row = link.parentElement;
      if (row && row.scrollWidth > row.clientWidth + 1) {
        row.scrollTo({ left: link.offsetLeft - (row.clientWidth - link.offsetWidth) / 2 });
      }
      setPosition({
        x: link.offsetLeft,
        y: link.offsetTop + link.offsetHeight - 1,
        width: link.offsetWidth,
      });
    }
  }, [active]);

  useLayoutEffect(measure, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Publish the header's real height (it wraps on phones) so anchored sections stop right under it
  useEffect(() => {
    const header = headerRef.current;
    if (!header || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => {
      document.documentElement.style.setProperty("--nav-height", `${header.offsetHeight}px`);
    });
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  // While hidden the line must not slide: when it comes back it fades in at its new link.
  // The slide is re-enabled one frame after that placement.
  useEffect(() => {
    if (!active) setCanSlide(false);
  }, [active]);

  useEffect(() => {
    if (!position || !active || canSlide) return;
    const frame = requestAnimationFrame(() => setCanSlide(true));
    return () => cancelAnimationFrame(frame);
  }, [position, active, canSlide]);

  return (
    <header ref={headerRef} className={styles.header}>
      <nav className={styles.nav} aria-label={t("label")}>
        <a
          className={styles.wordmark}
          href={`#${PortfolioSection.HeroBanner}`}
          aria-label={t2("author")}
        >
          <Logo />
        </a>
        <div className={styles.links}>
          {links.map((id) => (
            <a
              key={id}
              ref={(node) => {
                refs.current[id] = node;
              }}
              className={styles.link}
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
            >
              {t(id)}
            </a>
          ))}
          <span
            aria-hidden="true"
            className={clsx(styles.indicator, { [styles.slide]: canSlide })}
            style={{
              opacity: active && position ? 1 : 0,
              transform: position
                ? `translate(${position.x}px, ${position.y}px) scaleX(${position.width})`
                : undefined,
            }}
          />
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
