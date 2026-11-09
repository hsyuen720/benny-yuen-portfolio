import { render, screen } from "@testing-library/react";

import ProjectCard from "~/modules/projects/projectCard";
import { toProject } from "~/utils/normalize";

// Hairline is an ESM-only package; the figure itself is not under test here
jest.mock("~/components/hairlineFigure", () => ({
  __esModule: true,
  default: () => <div data-testid="figure" />,
}));

const project = (fields: Record<string, unknown> = {}) =>
  toProject({ id: "p1", title: "Treklay", summary: "Budgets", ...fields });

describe("ProjectCard", () => {
  it("hides the status badge for live projects", () => {
    render(<ProjectCard project={project({ status: "live" })} size="large" />);
    expect(screen.queryByText("live")).not.toBeInTheDocument();
  });

  it("hides the status badge when status is missing (defaults to live)", () => {
    const { container } = render(<ProjectCard project={project()} size="large" />);
    expect(container.querySelector("h3")?.nextElementSibling).toBeNull();
  });

  it("shows the status badge for other statuses", () => {
    render(<ProjectCard project={project({ status: "In development" })} size="large" />);
    expect(screen.getByText("In development")).toBeInTheDocument();
  });

  it("renders label/value stack rows on large cards", () => {
    render(
      <ProjectCard
        project={project({ stack: [{ label: "App", value: "Expo, React Native" }] })}
        size="large"
      />,
    );
    expect(screen.getByText("App")).toBeInTheDocument();
    expect(screen.getByText("Expo, React Native")).toBeInTheDocument();
  });

  it("renders a one-line stack on small cards", () => {
    render(<ProjectCard project={project({ stack: ["React", "SVG"] })} size="small" />);
    expect(screen.getByText("React, SVG")).toBeInTheDocument();
  });

  it("draws the Exploded figure when there is no image", () => {
    render(<ProjectCard project={project()} size="large" />);
    expect(screen.getByTestId("figure")).toBeInTheDocument();
  });
});
