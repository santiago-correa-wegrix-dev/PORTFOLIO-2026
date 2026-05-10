import { ReactLenis } from "lenis/react";
import { useEffect } from "react";
import { useLocation } from "react-router";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <ReactLenis root>{children}</ReactLenis>;
}
