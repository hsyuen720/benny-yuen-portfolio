import clsx from "clsx";
import React, { createElement, type HTMLAttributes, type ComponentPropsWithoutRef } from "react";
import type { IconType } from "react-icons";

import styles from "./styles.module.scss";

export type LabelProps<T extends keyof React.JSX.IntrinsicElements> = {
  tag?: T;
  icon?: IconType;
  title?: string;
} & (ComponentPropsWithoutRef<T> & HTMLAttributes<HTMLOrSVGElement>);

const Label = <T extends keyof React.JSX.IntrinsicElements = "span">(props: LabelProps<T>) => {
  const { tag, icon, title, className, children, ...rest } = props;

  const Tag: keyof React.JSX.IntrinsicElements = tag ?? "span";

  return (
    <Tag {...rest} className={clsx(styles.label, className)}>
      {icon ? createElement(icon) : null}
      {title || children ? <span className={styles.title}>{children ?? title}</span> : null}
    </Tag>
  );
};
export default Label;
