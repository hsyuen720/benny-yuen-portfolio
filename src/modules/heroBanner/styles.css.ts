import { keyframes, style } from "@vanilla-extract/css";

import {
  breakpoint,
  colors,
  glow,
  ease,
  fonts,
  layout,
  radii,
  reducedMotion,
} from "~/styles/theme.css";

export const band = style({
  position: "relative",
  ...glow("76%", "54%", "48% 70%", 0.13),
  overflow: "hidden",
  borderTop: "none",
});

export const inner = style({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  gap: "64px",
  alignItems: "center",
  paddingTop: "48px",
  paddingBottom: "96px",
  "@media": {
    [`(max-width: ${breakpoint})`]: {
      gridTemplateColumns: "minmax(0, 1fr)",
      gap: "40px",
      padding: `40px ${layout.gutterMobile} 64px`,
    },
  },
});

export const content = style({
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  minWidth: 0,
  pointerEvents: "none",
});

export const eyebrow = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  columnGap: "12px",
  rowGap: "4px",
  color: colors.muted,
  fontSize: "15px",
  letterSpacing: "0.02em",
});

export const author = style({
  color: colors.text,
  fontWeight: 500,
  selectors: {
    "&::after": { content: '"·"', marginLeft: "12px", color: colors.muted },
  },
});

export const headline = style({
  maxWidth: "17ch",
  fontFamily: fonts.display,
  fontSize: "clamp(40px, 5.4vw, 76px)",
  fontWeight: 500,
  lineHeight: 1.02,
  letterSpacing: "-0.035em",
});

export const accent = style({
  fontStyle: "normal",
  color: colors.gold,
});

export const intro = style({
  maxWidth: "34rem",
  color: colors.text2,
  fontSize: "18px",
  lineHeight: 1.55,
});

export const stats = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "12px 40px",
  paddingTop: "20px",
  borderTop: `1px solid ${colors.line}`,
  maxWidth: "34rem",
});

// Value above label, while the dt stays first for screen readers
export const stat = style({
  display: "flex",
  flexDirection: "column-reverse",
  gap: "2px",
});

export const statValue = style({
  fontFamily: fonts.display,
  fontSize: "28px",
  lineHeight: 1.1,
  letterSpacing: "-0.02em",
  color: colors.text,
});

export const statLabel = style({
  fontSize: "14px",
  color: colors.muted,
});

export const actions = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "12px",
  paddingTop: "8px",
  pointerEvents: "auto",
});

export const visual = style({
  position: "relative",
  zIndex: 1,
  width: "380px",
  // Offset outline behind the photo
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      inset: "16px -16px -16px 16px",
      border: `1px solid ${colors.line2}`,
      borderRadius: radii.card,
    },
  },
  "@media": {
    [`(max-width: ${breakpoint})`]: { width: "100%", maxWidth: "420px" },
  },
});

export const photo = style({
  display: "block",
  width: "100%",
  height: "auto",
  aspectRatio: "4 / 5",
  objectFit: "cover",
  objectPosition: "50% 28%",
  borderRadius: radii.card,
  position: "relative",
});

const pulse = keyframes({
  "0%": { boxShadow: `0 0 0 0 rgba(255, 183, 3, 0.55)` },
  "70%": { boxShadow: `0 0 0 10px rgba(255, 183, 3, 0)` },
  "100%": { boxShadow: `0 0 0 0 rgba(255, 183, 3, 0)` },
});

// "Now" card overlapping the photo's lower-left corner, fed by the current experience
export const now = style({
  position: "absolute",
  left: "-32px",
  bottom: "32px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  maxWidth: "calc(100% + 16px)",
  padding: "12px 16px",
  backgroundColor: colors.raised,
  border: `1px solid ${colors.line2}`,
  borderRadius: radii.button,
  fontSize: "15px",
  color: colors.text,
  "@media": {
    [`(max-width: ${breakpoint})`]: { left: "12px", bottom: "12px", maxWidth: "calc(100% - 24px)" },
  },
});

export const nowDot = style({
  flexShrink: 0,
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  backgroundColor: colors.gold,
  animation: `${pulse} 2.4s ${ease} infinite`,
  "@media": {
    [reducedMotion]: { animation: "none" },
  },
});

export const nowLabel = style({
  color: colors.muted,
  selectors: {
    "&::after": { content: '"·"', marginLeft: "10px" },
  },
});
