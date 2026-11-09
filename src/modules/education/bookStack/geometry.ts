const COS = Math.cos(Math.PI / 6);

// Isometric projection: u runs along the main line, v across it, z is height.
// Screen x = (u - v)·cos30°, y = (u + v)·sin30° − z.
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

const LENGTH = 230; // along u: long enough for a degree name on the spine
const DEPTH = 120; // along v
const THICK = 34; // one book per degree
const SHIFT = 14; // alternate books slide a little so the pile looks hand-stacked
const SPINE_CHARS = 21; // what fits on the spine at the label size; the full name is in aria-label
const fmt = ([x, y]: [number, number]) => `${x.toFixed(1)} ${y.toFixed(1)}`;

const fit = (text: string) =>
  text.length > SPINE_CHARS ? `${text.slice(0, SPINE_CHARS - 1).trimEnd()}…` : text;

/** A pile of books, oldest at the bottom, one per degree. */
export const buildBooks = (titles: string[]) => {
  const count = titles.length;
  const books = titles.map((title, i) => {
    const du = i % 2 === 0 ? 0 : SHIFT;
    const dv = i % 2 === 0 ? 0 : -SHIFT / 2;
    const [u0, u1, v0, v1] = [du, LENGTH + du, dv, DEPTH + dv];
    const z0 = i * THICK;
    const z1 = z0 + THICK;
    const isTop = i === count - 1;
    // Page edges on the short visible side
    const pages = [THICK / 3, (2 * THICK) / 3]
      .map((h) => `M${fmt(project(u1, v0 + 6, z0 + h))}L${fmt(project(u1, v1 - 6, z0 + h))}`)
      .join("");
    // Spine text lies on the long front face (v = v1): x runs along u, y stays vertical.
    // Name from the left end, years from the right end.
    const onSpine = (u: number) => {
      const [x, y] = project(u, v1, z0 + THICK / 2 - 5);
      return `matrix(${COS.toFixed(4)} 0.5 0 1 ${x.toFixed(1)} ${y.toFixed(1)})`;
    };
    // Bookmark ribbon hanging over the front face of the book being read
    const ribbonU = u1 - 104; // clear of the years at the right end
    const ribbon = isTop
      ? `M${fmt(project(ribbonU, v1, z1))}L${fmt(project(ribbonU + 12, v1, z1))}L${fmt(
          project(ribbonU + 12, v1, z0 - 14),
        )}L${fmt(project(ribbonU + 6, v1, z0 - 8))}L${fmt(project(ribbonU, v1, z0 - 14))}Z`
      : "";
    return {
      ...box(u0, u1, v0, v1, z0, z1),
      pages,
      ribbon,
      isTop,
      index: i,
      spine: { text: fit(title), transform: onSpine(u0 + 12) },
      years: { transform: onSpine(u1 - 12) },
    };
  });

  const top = Math.max(count, 1) * THICK;
  const corners = [
    project(0, 0, top),
    project(LENGTH + SHIFT, -SHIFT, top),
    project(0, DEPTH, -16), // ribbon tail can hang below the bottom book
    project(LENGTH + SHIFT, DEPTH, -16),
  ];
  const xs = corners.map(([x]) => x);
  const ys = corners.map(([, y]) => y);
  const pad = 8;
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const viewBox = [minX, minY, Math.max(...xs) + pad - minX, Math.max(...ys) + pad - minY]
    .map((n) => n.toFixed(1))
    .join(" ");

  return { viewBox, books };
};
