import { style } from "@vanilla-extract/css";

import { colors, borderRadii } from "~/styles/theme.css";

export const container = style({
  fontStyle: "italic",
  padding: "0.15em 0.5em",
  backgroundColor: colors.highlight,
  color: colors.primary,
  borderRadius: borderRadii.md,
});

export const isDark = style({
  backgroundColor: colors.primary,
  color: colors.primaryText,
});
