import { motion } from "framer-motion";
import { useEffect,useState } from "react";

export function StaggeredGrid() {
    const [columns, setColumns] = useState(0);
    const [rows, setRows] = useState(0);

    useEffect(() => {
        // Calculate grid based on window size to fill screen
        const calculateGrid = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const size = 120; // Increased size to reduce DOM nodes (Performance fix)

            const cols = Math.ceil(width / size);
            const rowCount = Math.ceil(height / size);

            setColumns(cols);
            setRows(rowCount);
        };

        calculateGrid();
        window.addEventListener("resize", calculateGrid);
        return () => window.removeEventListener("resize", calculateGrid);
    }, []);

    // Generate grid items
    const items = Array.from({ length: columns * rows });

    return (
        <div
            className="absolute inset-0 -z-10 overflow-hidden opacity-[0.15] pointer-events-none"
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
        >
            {items.map((_, i) => (
                <GridItem key={i} index={i} origin={[Math.floor(i / columns), i % columns]} />
            ))}
        </div>
    );
}

function GridItem({ index: _index, origin: _origin }: { index: number; origin: [number, number] }) {
    return (
        <motion.div
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{
                scale: [0.2, 1, 0.2],
                opacity: [0, 0.5, 0]
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                // eslint-disable-next-line react-hooks/purity
                delay: Math.random() * 5,
                ease: "easeInOut"
            }}
            className="w-full h-full flex items-center justify-center will-change-transform"
        >
            <div className="w-1 h-1 bg-zinc-900 rounded-full" />
        </motion.div>
    );
}
