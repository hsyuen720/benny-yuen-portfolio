"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";

import Label from "~/components/label";
import Logo from "~/components/logo";
import useHome from "~/contexts/home/useHome";
import { AppTranslation, PortfolioSection } from "~/settings/constants";

import styles from "./styles.module.scss";

const menuItems = [PortfolioSection.About, PortfolioSection.Experience, PortfolioSection.Projects];

const Navbar = () => {
  const { scroll, currentView } = useHome();
  const t = useTranslations(AppTranslation.Portfolio);
  return (
    <header id="navbar" className={styles.navbar}>
      <Logo className={styles.logo} onClick={() => scroll(PortfolioSection.HeroBanner)} />
      <nav role="navigation" className={styles.menu}>
        {menuItems.map((item) => (
          <Label
            className={clsx(styles.menuItem, { [styles.active]: currentView === item })}
            title={t(`navigation.${item}`)}
            key={item}
            onClick={() => scroll(item)}
          />
        ))}
      </nav>
    </header>
  );
};
export default Navbar;
