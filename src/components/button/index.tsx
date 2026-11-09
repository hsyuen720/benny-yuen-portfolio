import clsx from "clsx";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ComponentType } from "react";

import * as styles from "./styles.css";

type CommonProps = {
  variant?: "primary" | "secondary";
  icon?: ComponentType<{ size?: number; "aria-hidden"?: boolean }>;
};

export type ButtonProps = CommonProps &
  (
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  );

const Button = (props: ButtonProps) => {
  const { variant = "secondary", icon: Icon, className, children, ...rest } = props;
  const classes = clsx(
    styles.button,
    styles[variant],
    { [styles.iconOnly]: !!Icon && !children },
    className,
  );
  const content = (
    <>
      {Icon ? <Icon size={20} aria-hidden /> : null}
      {children}
    </>
  );

  if (rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
};
export default Button;
