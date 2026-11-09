import { render, screen } from "@testing-library/react";

import BookStack from "~/modules/education/bookStack";

const books = (container: HTMLElement) => container.querySelectorAll("[data-book]");

describe("BookStack", () => {
  it.each([1, 2, 5])("draws %i books for %i degrees", (count) => {
    const years = Array.from({ length: count }, (_, i) => String(2015 + i * 4));
    const { container } = render(<BookStack years={years} label="Education" />);
    expect(books(container)).toHaveLength(count);
    years.forEach((year) => expect(screen.getByText(year)).toBeInTheDocument());
  });

  it("stacks each newer book above the older one", () => {
    const { container } = render(<BookStack years={["2019", "2027"]} label="Education" />);
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
    const { container } = render(<BookStack years={[]} label="Education as books" />);
    expect(screen.getByRole("img", { name: "Education as books" })).toBeInTheDocument();
    expect(books(container)).toHaveLength(0);
  });
});
