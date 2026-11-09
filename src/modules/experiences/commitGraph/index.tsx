"use client";

import clsx from "clsx";

import useInView from "~/hooks/useInView";

import * as styles from "./styles.css";

const ROW = 56; // vertical space per job
const PAD = 20;
const MAIN = 12; // x of the main line
const LANE = 40; // x of the branch commits
const TEXT = 60; // x where labels start
const WIDTH = 320;
const STAGGER_MS = 220;
const NAME_CHARS = 28; // what fits at WIDTH; the full list is in aria-label

const fit = (text: string) =>
  text.length > NAME_CHARS ? `${text.slice(0, NAME_CHARS - 1).trimEnd()}…` : text;

export type CommitGraphProps = {
  /** One commit per job, oldest first. `current` puts it on the main line in gold. */
  jobs: { company: string; years: string; current?: boolean }[];
  /** Text next to the root node, e.g. "Started 2019". */
  since?: string;
  label: string;
  className?: string;
};

// Drawn like `git log --graph`: newest at the top, each past job a branch that forks off the
// main line and merges back, the current job a gold commit on the main line itself.
const CommitGraph = (props: CommitGraphProps) => {
  const { jobs, since, label, className } = props;
  const { el, isInView } = useInView({ once: true, threshold: 0.3 });
  const rows = [...jobs].reverse();
  const rootY = PAD + rows.length * ROW;
  const height = rootY + PAD;

  return (
    <div ref={el} className={className}>
      <svg
        className={clsx(styles.svg, { [styles.played]: isInView })}
        viewBox={`0 0 ${WIDTH} ${height}`}
        role="img"
        aria-label={label}
      >
        {/* Main line grows from the root upward */}
        <path className={styles.branch} pathLength={1} d={`M${MAIN} ${rootY}V${PAD}`} />
        {rows.map((job, r) => {
          const y = PAD + r * ROW;
          const onMain = job.current && r === 0;
          const x = onMain ? MAIN : LANE;
          // Oldest first, so history builds up from the bottom
          const delay = { transitionDelay: `${(rows.length - 1 - r) * STAGGER_MS}ms` };
          return (
            <g key={`${job.company}-${r}`} data-commit>
              {onMain ? null : (
                <path
                  className={styles.branch}
                  pathLength={1}
                  style={delay}
                  d={`M${MAIN} ${y + ROW / 2}C${MAIN} ${y + ROW / 4} ${LANE} ${y + ROW / 3} ${LANE} ${y}C${LANE} ${y - ROW / 3} ${MAIN} ${y - ROW / 4} ${MAIN} ${y - ROW / 2}`}
                />
              )}
              <g className={styles.node} style={delay}>
                <circle
                  className={clsx(styles.dot, { [styles.headDot]: onMain })}
                  cx={x}
                  cy={y}
                  r={onMain ? 6 : 5}
                />
                <text className={clsx(styles.name, { [styles.headName]: onMain })} x={TEXT} y={y}>
                  {fit(job.company)}
                </text>
                <text className={styles.meta} x={TEXT} y={y + 16}>
                  {job.years}
                </text>
              </g>
            </g>
          );
        })}
        <g className={styles.node}>
          <circle className={styles.root} cx={MAIN} cy={rootY} r={4} />
          {since ? (
            <text className={styles.meta} x={TEXT} y={rootY + 4}>
              {since}
            </text>
          ) : null}
        </g>
      </svg>
    </div>
  );
};
export default CommitGraph;
