import { style } from "@vanilla-extract/css";

import { colors, borderRadii } from "~/styles/theme.css";

export const container = style({
  fontStyle: "italic",
  padding: "0.15em 0.6em",
  backgroundColor: colors.highlight,
  color: colors.primary,
  borderRadius: borderRadii.xl,
  fontSize: "0.9em",
});

export const isDark = style({
  backgroundColor: `rgba(245, 245, 245, 0.1)`,
  color: colors.primaryText,
  border: `1px solid rgba(245, 245, 245, 0.12)`,
});
