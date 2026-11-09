import { style } from "@vanilla-extract/css";

import { breakpoint, colors, layout, transition } from "~/styles/theme.css";

export const header = style({
  position: "sticky",
  top: 0,
  zIndex: 10,
  backgroundColor: colors.page,
  borderBottom: `1px solid ${colors.line}`,
});

export const nav = style({
  maxWidth: layout.maxWidth,
  margin: "0 auto",
  padding: `0 ${layout.gutter}`,
  minHeight: layout.navHeight,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "0 16px",
  "@media": {
    [`(max-width: ${breakpoint})`]: { padding: `0 ${layout.gutterMobile}` },
  },
});

export const wordmark = style({
  color: colors.text,
  textDecoration: "none",
  padding: "12px 0",
  "@media": {
    [`(max-width: ${breakpoint})`]: { padding: "10px 0 0" },
  },
});

export const links = style({
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  columnGap: "28px",
  fontSize: "15px",
  "@media": {
    [`(max-width: ${breakpoint})`]: { columnGap: "20px", fontSize: "14px" },
  },
});

export const link = style({
  position: "relative",
  padding: "20px 0",
  "@media": {
    [`(max-width: ${breakpoint})`]: { padding: "8px 0 12px" },
  },
  color: colors.text2,
  textDecoration: "none",
  transition: transition("hover", "color"),
  selectors: {
    "&:hover, &[aria-current]": { color: colors.text },
    // Hover line sits where the gold indicator does (on the header's bottom edge) and grows from the left
    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: "-1px",
      height: "2px",
      backgroundColor: colors.text2,
      transform: "scaleX(0)",
      transformOrigin: "left",
      transition: transition("hover", "transform"),
    },
    // The active link already carries the gold indicator
    "&:hover:not([aria-current])::after": { transform: "scaleX(1)" },
  },
});

// A 1px-wide bar stretched with scaleX: only transform and opacity animate, so it stays on the GPU
export const indicator = style({
  position: "absolute",
  zIndex: 1,
  top: 0,
  left: 0,
  width: "1px",
  height: "2px",
  backgroundColor: colors.gold,
  transformOrigin: "left",
  pointerEvents: "none",
  transition: transition("hover", "opacity"),
});

export const slide = style({
  transition: `${transition("indicator", "transform")}, ${transition("hover", "opacity")}`,
});
