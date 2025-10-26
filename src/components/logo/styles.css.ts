import { style } from "@vanilla-extract/css";

import { fontSizes } from "~/styles/theme.css";

export const logo = style({
  fontSize: fontSizes.xl,
  userSelect: "none",
});
