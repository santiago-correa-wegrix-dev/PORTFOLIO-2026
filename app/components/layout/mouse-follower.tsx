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
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const x = useSpring(cursorX, springConfig);
    const y = useSpring(cursorY, springConfig);

    useEffect(() => {
        if (!showCustomCursor) return;

        const moveMouse = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16); // Center the 32px cursor
            cursorY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            // Check if hovering actionable element
            const target = e.target as HTMLElement;
            if (target.tagName === "BUTTON" || target.tagName === "A" || target.closest(".cursor-hover")) {
                setActive(true);
            } else {
                setActive(false);
            }
        };

        window.addEventListener("mousemove", moveMouse);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveMouse);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY, showCustomCursor]);

    if (!showCustomCursor) return null;

    return (
        <motion.div
            className="fixed left-0 top-0 w-8 h-8 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference" // Max z-index
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                scale: active ? 2.5 : 1,
                opacity: 1
            }}
            transition={{
                scale: { type: "spring", stiffness: 300, damping: 20 },
                opacity: { duration: 0.5 }
            }}
        />
    );
}
