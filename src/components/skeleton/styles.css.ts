import { style, keyframes } from "@vanilla-extract/css";

const pulse = keyframes({
  "0%": { opacity: 1 },
  "50%": { opacity: 0.5 },
  "100%": { opacity: 1 },
});

export const skeleton = style({
  background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
  backgroundSize: "200% 100%",
  animation: `${pulse} 1.5s ease-in-out 0.5s infinite`,
  borderRadius: "4px",
  "@media": {
    "(prefers-color-scheme: dark)": {
      background: "linear-gradient(90deg, #333 25%, #444 50%, #333 75%)",
    },
  },
});

export const text = style({
  height: "1em",
  marginBottom: "0.5em",
});

export const rectangular = style({
  borderRadius: "4px",
});

export const circular = style({
  borderRadius: "50%",
});
