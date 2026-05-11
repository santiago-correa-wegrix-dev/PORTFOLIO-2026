import { Html, Line, useCursor } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { skillsList as skills } from "~/data/skills";
import { useIsDark } from "~/hooks/use-is-dark";

function HelixStrand({ isDark }: { isDark: boolean }) {
  const points = useMemo(() => {
    const vertices: THREE.Vector3[] = [];
    const radius = 2.5;
    const height = 12; // Compact
    const turns = 3.5;
    const segments = 100;

    for (let index = 0; index <= segments; index++) {
      const progress = index / segments;
      const angle = progress * Math.PI * 2 * turns;
      const y = (progress - 0.5) * height;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      vertices.push(new THREE.Vector3(x, y, z));
    }
    return vertices;
  }, []);

  const points2 = useMemo(() => {
    const vertices: THREE.Vector3[] = [];
    const radius = 2.5;
    const height = 12; // Compact
    const turns = 3.5;
    const segments = 100;

    for (let index = 0; index <= segments; index++) {
      const progress = index / segments;
      const angle = progress * Math.PI * 2 * turns + Math.PI; // Offset by 180 deg
      const y = (progress - 0.5) * height;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      vertices.push(new THREE.Vector3(x, y, z));
    }
    return vertices;
  }, []);

  return (
    <group>
      <Line
        points={points}
        color={isDark ? "#4f46e5" : "#6366f1"}
        lineWidth={3}
        transparent
        opacity={0.3}
      />
      <Line
        points={points2}
        color={isDark ? "#ec4899" : "#f472b6"}
        lineWidth={3}
        transparent
        opacity={0.3}
      />
    </group>
  );
}

function SkillNode({
  name,
  position,
  color,
  isDark,
}: {
  name: string;
  position: THREE.Vector3;
  color: string;
  isDark: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  return (
    <group position={position}>
      {/* The Orb */}
      <mesh onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>

      {/* Glow Halo */}
      <mesh scale={[1.5, 1.5, 1.5]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} toneMapped={false} />
      </mesh>

      {/* Label - Billboarded to always face camera */}
      <Html
        position={[0.5, 0, 0]}
        center
        style={{
          opacity: hovered ? 1 : 0.7,
          pointerEvents: "none",
          transform: hovered ? "scale(1.2)" : "scale(1)",
          transition: "all 0.3s",
        }}
      >
        <div
          className={`
                    px-3 py-1 rounded-full backdrop-blur-md 
                    ${isDark ? "bg-black/50 text-white border border-white/20" : "bg-white/50 text-black border border-black/10"}
                    text-sm font-bold tracking-wide whitespace-nowrap
                    ${hovered ? "shadow-[0_0_15px_rgba(79,70,229,0.5)]" : ""}
                `}
        >
          {name}
        </div>
      </Html>
    </group>
  );
}

function HelixStructure({ isDark }: { isDark: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const radius = 2.5;
  const height = 10; // Compact
  const turns = 3.5;

  // Distribute skills along the helix
  const nodes = useMemo(
    () =>
      skills.map((skill, index) => {
        const progress = index / Math.max(skills.length - 1, 1);
        // Alternate strands
        const strandOffset = index % 2 === 0 ? 0 : Math.PI;
        const angle = progress * Math.PI * 2 * turns + strandOffset;
        const y = (progress - 0.5) * height;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        const primaryColor = isDark ? "#4f46e5" : "#6366f1";
        const secondaryColor = isDark ? "#ec4899" : "#f472b6";
        const color = index % 2 === 0 ? primaryColor : secondaryColor;

        return { color, name: skill, pos: new THREE.Vector3(x, y, z) };
      }),
    [isDark],
  );

  useFrame((state) => {
    if (groupRef.current) {
      // Constant rotation
      groupRef.current.rotation.y += 0.003;

      // Mouse influence (tilt)
      const { x, y } = state.pointer;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        y * 0.2,
        0.05,
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        -x * 0.2,
        0.05,
      );
    }
  });

  return (
    <group ref={groupRef}>
      <HelixStrand isDark={isDark} />
      {nodes.map((node) => (
        <SkillNode
          key={node.name}
          name={node.name}
          position={node.pos}
          color={node.color}
          isDark={isDark}
        />
      ))}
    </group>
  );
}

export function HolographicSkills() {
  const isDark = useIsDark();

  return (
    <div
      aria-hidden="true"
      className="w-full h-150 relative cursor-grab active:cursor-grabbing -mt-12"
    >
      <Canvas camera={{ fov: 45, position: [0, 0, 14] }} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <HelixStructure isDark={isDark} />
          <EffectComposer>
            <Bloom luminanceThreshold={0.2} mipmapBlur intensity={0.8} radius={0.4} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
