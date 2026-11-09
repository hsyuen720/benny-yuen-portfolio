import { globalStyle, style } from "@vanilla-extract/css";

import { breakpoint, colors, radii } from "~/styles/theme.css";

export const card = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
  alignItems: "stretch",
  borderRadius: radii.card,
  border: `1px solid ${colors.line}`,
  backgroundColor: colors.card,
  overflow: "hidden",
});

export const large = style({});
export const small = style({});

export const media = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "12px",
  borderRadius: radii.media,
  backgroundColor: colors.deep,
  overflow: "hidden",
  minHeight: "260px",
  selectors: {
    [`${large} &`]: { minHeight: "500px" },
  },
  "@media": {
    [`(max-width: ${breakpoint})`]: {
      selectors: { [`${large} &`]: { minHeight: "320px" } },
    },
  },
});

export const image = style({
  objectFit: "cover",
});

// Stand-in when a project has no screenshot: the Exploded figure on the media panel
export const figure = style({
  width: "min(100%, 520px)",
  // The drawing sits low and slightly left inside Hairline's 5:4 box; this centres its resting state
  translate: "5% -21%",
  selectors: {
    "&[data-hairline]": { vars: { "--hairline-plate": colors.deep } },
  },
});

export const body = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "20px",
  minWidth: 0,
  padding: "44px 40px 40px 28px",
  selectors: {
    [`${small} &`]: { gap: "12px", padding: "32px 40px 32px 28px" },
  },
  "@media": {
    [`(max-width: ${breakpoint})`]: {
      selectors: {
        [`${large} &, ${small} &`]: { padding: "16px 24px 28px" },
      },
    },
  },
});

export const titleRow = style({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "16px",
});

export const title = style({
  fontSize: "34px",
  lineHeight: 1.04,
  letterSpacing: "-0.025em",
  selectors: {
    [`${large} &`]: { fontSize: "clamp(36px, 4vw, 48px)", letterSpacing: "-0.03em" },
  },
});

export const badge = style({
  fontSize: "13px",
  fontWeight: 500,
  lineHeight: 1,
  padding: "6px 10px",
  borderRadius: radii.tag,
  border: `1px solid ${colors.line2}`,
  color: colors.text2,
});

export const summary = style({
  maxWidth: "440px",
  selectors: {
    [`${large} &`]: { fontSize: "18px" },
  },
});

export const rows = style({
  display: "flex",
  flexDirection: "column",
  fontSize: "15px",
});

export const row = style({
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
  padding: "12px 0",
  borderTop: `1px solid ${colors.line}`,
  selectors: {
    "&:last-child": { borderBottom: `1px solid ${colors.line}` },
  },
});

export const rowLabel = style({
  color: colors.muted,
});

export const rowValue = style({
  color: colors.text,
  textAlign: "right",
});

export const stackLine = style({
  fontSize: "15px",
  color: colors.muted,
});

export const links = style({
  display: "flex",
  gap: "24px",
  fontWeight: 500,
  selectors: {
    "&:empty": { display: "none" },
  },
});

globalStyle(`${links} a`, {
  padding: "8px 0",
});
