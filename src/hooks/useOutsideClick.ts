import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const useOutsideClick = <T extends HTMLElement = HTMLDivElement>(handler?: () => void) => {
  const [isOpen, setIsOpen] = useState(false);
  const el = useRef<T>(null);

  const close = useCallback(() => setIsOpen(false), []);
  const open = useCallback(() => setIsOpen(true), []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (isOpen && !el.current?.contains(e.target as Node)) {
        close();
        handler?.();
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("touchstart", handleOutsideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [handler, isOpen, close]);

  return useMemo(() => ({ el, isOpen, open, close }), [isOpen, open, close]);
};
export default useOutsideClick;
