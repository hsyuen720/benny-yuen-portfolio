import { style } from "@vanilla-extract/css";

import { played } from "~/modules/experiences/commitGraph/styles.css";
import { colors, ease, fonts, hairline, reducedMotion } from "~/styles/theme.css";

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
