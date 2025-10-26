import { style } from "@vanilla-extract/css";

import { borderRadii } from "~/styles/theme.css";

export const container = style({
  borderWidth: "0.25em",
  borderStyle: "solid",
  borderColor: "var(--main-color)",
  borderRadius: borderRadii.sm,
  display: "flex",
  flexDirection: "column",
  vars: {
    "--main-color": "#f1f1f1",
    "--text-color": "#000000",
  },
});

export const isDark = style({
  vars: {
    "--main-color": "#0b0c10",
    "--text-color": "#dddddd",
  },
});

export const header = style({
  overflowX: "hidden",
  padding: "0.5em 0.75em",
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
  columnGap: "0.25em",
  backgroundColor: "var(--main-color)",
});

export const dots = style({
  display: "flex",
  gap: "0.5em",
});

export const dot = style({
  margin: "auto 0",
  width: "0.75em",
  height: "0.75em",
  borderRadius: "50%",
});

export const dotRed = style({
  backgroundColor: "#ed594a",
});

export const dotYellow = style({
  backgroundColor: "#fdd800",
});

export const dotGreen = style({
  backgroundColor: "#5ac05a",
});

export const input = style({
  border: "0.1em solid var(--main-color)",
  borderRadius: borderRadii.md,
  width: "70%",
  margin: "0 auto",
  padding: "0.25em",
  outline: "none",
  lineHeight: 1.5,
  fontFamily: "inherit",
  textOverflow: "ellipsis",
});

export const setting = style({
  cursor: "pointer",
  color: "var(--text-color)",
});

export const content = style({
  flex: 1,
  overflow: "hidden",
});
