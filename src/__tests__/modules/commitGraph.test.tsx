import { render, screen } from "@testing-library/react";

import CommitGraph from "~/modules/experiences/commitGraph";

const commits = (container: HTMLElement) => container.querySelectorAll("[data-commit]");

const job = (company: string, years = "2019 – 2022", current = false) => ({
  company,
  years,
  current,
});

describe("CommitGraph", () => {
  it.each([1, 4, 14])("renders %i commits with company and years", (count) => {
    const jobs = Array.from({ length: count }, (_, i) =>
      job(`Co ${i}`, `${2000 + i} – ${2001 + i}`),
    );
    const { container } = render(<CommitGraph jobs={jobs} label="Career" />);
    expect(commits(container)).toHaveLength(count);
    jobs.forEach(({ company, years }) => {
      expect(screen.getByText(company)).toBeInTheDocument();
      expect(screen.getByText(years)).toBeInTheDocument();
    });
  });

  it("puts the current job on the main line and every past job on a branch", () => {
    const { container } = render(
      <CommitGraph jobs={[job("Old"), job("Now", "2026 – present", true)]} label="Career" />,
    );
    const [newest, older] = Array.from(commits(container));
    expect(newest.querySelector("circle")!.getAttribute("cx")).toBe("12");
    expect(newest.querySelector("path")).toBeNull();
    expect(older.querySelector("circle")!.getAttribute("cx")).toBe("40");
    expect(older.querySelector("path")).not.toBeNull();
  });

  it("keeps the graph height proportional to the number of jobs, so it never shrinks", () => {
    const height = (count: number) => {
      const { container } = render(
        <CommitGraph jobs={Array.from({ length: count }, (_, i) => job(`C${i}`))} label="x" />,
      );
      return Number(container.querySelector("svg")!.getAttribute("viewBox")!.split(" ")[3]);
    };
    expect(height(8) - height(4)).toBe(height(4) - height(0));
  });

  it("shortens a very long company name and shows the root label", () => {
    render(
      <CommitGraph
        jobs={[job("A company with an exceptionally long legal name Ltd")]}
        since="Started 2019"
        label="Career"
      />,
    );
    expect(screen.getByText(/…$/)).toBeInTheDocument();
    expect(screen.getByText("Started 2019")).toBeInTheDocument();
  });

  it("has an accessible name", () => {
    render(<CommitGraph jobs={[job("Jurnie")]} label="Career drawn as a git branch graph" />);
    expect(screen.getByRole("img", { name: /branch graph/ })).toBeInTheDocument();
  });
});
