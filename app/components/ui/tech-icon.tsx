import { Terminal } from "lucide-react";
import {
  siAngular,
  siDocker,
  siFigma,
  siGit,
  siGooglemaps,
  siGraphql,
  siGreensock,
  siHubspot,
  siJavascript,
  siJest,
  siLaravel,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siRemix,
  siRubyonrails,
  siSass,
  siShopify,
  siSolidity,
  siSpotify,
  siTailwindcss,
  siThreedotjs,
  siTypescript,
  siVitest,
  siVuedotjs,
  siWeb3dotjs,
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
  GSAP: siGreensock,
  Git: siGit,
  "Google Maps API": siGooglemaps,
  GraphQL: siGraphql,
  HubSpot: siHubspot,
  JavaScript: siJavascript,
  Jest: siJest,
  Laravel: siLaravel,
  N8N: siN8n,
  "Next.js": siNextdotjs,
  "Node.js": siNodedotjs,
  PHP: siPhp,
  PostgreSQL: siPostgresql,
  Python: siPython,
  React: siReact,
  Remix: siRemix,
  "Ruby on Rails": siRubyonrails,
  SCSS: siSass,
  Shopify: siShopify,
  Solidity: siSolidity,
  Spotify: siSpotify,
  Tailwind: siTailwindcss,
  "Three.js": siThreedotjs,
  TypeScript: siTypescript,
  Vitest: siVitest,
  Vue: siVuedotjs,
  "Vue.js": siVuedotjs,
  "Web3.js": siWeb3dotjs,
  Webflow: siWebflow,
  Zapier: siZapier,
};

export function TechIcon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  const icon = ICON_MAP[name];

  if (!icon) {
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
