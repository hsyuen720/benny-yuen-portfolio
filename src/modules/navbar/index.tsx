"use client";

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

type Indicator = { x: number; y: number; width: number } | null;

const Navbar = () => {
  const { currentView } = useHome();
  const t = useTranslations(`${AppTranslation.Portfolio}.navigation`);
  const t2 = useTranslations(AppTranslation.Common);
  const refs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<Indicator>(null);

  const measure = useCallback(() => {
    const link = refs.current[currentView];
    setIndicator(
      link
        ? {
            x: link.offsetLeft,
            y: link.offsetTop + link.offsetHeight - 1,
            width: link.offsetWidth,
          }
        : null,
    );
  }, [currentView]);

  useLayoutEffect(measure, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return (
    <header className={styles.header}>
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
              aria-current={currentView === id ? "true" : undefined}
            >
              {t(id)}
            </a>
          ))}
          <span
            aria-hidden="true"
            className={styles.indicator}
            style={{
              opacity: indicator ? 1 : 0,
              width: indicator?.width ?? 0,
              transform: indicator ? `translate(${indicator.x}px, ${indicator.y}px)` : undefined,
            }}
          />
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
