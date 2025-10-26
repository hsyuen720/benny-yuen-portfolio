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
  fontSize: `${ratio}em`,
  fontWeight: fontWeights.bold,
  textTransform: "uppercase",
  color: colors.primaryText,
  selectors: {
    "&::after": {
      content: '"."',
    },
    [`${isDark} &`]: {
      color: colors.secondaryText,
    },
  },
});

export const separator = style({
  width: "100%",
  height: "0.125em",
  borderRadius: borderRadii.xl,
  backgroundColor: colors.highlight,
});
