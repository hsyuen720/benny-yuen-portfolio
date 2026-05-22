import { keyframes, style } from "@vanilla-extract/css";

import { durations, easings } from "~/styles/theme.css";

const fadeInUp = keyframes({
  from: {
    opacity: 0,
    transform: "translateY(30px)",
  },
  to: {
    opacity: 1,
    transform: "translateY(0)",
  },
});

const fadeInLeft = keyframes({
  from: {
    opacity: 0,
    transform: "translateX(-30px)",
  },
  to: {
    opacity: 1,
    transform: "translateX(0)",
  },
});

const fadeInRight = keyframes({
  from: {
    opacity: 0,
    transform: "translateX(30px)",
  },
  to: {
    opacity: 1,
    transform: "translateX(0)",
  },
});

const scaleIn = keyframes({
  from: {
    opacity: 0,
    transform: "scale(0.95)",
  },
  to: {
    opacity: 1,
    transform: "scale(1)",
  },
});

export const animationMap = {
  up: fadeInUp,
  left: fadeInLeft,
  right: fadeInRight,
  scale: scaleIn,
};

export const hidden = style({
  opacity: 0,
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      opacity: 1,
    },
  },
});

export const visible = style({
  animationDuration: durations.slowest,
  animationTimingFunction: easings.decelerate,
  animationFillMode: "both",
  "@media": {
    "(prefers-reduced-motion: reduce)": {
      animation: "none",
      opacity: 1,
    },
  },
});
