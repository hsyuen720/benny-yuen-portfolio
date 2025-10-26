import { style } from "@vanilla-extract/css";

import { colors, ratio, transition, breakpoint } from "~/styles/theme.css";

export const container = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "3em",
  "@media": {
    [`(max-width: ${breakpoint})`]: {
      flexDirection: "column-reverse",
      gap: "2em",
    },
  },
});

export const content = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "1em",
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
  selectors: {
    "&:hover": {
      borderRadius: "71% 29% 70% 30% / 62% 73% 27% 38%",
    },
  },
});
