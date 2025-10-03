import { render, screen } from "@testing-library/react";

import Heading from "~/components/heading";

describe("Heading Component", () => {
  it("renders title", () => {
    render(<Heading title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<Heading title="Title" description="Description text" />);
    expect(screen.getByText("Description text")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    const { container } = render(<Heading title="Title" />);
    const description = container.querySelector(".description");
    expect(description).not.toBeInTheDocument();
  });

  it("renders separator when isSeparatorShown is true", () => {
    const { container } = render(<Heading title="Title" isSeparatorShown />);
    const separator = container.querySelector(".separator");
    expect(separator).toBeInTheDocument();
  });

  it("does not render separator by default", () => {
    const { container } = render(<Heading title="Title" />);
    const separator = container.querySelector(".separator");
    expect(separator).not.toBeInTheDocument();
  });

  it("applies dark class when isDark is true", () => {
    const { container } = render(<Heading title="Title" isDark />);
    const heading = container.querySelector(".sectionTitle");
    expect(heading).toHaveClass("isDark");
  });

  it("renders title as h2 element", () => {
    render(<Heading title="My Heading" />);
    const h2 = screen.getByRole("heading", { level: 2 });
    expect(h2).toHaveTextContent("My Heading");
  });
});
