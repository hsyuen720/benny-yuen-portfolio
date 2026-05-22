import { style } from "@vanilla-extract/css";

import { colors, fontSizes, fontWeights, borderRadii, ratio } from "~/styles/theme.css";

export const sectionTitle = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  fontSize: fontSizes.sm,
});

export const isDark = style({});

export const description = style({
  fontSize: "1em",
  color: colors.primaryAccentText,
  selectors: {
    [`${isDark} &`]: {
      color: colors.secondaryAccentText,
    },
  },
});

export const title = style({
  marginBlock: 0,
  fontSize: `${ratio * 1.4}em`,
  fontFamily: "var(--font-display), sans-serif",
  fontWeight: fontWeights.bold,
  textTransform: "uppercase",
  letterSpacing: "-0.01em",
  color: colors.primaryText,
  textShadow: "0 2px 10px rgba(255, 183, 3, 0.1)",
  selectors: {
    "&::after": {
      content: '" /"',
      color: colors.highlight,
      fontWeight: fontWeights.normal,
    },
    [`${isDark} &`]: {
      color: colors.secondaryText,
      textShadow: "none",
    },
  },
});

export const separator = style({
  width: "5em",
  height: "0.15em",
  borderRadius: borderRadii.xl,
  background: `linear-gradient(90deg, ${colors.highlight}, ${colors.highlightSecondary}, rgba(255, 183, 3, 0.1))`,
});
