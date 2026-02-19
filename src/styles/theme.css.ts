export const colors = {
  primary: "#070707",
  highlight: "#ffb703",
  primaryText: "#f5f5f5",
  primaryAccentText: "#f8efe0",
  secondary: "#f8efe0",
  secondaryText: "#0b0c10",
  secondaryAccentText: "#183642",
};

export const fontSizes = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
};

export const fontWeights = {
  light: "300",
  normal: "400",
  bold: "700",
};

export const borderRadii = {
  xs: "0.125rem",
  sm: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
};

export const shadows = {
  sm: "0 1px 2px rgba(0, 0, 0, 0.3)",
  md: "0 4px 12px rgba(0, 0, 0, 0.25)",
  lg: "0 8px 24px rgba(0, 0, 0, 0.3)",
  glow: `0 0 20px rgba(255, 183, 3, 0.15)`,
};

export const zIndices = {
  header: "900",
  modal: "1000",
  tooltip: "1500",
};

export const ratio = 1.618;

export const breakpoint = "950px";

export const sectionPaddingHorizontal = {
  sm: "1.5rem",
  md: "6.5rem",
};

export const durations = {
  slowest: "500ms",
  slower: "400ms",
  slow: "300ms",
  normal: "200ms",
  fast: "150ms",
  faster: "100ms",
  fastest: "50ms",
};

// Helper function to create transition strings
export const transition = (duration: keyof typeof durations, property: string) => {
  return `${property} ${durations[duration]} cubic-bezier(0.4, 0, 0.2, 1)`;
};
