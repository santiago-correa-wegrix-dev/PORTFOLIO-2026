import { useCallback, useEffect, useRef } from "react";

import {
  DARK_BASE_COLOR,
  DARK_OPACITY_MULTIPLIER,
  INITIAL_RAF,
  INITIAL_TIME,
  LIGHT_BASE_COLOR,
  LIGHT_OPACITY_MULTIPLIER,
  MAX_DPR,
  MOUSE_OFF_SCREEN,
  PARTICLE_COUNT,
  TIME_STEP,
} from "./constants";
import { type Particle, createParticles, drawParticles, updateParticle } from "./particle-utils";

const setupCanvas = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
): { width: number; height: number } => {
  const dpr = Math.min(window.devicePixelRatio, MAX_DPR);
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { height: rect.height, width: rect.width };
};

export const QuantumField = ({ isDark }: { isDark: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ posX: MOUSE_OFF_SCREEN, posY: MOUSE_OFF_SCREEN });
  const rafRef = useRef<number>(INITIAL_RAF);
  const timeRef = useRef(INITIAL_TIME);

  const initParticles = useCallback((width: number, height: number) => {
    particlesRef.current = createParticles(width, height, PARTICLE_COUNT);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) { return; }

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) { return; }

    let currentWidth = 0;
    let currentHeight = 0;

    const resizeCanvas = () => {
      const { width, height } = setupCanvas(canvas, ctx);
      currentWidth = width;
      currentHeight = height;
      if (particlesRef.current.length === 0) {
        initParticles(width, height);
      }
    };

    resizeCanvas();

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        posX: event.clientX - rect.left,
        posY: event.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { posX: MOUSE_OFF_SCREEN, posY: MOUSE_OFF_SCREEN };
    };

    const runAnimationFrame = () => {
      timeRef.current += TIME_STEP;
      const time = timeRef.current;
      const mouse = mouseRef.current;
      const particles = particlesRef.current;

      ctx.clearRect(0, 0, currentWidth, currentHeight);

      const baseColor = isDark ? DARK_BASE_COLOR : LIGHT_BASE_COLOR;
      ctx.fillStyle = `rgb(${baseColor}, ${baseColor}, ${baseColor})`;
      const opacityMultiplier = isDark ? DARK_OPACITY_MULTIPLIER : LIGHT_OPACITY_MULTIPLIER;

      for (const particle of particles) {
        updateParticle(particle, time, mouse);
      }

      drawParticles(ctx, particles, opacityMultiplier);

      rafRef.current = requestAnimationFrame(runAnimationFrame);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", resizeCanvas);

    rafRef.current = requestAnimationFrame(runAnimationFrame);

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
};
