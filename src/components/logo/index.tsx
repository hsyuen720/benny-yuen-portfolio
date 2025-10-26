import clsx from "clsx";
import { Damion } from "next/font/google";

import * as styles from "./styles.css";

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
      B.Yuen
    </span>
  );
};
export default Logo;
