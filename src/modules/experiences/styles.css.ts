import { style } from "@vanilla-extract/css";

import { colors, fontSizes, borderRadii, breakpoint } from "~/styles/theme.css";

export const experiences = style({
  display: "flex",
  flexDirection: "column",
  gap: "1em",
});

export const timeline = style({});

export const item = style({
  display: "grid",
  gridTemplateColumns: "10em auto 1fr",
  gridTemplateAreas: '"period separator detail"',
  gap: "1em",
  "@media": {
    [`(max-width: ${breakpoint})`]: {
      gridTemplateColumns: "auto 1fr",
      gridTemplateAreas: '"separator period" "separator detail"',
      gap: "0.5em",
    },
  },
});

export const period = style({
  gridArea: "period",
  alignSelf: "flex-start",
  justifySelf: "flex-end",
  fontSize: "0.75em",
  padding: "0.25em 0.5em 0.15em",
  backgroundColor: colors.highlight,
  color: colors.primary,
  borderRadius: borderRadii.lg,
  fontWeight: "700",
  "@media": {
    [`(max-width: ${breakpoint})`]: {
      justifySelf: "flex-start",
    },
  },
});

export const separator = style({
  gridArea: "separator",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const dot = style({
  width: "0.875em",
  height: "0.875em",
  backgroundColor: colors.highlight,
  borderRadius: "50%",
  boxShadow: `0 0 0 0.2em rgba(255, 183, 3, 0.2)`,
});

export const line = style({
  backgroundColor: `rgba(245, 245, 245, 0.15)`,
  width: "0.125em",
  marginLeft: "0.02em",
});

export const top = style({
  height: `calc(${fontSizes.md} * 0.25)`,
});

export const bottom = style({
  flex: 1,
});

export const detail = style({
  gridArea: "detail",
  display: "flex",
  flexDirection: "column",
  gap: "0.5em",
  marginBottom: "2em",
});

export const positions = style({
  fontWeight: "bold",
  alignItems: "unset",
});

export const position = style({
  selectors: {
    "&:not(:first-child)": {
      opacity: 0.65,
    },
  },
});

export const company = style({
  alignItems: "unset",
});

export const descriptions = style({});

export const description = style({
  margin: "0 1.25em 0.5em",
});

export const technologies = style({
  display: "inline-flex",
  flexWrap: "wrap",
  gap: "0.25em",
  fontSize: "0.85em",
});
