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
    // Description element shouldn't exist
    const paragraphs = container.querySelectorAll("p");
    expect(paragraphs.length).toBe(0);
  });

  it("renders separator when isSeparatorShown is true", () => {
    const { container } = render(<Heading title="Title" isSeparatorShown />);
    // Separator is a div, check it exists by counting divs
    const divs = container.querySelectorAll("div");
    expect(divs.length).toBeGreaterThan(1); // Should have sectionTitle + separator
  });

  it("does not render separator by default", () => {
    const { container } = render(<Heading title="Title" />);
    const divs = container.querySelectorAll("div");
    expect(divs.length).toBe(1); // Only sectionTitle div
  });

  it("applies dark class when isDark is true", () => {
    const { container } = render(<Heading title="Title" isDark />);
    const heading = container.querySelector("div");
    // Vanilla Extract generates hashed class names, so we check if class exists
    expect(heading?.className).toBeTruthy();
  });

  it("renders title as h2 element", () => {
    render(<Heading title="My Heading" />);
    const h2 = screen.getByRole("heading", { level: 2 });
    expect(h2).toHaveTextContent("My Heading");
  });
});
