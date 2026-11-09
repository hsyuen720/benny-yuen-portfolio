import { style } from "@vanilla-extract/css";

import { colors, radii } from "~/styles/theme.css";

export const skeleton = style({
  backgroundColor: colors.card,
  borderRadius: radii.tag,
});

export const text = style({
  height: "1em",
  marginBottom: "0.5em",
});

export const rectangular = style({
  borderRadius: radii.media,
});

export const circular = style({
  borderRadius: "50%",
});
