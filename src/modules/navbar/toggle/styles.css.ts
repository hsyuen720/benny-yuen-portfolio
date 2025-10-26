import { style } from "@vanilla-extract/css";

import { colors } from "~/styles/theme.css";

export const container = style({
  appearance: "none",
  outline: "none",
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  width: "1.75em",
  height: "1.75em",
  minWidth: "1.75rem",
  minHeight: "1.75rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  touchAction: "manipulation",
});

export const hamburger = style({
  vars: {
    "--animation-duration": "200ms",
  },
  fill: colors.primaryText,
  width: "100%",
  height: "100%",
  overflow: "visible",
});

export const line = style({
  transition:
    "transform var(--animation-duration) ease-in-out, opacity var(--animation-duration) ease-in-out",
  willChange: "transform, opacity",
  selectors: {
    "&:nth-of-type(1)": {
      transformOrigin: "3.125rem 1.875rem",
      transform: "translate3d(0, 0, 0) rotate(0deg)",
    },
    "&:nth-of-type(2)": {
      transformOrigin: "3.125rem 3.125rem",
      transform: "translate3d(0, 0, 0) rotate(0deg)",
    },
    "&:nth-of-type(3)": {
      transformOrigin: "3.125rem 4.375rem",
      transform: "translate3d(0, 0, 0) rotate(0deg)",
    },
    '[aria-expanded="true"] &:nth-of-type(1)': {
      transform: "translate3d(0, 1.25rem, 0) rotate(45deg)",
    },
    '[aria-expanded="true"] &:nth-of-type(2)': {
      opacity: 0,
    },
    '[aria-expanded="true"] &:nth-of-type(3)': {
      transform: "translate3d(0, -1.25rem, 0) rotate(-45deg)",
    },
  },
});
