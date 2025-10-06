import clsx from "clsx";
import { useTranslations } from "next-intl";
import { memo } from "react";

import Label, { type LabelProps } from "~/components/label";
import { AppTranslation } from "~/settings/i18n";

import styles from "./styles.module.scss";

export type ButtonProps<T extends "button" | "a" = "button"> = LabelProps<T> & {
  isLoading?: boolean;
  disabled?: boolean;
  isDark?: boolean;
};

const Button = <T extends "button" | "a" = "button">(props: ButtonProps<T>) => {
  const { tag, isLoading, icon, title, children, disabled, className, isDark, ...rest } = props;
  const t = useTranslations(AppTranslation.Common);
  const isIconOnly = !!icon && !title && !children;

  return (
    <Label
      {...rest}
      tag={tag ?? "button"}
      icon={icon}
      disabled={disabled}
      className={clsx(
        styles.button,
        { [styles.isIconOnly]: isIconOnly, [styles.isDark]: isDark },
        className,
      )}
    >
      {isLoading ? t("text.loading") : (children ?? title)}
    </Label>
  );
};
export default memo(Button);
