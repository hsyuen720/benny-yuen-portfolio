import { render, screen } from "@testing-library/react";

import BookStack from "~/modules/education/bookStack";

const books = (container: HTMLElement) => container.querySelectorAll("[data-book]");

describe("BookStack", () => {
  const degrees = (count: number) =>
    Array.from({ length: count }, (_, i) => ({
      title: `Degree ${i}`,
      years: `${2015 + i} – ${2019 + i}`,
    }));

  it.each([1, 2, 5])("draws %i books with name and years for %i degrees", (count) => {
    const items = degrees(count);
    const { container } = render(<BookStack books={items} label="Education" />);
    expect(books(container)).toHaveLength(count);
    items.forEach(({ title, years }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(years)).toBeInTheDocument();
    });
  });

  it("shortens a long degree name on the spine", () => {
    render(
      <BookStack
        books={[{ title: "Master of Science in Computer Science and Engineering", years: "2025" }]}
        label="Education"
      />,
    );
    expect(screen.getByText(/…$/)).toBeInTheDocument();
  });

  it("stacks each newer book above the older one", () => {
    const { container } = render(<BookStack books={degrees(2)} label="Education" />);
    const topY = (g: Element) =>
      Math.min(
        ...g
          .querySelector("path")!
          .getAttribute("d")!
          .match(/-?\d+(\.\d+)?/g)!
          .map(Number)
          .filter((_, i) => i % 2 === 1),
      );
    const [older, newer] = Array.from(books(container));
    expect(topY(newer)).toBeLessThan(topY(older));
  });

  it("has an accessible name and renders nothing for no degrees", () => {
    const { container } = render(<BookStack books={[]} label="Education as books" />);
    expect(screen.getByRole("img", { name: "Education as books" })).toBeInTheDocument();
    expect(books(container)).toHaveLength(0);
  });

  it("hangs the ribbon on the degree in progress, not simply the top book", () => {
    const ribbons = (items: { title: string; years: string; current?: boolean }[]) => {
      const { container, unmount } = render(<BookStack books={items} label="Education" />);
      const found = Array.from(books(container)).map((b) => !!b.querySelector("[data-ribbon]"));
      unmount();
      return found;
    };
    expect(
      ribbons([
        { title: "BSc", years: "2015 – 2019" },
        { title: "MSc", years: "2020 – 2022" },
      ]),
    ).toEqual([false, false]);
    expect(
      ribbons([
        { title: "BSc", years: "2015 – 2019", current: true },
        { title: "Cert", years: "2020" },
      ]),
    ).toEqual([true, false]);
  });
});
