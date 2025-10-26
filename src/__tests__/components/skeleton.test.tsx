import { render } from "@testing-library/react";

import Skeleton from "~/components/skeleton";

describe("Skeleton Component", () => {
  it("renders skeleton with default variant (text)", () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.firstChild;
    expect(skeleton).toBeInTheDocument();
  });

  it("renders with text variant", () => {
    const { container } = render(<Skeleton variant="text" />);
    const skeleton = container.firstChild;
    expect(skeleton).toBeInTheDocument();
  });

  it("renders with rectangular variant", () => {
    const { container } = render(<Skeleton variant="rectangular" />);
    const skeleton = container.firstChild;
    expect(skeleton).toBeInTheDocument();
  });

  it("renders with circular variant", () => {
    const { container } = render(<Skeleton variant="circular" />);
    const skeleton = container.firstChild;
    expect(skeleton).toBeInTheDocument();
  });

  it("applies custom width", () => {
    const { container } = render(<Skeleton width={200} />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton.style.width).toBe("200px");
  });

  it("applies custom height", () => {
    const { container } = render(<Skeleton height={100} />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton.style.height).toBe("100px");
  });

  it("applies custom width and height as strings", () => {
    const { container } = render(<Skeleton width="50%" height="2rem" />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton.style.width).toBe("50%");
    expect(skeleton.style.height).toBe("2rem");
  });

  it("applies custom className", () => {
    const { container } = render(<Skeleton className="custom-class" />);
    const skeleton = container.firstChild;
    expect(skeleton).toHaveClass("custom-class");
  });

  it("renders as a div element", () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.firstChild;
    expect(skeleton?.nodeName).toBe("DIV");
  });
});
