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
  color: colors.secondaryText,
  background: "rgba(0, 0, 0, 0.06)",
  border: "1px solid rgba(0, 0, 0, 0.1)",
});
