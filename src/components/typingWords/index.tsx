"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

import styles from "./styles.module.scss";

export type TypingWordsProps = {
  className?: string;
  words: string[];
  typeInterval?: number;
  deleteInterval?: number;
  swapInterval?: number;
  isInfinite?: boolean;
};

const TypingWords = ({ className, words, ...rest }: TypingWordsProps) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isReversed, setIsReversed] = useState(false);

  useEffect(() => {
    const {
      typeInterval = 200,
      deleteInterval = 100,
      swapInterval = 1000,
      isInfinite = true,
    } = rest;
    if (index === words.length) {
      if (isInfinite) {
        setIndex(0);
      }
      return;
    }
    if (subIndex === words[index].length + 1 && !isReversed) {
      setIsReversed(true);
      return;
    }
    if (subIndex === 0 && isReversed) {
      setIsReversed(false);
      setIndex((prev) => prev + 1);
      return;
    }
    const timeout = setTimeout(
      () => setSubIndex((prev) => prev + (isReversed ? -1 : 1)),
      isReversed ? deleteInterval : subIndex === words[index].length ? swapInterval : typeInterval,
    );
    return () => clearTimeout(timeout);
  }, [subIndex, index, isReversed, words, rest]);

  return (
    <span className={clsx(styles.container, className)}>
      <span>{words[index]?.substring(0, subIndex)}</span>
      <span className={styles.cursor}>|</span>
    </span>
  );
};

export default TypingWords;
