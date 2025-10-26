import clsx from "clsx";
import type { ReactNode } from "react";

import * as styles from "./styles.css";

export type HashtagProps = {
  isDark?: boolean;
  title?: string;
  children?: ReactNode;
  className?: string;
};

const Hashtag = (props: HashtagProps) => {
  const { className, isDark, title, children } = props;
  return (
    <div className={clsx(styles.container, { [styles.isDark]: isDark }, className)}>
      {children ?? title}
    </div>
  );
};
export default Hashtag;
