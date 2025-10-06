import clsx from "clsx";

import styles from "./styles.module.scss";

export type SkeletonProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
  variant?: "text" | "rectangular" | "circular";
};

const Skeleton = (props: SkeletonProps) => {
  const { className, width, height, variant = "text" } = props;

  return (
    <div className={clsx(styles.skeleton, styles[variant], className)} style={{ width, height }} />
  );
};

export default Skeleton;
