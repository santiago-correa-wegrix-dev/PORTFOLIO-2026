import { motion, useScroll, useTransform } from "framer-motion";

export function MechanicalRings() {
    const { scrollY } = useScroll();

    // Scroll-driven transformations
    const rotateBase = useTransform(scrollY, [0, 1000], [0, 180]);
    const rotateOpposite = useTransform(scrollY, [0, 1000], [0, -180]);
    const expand = useTransform(scrollY, [0, 500], [1, 1.5]);
    const opacity = useTransform(scrollY, [0, 300, 500], [0.2, 0.5, 0]); // Fade out as we leave hero

    return (
        <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] perspective-1000">
            <motion.div
                className="relative w-full h-full transform-style-3d text-zinc-900/40"
                style={{ opacity, scale: expand }}
            >
                {/* Core Rings - Rotate on Scroll */}
                <motion.div
                    className="absolute inset-0 m-auto w-48 h-48 rounded-full border-[1px] border-current transform-style-3d"
                    style={{ rotateZ: rotateBase, rotateX: 60 }}
                />
                <motion.div
                    className="absolute inset-0 m-auto w-64 h-64 rounded-full border-[1px] border-dashed border-current transform-style-3d"
                    style={{ rotateZ: rotateOpposite, rotateX: 60 }}
                />

                {/* Outer Orbit - Slower Scroll Rotation */}
                <motion.div
                    className="absolute inset-0 m-auto w-[90%] h-[90%] rounded-full border-[1px] border-zinc-900/10 transform-style-3d"
                    style={{ rotateZ: rotateBase, rotateX: 75 }}
                />

                {/* Decorative Ticks - Unfolding effect */}
                {[0, 45, 90, 135].map((deg) => (
                    <RingTick key={deg} deg={deg} scrollY={scrollY} />
                ))}
            </motion.div>
        </div>
    );
}

import { type MotionValue } from "framer-motion";

function RingTick({ deg, scrollY }: { deg: number, scrollY: MotionValue<number> }) {
    const rotateZ = useTransform(scrollY, [0, 1000], [deg, deg + 90]);
    return (
        <motion.div
            className="absolute inset-0 m-auto w-full h-[1px] bg-zinc-900/10"
            style={{ rotateZ }}
        />
    );
}
