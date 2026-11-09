export const colors = {
  deep: "#12110f",
  page: "#161513",
  card: "#1c1a18",
  raised: "#262421",
  raisedHover: "#2e2b28",
  text: "#efe9de",
  text2: "#aaa398",
  muted: "#8a847a",
  line: "rgba(239, 233, 222, 0.09)",
  line2: "rgba(239, 233, 222, 0.16)",
  gold: "#ffb703",
  goldHover: "#ffc22e",
  goldInk: "#1f1600",
};

// Line colours shared by the Hairline figures and the commit graph
export const hairline = {
  hi: colors.gold,
  edge: colors.text2,
  mid: "#5a554d",
  lo: "#2e2b27",
};

// A faint warm light behind the main visual of a section (photo, figure). It is a sticky,
// screen-sized layer inside the band: it stays in view through long sections, only paints
// inside its band, and scrolls on the compositor (no per-frame repaint, unlike a fixed
// background). Spread it into the band's style; the band must be a flex column (sections are).
export const glow = (x: string, y: string, size = "38% 55%", strength = 0.09) => ({
  // A band shorter than the screen would let the glow layer hang past it and lengthen the page;
  // clip (unlike hidden) is not a scroll container, so the sticky layer still follows the viewport
  overflow: "clip" as const,
  selectors: {
    "&::before": {
      content: '""',
      position: "sticky" as const,
      top: layout.navHeight,
      display: "block",
      flexShrink: 0,
      height: `calc(100svh - ${layout.navHeight})`,
      // Takes no room in the layout: the section's content starts at the band's top
      marginBottom: `calc(${layout.navHeight} - 100svh)`,
      pointerEvents: "none" as const,
      backgroundImage: `radial-gradient(ellipse ${size} at ${x} ${y}, rgba(255, 183, 3, ${strength}), transparent 70%)`,
    },
  },
});

export const fonts = {
  display: `var(--font-display), ui-sans-serif, system-ui, sans-serif`,
  body: `var(--font-body), ui-sans-serif, system-ui, sans-serif`,
};

export const radii = {
  button: "10px",
  tag: "6px",
  card: "20px",
  media: "12px",
};

export const layout = {
  maxWidth: "1160px",
  gutter: "32px",
  gutterMobile: "16px",
  navHeight: "52px",
};

export const breakpoint = "720px";

export const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

export const durations = {
  press: "120ms",
  hover: "150ms",
  indicator: "300ms",
  entrance: "500ms",
};

export const transition = (duration: keyof typeof durations, ...properties: string[]) =>
  properties.map((p) => `${p} ${durations[duration]} ${ease}`).join(", ");

export const reducedMotion = "(prefers-reduced-motion: reduce)";
