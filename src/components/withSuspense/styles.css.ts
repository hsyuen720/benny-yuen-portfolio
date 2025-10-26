import { style } from "@vanilla-extract/css";

export const loading = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "200px",
  padding: "2rem",
  gap: "1rem",
});

export const skeleton = style({
  width: "100%",
  maxWidth: "800px",
});
