import { render, screen } from "@testing-library/react";

import CommitGraph from "~/modules/experiences/commitGraph";

const commits = (container: HTMLElement) => container.querySelectorAll("[data-commit]");

describe("CommitGraph", () => {
  it.each([1, 4, 7])("renders %i commits for %i experiences", (count) => {
    const years = Array.from({ length: count }, (_, i) => String(2019 + i));
    const { container } = render(<CommitGraph years={years} label="Career" />);
    expect(commits(container)).toHaveLength(count);
    years.forEach((year) => expect(screen.getByText(year)).toBeInTheDocument());
  });

  it("draws the newest commit taller than the others", () => {
    const { container } = render(<CommitGraph years={["2019", "2022"]} label="Career" />);
    const [older, newest] = Array.from(commits(container));
    const height = (g: Element) => {
      const nums = g
        .querySelector("path")!
        .getAttribute("d")!
        .match(/-?\d+(\.\d+)?/g)!
        .map(Number);
      const ys = nums.filter((_, i) => i % 2 === 1);
      return Math.max(...ys) - Math.min(...ys);
    };
    expect(height(newest)).toBeGreaterThan(height(older));
  });

  it("has an accessible name", () => {
    render(<CommitGraph years={["2019"]} label="Career drawn as a commit graph: 2019" />);
    expect(screen.getByRole("img", { name: /commit graph/ })).toBeInTheDocument();
  });

  it("renders nothing but the board with no experiences", () => {
    const { container } = render(<CommitGraph years={[]} label="Career" />);
    expect(commits(container)).toHaveLength(0);
  });
});
