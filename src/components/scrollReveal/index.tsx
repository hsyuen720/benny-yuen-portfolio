"use client";

import clsx from "clsx";
import { type ReactNode, useMemo } from "react";

import useInView from "~/hooks/useInView";

import * as styles from "./styles.css";

type ScrollRevealProps = {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  className?: string;
};

const ScrollReveal = (props: ScrollRevealProps) => {
  const { children, delay = 0, direction = "up", className } = props;
  const options = useMemo(() => ({ once: true, threshold: 0.15 }), []);
  const { el, isInView } = useInView(options);

  return (
    <div
      ref={el}
      className={clsx(isInView ? styles.visible : styles.hidden, className)}
      style={
        isInView
          ? {
              animationName: styles.animationMap[direction],
              animationDelay: `${delay}ms`,
            }
          : undefined
      }
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
