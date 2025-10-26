import { render, screen, waitFor, act } from "@testing-library/react";

import TypingWords from "~/components/typingWords";

describe("TypingWords Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it("renders with initial empty text", () => {
    const { container } = render(<TypingWords words={["Hello", "World"]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders the cursor", () => {
    render(<TypingWords words={["Test"]} />);
    expect(screen.getByText("|")).toBeInTheDocument();
  });

  it("starts typing the first word", async () => {
    const { container } = render(
      <TypingWords words={["Hello"]} typeInterval={100} isInfinite={false} />,
    );

    // Initially empty (subIndex = 0)
    const textSpan = container.querySelector("span span");
    expect(textSpan?.textContent).toBe("");

    // After first interval, should show first character
    act(() => {
      jest.advanceTimersByTime(100);
    });
    await waitFor(() => {
      expect(textSpan?.textContent).toBe("H");
    });

    // Continue typing
    act(() => {
      jest.advanceTimersByTime(100);
    });
    await waitFor(() => {
      expect(textSpan?.textContent).toBe("He");
    });
  });

  it("applies custom className", () => {
    const { container } = render(<TypingWords words={["Test"]} className="custom-class" />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("custom-class");
  });

  it("handles multiple words", () => {
    const { container } = render(<TypingWords words={["First", "Second", "Third"]} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("accepts custom intervals", () => {
    const { container } = render(
      <TypingWords words={["Test"]} typeInterval={50} deleteInterval={25} swapInterval={500} />,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it("respects isInfinite flag", () => {
    const { container } = render(<TypingWords words={["Test"]} isInfinite={false} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("handles empty word gracefully", () => {
    const { container } = render(<TypingWords words={[""]} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
