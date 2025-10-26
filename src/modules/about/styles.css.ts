import { style } from "@vanilla-extract/css";

import { colors, transition, borderRadii, breakpoint } from "~/styles/theme.css";

export const about = style({
  clipPath: "polygon(0 10%, 100% 0%, 100% 90%, 0% 100%)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "1em",
});

export const browser = style({});

export const browserContent = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "3em",
  padding: "4em",
  "@media": {
    [`(max-width: ${breakpoint})`]: {
      flexDirection: "column",
      padding: "2em",
    },
  },
});

export const photo = style({
  position: "relative",
  transition: transition("normal", "box-shadow"),
  border: `0.25em solid ${colors.primary}`,
  boxShadow: `0.75em 0.75em 0 ${colors.primary}`,
  borderRadius: borderRadii.md,
  selectors: {
    "&:hover": {
      boxShadow: `0 0 0 ${colors.primary}`,
    },
  },
});

export const overlay = style({
  transition: transition("fast", "opacity"),
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  opacity: 0,
  backgroundColor: `rgba(${parseInt(colors.primary.slice(1, 3), 16)}, ${parseInt(colors.primary.slice(3, 5), 16)}, ${parseInt(colors.primary.slice(5, 7), 16)}, 0.75)`,
  color: colors.primaryText,
  selectors: {
    [`${photo}:hover &`]: {
      opacity: 1,
    },
  },
});

export const content = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.75em",
});

export const paragraph = style({
  textAlign: "justify",
  fontSize: "1.1em",
});

export const hashtag = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.25em",
});
