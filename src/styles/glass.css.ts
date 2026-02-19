import { style } from "@vanilla-extract/css";

export const glassCard = style({
  backdropFilter: "blur(12px)",
  background: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  borderRadius: "16px",
  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
  transition: "all 0.3s ease-in-out",
  selectors: {
    "&:hover": {
      background: "rgba(255, 255, 255, 0.1)",
      transform: "translateY(-5px)",
    },
  },
});

export const glassPill = style({
  backdropFilter: "blur(8px)",
  background: "rgba(255, 255, 255, 0.08)",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  borderRadius: "999px",
  boxShadow: "0 2px 8px 0 rgba(0, 0, 0, 0.15)",
});
