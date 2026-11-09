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

// A faint warm light behind the main visual of a section (photo, figure). Fixed to the
// viewport so it stays in view through long sections, and only paints inside its band.
export const glow = (x: string, y: string, size = "38% 55%", strength = 0.09) => ({
  backgroundImage: `radial-gradient(ellipse ${size} at ${x} ${y}, rgba(255, 183, 3, ${strength}), transparent 70%)`,
  backgroundAttachment: "fixed",
});

// Frosted surface for cards that sit over a glow; on plain black it reads as a normal card
export const glass = {
  backgroundColor: "rgba(38, 36, 33, 0.55)",
  backdropFilter: "blur(16px) saturate(140%)",
  WebkitBackdropFilter: "blur(16px) saturate(140%)",
  border: `1px solid ${colors.line2}`,
  boxShadow: "inset 0 1px 0 rgba(239, 233, 222, 0.06)",
};

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
