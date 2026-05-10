import { motion } from "framer-motion";

const charVariants = {
  hidden: { opacity: 0, rotateZ: 10, y: 100 },
  visible: {
    opacity: 1,
    rotateZ: 0,
    transition: {
      damping: 20,
      stiffness: 100,
      type: "spring" as const,
    },
    y: 0,
  },
};

export function SplitText({ children, className }: { children: string; className?: string }) {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      <span className="inline-block">
        {[...children].map((char, i) => (
          <motion.span key={i} variants={charVariants} className="inline-block">
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    </span>
  );
}
