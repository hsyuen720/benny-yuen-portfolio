"use client";

import clsx from "clsx";
import { useEffect, type ReactNode } from "react";

import useHome from "~/contexts/home/useHome";
import useInView from "~/hooks/useInView";
import { PortfolioSection } from "~/settings/constants";
import type { ValueOf } from "~/types/common";

import * as styles from "./styles.css";

export type SectionProps<T extends ValueOf<typeof PortfolioSection>> = {
  id: T;
  /** Classes for the outer full-width band (background, borders). */
  className?: string;
  /** Classes for the inner 1160px container (layout). */
  innerClassName?: string;
  children: ReactNode;
};

// A section is "current" while it crosses a thin band just below the nav,
// which also works for sections taller than the viewport.
const viewOptions = { rootMargin: "-80px 0px -60% 0px" };

const Section = <T extends string>(props: SectionProps<T>) => {
  const { id, className, innerClassName, children } = props;
  const { el, isInView } = useInView<HTMLElement>(viewOptions);
  const { focus } = useHome();

  useEffect(() => {
    if (isInView && focus) {
      focus(id);
    }
  }, [isInView, focus, id]);

  return (
    <section ref={el} id={id} className={clsx(styles.section, className)}>
      <div className={clsx(styles.inner, innerClassName)}>{children}</div>
    </section>
  );
};
export default Section;
