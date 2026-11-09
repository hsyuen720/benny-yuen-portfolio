"use client";

import clsx from "clsx";

import useInView from "~/hooks/useInView";
import * as graph from "~/modules/experiences/commitGraph/styles.css";

import { buildBooks } from "./geometry";
import * as styles from "./styles.css";

const STAGGER_MS = 260;
const RISE_MS = 520;

export type BookStackProps = {
  /** One label per degree, oldest first (e.g. the end year). */
  years: string[];
  label: string;
  className?: string;
};

// Same drawing language and entrance as the experience commit graph
const BookStack = (props: BookStackProps) => {
  const { years, label, className } = props;
  const { el, isInView } = useInView({ once: true, threshold: 0.4 });
  const { viewBox, books } = buildBooks(years.length);
  const topDelay = Math.max(years.length - 1, 0) * STAGGER_MS + RISE_MS;

  return (
    <div ref={el} className={className}>
      <svg
        className={clsx(graph.svg, { [graph.played]: isInView })}
        viewBox={viewBox}
        role="img"
        aria-label={label}
      >
        {books.map((book) => (
          <g
            key={book.index}
            data-book
            className={graph.commit}
            style={{ transitionDelay: `${book.index * STAGGER_MS}ms` }}
          >
            <path className={graph.plate} d={book.sideU} />
            <path className={graph.plate} d={book.sideV} />
            <path
              className={clsx(graph.plate, { [graph.headTop]: book.isTop })}
              d={book.top}
              style={book.isTop ? { transitionDelay: `${topDelay}ms` } : undefined}
            />
            <path className={graph.line} d={book.pages} />
            <text
              className={clsx(graph.label, styles.label, { [graph.headLabel]: book.isTop })}
              x={book.label.x}
              y={book.label.y}
              style={book.isTop ? { transitionDelay: `${topDelay}ms` } : undefined}
            >
              {years[book.index]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
export default BookStack;
