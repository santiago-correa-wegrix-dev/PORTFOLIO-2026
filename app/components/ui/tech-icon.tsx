import { Terminal } from "lucide-react";
import {
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
  siReact,
  siRemix,
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
  React: siReact,
  "Next.js": siNextdotjs,
  TypeScript: siTypescript,
  Tailwind: siTailwindcss,
  "Three.js": siThreedotjs,
  "Node.js": siNodedotjs,
  Docker: siDocker,
  PostgreSQL: siPostgresql,
  Figma: siFigma,
  Remix: siRemix,
  GraphQL: siGraphql,
  Git: siGit,
  Jest: siJest,
  Vue: siVuedotjs,
  HubSpot: siHubspot,
  Webflow: siWebflow,
  Spotify: siSpotify,
  Zapier: siZapier,
  N8N: siN8n,
  // Aliases
  "Vue.js": siVuedotjs,
  Shopify: siWebflow, // Placeholder or need to import siShopify
  Python: siNodedotjs, // Placeholder or need import
  Angular: siReact, // Placeholder
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
