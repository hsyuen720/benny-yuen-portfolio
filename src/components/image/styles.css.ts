import { style } from "@vanilla-extract/css";

export const container = style({
  position: "relative",
  overflow: "hidden",
});

export const image = style({
  margin: "auto",
  objectFit: "cover",
  userSelect: "none",
});
