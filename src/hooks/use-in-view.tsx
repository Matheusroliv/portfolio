import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement>(margin = "0px") {
  const ref = useRef<T | null>(null);
  const [isInView, set] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && set(true),
      { root: null, rootMargin: margin, threshold: 0.2 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [margin]);

  return { ref, isInView };
}
