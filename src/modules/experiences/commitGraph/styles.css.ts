import { style } from "@vanilla-extract/css";

import { colors, ease, fonts, hairline, reducedMotion } from "~/styles/theme.css";

export const svg = style({
  display: "block",
  width: "100%",
  height: "auto",
  overflow: "visible",
});

export const played = style({});

// Lines draw themselves in (pathLength=1 makes the dash maths length-independent)
export const branch = style({
  fill: "none",
  stroke: hairline.edge,
  strokeWidth: 1.2,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  transition: `stroke-dashoffset 700ms ${ease}`,
  selectors: {
    [`${played} &`]: { strokeDashoffset: 0 },
  },
  "@media": {
    [reducedMotion]: { strokeDashoffset: 0, transition: "none" },
  },
});

export const node = style({
  opacity: 0,
  transform: "translateX(-6px)",
  transition: `opacity 420ms ${ease}, transform 420ms ${ease}`,
  transitionDelay: "inherit",
  selectors: {
    [`${played} &`]: { opacity: 1, transform: "none" },
  },
  "@media": {
    [reducedMotion]: { opacity: 1, transform: "none", transition: "none" },
  },
});

export const dot = style({
  fill: "var(--band)",
  stroke: colors.text2,
  strokeWidth: 1.2,
});

export const headDot = style({
  fill: colors.gold,
  stroke: colors.gold,
});

export const root = style({
  fill: "var(--band)",
  stroke: hairline.mid,
  strokeWidth: 1.2,
});

export const name = style({
  fill: colors.text2,
  fontFamily: fonts.body,
  fontSize: "15px",
  dominantBaseline: "middle",
});

export const headName = style({
  fill: colors.text,
});

export const meta = style({
  fill: colors.muted,
  fontFamily: fonts.body,
  fontSize: "12px",
  dominantBaseline: "middle",
  fontVariantNumeric: "tabular-nums",
});
