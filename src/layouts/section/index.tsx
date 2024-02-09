"use client";

import clsx from "clsx";
import { useEffect, type ReactNode } from "react";

import useHome from "~/contexts/home/useHome";
import useInView from "~/hooks/useInView";
import { PortfolioSections } from "~/settings/constants";
import type { ValueOf } from "~/utils/type";

import styles from "./styles.module.scss";

export type SectionProps<T extends ValueOf<typeof PortfolioSections>> = {
  className?: string;
  id: T;
  children: ReactNode;
};

const Section = <T extends string>(props: SectionProps<T>) => {
  const { className, id, children } = props;
  const { el, isInView } = useInView<HTMLElement>({ threshold: 0.5 });
  const { focus } = useHome();

  useEffect(() => {
    if (isInView && focus) {
      focus(id);
    }
  }, [isInView, focus, id]);

  return (
    <section ref={el} id={id} className={clsx(styles.section, className)}>
      {children}
    </section>
  );
};
export default Section;
