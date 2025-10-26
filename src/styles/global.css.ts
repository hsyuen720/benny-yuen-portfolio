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
