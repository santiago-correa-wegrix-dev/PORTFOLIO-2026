import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

interface Node extends d3.SimulationNodeDatum {
    id: string;
    group: number;
    r: number;
}

interface Link extends d3.SimulationLinkDatum<Node> {
    value: number;
}

export function InteractiveNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        let width = containerRef.current.clientWidth;
        let height = containerRef.current.clientHeight;

        // Handle High DPI
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        context.scale(dpr, dpr);

        // Generate Nodes (The "Systems") - Larger, fewer nodes for "Grand" feel
        const nodes: Node[] = d3.range(25).map(i => ({
            id: `node-${i}`,
            group: Math.floor(Math.random() * 3),
            r: Math.random() * 8 + 4, // Larger nodes (4-12px)
            x: Math.random() * width,
            y: Math.random() * height
        }));

        // Generate Links (The "Connections")
        const links: Link[] = [];
        nodes.forEach((node) => {
            // Connect to nearest neighbors
            const neighbors = nodes
                .map((n, idx) => ({ idx, dist: Math.hypot((n.x || 0) - (node.x || 0), (n.y || 0) - (node.y || 0)) }))
                .sort((a, b) => a.dist - b.dist)
                .slice(1, 3); // Connect to fewer neighbors for cleaner look

            neighbors.forEach(n => {
                links.push({ source: node, target: nodes[n.idx], value: 1 });
            });
        });

        // Simulation - Slow, Heavy, Ambient
        const simulation = d3.forceSimulation<Node>(nodes)
            .force("link", d3.forceLink<Node, Link>(links).id(d => d.id).distance(250).strength(0.02)) // Long, loose links
            .force("charge", d3.forceManyBody().strength(-400)) // Strong repulsion
            .force("center", d3.forceCenter(width / 2, height / 2).strength(0.01))
            .force("collide", d3.forceCollide<Node>().radius(d => d.r + 30).strength(0.8)) // Large collision radius
            .velocityDecay(0.6); // High friction for very slow movement

        // Interaction state
        let cursorX = width / 2;
        let cursorY = height / 2;

        // Render Loop
        const ticked = () => {
            if (!context) return;
            context.clearRect(0, 0, width, height);

            // Draw Links - Very faint
            context.strokeStyle = "rgba(255, 255, 255, 0.03)";
            context.lineWidth = 1;
            links.forEach(d => {
                const source = d.source as Node;
                const target = d.target as Node;
                context.beginPath();
                context.moveTo(source.x!, source.y!);
                context.lineTo(target.x!, target.y!);
                context.stroke();
            });

            // Draw Nodes - Monochrome Palette
            nodes.forEach(d => {
                context.beginPath();
                context.moveTo(d.x! + d.r, d.y!);
                context.arc(d.x!, d.y!, d.r, 0, 2 * Math.PI);

                // Styles based on group - PURE MONOCHROME
                if (d.group === 0) context.fillStyle = "rgba(255, 255, 255, 0.5)";
                else if (d.group === 1) context.fillStyle = "rgba(82, 82, 91, 0.3)";
                else context.fillStyle = "rgba(39, 39, 42, 0.3)";

                context.fill();
            });
        };

        simulation.on("tick", ticked);

        // Interaction: Mouse force
        const handleMouseMove = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            cursorX = event.clientX - rect.left;
            cursorY = event.clientY - rect.top;

            // Apply a gentle force towards cursor to make it feel "active"
            simulation.alphaTarget(0.05).restart(); // Lower alpha target for less frantic energy

            // Attract nodes slightly to cursor
            simulation.force("attract", d3.forceRadial(400, cursorX, cursorY).strength(0.02));
        };

        const handleResize = () => {
            width = containerRef.current?.clientWidth || 0;
            height = containerRef.current?.clientHeight || 0;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            context.scale(dpr, dpr);

            simulation.force("center", d3.forceCenter(width / 2, height / 2));
            simulation.alpha(1).restart();
        };

        canvas.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        return () => {
            simulation.stop();
            canvas.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-auto">
            <canvas ref={canvasRef} className="block" />
        </div>
    );
}
