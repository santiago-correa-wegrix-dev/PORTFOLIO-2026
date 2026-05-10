import "./app.css";

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLocation,
} from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { IntlayerProvider } from "react-intlayer";

import { Grain } from "~/components/layout/grain";
import { MouseFollower } from "~/components/layout/mouse-follower";
import { SmoothScroll } from "~/components/layout/smooth-scroll";
import { ThemeManager } from "~/components/layout/theme-manager";
import { ControlCenter } from "~/components/ui/control-center";
import { Noise } from "~/components/ui/noise";

import type { Route } from "./+types/root";

export const links: Route.LinksFunction = () => [
  { href: "/favicon.svg", rel: "icon", type: "image/svg+xml" },
  { href: "https://fonts.googleapis.com", rel: "preconnect" },
  {
    crossOrigin: "anonymous",
    href: "https://fonts.gstatic.com",
    rel: "preconnect",
  },
  {
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Space+Grotesk:wght@300..700&display=swap",
    rel: "stylesheet",
  },
];

export const meta: Route.MetaFunction = () => [
  { title: "Santiago Correa | Senior Engineer" },
  {
    content: "Senior engineer building consumer products at scale.",
    name: "description",
  },
  {
    content: "#ffffff",
    media: "(prefers-color-scheme: light)",
    name: "theme-color",
  },
  {
    content: "#000000",
    media: "(prefers-color-scheme: dark)",
    name: "theme-color",
  },
];

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
      <body className="overflow-x-hidden bg-background text-foreground selection:bg-zinc-200 selection:text-black dark:selection:bg-zinc-800 dark:selection:text-white">
        <IntlayerProvider>
          <ThemeManager />
          <SmoothScroll>
            <MouseFollower />
            <Grain />
            <Noise />
            <ControlCenter />
            <AnimatePresence mode="wait">
              <motion.main
                key={location.pathname}
                initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
                animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                exit={{ filter: "blur(10px)", opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {children}
              </motion.main>
            </AnimatePresence>
            <ScrollRestoration />
            <Scripts />
          </SmoothScroll>
        </IntlayerProvider>
      </body>
    </html>
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
      error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    ({ stack } = error);
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
