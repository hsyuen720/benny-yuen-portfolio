import clsx from "clsx";

import Label, { type LabelProps } from "~/components/label";

import styles from "./styles.module.scss";

export type ButtonProps<T extends "button" | "a" = "button"> = LabelProps<T> & {
  isLoading?: boolean;
  disabled?: boolean;
};

const Button = <T extends "button" | "a" = "button">(props: ButtonProps<T>) => {
  const { tag, isLoading, icon, title, children, type, disabled, className, ...rest } = props;

  const isIconOnly = !!icon && !title && !children;

  return (
    <Label
      {...rest}
      tag={tag ?? "button"}
      icon={icon}
      disabled={disabled}
      className={clsx(styles.button, { [styles.isIconOnly]: isIconOnly }, className)}
    >
      {children ?? title}
    </Label>
  );
};
export default Button;
