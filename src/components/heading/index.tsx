import clsx from "clsx";

import * as styles from "./styles.css";

export type HeadingProps = {
  title: string;
  description?: string;
  className?: string;
};

const Heading = (props: HeadingProps) => {
  const { title, description, className } = props;
  return (
    <div className={clsx(styles.container, className)}>
      <h2 className={styles.title}>{title}</h2>
      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  );
};
export default Heading;
