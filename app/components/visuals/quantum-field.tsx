import { useCallback, useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  phase: number;
  speed: number;
  amplitude: number;
}

const PARTICLE_COUNT = 2500;
const REPULSION_RADIUS = 140;
const REPULSION_STRENGTH = 0.8;

export function QuantumField({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: 0,
        vy: 0,
        size: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.5 + 0.15,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.3 + 0.1,
        amplitude: Math.random() * 20 + 8,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let currentWidth = 0;
    let currentHeight = 0;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      currentWidth = rect.width;
      currentHeight = rect.height;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particlesRef.current.length === 0) {
        initParticles(rect.width, rect.height);
      }
    };

    resizeCanvas();

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    const animate = () => {
      timeRef.current += 0.008;
      const time = timeRef.current;

      ctx.clearRect(0, 0, currentWidth, currentHeight);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const baseColor = isDark ? 255 : 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Each particle orbits its base position independently
        const targetX =
          p.baseX + Math.cos(time * p.speed + p.phase) * p.amplitude;
        const targetY =
          p.baseY + Math.sin(time * p.speed * 0.7 + p.phase) * p.amplitude;

        // Smoothly move toward orbital target
        p.vx += (targetX - p.x) * 0.01;
        p.vy += (targetY - p.y) * 0.01;

        // Mouse repulsion
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distSq = dx * dx + dy * dy;
        const radiusSq = REPULSION_RADIUS * REPULSION_RADIUS;

        if (distSq < radiusSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force =
            ((REPULSION_RADIUS - dist) / REPULSION_RADIUS) *
            REPULSION_STRENGTH;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force;
          p.vy -= Math.sin(angle) * force;
        }

        // Damping
        p.vx *= 0.92;
        p.vy *= 0.92;

        // Apply velocity
        p.x += p.vx;
        p.y += p.vy;

        // Draw
        ctx.globalAlpha = p.opacity * (isDark ? 0.6 : 0.85);
        ctx.fillStyle = `rgb(${baseColor}, ${baseColor}, ${baseColor})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(animate);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resizeCanvas);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isDark, initParticles]);

  return (
    <div
      className={`absolute inset-0 -z-10 h-full w-full transition-colors duration-700 ${isDark ? "bg-black" : "bg-transparent"}`}
    >
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
    </div>
  );
}
