import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useIsomorphicLayoutEffect(() => {
    if (pathname.startsWith("/case-study/")) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);

  return null;
}
