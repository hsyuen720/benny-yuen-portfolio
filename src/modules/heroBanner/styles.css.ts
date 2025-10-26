import { style, keyframes } from "@vanilla-extract/css";

import { colors, ratio, transition, breakpoint } from "~/styles/theme.css";

const twinkle = keyframes({
  "0%, 100%": { opacity: 0.3 },
  "50%": { opacity: 1 },
});

export const container = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "3em",
  position: "relative",
  overflow: "hidden",
  "@media": {
    [`(max-width: ${breakpoint})`]: {
      flexDirection: "column-reverse",
      gap: "2em",
    },
  },
});

export const stars = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  zIndex: 0,
});

export const star = style({
  position: "absolute",
  backgroundColor: colors.highlight,
  borderRadius: "50%",
  animation: `${twinkle} 3s ease-in-out infinite`,
  boxShadow: `0 0 4px ${colors.highlight}`,
});

export const content = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "1em",
  position: "relative",
  zIndex: 1,
});

export const greeting = style({
  fontSize: "1.25em",
  color: colors.highlight,
});

export const introduction = style({
  fontSize: `${1.25 * ratio}em`,
});

export const briefDescription = style({
  fontSize: "1.25em",
});

export const socialMedia = style({
  fontSize: "1em",
});

export const profile = style({
  borderRadius: "24% 76% 70% 30% / 22% 30% 70% 78%",
  transition: transition("slowest", "border-radius"),
  position: "relative",
  zIndex: 1,
  selectors: {
    "&:hover": {
      borderRadius: "71% 29% 70% 30% / 62% 73% 27% 38%",
    },
  },
});
