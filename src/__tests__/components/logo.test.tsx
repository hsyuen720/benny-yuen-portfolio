import { render, screen, fireEvent } from "@testing-library/react";

import Logo from "~/components/logo";

describe("Logo Component", () => {
  it("renders logo text", () => {
    render(<Logo />);
    expect(screen.getByText("B.Yuen")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Logo className="custom-class" />);
    const logo = container.firstChild;
    expect(logo).toHaveClass("custom-class");
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Logo onClick={handleClick} />);
    const logo = screen.getByText("B.Yuen");
    fireEvent.click(logo);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not error when clicked without onClick handler", () => {
    render(<Logo />);
    const logo = screen.getByText("B.Yuen");
    expect(() => fireEvent.click(logo)).not.toThrow();
  });

  it("renders as a span element", () => {
    const { container } = render(<Logo />);
    const logo = container.firstChild;
    expect(logo?.nodeName).toBe("SPAN");
  });
});
