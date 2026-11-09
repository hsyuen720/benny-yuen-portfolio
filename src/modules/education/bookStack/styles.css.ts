import { style } from "@vanilla-extract/css";

import { colors, ease, fonts, hairline, reducedMotion } from "~/styles/theme.css";

export const svg = style({
  display: "block",
  width: "100%",
  height: "auto",
  overflow: "visible",
});

export const played = style({});

export const plate = style({
  fill: colors.page,
  stroke: hairline.mid,
  strokeWidth: 0.9,
  strokeLinejoin: "round",
  vectorEffect: "non-scaling-stroke",
});

export const line = style({
  fill: "none",
  stroke: hairline.mid,
  strokeWidth: 0.9,
  vectorEffect: "non-scaling-stroke",
});

export const book = style({
  opacity: 0,
  transform: "translateY(14px)",
  transition: `transform 520ms ${ease}, opacity 520ms ${ease}`,
  selectors: {
    [`${played} &`]: { opacity: 1, transform: "none" },
  },
  "@media": {
    [reducedMotion]: { opacity: 1, transform: "none", transition: "none" },
  },
});

export const topEdge = style({
  transition: `stroke 300ms ${ease}`,
  selectors: {
    [`${played} &`]: { stroke: hairline.hi },
  },
  "@media": {
    [reducedMotion]: { stroke: hairline.hi, transition: "none" },
  },
});

export const spine = style({
  fill: colors.text,
  fontFamily: fonts.body,
  fontSize: "13px",
});

export const years = style({
  fill: colors.muted,
  fontFamily: fonts.body,
  fontSize: "11px",
  textAnchor: "end",
  fontVariantNumeric: "tabular-nums",
});

export const topYears = style({
  fill: hairline.hi,
});

// Fades in gold after the pile has landed, like the commit graph head
export const ribbon = style({
  fill: hairline.hi,
  opacity: 0,
  transition: `opacity 300ms ${ease}`,
  selectors: {
    [`${played} &`]: { opacity: 1 },
  },
  "@media": {
    [reducedMotion]: { opacity: 1, transition: "none" },
  },
});
