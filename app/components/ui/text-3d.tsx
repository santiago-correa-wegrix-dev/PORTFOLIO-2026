import { motion } from "framer-motion";


export function Text3D({ children, className }: { children: string, className?: string }) {


    return (
        <motion.div
            className={`perspective-text active-3d ${className}`}
            style={{ perspective: "1000px" }}
        >
            {children.split("").map((char, i) => (
                <motion.span
                    key={i}
                    style={{ display: "inline-block", transformStyle: "preserve-3d" }}
                    initial={{ opacity: 0, z: -100, rotateX: 90 }}
                    animate={{
                        opacity: 1,
                        z: 0,
                        rotateX: 0,
                    }}
                    whileHover={{
                        z: 50,
                        rotateX: Math.random() * 30 - 15, // eslint-disable-line react-hooks/purity
                        rotateY: Math.random() * 30 - 15, // eslint-disable-line react-hooks/purity
                        transition: { duration: 0.2 }
                    }}
                    transition={{
                        duration: 0.8,
                        delay: i * 0.05,
                        type: "spring",
                        stiffness: 100,
                        damping: 10
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.div>
    );
}
