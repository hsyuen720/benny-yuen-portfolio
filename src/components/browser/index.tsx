import clsx from "clsx";
import { type ReactNode } from "react";
import { FaEllipsisV } from "react-icons/fa";

import styles from "./styles.module.scss";

export type BrowserProps = {
  className?: string;
  contentClassName?: string;
  title?: string;
  children: ReactNode;
};

const Browser = (props: BrowserProps) => {
  const { className, contentClassName, title, children } = props;

  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.header}>
        <div className={styles.dots}>
          <span />
          <span />
          <span />
        </div>
        <input type="text" value={title} readOnly />
        <FaEllipsisV className={styles.setting} />
      </div>
      <div className={clsx(styles.content, contentClassName)}>{children}</div>
    </div>
  );
};
export default Browser;
