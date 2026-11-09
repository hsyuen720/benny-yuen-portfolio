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
  height: layout.navHeight,
  margin: "0 auto",
  padding: `0 ${layout.gutter}`,
  display: "flex",
  alignItems: "stretch",
  gap: "16px",
  "@media": {
    [`(max-width: ${breakpoint})`]: { padding: `0 ${layout.gutterMobile}`, gap: "10px" },
  },
});

export const wordmark = style({
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  color: colors.text,
  textDecoration: "none",
  "@media": {
    [`(max-width: ${breakpoint})`]: { fontSize: "0.85em" },
  },
});

// One row at every width: on narrow phones the links scroll sideways instead of wrapping.
// The 1px bottom padding lets the indicator and hover line sit on the header's border.
export const links = style({
  position: "relative",
  display: "flex",
  alignItems: "stretch",
  columnGap: "28px",
  marginLeft: "auto",
  minWidth: 0,
  paddingBottom: "1px",
  marginBottom: "-1px",
  overflowX: "auto",
  overflowY: "hidden",
  scrollbarWidth: "none",
  fontSize: "15px",
  selectors: {
    "&::-webkit-scrollbar": { display: "none" },
  },
  "@media": {
    [`(max-width: ${breakpoint})`]: { columnGap: "12px", fontSize: "14px" },
  },
});

export const link = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
  whiteSpace: "nowrap",
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
