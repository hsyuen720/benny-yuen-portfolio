// Isometric projection: u runs along the main line, v across it, z is height.
// Screen x = (u - v)·cos30°, y = (u + v)·sin30° − z.
const COS = Math.cos(Math.PI / 6);
export const project = (u: number, v: number, z: number): [number, number] => [
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
export const box = (u0: number, u1: number, v0: number, v1: number, z0: number, z1: number) => ({
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

const STEP = 60; // distance between commits on a floor
const PER_FLOOR = 4; // a long career stacks more floors upward, so the width (and scale) never changes
const FLOOR_GAP = 64; // height between floors
const HALF = 11; // half the width of a commit box
const HEIGHT = 8;
const HEAD_HEIGHT = 24;
const BOARD_PAD = 32;
const BOARD_HALF = 30;
const BOARD_DEPTH = 8;

const fmt = ([x, y]: [number, number]) => `${x.toFixed(1)} ${y.toFixed(1)}`;

export const buildGraph = (count: number) => {
  const floorCount = Math.max(Math.ceil(count / PER_FLOOR), 1);
  const length = (Math.min(Math.max(count, 1), PER_FLOOR) - 1) * STEP;

  // Floors snake: odd floors run back, so the line climbs straight up between floors.
  // Oldest commit on the bottom floor, newest on top.
  const spots = Array.from({ length: count }, (_, i) => {
    const floor = Math.floor(i / PER_FLOOR);
    const k = i % PER_FLOOR;
    return { u: (floor % 2 === 0 ? k : PER_FLOOR - 1 - k) * STEP, z: floor * FLOOR_GAP, floor };
  });

  const floors = Array.from({ length: floorCount }, (_, f) => {
    const z = f * FLOOR_GAP;
    const own = spots.map((s, i) => ({ ...s, i })).filter((s) => s.floor === f);
    const points: [number, number][] = [];
    if (f > 0 && own.length) points.push(project(own[0].u, 0, z - FLOOR_GAP)); // climb from the floor below
    if (f === 0 && own.length) points.push(project(own[0].u - BOARD_PAD / 2, 0, z)); // lead-in
    own.forEach((s) => points.push(project(s.u, 0, z)));
    return {
      board: box(-BOARD_PAD, length + BOARD_PAD, -BOARD_HALF, BOARD_HALF, z - BOARD_DEPTH, z),
      line: points.length > 1 ? `M${points.map(fmt).join("L")}` : "",
      commits: own.map(({ u, i }) => {
        const isHead = i === count - 1;
        const [lx, ly] = project(u, HALF + 14, z);
        return {
          ...box(u - HALF, u + HALF, -HALF, HALF, z, z + (isHead ? HEAD_HEIGHT : HEIGHT)),
          isHead,
          index: i,
          label: { x: lx, y: ly + 6 },
        };
      }),
    };
  });

  // View box from the outer corners of the bottom and top floors, with room for the head
  const top = (floorCount - 1) * FLOOR_GAP + HEAD_HEIGHT + 8;
  const corners = [
    project(-BOARD_PAD, -BOARD_HALF, top),
    project(length + BOARD_PAD, -BOARD_HALF, top),
    project(-BOARD_PAD, BOARD_HALF, -BOARD_DEPTH),
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

  return { viewBox, floors };
};
