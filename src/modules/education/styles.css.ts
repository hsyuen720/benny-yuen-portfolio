import { style } from "@vanilla-extract/css";

import { breakpoint, colors, layout } from "~/styles/theme.css";

export const inner = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "baseline",
  gap: "24px 56px",
  paddingTop: "80px",
  "@media": {
    [`(max-width: ${breakpoint})`]: { padding: `64px ${layout.gutterMobile} 72px` },
  },
});

export const title = style({
  flex: "1 1 300px",
  fontSize: "clamp(36px, 4.4vw, 52px)",
  lineHeight: 1.05,
  letterSpacing: "-0.03em",
});

export const row = style({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  gap: "4px 24px",
  padding: "18px 0",
  borderTop: `1px solid ${colors.line}`,
  selectors: {
    "&:last-child": { borderBottom: `1px solid ${colors.line}` },
  },
});

export const degree = style({
  color: colors.text,
  fontSize: "19px",
});

export const years = style({
  color: colors.muted,
});
