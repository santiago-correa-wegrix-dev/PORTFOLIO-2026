import "./app.css";
import "./i18n"; // Initialize i18n

import { ReactLenis } from "lenis/react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";

import type { Route } from "./+types/root";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Space+Grotesk:wght@300..700&display=swap",
  },
];

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Santiago Correa | Front-End Engineer" },
    { name: "description", content: "Portfolio of Santiago Correa, a Front-End Engineer & Creative Developer specializing in scalable, award-winning digital experiences." },
    { name: "theme-color", content: "#ffffff", media: "(prefers-color-scheme: light)" },
    { name: "theme-color", content: "#000000", media: "(prefers-color-scheme: dark)" },
  ];
};

import { AnimatePresence, motion } from "framer-motion";

import { Grain } from "~/components/layout/grain";
import { MouseFollower } from "~/components/layout/mouse-follower";
import { SmoothScroll } from "~/components/layout/smooth-scroll";
import { ThemeManager } from "~/components/layout/theme-manager";
import { ControlCenter } from "~/components/ui/control-center";
import { Noise } from "~/components/ui/noise";
import { ChatWidget } from "~/features/chat/chat-widget";

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-background text-foreground overflow-x-hidden selection:bg-zinc-200 selection:text-black dark:selection:bg-zinc-800 dark:selection:text-white">
        {/* Theme & Chat Managers */}
        <ThemeManager />
        <ChatWidget />
        <SmoothScroll>
          <MouseFollower />
          <Grain />
          <Noise />
          <ControlCenter />
          <AnimatePresence mode="wait">
            <motion.main
              key={location.pathname}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {children}
            </motion.main>
          </AnimatePresence>
          <ScrollRestoration />
          <Scripts />
        </SmoothScroll>
      </body>
    </html >
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
