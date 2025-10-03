import { type MutableRefObject, useEffect, useMemo, useRef, useState } from "react";

interface UseInView<T extends HTMLElement = HTMLDivElement>
  extends Omit<IntersectionObserverInit, "root"> {
  root?: MutableRefObject<T | null>;
  once?: boolean;
}

const useInView = <T extends HTMLElement = HTMLDivElement>(props?: UseInView<T>) => {
  const { once, root, rootMargin, threshold } = useMemo(() => props ?? {}, [props]);
  const el = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (once && el.current && entry.isIntersecting) {
          observer.unobserve(el.current);
        }
      },
      { root: root?.current ?? null, rootMargin, threshold },
    );
    if (el.current) {
      observer.observe(el.current);
    }
    return () => observer.disconnect();
  }, [root, once, rootMargin, threshold]);

  return { el, isInView };
};

export default useInView;
