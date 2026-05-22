import { style } from "@vanilla-extract/css";

import { colors, fontSizes, sectionPaddingHorizontal, breakpoint } from "~/styles/theme.css";

export const footer = style({
  padding: `2em ${sectionPaddingHorizontal.md}`,
  borderTop: "none",
  borderImage: `linear-gradient(90deg, transparent, ${colors.highlightSecondary}, ${colors.highlight}, transparent) 1`,
  borderTopWidth: "0.2rem",
  borderTopStyle: "solid",
  fontSize: fontSizes.sm,
  overflowX: "hidden",
  "@media": {
    [`(max-width: ${breakpoint})`]: {
      padding: `2em ${sectionPaddingHorizontal.sm}`,
    },
  },
});

export const content = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const label = style({});
