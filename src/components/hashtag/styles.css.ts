import { style } from "@vanilla-extract/css";

import { glassPill } from "~/styles/glass.css";
import { colors } from "~/styles/theme.css";

export const container = style([
  glassPill,
  {
    fontStyle: "italic",
    padding: "0.15em 0.6em",
    color: colors.primaryText,
    fontSize: "0.9em",
  },
]);

export const isDark = style({
  background: "rgba(245, 245, 245, 0.1)",
  border: "1px solid rgba(245, 245, 245, 0.12)",
});
