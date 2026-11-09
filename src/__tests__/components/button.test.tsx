import { render, screen } from "@testing-library/react";

import Button from "~/components/button";

describe("Button Component", () => {
  it("renders a button with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toHaveAttribute("type", "button");
  });

  it("applies disabled attribute when disabled", () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("renders as a link when href is given", () => {
    render(<Button href="https://example.com">Link</Button>);
    expect(screen.getByRole("link")).toHaveAttribute("href", "https://example.com");
  });

  it("keeps the accessible name of an icon-only link", () => {
    const MockIcon = () => <svg data-testid="icon" />;
    render(<Button href="https://github.com" icon={MockIcon} aria-label="GitHub" title="GitHub" />);
    expect(screen.getByRole("link", { name: "GitHub" })).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders with custom className", () => {
    render(<Button className="custom-class">Button</Button>);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });
});
