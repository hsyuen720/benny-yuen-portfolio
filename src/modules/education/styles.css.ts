import { style } from "@vanilla-extract/css";

import { glow } from "~/styles/theme.css";

export const figure = style({
  marginTop: "16px",
  width: "100%",
  maxWidth: "380px",
});

// Static warm light behind the section's figure
export const band = style({
  backgroundImage: glow("22%", "55%"),
});
