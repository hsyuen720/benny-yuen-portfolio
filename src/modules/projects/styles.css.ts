import { style } from "@vanilla-extract/css";

export const inner = style({
  display: "flex",
  flexDirection: "column",
  gap: "40px",
});

export const header = style({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: "12px 48px",
});

export const subtitle = style({
  maxWidth: "400px",
});
