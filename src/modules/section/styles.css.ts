import { style } from "@vanilla-extract/css";

import { breakpoint, colors, layout } from "~/styles/theme.css";

// Each section fills at least one screen below the sticky nav, content centred vertically
export const section = style({
  position: "relative",
  minHeight: `calc(100svh - ${layout.navHeight})`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  borderTop: `1px solid ${colors.line}`,
  vars: { "--band": colors.page },
  backgroundColor: "var(--band)",
});

// Darker band: sections alternate tone so the page has rhythm. Children that paint the
// band colour (figure plates, hollow dots) read `--band`.
export const deep = style({
  vars: { "--band": colors.deep },
});

export const inner = style({
  position: "relative", // paints above the band's glow layer
  width: "100%",
  maxWidth: layout.maxWidth,
  margin: "0 auto",
  padding: `96px ${layout.gutter}`,
  "@media": {
    [`(max-width: ${breakpoint})`]: {
      padding: `72px ${layout.gutterMobile}`,
    },
  },
});

/** Two columns: a narrow left heading column and a wide right content column. */
export const split = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "56px",
});

export const splitAside = style({
  flex: "1 1 300px",
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  alignSelf: "flex-start",
});

export const splitMain = style({
  flex: "999 1 520px",
  minWidth: 0,
});

/** A label/value row on a hairline, used by the tools, stack and education lists. */
export const row = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 160px) minmax(0, 1fr)",
  gap: "4px 24px",
  padding: "18px 0",
  borderTop: `1px solid ${colors.line}`,
  selectors: {
    "&:last-child": { borderBottom: `1px solid ${colors.line}` },
  },
  "@media": {
    [`(max-width: ${breakpoint})`]: { gridTemplateColumns: "minmax(0, 1fr)" },
  },
});

export const rowLabel = style({
  color: colors.text,
});

export const listTitle = style({
  marginBottom: "12px",
  fontSize: "24px",
  letterSpacing: "-0.02em",
});
