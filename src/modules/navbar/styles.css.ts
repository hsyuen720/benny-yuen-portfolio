import { style } from "@vanilla-extract/css";

import {
  colors,
  transition,
  zIndices,
  sectionPaddingHorizontal,
  breakpoint,
} from "~/styles/theme.css";

export const navbar = style({
  position: "fixed",
  top: 0,
  right: 0,
  left: 0,
  zIndex: zIndices.header,
  padding: `1em ${sectionPaddingHorizontal.md}`,
  transition: transition("fast", "background-color"),
  backgroundColor: "transparent",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  flexWrap: "wrap",
  "@media": {
    [`(max-width: ${breakpoint})`]: {
      padding: `1em ${sectionPaddingHorizontal.sm}`,
    },
  },
});

export const isBlurBackground = style({
  backgroundColor: `rgba(${parseInt(colors.primary.slice(1, 3), 16)}, ${parseInt(colors.primary.slice(3, 5), 16)}, ${parseInt(colors.primary.slice(5, 7), 16)}, 0.75)`,
  backdropFilter: "blur(16px)",
  borderBottom: `1px solid rgba(255, 255, 255, 0.06)`,
});

export const logo = style({
  cursor: "pointer",
});

export const toggle = style({
  display: "none !important",
  marginLeft: "auto",
  "@media": {
    [`(max-width: ${breakpoint})`]: {
      display: "block !important",
    },
  },
});

export const menu = style({
  marginLeft: "auto",
  display: "flex",
  flexDirection: "row",
  gap: "0.5em",
  "@media": {
    [`(max-width: ${breakpoint})`]: {
      gap: "0.75em",
      width: "100%",
      flexDirection: "column",
      alignItems: "center",
      maxHeight: 0,
      opacity: 0,
      pointerEvents: "none",
      overflow: "hidden",
      transition: `max-height 300ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)`,
    },
  },
});

export const isOpen = style({
  "@media": {
    [`(max-width: ${breakpoint})`]: {
      maxHeight: "100svh",
      opacity: 1,
      pointerEvents: "all",
    },
  },
});

export const menuItem = style({
  cursor: "pointer",
  transition: transition("normal", "color"),
  selectors: {
    "&:hover": {
      color: colors.highlight,
    },
  },
});

export const active = style({
  color: colors.highlight,
});
