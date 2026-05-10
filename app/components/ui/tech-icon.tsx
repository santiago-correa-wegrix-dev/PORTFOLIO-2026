import { Terminal } from "lucide-react";
import {
  siAngular,
  siDocker,
  siFigma,
  siGit,
  siGraphql,
  siHubspot,
  siJest,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siRemix,
  siShopify,
  siSpotify,
  siTailwindcss,
  siThreedotjs,
  siTypescript,
  siVuedotjs,
  siWebflow,
  siZapier,
} from "simple-icons";

interface SimpleIcon {
  title: string;
  slug: string;
  hex: string;
  path: string;
}

const ICON_MAP: Record<string, SimpleIcon> = {
  Angular: siAngular,
  Docker: siDocker,
  Figma: siFigma,
  Git: siGit,
  GraphQL: siGraphql,
  HubSpot: siHubspot,
  Jest: siJest,
  N8N: siN8n,
  "Next.js": siNextdotjs,
  "Node.js": siNodedotjs,
  PostgreSQL: siPostgresql,
  Python: siPython,
  React: siReact,
  Remix: siRemix,
  Shopify: siShopify,
  Spotify: siSpotify,
  Tailwind: siTailwindcss,
  "Three.js": siThreedotjs,
  TypeScript: siTypescript,
  Vue: siVuedotjs,
  "Vue.js": siVuedotjs,
  Webflow: siWebflow,
  Zapier: siZapier,
};

export function TechIcon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  const icon = ICON_MAP[name];

  if (!icon) {
    // Fallback for missing brand icons
    return <Terminal className={className} />;
  }

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
}
