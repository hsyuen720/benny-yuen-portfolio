import { style } from "@vanilla-extract/css";

import { colors, fontSizes, sectionPaddingHorizontal, breakpoint } from "~/styles/theme.css";

export const section = style({
  position: "relative",
  minHeight: "max(800px, 100svh)",
  padding: `8em ${sectionPaddingHorizontal.md}`,
  fontSize: fontSizes.md,
  overflowX: "hidden",
  "@media": {
    [`(max-width: ${breakpoint})`]: {
      padding: `8em ${sectionPaddingHorizontal.sm}`,
    },
  },
});

export const isLight = style({
  backgroundColor: colors.secondary,
  color: colors.secondaryText,
});
