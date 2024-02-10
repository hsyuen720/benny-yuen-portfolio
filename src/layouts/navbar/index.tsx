"use client";

import clsx from "clsx";

import Label from "~/components/label";
import Logo from "~/components/logo";
import { PortfolioSection } from "~/settings/constants";

import styles from "./styles.module.scss";

import useHome from "~/contexts/home/useHome";

const menuItems = [PortfolioSection.About, PortfolioSection.Experience, PortfolioSection.Projects];

const Navbar = () => {
  const { scroll, currentView } = useHome();
  return (
    <header id="navbar" className={styles.navbar}>
      <Logo className={styles.logo} onClick={() => scroll(PortfolioSection.HeroBanner)} />
      <nav role="navigation" className={styles.menu}>
        {menuItems.map((item) => (
          <Label
            className={clsx(styles.menuItem, { [styles.active]: currentView === item })}
            title={item}
            key={item}
            onClick={() => scroll(item)}
          />
        ))}
      </nav>
    </header>
  );
};
export default Navbar;
