"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

import Label from "~/components/label";
import Logo from "~/components/logo";
import useHome from "~/contexts/home/useHome";
import Toggle from "~/modules/navbar/toggle";
import { PortfolioSection } from "~/settings/constants";
import { AppTranslation } from "~/settings/i18n";

import * as styles from "./styles.css";

const menuItems = [PortfolioSection.About, PortfolioSection.Experience, PortfolioSection.Projects];

const Navbar = () => {
  const { scroll, currentView } = useHome();
  const [isScrollStarted, setIsScrollStarted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations(`${AppTranslation.Portfolio}.navigation`);

  useEffect(() => {
    let isMounted = true;
    const onScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrollStarted(scrollPosition > 100);
    };
    if (isMounted) {
      onScroll();
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      isMounted = false;
    };
  }, []);

  const onClick = useCallback(
    (item: string) => () => {
      setIsOpen(false);
      scroll(item);
    },
    [scroll],
  );

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <header
      id="navbar"
      className={clsx(styles.navbar, { [styles.isBlurBackground]: isScrollStarted || isOpen })}
    >
      <Logo className={styles.logo} onClick={onClick(PortfolioSection.HeroBanner)} />
      <Toggle className={styles.toggle} isOpen={isOpen} onClick={toggle} />
      <nav role="navigation" className={clsx(styles.menu, { [styles.isOpen]: isOpen })}>
        {menuItems.map((item) => (
          <Label
            className={clsx(styles.menuItem, { [styles.active]: currentView === item })}
            title={t(item)}
            key={item}
            onClick={onClick(item)}
          />
        ))}
      </nav>
    </header>
  );
};
export default Navbar;
