import { style } from "@vanilla-extract/css";

import { colors, transition, borderRadii, shadows } from "~/styles/theme.css";

export const button = style({
  appearance: "none",
  outline: "none",
  border: "none",
  cursor: "pointer",
  gap: "0.25em",
  padding: "0.3em 0.75em",
  borderRadius: borderRadii.lg,
  transition: transition("normal", "all"),
  selectors: {
    "&:disabled": {
      cursor: "default",
    },
  },
});

export const isDark = style({
  backgroundColor: colors.primary,
  color: colors.primaryText,
  selectors: {
    "&:hover": {
      backgroundColor: colors.highlight,
      color: colors.primary,
      transform: "translateY(-1px)",
      boxShadow: shadows.glow,
    },
    "&:active": {
      transform: "translateY(0) scale(0.98)",
    },
  },
});

export const isIconOnly = style({
  padding: "0.5em",
  borderRadius: "50%",
  backgroundColor: "transparent",
  transition: transition("slow", "all"),
  selectors: {
    "&:hover": {
      backgroundColor: colors.highlight,
      color: colors.primary,
      transform: "translateY(-1px)",
    },
    "&:active": {
      transform: "translateY(0) scale(0.98)",
    },
  },
});
