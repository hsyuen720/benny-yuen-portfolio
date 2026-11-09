import { style } from "@vanilla-extract/css";

import { breakpoint, colors, glow, layout } from "~/styles/theme.css";

export const band = style({
  ...glow("72%", "50%"),
});

export const inner = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
  gap: "48px",
  alignItems: "center",
});

export const content = style({
  display: "flex",
  flexDirection: "column",
  gap: "18px",
  minWidth: 0,
});

export const title = style({
  fontSize: "clamp(40px, 5vw, 64px)",
  lineHeight: 1.02,
  letterSpacing: "-0.035em",
});

export const description = style({
  maxWidth: "440px",
  fontSize: "18px",
});

export const links = style({
  paddingTop: "8px",
});

export const figure = style({
  justifySelf: "end",
  width: "100%",
  maxWidth: "440px",
});

export const footer = style({
  backgroundColor: colors.deep,
  borderTop: `1px solid ${colors.line}`,
});

export const footerInner = style({
  maxWidth: layout.maxWidth,
  margin: "0 auto",
  padding: `24px ${layout.gutter}`,
  fontSize: "14px",
  color: colors.muted,
  "@media": {
    [`(max-width: ${breakpoint})`]: { padding: `24px ${layout.gutterMobile}` },
  },
});
