import { render, screen } from "@testing-library/react";
import { createElement } from "react";

import Label from "~/components/label";

describe("Label Component", () => {
  it("renders as span by default", () => {
    const { container } = render(<Label title="Test Label" />);
    const label = container.querySelector("span");
    expect(label).toBeInTheDocument();
  });

  it("renders with custom tag", () => {
    const { container } = render(<Label tag="div" title="Div Label" />);
    const label = container.querySelector("div");
    expect(label).toBeInTheDocument();
    expect(label?.tagName).toBe("DIV");
  });

  it("renders title text", () => {
    render(<Label title="Hello World" />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("renders children instead of title when both provided", () => {
    render(<Label title="Title">Children Text</Label>);
    expect(screen.getByText("Children Text")).toBeInTheDocument();
    expect(screen.queryByText("Title")).not.toBeInTheDocument();
  });

  it("renders icon when provided", () => {
    const MockIcon = () => createElement("svg", { "data-testid": "test-icon" });
    render(<Label icon={MockIcon} title="With Icon" />);
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Label className="custom" title="Test" />);
    const label = container.querySelector("span");
    expect(label).toHaveClass("custom");
    expect(label).toHaveClass("label");
  });

  it("renders without title when only icon is provided", () => {
    const MockIcon = () => createElement("svg", { "data-testid": "icon-only" });
    const { container } = render(<Label icon={MockIcon} />);
    expect(screen.getByTestId("icon-only")).toBeInTheDocument();
    expect(container.querySelector(".title")).not.toBeInTheDocument();
  });

  it("passes through HTML attributes", () => {
    render(<Label tag="button" title="Button" disabled />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
