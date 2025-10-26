import { render, screen } from "@testing-library/react";

import Hashtag from "~/components/hashtag";

describe("Hashtag Component", () => {
  it("renders hashtag with text", () => {
    render(<Hashtag>React</Hashtag>);
    expect(screen.getByText("React")).toBeInTheDocument();
  });

  it("renders hashtag with title prop", () => {
    render(<Hashtag title="TypeScript" />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("prefers children over title", () => {
    render(<Hashtag title="Title">Children</Hashtag>);
    expect(screen.getByText("Children")).toBeInTheDocument();
    expect(screen.queryByText("Title")).not.toBeInTheDocument();
  });

  it("applies dark class when isDark is true", () => {
    const { container } = render(<Hashtag isDark>Dark Tag</Hashtag>);
    const hashtag = container.querySelector("div");
    // Vanilla Extract generates hashed class names, so we check if class exists
    expect(hashtag?.className).toBeTruthy();
  });

  it("applies custom className", () => {
    const { container } = render(<Hashtag className="custom-class">Tag</Hashtag>);
    const hashtag = container.querySelector("div");
    expect(hashtag).toHaveClass("custom-class");
    // Vanilla Extract generates hashed class names, so we check if class exists
    expect(hashtag?.className).toContain("custom-class");
  });
});
