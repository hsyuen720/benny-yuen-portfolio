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

export const commit = style({
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

export const head = style({});

export const headTop = style({
  transition: `stroke 300ms ${ease}`,
  selectors: {
    [`${played} &`]: { stroke: hairline.hi },
  },
  "@media": {
    [reducedMotion]: { stroke: hairline.hi, transition: "none" },
  },
});

export const label = style({
  fill: colors.muted,
  stroke: "none",
  fontFamily: fonts.body,
  fontSize: "9px",
  textAnchor: "middle",
});

export const headLabel = style({
  transition: `fill 300ms ${ease}`,
  selectors: {
    [`${played} &`]: { fill: colors.text },
  },
  "@media": {
    [reducedMotion]: { fill: colors.text, transition: "none" },
  },
});
