import { style } from "@vanilla-extract/css";

export const label = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.25rem",
  fontSize: "inherit",
  fontFamily: "inherit",
  color: "inherit",
});

export const icon = style({
  minWidth: "1.25em",
  minHeight: "1.25em",
});

export const title = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
});
