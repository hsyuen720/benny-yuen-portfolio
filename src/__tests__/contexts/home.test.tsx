import { renderHook, act } from "@testing-library/react";
import { ReactNode } from "react";

import HomeProvider from "~/contexts/home/provider";
import useHome from "~/contexts/home/useHome";
import { PortfolioSection } from "~/settings/constants";

describe("Home Context", () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <HomeProvider>{children}</HomeProvider>
  );

  it("should initialize with heroBanner as current view", () => {
    const { result } = renderHook(() => useHome(), { wrapper });
    expect(result.current.currentView).toBe(PortfolioSection.HeroBanner);
  });

  it("should update current view when focus is called", () => {
    const { result } = renderHook(() => useHome(), { wrapper });

    act(() => {
      result.current.focus(PortfolioSection.About);
    });

    expect(result.current.currentView).toBe(PortfolioSection.About);
  });

  it("should change view multiple times", () => {
    const { result } = renderHook(() => useHome(), { wrapper });

    act(() => {
      result.current.focus(PortfolioSection.Experience);
    });
    expect(result.current.currentView).toBe(PortfolioSection.Experience);

    act(() => {
      result.current.focus(PortfolioSection.Projects);
    });
    expect(result.current.currentView).toBe(PortfolioSection.Projects);

    act(() => {
      result.current.focus(PortfolioSection.About);
    });
    expect(result.current.currentView).toBe(PortfolioSection.About);
  });

  it("should scroll to element when scroll is called", () => {
    const { result } = renderHook(() => useHome(), { wrapper });

    // Create a mock element
    const mockElement = document.createElement("div");
    mockElement.id = PortfolioSection.About;
    Object.defineProperty(mockElement, "offsetTop", {
      value: 500,
      writable: true,
    });
    document.body.appendChild(mockElement);

    // Mock window.scrollTo
    const scrollToMock = jest.fn();
    window.scrollTo = scrollToMock;

    act(() => {
      result.current.scroll(PortfolioSection.About);
    });

    expect(scrollToMock).toHaveBeenCalledWith({
      behavior: "smooth",
      top: 500,
    });

    // Cleanup
    document.body.removeChild(mockElement);
  });

  it("should not scroll when element does not exist", () => {
    const { result } = renderHook(() => useHome(), { wrapper });

    const scrollToMock = jest.fn();
    window.scrollTo = scrollToMock;

    act(() => {
      result.current.scroll("non-existent-id");
    });

    expect(scrollToMock).not.toHaveBeenCalled();
  });

  it("should have focus function", () => {
    const { result } = renderHook(() => useHome(), { wrapper });
    expect(typeof result.current.focus).toBe("function");
  });

  it("should have scroll function", () => {
    const { result } = renderHook(() => useHome(), { wrapper });
    expect(typeof result.current.scroll).toBe("function");
  });
});
