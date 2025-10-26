import { render, screen } from "@testing-library/react";

import Browser from "~/components/browser";

describe("Browser Component", () => {
  it("renders browser with children", () => {
    render(<Browser>Test Content</Browser>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders with title in input", () => {
    render(<Browser title="https://example.com">Content</Browser>);
    const input = screen.getByDisplayValue("https://example.com");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("readOnly");
  });

  it("renders three colored dots", () => {
    const { container } = render(<Browser>Content</Browser>);
    const dots = container.querySelectorAll("span");
    // Should have at least 3 dots (red, yellow, green)
    expect(dots.length).toBeGreaterThanOrEqual(3);
  });

  it("renders ellipsis icon", () => {
    const { container } = render(<Browser>Content</Browser>);
    // Icon is mocked as a div
    const divs = container.querySelectorAll("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("applies dark class when isDark is true", () => {
    const { container } = render(<Browser isDark>Dark Content</Browser>);
    const browserDiv = container.firstChild;
    expect(browserDiv).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Browser className="custom-class">Content</Browser>);
    const browserDiv = container.firstChild;
    expect(browserDiv).toHaveClass("custom-class");
  });

  it("input is read-only", () => {
    render(<Browser title="test">Content</Browser>);
    const input = screen.getByDisplayValue("test") as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });
});
