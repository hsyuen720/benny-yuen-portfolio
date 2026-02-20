import { style } from "@vanilla-extract/css";

import { glassCard } from "~/styles/glass.css";
import { colors, transition } from "~/styles/theme.css";

export const projects = style({
  clipPath: "polygon(0 0, 100% 3%, 100% 100%, 0% 100%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.75em",
});

export const content = style({
  vars: {
    "--n": "3",
    "--gap": "0.75em",
  },
  display: "grid",
  width: "100%",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(max(18em, (100% - (var(--n) - 1) * var(--gap)) / var(--n)), 1fr))",
  gap: "var(--gap)",
});

export const project = style([
  glassCard,
  {
    position: "relative",
    height: "18em",
    overflow: "hidden",
  },
]);

export const photo = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: transition("slow", "transform"),
  selectors: {
    [`${project}:hover &`]: {
      transform: "scale(1.05)",
    },
  },
});

export const detail = style({
  transition: transition("slow", "all"),
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: `rgba(${parseInt(colors.primary.slice(1, 3), 16)}, ${parseInt(colors.primary.slice(3, 5), 16)}, ${parseInt(colors.primary.slice(5, 7), 16)}, 0.65)`,
  backdropFilter: "blur(4px)",
  color: colors.primaryText,
  opacity: 0,
  padding: "1em 1.25em",
  display: "flex",
  flexDirection: "column",
  gap: "0.25em",
  selectors: {
    "&:hover": {
      opacity: 1,
    },
  },
});

export const name = style({
  fontSize: "1.25em",
  alignItems: "unset",
});

export const projectDescription = style({
  flex: 1,
  textAlign: "justify",
  overflowY: "auto",
  fontSize: "1em",
});

export const footer = style({
  display: "flex",
  alignItems: "center",
  gap: "0.25em",
});

export const technologies = style({
  flex: 1,
  display: "flex",
  flexWrap: "wrap",
  gap: "inherit",
  fontSize: "0.75em",
});

export const links = style({
  display: "flex",
  flexWrap: "nowrap",
  gap: "inherit",
});
