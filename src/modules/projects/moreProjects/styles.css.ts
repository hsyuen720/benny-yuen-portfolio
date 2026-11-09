import { style } from "@vanilla-extract/css";

import { breakpoint, colors, fonts } from "~/styles/theme.css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  paddingTop: "16px",
});

export const title = style({
  marginBottom: "12px",
  fontSize: "24px",
  letterSpacing: "-0.02em",
});

export const row = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 220px) minmax(0, 1fr) auto",
  gap: "8px 32px",
  alignItems: "baseline",
  padding: "20px 0",
  borderTop: `1px solid ${colors.line}`,
  "@media": {
    [`(max-width: ${breakpoint})`]: { gridTemplateColumns: "minmax(0, 1fr)" },
  },
});

export const name = style({
  fontFamily: fonts.display,
  fontSize: "22px",
  letterSpacing: "-0.015em",
  color: colors.text,
});

export const stack = style({
  color: colors.muted,
});

export const links = style({
  display: "flex",
  gap: "20px",
  fontWeight: 500,
});

export const footer = style({
  padding: "18px 0",
  borderTop: `1px solid ${colors.line}`,
});

export const showAll = style({
  minHeight: "44px",
  padding: "0 18px",
  fontSize: "15px",
});
