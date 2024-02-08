import clsx from "clsx";

import Logo from "~/components/logo";
import { PortfolioSections } from "~/settings/constants";

import styles from "./styles.module.scss";

const menuItems = [
  PortfolioSections.About,
  PortfolioSections.Experience,
  PortfolioSections.Projects,
];

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <Logo className={styles.logo} />
      <nav role="navigation">{/* {menuItems.map((item) => ()} */}</nav>
    </header>
  );
};
export default Navbar;
