import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect,useMemo, useRef } from "react";
import * as THREE from "three";



function ParticleSystem({ isDark }: { isDark: boolean }) {
    const count = 4000;
    const mesh = useRef<THREE.Points>(null!);
    const light = useRef<THREE.PointLight>(null!);

    const mouse = useRef(new THREE.Vector2());

    // Generate particles & Texture
    const { positions, colors, texture } = useMemo(() => {
        const temp = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // eslint-disable-next-line react-hooks/purity
            const x = (Math.random() - 0.5) * 50;
            // eslint-disable-next-line react-hooks/purity
            const y = (Math.random() - 0.5) * 50;
            // eslint-disable-next-line react-hooks/purity
            const z = (Math.random() - 0.5) * 50;
            temp[i * 3] = x;
            temp[i * 3 + 1] = y;
            temp[i * 3 + 2] = z;

            const base = isDark ? 0.8 : 0.2; // Dark Mode: Soft White (0.8), Light Mode: Dark Grey (0.2)
            // eslint-disable-next-line react-hooks/purity
            const variance = Math.random() * 0.4;
            const shade = base + (isDark ? 0 : variance);

            colors[i * 3] = shade;
            colors[i * 3 + 1] = shade;
            colors[i * 3 + 2] = shade;
        }

        // Generate Circular Texture Programmatically
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.beginPath();
            ctx.arc(16, 16, 14, 0, 2 * Math.PI);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
        }
        const texture = new THREE.CanvasTexture(canvas);

        return { positions: temp, colors, texture };
    }, [count, isDark]);

    // Reactive Color Update
    useEffect(() => {
        if (!mesh.current) return;

        // Update Material Props
        const material = mesh.current.material as THREE.PointsMaterial;
        if (material) {
            material.color = new THREE.Color(isDark ? '#ffffff' : '#000000');
            // User Feedback: Light mode was invisible. Dark mode was perfect.
            // Dark Mode: 0.6 Opacity
            // Light Mode: Boosted to 0.8 Opacity
            material.opacity = isDark ? 0.6 : 0.8;
            material.needsUpdate = true;
        }

        // Force re-computation of colors in useMemo if needed, but actually we can just rely on the material color override if verifyColors corresponds.
        // But since we use vertexColors, we MUST update the attributes.
        // The useMemo changes the 'colors' array prop. 
        // We need to tell Three.js that the attribute needs update.
        if (mesh.current.geometry.attributes.color) {
            mesh.current.geometry.attributes.color.needsUpdate = true;
        }
    }, [isDark, colors]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const positions = (mesh.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;

        // ... existing movement logic ...
        // Smooth mouse interpolation could occur here, but direct is snappier for "physics" feel
        mouse.current.x = (state.pointer.x * state.viewport.width) / 2;
        mouse.current.y = (state.pointer.y * state.viewport.height) / 2;

        for (let i = 0; i < count; i++) {
            let x = positions[i * 3];
            let y = positions[i * 3 + 1];
            let z = positions[i * 3 + 2];

            // "Quantum" Movement
            y += Math.sin(time * 0.2 + x * 0.5) * 0.01;
            x += Math.cos(time * 0.15 + z * 0.5) * 0.01;
            z += Math.sin(time * 0.1 + y * 0.5) * 0.01;

            // Mouse Repulsion
            const dx = mouse.current.x - x;
            const dy = mouse.current.y - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const repulsionRadius = 6;

            if (dist < repulsionRadius) {
                const force = (repulsionRadius - dist) / repulsionRadius;
                const angle = Math.atan2(dy, dx);
                const strength = 0.8;

                x -= Math.cos(angle) * force * strength;
                y -= Math.sin(angle) * force * strength;
            }

            // Bounds
            if (x > 25) x = -25;
            if (x < -25) x = 25;
            if (y > 25) y = -25;
            if (y < -25) y = 25;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
        }

        (mesh.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
        mesh.current.rotation.y = time * 0.02;
    });

    return (
        <>
            <pointLight ref={light} distance={40} intensity={8} color={isDark ? "white" : "black"} />
            <points ref={mesh}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={positions.length / 3}
                        array={positions}
                        itemSize={3}
                        args={[positions, 3]}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={colors.length / 3}
                        array={colors}
                        itemSize={3}
                        args={[colors, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.25}
                    map={texture}
                    alphaTest={0.5}
                    vertexColors // Uses the colors attribute we set above
                    transparent
                    opacity={isDark ? 0.6 : 0.8} // Boosted light mode opacity
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.NormalBlending}
                />
            </points>
        </>
    );
}

export function QuantumField({ isDark }: { isDark: boolean }) {
    // Internal detection removed, now controlled by parent


    return (
        <div className={`absolute inset-0 w-full h-full -z-10 transition-colors duration-700 ${isDark ? 'bg-black' : 'bg-transparent'}`}>
            <Canvas
                camera={{ position: [0, 0, 15], fov: 75 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                {!isDark && <fog attach="fog" args={['#ffffff', 10, 40]} />}
                <ParticleSystem isDark={isDark} />
            </Canvas>
        </div>
    );
}
