"use client";

import clsx from "clsx";
import { useEffect, type ReactNode } from "react";

import useInView from "~/hooks/useInView";

import styles from "./section.module.scss";

export type SectionProps<T extends string = string> = {
  className?: string;
  id: T;
  children: ReactNode;
  focus?: (id: T) => void;
};

const Section = <T extends string>(props: SectionProps<T>) => {
  const { className, id, focus, children } = props;
  const { el, isInView } = useInView<HTMLElement>({ threshold: 0.5 });

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
