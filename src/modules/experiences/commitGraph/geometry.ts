// Isometric projection: u runs along the main line, v across it, z is height.
// Screen x = (u - v)·cos30°, y = (u + v)·sin30° − z.
const COS = Math.cos(Math.PI / 6);
const project = (u: number, v: number, z: number): [number, number] => [
  (u - v) * COS,
  (u + v) * 0.5 - z,
];

type Point3 = [number, number, number];
const path = (points: Point3[]) =>
  `M${points
    .map((p) => project(...p))
    .map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`)
    .join("L")}Z`;

/** The three faces of a box you can see: +u side, +v side, top. */
const box = (u0: number, u1: number, v0: number, v1: number, z0: number, z1: number) => ({
  sideU: path([
    [u1, v0, z0],
    [u1, v1, z0],
    [u1, v1, z1],
    [u1, v0, z1],
  ]),
  sideV: path([
    [u0, v1, z0],
    [u1, v1, z0],
    [u1, v1, z1],
    [u0, v1, z1],
  ]),
  top: path([
    [u0, v0, z1],
    [u1, v0, z1],
    [u1, v1, z1],
    [u0, v1, z1],
  ]),
});

const STEP = 60; // distance between commits along the main line
const HALF = 11; // half the width of a commit box
const HEIGHT = 8;
const HEAD_HEIGHT = 24;
const BOARD_PAD = 32;
const BOARD_HALF = 30;
const BOARD_DEPTH = 8;

export const buildGraph = (count: number) => {
  const length = Math.max(count - 1, 0) * STEP;
  const board = box(-BOARD_PAD, length + BOARD_PAD, -BOARD_HALF, BOARD_HALF, -BOARD_DEPTH, 0);
  const [x0, y0] = project(-BOARD_PAD / 2, 0, 0);
  const [x1, y1] = project(length + BOARD_PAD / 2, 0, 0);
  const mainLine = `M${x0.toFixed(1)} ${y0.toFixed(1)}L${x1.toFixed(1)} ${y1.toFixed(1)}`;

  const commits = Array.from({ length: count }, (_, i) => {
    const u = i * STEP;
    const isHead = i === count - 1;
    const [lx, ly] = project(u, HALF + 14, 0);
    return {
      ...box(u - HALF, u + HALF, -HALF, HALF, 0, isHead ? HEAD_HEIGHT : HEIGHT),
      isHead,
      label: { x: lx, y: ly + 6 },
    };
  });

  // View box from the board's outer corners, with room for labels and the head
  const corners = [
    project(-BOARD_PAD, -BOARD_HALF, HEAD_HEIGHT + 8),
    project(length + BOARD_PAD, -BOARD_HALF, 0),
    project(-BOARD_PAD, BOARD_HALF, 0),
    project(length + BOARD_PAD, BOARD_HALF, -BOARD_DEPTH),
  ];
  const xs = corners.map(([x]) => x);
  const ys = corners.map(([, y]) => y);
  const pad = 8;
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const viewBox = [minX, minY, Math.max(...xs) + pad - minX, Math.max(...ys) + pad - minY]
    .map((n) => n.toFixed(1))
    .join(" ");

  return { viewBox, board, mainLine, commits };
};
