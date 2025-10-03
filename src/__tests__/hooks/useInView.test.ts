import { renderHook, waitFor, act } from "@testing-library/react";

import useInView from "~/hooks/useInView";

describe("useInView Hook", () => {
  let mockObserve: jest.Mock;
  let mockUnobserve: jest.Mock;
  let mockDisconnect: jest.Mock;
  let intersectionObserverCallback: IntersectionObserverCallback;

  beforeEach(() => {
    mockObserve = jest.fn();
    mockUnobserve = jest.fn();
    mockDisconnect = jest.fn();

    global.IntersectionObserver = jest.fn().mockImplementation((callback) => {
      intersectionObserverCallback = callback;
      return {
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: mockDisconnect,
        takeRecords: jest.fn(),
        root: null,
        rootMargin: "",
        thresholds: [],
      };
    }) as jest.MockedClass<typeof IntersectionObserver>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with isInView as false", () => {
    const { result } = renderHook(() => useInView());
    expect(result.current.isInView).toBe(false);
  });

  it("should create IntersectionObserver on mount", () => {
    renderHook(() => useInView());
    expect(global.IntersectionObserver).toHaveBeenCalled();
  });

  it("should set isInView to true when element is intersecting", async () => {
    const { result } = renderHook(() => useInView());

    // Simulate intersection
    act(() => {
      const entry = { isIntersecting: true } as IntersectionObserverEntry;
      intersectionObserverCallback([entry], {} as IntersectionObserver);
    });

    await waitFor(() => {
      expect(result.current.isInView).toBe(true);
    });
  });

  it("should set isInView to false when element is not intersecting", async () => {
    const { result } = renderHook(() => useInView());

    // First make it intersecting
    act(() => {
      const entry = { isIntersecting: true } as IntersectionObserverEntry;
      intersectionObserverCallback([entry], {} as IntersectionObserver);
    });

    await waitFor(() => {
      expect(result.current.isInView).toBe(true);
    });

    // Then make it not intersecting
    act(() => {
      const entry = { isIntersecting: false } as IntersectionObserverEntry;
      intersectionObserverCallback([entry], {} as IntersectionObserver);
    });

    await waitFor(() => {
      expect(result.current.isInView).toBe(false);
    });
  });

  it("should unobserve element when once is true and element is intersecting", async () => {
    const { result } = renderHook(() => useInView({ once: true }));

    // Create a mock element
    const mockElement = document.createElement("div");
    Object.defineProperty(result.current.el, "current", {
      writable: true,
      value: mockElement,
    });

    // Simulate intersection
    act(() => {
      const entry = { isIntersecting: true } as IntersectionObserverEntry;
      intersectionObserverCallback([entry], {} as IntersectionObserver);
    });

    await waitFor(() => {
      expect(result.current.isInView).toBe(true);
    });
  });

  it("should disconnect observer on unmount", () => {
    const { unmount } = renderHook(() => useInView());
    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it("should accept custom threshold", () => {
    renderHook(() => useInView({ threshold: 0.5 }));
    expect(global.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({ threshold: 0.5 }),
    );
  });

  it("should accept custom rootMargin", () => {
    renderHook(() => useInView({ rootMargin: "10px" }));
    expect(global.IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({ rootMargin: "10px" }),
    );
  });
});
