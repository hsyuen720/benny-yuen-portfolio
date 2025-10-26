import clsx from "clsx";
import { type ReactNode } from "react";
import { FaEllipsisV } from "react-icons/fa";

import * as styles from "./styles.css";

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
          <span className={clsx(styles.dot, styles.dotRed)} />
          <span className={clsx(styles.dot, styles.dotYellow)} />
          <span className={clsx(styles.dot, styles.dotGreen)} />
        </div>
        <input className={styles.input} type="text" value={title} readOnly />
        <FaEllipsisV className={styles.setting} />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
export default Browser;
