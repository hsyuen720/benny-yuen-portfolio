"use client";

import clsx from "clsx";

import useInView from "~/hooks/useInView";

import { buildBooks } from "./geometry";
import * as styles from "./styles.css";

const STAGGER_MS = 260;
const RISE_MS = 520;

export type BookStackProps = {
  /** One book per degree, oldest first. */
  books: { title: string; years: string; current?: boolean }[];
  label: string;
  className?: string;
};

const BookStack = (props: BookStackProps) => {
  const { books: items, label, className } = props;
  const { el, isInView } = useInView({ once: true, threshold: 0.4 });
  const { viewBox, books } = buildBooks(items);
  const topDelay = Math.max(items.length - 1, 0) * STAGGER_MS + RISE_MS;

  return (
    <div ref={el} className={className}>
      <svg
        className={clsx(styles.svg, { [styles.played]: isInView })}
        viewBox={viewBox}
        role="img"
        aria-label={label}
      >
        {books.map((book) => (
          <g
            key={book.index}
            data-book
            className={styles.book}
            style={{ transitionDelay: `${book.index * STAGGER_MS}ms` }}
          >
            <path className={styles.plate} d={book.sideU} />
            <path className={styles.plate} d={book.sideV} />
            <path
              className={clsx(styles.plate, { [styles.topEdge]: book.isTop })}
              d={book.top}
              style={book.isTop ? { transitionDelay: `${topDelay}ms` } : undefined}
            />
            <path className={styles.line} d={book.pages} />
            <text className={styles.spine} transform={book.spine.transform}>
              {book.spine.text}
            </text>
            {book.ribbon ? (
              <path
                data-ribbon
                className={styles.ribbon}
                d={book.ribbon}
                style={{ transitionDelay: `${topDelay}ms` }}
              />
            ) : null}
            <text
              className={clsx(styles.years, { [styles.topYears]: book.isTop })}
              transform={book.years.transform}
            >
              {items[book.index].years}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
export default BookStack;
