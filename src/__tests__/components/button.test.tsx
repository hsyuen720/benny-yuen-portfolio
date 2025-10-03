import { render, screen } from "@testing-library/react";

import Button from "~/components/button";

describe("Button Component", () => {
  it("renders button with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders button with title prop", () => {
    render(<Button title="Submit" />);
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("shows loading text when isLoading is true", () => {
    render(<Button isLoading>Click me</Button>);
    expect(screen.getByText("text.loading")).toBeInTheDocument();
  });

  it("applies disabled attribute when disabled", () => {
    render(<Button disabled>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("applies dark class when isDark is true", () => {
    const { container } = render(<Button isDark>Dark Button</Button>);
    const button = container.querySelector("button");
    expect(button).toHaveClass("isDark");
  });

  it("renders as anchor tag when tag is 'a'", () => {
    render(
      <Button tag="a" href="https://example.com">
        Link
      </Button>,
    );
    const link = screen.getByRole("link");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  it("applies icon-only class when only icon is provided", () => {
    const MockIcon = () => <svg data-testid="icon" />;
    const { container } = render(<Button icon={MockIcon} />);
    const button = container.querySelector("button");
    expect(button).toHaveClass("isIconOnly");
  });

  it("renders with custom className", () => {
    const { container } = render(<Button className="custom-class">Button</Button>);
    const button = container.querySelector("button");
    expect(button).toHaveClass("custom-class");
  });
});
