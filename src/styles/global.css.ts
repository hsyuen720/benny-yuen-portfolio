import { globalStyle } from "@vanilla-extract/css";

import { colors } from "./theme.css";

/* Critical above-the-fold styles for faster FCP */
globalStyle("html, body", {
  height: "100%",
  backgroundColor: colors.primary,
  color: colors.primaryText,
  margin: 0,
  padding: 0,
});

globalStyle("::selection", {
  backgroundColor: colors.highlight,
  color: colors.primary,
});

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

globalStyle("*", {
  margin: "unset",
  padding: "unset",
  font: "inherit",
});

globalStyle('ul[role="list"], ol[role="list"]', {
  listStyle: "none",
});

globalStyle("html", {
  scrollbarColor: `${colors.highlight} ${colors.primary}`,
});

globalStyle("html:focus-within", {
  scrollBehavior: "smooth",
});

globalStyle("body", {
  textRendering: "optimizeSpeed",
  lineHeight: 1.5,
  /* Prevent FOIT (Flash of Invisible Text) */
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  position: "relative",
});

/* Subtle noise/grain overlay for atmospheric depth */
globalStyle("body::after", {
  content: '""',
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  zIndex: 9999,
  opacity: 0.015,
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
  backgroundRepeat: "repeat",
  backgroundSize: "256px 256px",
});

globalStyle("a:not([class])", {
  textDecorationSkipInk: "auto",
});

globalStyle("img, picture, svg", {
  maxWidth: "100%",
  display: "block",
});

// Media query for reduced motion
globalStyle("@media (prefers-reduced-motion: reduce)", {
  "@supports": {
    "html:focus-within": {
      scrollBehavior: "auto",
    },
  },
});

globalStyle("@media (prefers-reduced-motion: reduce) *", {
  animationDuration: "0.01ms",
  animationIterationCount: 1,
  transitionDuration: "0.01ms",
});

globalStyle("@media (prefers-reduced-motion: reduce) *::before", {
  animationDuration: "0.01ms",
  animationIterationCount: 1,
  transitionDuration: "0.01ms",
});

globalStyle("@media (prefers-reduced-motion: reduce) *::after", {
  animationDuration: "0.01ms",
  animationIterationCount: 1,
  transitionDuration: "0.01ms",
});
