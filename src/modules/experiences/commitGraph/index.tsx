"use client";

import clsx from "clsx";

import useInView from "~/hooks/useInView";

import { buildGraph } from "./geometry";
import * as styles from "./styles.css";

const STAGGER_MS = 260;
const RISE_MS = 520;

export type CommitGraphProps = {
  /** One label per commit, oldest first (the start year of each job). */
  years: string[];
  label: string;
  className?: string;
};

const CommitGraph = (props: CommitGraphProps) => {
  const { years, label, className } = props;
  const { el, isInView } = useInView({ once: true, threshold: 0.4 });
  const { viewBox, board, mainLine, commits } = buildGraph(years.length);
  const headDelay = Math.max(years.length - 1, 0) * STAGGER_MS + RISE_MS;

  return (
    <div ref={el} className={className}>
      <svg
        className={clsx(styles.svg, { [styles.played]: isInView })}
        viewBox={viewBox}
        role="img"
        aria-label={label}
      >
        <path className={styles.plate} d={board.sideU} />
        <path className={styles.plate} d={board.sideV} />
        <path className={styles.plate} d={board.top} />
        <path className={styles.line} d={mainLine} />
        {commits.map((commit, i) => (
          <g
            key={i}
            data-commit
            className={clsx(styles.commit, { [styles.head]: commit.isHead })}
            style={{ transitionDelay: `${i * STAGGER_MS}ms` }}
          >
            <path className={styles.plate} d={commit.sideU} />
            <path className={styles.plate} d={commit.sideV} />
            <path
              className={clsx(styles.plate, { [styles.headTop]: commit.isHead })}
              d={commit.top}
              style={commit.isHead ? { transitionDelay: `${headDelay}ms` } : undefined}
            />
            <text
              className={clsx(styles.label, { [styles.headLabel]: commit.isHead })}
              x={commit.label.x}
              y={commit.label.y}
              style={commit.isHead ? { transitionDelay: `${headDelay}ms` } : undefined}
            >
              {years[i]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
export default CommitGraph;
