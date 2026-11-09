import { render, screen } from "@testing-library/react";

import Heading from "~/components/heading";

describe("Heading Component", () => {
  it("renders the title as an h2", () => {
    render(<Heading title="My Heading" />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("My Heading");
  });

  it("renders description when provided", () => {
    render(<Heading title="Title" description="Description text" />);
    expect(screen.getByText("Description text")).toBeInTheDocument();
  });

  it("does not render description when not provided", () => {
    const { container } = render(<Heading title="Title" />);
    expect(container.querySelectorAll("p")).toHaveLength(0);
  });
});
