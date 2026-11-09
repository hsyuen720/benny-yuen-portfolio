import { style } from "@vanilla-extract/css";

import { breakpoint, layout } from "~/styles/theme.css";

export const band = style({
  overflow: "hidden",
  borderTop: "none",
});

export const inner = style({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
  gap: "64px",
  alignItems: "end",
  paddingBottom: "240px",
  "@media": {
    [`(max-width: ${breakpoint})`]: {
      gap: "48px",
      padding: `64px ${layout.gutterMobile} 160px`,
    },
  },
});

export const terrain = style({
  position: "absolute",
  left: "50%",
  top: "170px",
  width: "min(1180px, 120vw)",
  transform: "translateX(-38%)",
  pointerEvents: "none",
  "@media": {
    // Stacked layout: anchor to the bottom padding so the field starts below the photo
    [`(max-width: ${breakpoint})`]: { top: "auto", bottom: "-220px" },
  },
});

export const content = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: "28px",
  minWidth: 0,
});

export const name = style({
  fontSize: "clamp(52px, 7vw, 96px)",
  lineHeight: 1,
  letterSpacing: "-0.04em",
  whiteSpace: "nowrap",
});

export const intro = style({
  maxWidth: "36rem",
  fontSize: "20px",
  lineHeight: 1.5,
});

export const links = style({
  paddingTop: "4px",
});

export const photoFrame = style({
  position: "relative",
  justifySelf: "end",
  width: "100%",
  maxWidth: "360px",
  "@media": {
    [`(max-width: ${breakpoint})`]: { justifySelf: "start" },
  },
});

export const photo = style({
  display: "block",
  width: "100%",
  height: "auto",
  aspectRatio: "4 / 5",
  objectFit: "cover",
  objectPosition: "50% 28%",
  clipPath:
    "polygon(0 0, calc(100% - 56px) 0, 100% 56px, 100% 100%, 56px 100%, 0 calc(100% - 56px))",
});
