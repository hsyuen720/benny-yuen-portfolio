import { keyframes, style } from "@vanilla-extract/css";

import { breakpoint, colors, layout, reducedMotion, glow } from "~/styles/theme.css";

export const aside = style({
  position: "sticky",
  top: `calc(${layout.navHeight} + 24px)`,
  "@media": {
    [`(max-width: ${breakpoint})`]: { position: "static" },
  },
});

export const graph = style({
  marginTop: "16px",
  maxWidth: "380px",
});

const draw = keyframes({
  from: { transform: "scaleY(0)" },
  to: { transform: "scaleY(1)" },
});

// The spine draws with scroll where supported; elsewhere it is fully drawn
export const timeline = style({
  position: "relative",
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      left: "5px",
      top: "12px",
      bottom: "12px",
      width: "1px",
      backgroundColor: colors.line2,
      transformOrigin: "top",
    },
  },
  "@supports": {
    "(animation-timeline: view())": {
      selectors: {
        "&::before": {
          animation: `${draw} linear both`,
          animationTimeline: "view()",
          animationRange: "entry 10% cover 60%",
        },
      },
      "@media": {
        [reducedMotion]: {
          selectors: { "&::before": { animation: "none" } },
        },
      },
    },
  },
});

export const item = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  padding: "0 0 52px 40px",
  selectors: {
    "&:last-child": { paddingBottom: "4px" },
  },
});

export const dot = style({
  position: "absolute",
  left: 0,
  top: "7px",
  width: "11px",
  height: "11px",
  borderRadius: "50%",
  backgroundColor: "var(--band)",
  border: `1px solid ${colors.text2}`,
});

export const current = style({
  backgroundColor: colors.gold,
  borderColor: colors.gold,
});

export const range = style({
  fontSize: "15px",
  color: colors.text2,
  fontVariantNumeric: "tabular-nums",
});

export const currentRange = style({
  color: colors.text,
});

export const role = style({
  fontSize: "28px",
  lineHeight: 1.15,
  letterSpacing: "-0.02em",
});

export const place = style({
  fontSize: "15px",
  color: colors.muted,
});

// Static warm light behind the section's figure
export const band = style({
  backgroundImage: glow("22%", "30%", "38% 40%"),
});
