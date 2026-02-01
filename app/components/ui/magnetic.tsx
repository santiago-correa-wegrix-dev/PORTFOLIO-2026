import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export function Magnetic({ children, strength = 0.5 }: { children: React.ReactNode; strength?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Physics constants (2026 feel: Heavy, Responsive, Fluid)
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };

    // Mouse position relative to center of element
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring physics for movement
    const smoothX = useSpring(x, springConfig);
    const smoothY = useSpring(y, springConfig);

    // 3D Tilt effect based on position
    const rotateX = useTransform(smoothY, [-50, 50], [15, -15]); // Max tilt 15deg
    const rotateY = useTransform(smoothX, [-50, 50], [-15, 15]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        // Attract (Magnetic Pull)
        x.set(distanceX * strength);
        y.set(distanceY * strength);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            style={{
                x: smoothX,
                y: smoothY,
                rotateX: isHovered ? rotateX : 0,
                rotateY: isHovered ? rotateY : 0,
                transformStyle: "preserve-3d", // Critical for 3D tilt
                perspective: 1000
            }}
            className="inline-block" // Ensure it wraps content effectively
        >
            <motion.div
                style={{
                    transform: "translateZ(20px)", // Push content forward for depth parallax
                    transformStyle: "preserve-3d"
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}
