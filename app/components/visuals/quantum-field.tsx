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
}

const PARTICLE_COUNT = 3000;
const REPULSION_RADIUS = 120;
const REPULSION_STRENGTH = 0.6;
const DRIFT_SPEED = 0.15;
const RETURN_SPEED = 0.003;

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
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

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
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      timeRef.current += 0.01;
      const time = timeRef.current;

      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const baseColor = isDark ? 255 : 0;

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        // Quantum drift
        particle.vx +=
          Math.cos(time + particle.baseY * 0.01) * DRIFT_SPEED * 0.1;
        particle.vy +=
          Math.sin(time * 0.8 + particle.baseX * 0.01) * DRIFT_SPEED * 0.1;

        // Mouse repulsion
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distSq = dx * dx + dy * dy;
        const radiusSq = REPULSION_RADIUS * REPULSION_RADIUS;

        if (distSq < radiusSq) {
          const dist = Math.sqrt(distSq);
          const force =
            ((REPULSION_RADIUS - dist) / REPULSION_RADIUS) *
            REPULSION_STRENGTH;
          const angle = Math.atan2(dy, dx);
          particle.vx -= Math.cos(angle) * force;
          particle.vy -= Math.sin(angle) * force;
        }

        // Return to base position
        particle.vx += (particle.baseX - particle.x) * RETURN_SPEED;
        particle.vy += (particle.baseY - particle.y) * RETURN_SPEED;

        // Damping
        particle.vx *= 0.95;
        particle.vy *= 0.95;

        // Apply velocity
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Draw
        ctx.globalAlpha = particle.opacity * (isDark ? 0.6 : 0.8);
        ctx.fillStyle = `rgb(${baseColor}, ${baseColor}, ${baseColor})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
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
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        aria-hidden="true"
      />
    </div>
  );
}
