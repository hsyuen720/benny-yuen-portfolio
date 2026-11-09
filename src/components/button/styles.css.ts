import { style } from "@vanilla-extract/css";

import { colors, radii, transition } from "~/styles/theme.css";

export const button = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  minHeight: "48px",
  padding: "0 20px",
  borderRadius: radii.button,
  border: "1px solid transparent",
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: 1,
  textDecoration: "none",
  cursor: "pointer",
  transition: `${transition("hover", "background-color")}, ${transition("press", "transform")}`,
  selectors: {
    "&:active": { transform: "scale(0.98)" },
  },
});

export const primary = style({
  backgroundColor: colors.gold,
  color: colors.goldInk,
  selectors: { "&:hover": { backgroundColor: colors.goldHover } },
});

export const secondary = style({
  backgroundColor: colors.raised,
  borderColor: colors.line2,
  color: colors.text,
  selectors: { "&:hover": { backgroundColor: colors.raisedHover } },
});

export const iconOnly = style({
  width: "48px",
  padding: 0,
});
