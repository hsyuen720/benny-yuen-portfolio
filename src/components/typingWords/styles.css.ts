import { style, keyframes } from "@vanilla-extract/css";

const blinking = keyframes({
  "0%": { opacity: 0 },
  "50%": { opacity: 1 },
  "100%": { opacity: 0 },
});

export const container = style({
  display: "inline",
});

export const cursor = style({
  animation: `${blinking} 1s cubic-bezier(0.68, 0.01, 0.01, 0.99) 0s infinite`,
});
