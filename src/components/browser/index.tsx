import clsx from "clsx";
import { type ReactNode } from "react";
import { FaEllipsisV } from "react-icons/fa";

import styles from "./styles.module.scss";

export type BrowserProps = {
  className?: string;
  title?: string;
  children: ReactNode;
  isDark?: boolean;
};

const Browser = (props: BrowserProps) => {
  const { className, title, children, isDark } = props;

  return (
    <div className={clsx(styles.container, { [styles.isDark]: isDark }, className)}>
      <div className={styles.header}>
        <div className={styles.dots}>
          <span />
          <span />
          <span />
        </div>
        <input type="text" value={title} readOnly />
        <FaEllipsisV className={styles.setting} />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
export default Browser;
