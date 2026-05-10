import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

import { useUIStore } from "~/store/ui-store";

export function MouseFollower() {
  const { showCustomCursor } = useUIStore();
  const [active, setActive] = useState(false);

  // Use motion values for better performance than state
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring animation
  const springConfig = { damping: 25, mass: 0.5, stiffness: 400 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (!showCustomCursor) {
      return;
    }

    const moveMouse = (event: MouseEvent) => {
      cursorX.set(event.clientX - 16); // Center the 32px cursor
      cursorY.set(event.clientY - 16);
    };

    const handleMouseOver = (event: MouseEvent) => {
      // Check if hovering actionable element
      const target = event.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest(".cursor-hover")
      ) {
        setActive(true);
      } else {
        setActive(false);
      }
    };

    globalThis.addEventListener("mousemove", moveMouse);
    globalThis.addEventListener("mouseover", handleMouseOver);

    return () => {
      globalThis.removeEventListener("mousemove", moveMouse);
      globalThis.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, showCustomCursor]);

  if (!showCustomCursor) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 w-8 h-8 bg-white rounded-full pointer-events-none z-9999 mix-blend-difference"
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: active ? 2.5 : 1,
      }}
      transition={{
        opacity: { duration: 0.5 },
        scale: { damping: 20, stiffness: 300, type: "spring" },
      }}
    />
  );
}
