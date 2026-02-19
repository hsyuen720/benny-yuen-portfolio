import { style } from "@vanilla-extract/css";

import { colors, fontSizes, sectionPaddingHorizontal, breakpoint } from "~/styles/theme.css";

export const footer = style({
  padding: `1.25em ${sectionPaddingHorizontal.md}`,
  borderTop: "none",
  borderImage: `linear-gradient(90deg, transparent, ${colors.highlight}, transparent) 1`,
  borderTopWidth: "0.2rem",
  borderTopStyle: "solid",
  fontSize: fontSizes.sm,
  overflowX: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  "@media": {
    [`(max-width: ${breakpoint})`]: {
      padding: `1.25em ${sectionPaddingHorizontal.sm}`,
    },
  },
});

export const label = style({});
