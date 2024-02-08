import clsx from "clsx";
import { Damion } from "next/font/google";

import styles from "./styles.module.scss";

const inter = Damion({
  weight: ["400"],
  subsets: ["latin"],
});

export type LogoProps = {
  className?: string;
  onClick?: () => void;
};

const Logo = (props: LogoProps) => {
  const { onClick, className } = props;
  return (
    <span className={clsx(inter.className, styles.logo, className)} onClick={onClick}>
      Benny.Yuen
    </span>
  );
};
export default Logo;
