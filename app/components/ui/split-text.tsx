import { motion } from "framer-motion";

const charVariants = {
    hidden: { y: 100, opacity: 0, rotateZ: 10 },
    visible: {
        y: 0,
        opacity: 1,
        rotateZ: 0,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 20,
        },
    },
};

export function SplitText({ children, className }: { children: string, className?: string }) {
    return (
        <span className={`inline-block overflow-hidden ${className}`}>
            <span className="inline-block">
                {children.split("").map((char, i) => (
                    <motion.span key={i} variants={charVariants} className="inline-block">
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </span>
        </span>
    );
}
