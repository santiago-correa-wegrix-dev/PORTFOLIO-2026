import {
  PARTICLE_AMPLITUDE_MIN,
  PARTICLE_AMPLITUDE_RANGE,
  PARTICLE_OPACITY_MIN,
  PARTICLE_OPACITY_RANGE,
  PARTICLE_SIZE_MIN,
  PARTICLE_SIZE_RANGE,
  PARTICLE_SPEED_MIN,
  PARTICLE_SPEED_RANGE,
  REPULSION_RADIUS,
  REPULSION_STRENGTH,
  RESET_GLOBAL_ALPHA,
  SPEED_Y_FACTOR,
  SPRING_STIFFNESS,
  TWO_PI,
  VELOCITY_DAMPING,
} from "./constants";

export interface Particle {
  posX: number;
  posY: number;
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

export const createParticle = (width: number, height: number): Particle => {
  const posX = Math.random() * width;
  const posY = Math.random() * height;
  return {
    amplitude: Math.random() * PARTICLE_AMPLITUDE_RANGE + PARTICLE_AMPLITUDE_MIN,
    baseX: posX,
    baseY: posY,
    opacity: Math.random() * PARTICLE_OPACITY_RANGE + PARTICLE_OPACITY_MIN,
    phase: Math.random() * TWO_PI,
    posX,
    posY,
    size: Math.random() * PARTICLE_SIZE_RANGE + PARTICLE_SIZE_MIN,
    speed: Math.random() * PARTICLE_SPEED_RANGE + PARTICLE_SPEED_MIN,
    vx: 0,
    vy: 0,
  };
};

export const createParticles = ({
  count,
  height,
  width,
}: {
  count: number;
  height: number;
  width: number;
}): Particle[] => Array.from({ length: count }, () => createParticle(width, height));

interface MousePos {
  posX: number;
  posY: number;
}

const radiusSq = REPULSION_RADIUS * REPULSION_RADIUS;

export const updateParticle = ({
  mouse,
  particle,
  time,
}: {
  mouse: MousePos;
  particle: Particle;
  time: number;
}): void => {
  const targetX =
    particle.baseX + Math.cos(time * particle.speed + particle.phase) * particle.amplitude;
  const targetY =
    particle.baseY +
    Math.sin(time * particle.speed * SPEED_Y_FACTOR + particle.phase) * particle.amplitude;

  particle.vx += (targetX - particle.posX) * SPRING_STIFFNESS;
  particle.vy += (targetY - particle.posY) * SPRING_STIFFNESS;

  const dx = mouse.posX - particle.posX;
  const dy = mouse.posY - particle.posY;
  const distSq = dx * dx + dy * dy;

  if (distSq < radiusSq && distSq > 0) {
    const dist = Math.sqrt(distSq);
    const force = ((REPULSION_RADIUS - dist) / REPULSION_RADIUS) * REPULSION_STRENGTH;
    const angle = Math.atan2(dy, dx);
    particle.vx -= Math.cos(angle) * force;
    particle.vy -= Math.sin(angle) * force;
  }

  particle.vx *= VELOCITY_DAMPING;
  particle.vy *= VELOCITY_DAMPING;

  particle.posX += particle.vx;
  particle.posY += particle.vy;
};

export const drawParticles = ({
  ctx,
  opacityMultiplier,
  particles,
}: {
  ctx: CanvasRenderingContext2D;
  opacityMultiplier: number;
  particles: Particle[];
}): void => {
  for (const particle of particles) {
    ctx.globalAlpha = particle.opacity * opacityMultiplier;
    ctx.beginPath();
    ctx.arc(particle.posX, particle.posY, particle.size, 0, TWO_PI);
    ctx.fill();
  }
  ctx.globalAlpha = RESET_GLOBAL_ALPHA;
};
