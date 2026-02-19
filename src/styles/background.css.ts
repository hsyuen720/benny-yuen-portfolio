import { style, keyframes, createVar } from "@vanilla-extract/css";

const blobColor1 = createVar();
const blobColor2 = createVar();
const blobColor3 = createVar();

const float1 = keyframes({
  "0%": { transform: "translate(0, 0) scale(1)" },
  "33%": { transform: "translate(30px, -50px) scale(1.05)" },
  "66%": { transform: "translate(-20px, 20px) scale(0.95)" },
  "100%": { transform: "translate(0, 0) scale(1)" },
});

const float2 = keyframes({
  "0%": { transform: "translate(0, 0) scale(1)" },
  "33%": { transform: "translate(-40px, 30px) scale(1.08)" },
  "66%": { transform: "translate(25px, -35px) scale(0.92)" },
  "100%": { transform: "translate(0, 0) scale(1)" },
});

const float3 = keyframes({
  "0%": { transform: "translate(0, 0) scale(1)" },
  "33%": { transform: "translate(20px, 40px) scale(0.96)" },
  "66%": { transform: "translate(-30px, -25px) scale(1.04)" },
  "100%": { transform: "translate(0, 0) scale(1)" },
});

export const backgroundContainer = style({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
  zIndex: 0,
  pointerEvents: "none",
  vars: {
    [blobColor1]: "rgba(255, 183, 3, 0.15)",
    [blobColor2]: "rgba(59, 130, 246, 0.12)",
    [blobColor3]: "rgba(139, 92, 246, 0.1)",
  },
});

const blobBase = style({
  position: "absolute",
  borderRadius: "50%",
  filter: "blur(80px)",
  opacity: 0.6,
});

export const blob1 = style([
  blobBase,
  {
    width: "40vw",
    height: "40vw",
    top: "10%",
    left: "5%",
    background: blobColor1,
    animation: `${float1} 20s ease-in-out infinite`,
  },
]);

export const blob2 = style([
  blobBase,
  {
    width: "35vw",
    height: "35vw",
    top: "50%",
    right: "5%",
    background: blobColor2,
    animation: `${float2} 25s ease-in-out infinite`,
  },
]);

export const blob3 = style([
  blobBase,
  {
    width: "30vw",
    height: "30vw",
    bottom: "10%",
    left: "30%",
    background: blobColor3,
    animation: `${float3} 22s ease-in-out infinite`,
  },
]);
