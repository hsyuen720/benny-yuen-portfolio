import { renderHook, act, waitFor } from "@testing-library/react";

import useOutsideClick from "~/hooks/useOutsideClick";

describe("useOutsideClick Hook", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it("should initialize with isOpen as false", () => {
    const { result } = renderHook(() => useOutsideClick());
    expect(result.current.isOpen).toBe(false);
  });

  it("should open when open is called", () => {
    const { result } = renderHook(() => useOutsideClick());

    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it("should close when close is called", () => {
    const { result } = renderHook(() => useOutsideClick());

    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it("should close when clicking outside element", async () => {
    const handler = jest.fn();
    const { result } = renderHook(() => useOutsideClick(handler));

    // Set up the ref
    const element = document.createElement("div");
    container.appendChild(element);
    Object.defineProperty(result.current.el, "current", {
      writable: true,
      value: element,
    });

    // Open the element
    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBe(true);

    // Click outside
    act(() => {
      const event = new MouseEvent("mousedown", { bubbles: true });
      document.body.dispatchEvent(event);
    });

    await waitFor(() => {
      expect(result.current.isOpen).toBe(false);
      expect(handler).toHaveBeenCalled();
    });
  });

  it("should not close when clicking inside element", () => {
    const handler = jest.fn();
    const { result } = renderHook(() => useOutsideClick(handler));

    // Set up the ref
    const element = document.createElement("div");
    container.appendChild(element);
    Object.defineProperty(result.current.el, "current", {
      writable: true,
      value: element,
    });

    // Open the element
    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBe(true);

    // Click inside
    act(() => {
      const event = new MouseEvent("mousedown", { bubbles: true });
      element.dispatchEvent(event);
    });

    expect(result.current.isOpen).toBe(true);
    expect(handler).not.toHaveBeenCalled();
  });

  it("should handle touch events", async () => {
    const handler = jest.fn();
    const { result } = renderHook(() => useOutsideClick(handler));

    // Set up the ref
    const element = document.createElement("div");
    container.appendChild(element);
    Object.defineProperty(result.current.el, "current", {
      writable: true,
      value: element,
    });

    // Open the element
    act(() => {
      result.current.open();
    });

    // Touch outside
    act(() => {
      const event = new TouchEvent("touchstart", { bubbles: true });
      document.body.dispatchEvent(event);
    });

    await waitFor(() => {
      expect(result.current.isOpen).toBe(false);
      expect(handler).toHaveBeenCalled();
    });
  });

  it("should not trigger handler when closed", () => {
    const handler = jest.fn();
    const { result } = renderHook(() => useOutsideClick(handler));

    // Element is closed by default
    expect(result.current.isOpen).toBe(false);

    // Click outside
    act(() => {
      const event = new MouseEvent("mousedown", { bubbles: true });
      document.body.dispatchEvent(event);
    });

    expect(handler).not.toHaveBeenCalled();
  });

  it("should clean up event listeners on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useOutsideClick());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith("touchstart", expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });
});
