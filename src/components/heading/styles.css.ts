import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const title = style({
  fontSize: "clamp(36px, 4.4vw, 52px)",
  lineHeight: 1.05,
  letterSpacing: "-0.03em",
});

export const description = style({
  maxWidth: "340px",
});
