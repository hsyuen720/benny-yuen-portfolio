import { style } from "@vanilla-extract/css";

import { breakpoint, glow } from "~/styles/theme.css";

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

// One line beside the title on wide screens; wraps under it on phones
export const subtitle = style({
  whiteSpace: "nowrap",
  "@media": {
    [`(max-width: ${breakpoint})`]: { whiteSpace: "normal" },
  },
});

// Static warm light behind the section's figure
export const band = style({
  ...glow("50%", "55%", "55% 50%", 0.08),
});
