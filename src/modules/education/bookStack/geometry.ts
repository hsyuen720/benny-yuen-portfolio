import { box, project } from "~/modules/experiences/commitGraph/geometry";

const LENGTH = 150; // along u
const DEPTH = 100; // along v
const THICK = 30; // one book per degree
const SHIFT = 12; // alternate books slide a little so the pile looks hand-stacked
const fmt = ([x, y]: [number, number]) => `${x.toFixed(1)} ${y.toFixed(1)}`;

/** A pile of books, oldest at the bottom, one per degree. */
export const buildBooks = (count: number) => {
  const books = Array.from({ length: count }, (_, i) => {
    const du = i % 2 === 0 ? 0 : SHIFT;
    const dv = i % 2 === 0 ? 0 : -SHIFT / 2;
    const [u0, u1, v0, v1] = [du, LENGTH + du, dv, DEPTH + dv];
    const z0 = i * THICK;
    const z1 = z0 + THICK;
    // Page edges on the two visible sides, inset from the covers
    const pageLines = [THICK / 3, (2 * THICK) / 3].flatMap((h) => [
      `M${fmt(project(u1, v0 + 6, z0 + h))}L${fmt(project(u1, v1 - 6, z0 + h))}`,
      `M${fmt(project(u0 + 6, v1, z0 + h))}L${fmt(project(u1 - 6, v1, z0 + h))}`,
    ]);
    // Label just outside the book's right-most corner (u1, v0)
    const [cx, cy] = project(u1, v0, z0 + THICK / 2);
    const [lx, ly] = [cx + 12, cy];
    return {
      ...box(u0, u1, v0, v1, z0, z1),
      pages: pageLines.join(""),
      isTop: i === count - 1,
      index: i,
      label: { x: lx, y: ly + 3 },
    };
  });

  const top = Math.max(count, 1) * THICK;
  const corners = [
    project(0, 0, top),
    project(LENGTH + SHIFT, -SHIFT, top),
    project(0, DEPTH, 0),
    project(LENGTH + SHIFT, DEPTH, 0),
  ];
  const xs = [...corners.map(([x]) => x), Math.max(...corners.map(([x]) => x)) + 48]; // year labels
  const ys = corners.map(([, y]) => y);
  const pad = 8;
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const viewBox = [minX, minY, Math.max(...xs) + pad - minX, Math.max(...ys) + pad - minY]
    .map((n) => n.toFixed(1))
    .join(" ");

  return { viewBox, books };
};
