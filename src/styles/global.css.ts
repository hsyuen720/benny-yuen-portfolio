import { globalStyle } from "@vanilla-extract/css";

import { colors, fonts, hairline, reducedMotion, transition } from "./theme.css";

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
});

globalStyle("html", {
  colorScheme: "dark",
  backgroundColor: colors.page,
  scrollBehavior: "smooth",
  scrollbarColor: `${colors.line2} ${colors.page}`,
  "@media": { [reducedMotion]: { scrollBehavior: "auto" } },
});

globalStyle("html, body", {
  overflowX: "clip",
});

globalStyle("body", {
  backgroundColor: colors.page,
  color: colors.text2,
  fontFamily: fonts.body,
  fontSize: "17px",
  lineHeight: 1.6,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
});

globalStyle("h1, h2, h3", {
  fontFamily: fonts.display,
  fontWeight: 400,
  color: colors.text,
  overflowWrap: "break-word",
  minWidth: 0,
  fontSynthesis: "none",
});

globalStyle("button", {
  font: "inherit",
  color: "inherit",
});

globalStyle("ol, ul", {
  listStyle: "none",
});

globalStyle("img, picture, svg", {
  maxWidth: "100%",
  display: "block",
});

globalStyle("a:focus-visible, button:focus-visible", {
  outline: `2px solid ${colors.gold}`,
  outlineOffset: "3px",
  borderRadius: "6px",
});

// --nav-height is set by the navbar; minus 1px tucks the section's top hairline under the header's
globalStyle("section[id]", {
  scrollMarginTop: "calc(var(--nav-height, 65px) - 1px)",
});

globalStyle("::selection", {
  backgroundColor: "rgba(255, 183, 3, 0.28)",
});

globalStyle("*, *::before, *::after", {
  "@media": {
    [reducedMotion]: {
      animationDuration: "0.01ms !important",
      animationIterationCount: "1 !important",
      transitionDuration: "0.01ms !important",
    },
  },
});

// Line palette for every Hairline figure; a figure can override the plate with its own class
globalStyle("[data-hairline]", {
  vars: {
    "--hairline-plate": colors.page,
    "--hairline-hi": hairline.hi,
    "--hairline-edge": hairline.edge,
    "--hairline-mid": hairline.mid,
    "--hairline-lo": hairline.lo,
  },
});

globalStyle("a", {
  color: colors.text,
  textDecorationColor: colors.line2,
  textUnderlineOffset: "0.22em",
  transition: transition("hover", "text-decoration-color"),
});

globalStyle("a:hover", {
  textDecorationColor: colors.text,
});
