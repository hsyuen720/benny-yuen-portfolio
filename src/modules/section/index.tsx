"use client";

import clsx from "clsx";
import { useEffect, type ReactNode } from "react";

import useHome from "~/contexts/home/useHome";
import useInView from "~/hooks/useInView";
import { PortfolioSection } from "~/settings/constants";
import type { ValueOf } from "~/types/common";

import * as styles from "./styles.css";

export type SectionProps<T extends ValueOf<typeof PortfolioSection>> = {
  className?: string;
  id: T;
  isLight?: boolean;
  children: ReactNode;
};

const Section = <T extends string>(props: SectionProps<T>) => {
  const { className, id, children, isLight } = props;
  const { el, isInView } = useInView<HTMLElement>({ threshold: 0.5 });
  const { focus } = useHome();

  useEffect(() => {
    if (isInView && focus) {
      focus(id);
    }
  }, [isInView, focus, id]);

  return (
    <section
      ref={el}
      id={id}
      className={clsx(styles.section, { [styles.isLight]: isLight }, className)}
    >
      {children}
    </section>
  );
};
export default Section;
