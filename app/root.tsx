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
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { IntlayerProvider } from "react-intlayer";

import { Grain } from "~/components/layout/grain";
import { MouseFollower } from "~/components/layout/mouse-follower";
import { SmoothScroll } from "~/components/layout/smooth-scroll";
import { ThemeManager } from "~/components/layout/theme-manager";
import { ControlCenter } from "~/components/ui/control-center";
import { Noise } from "~/components/ui/noise";
import { useIsDark } from "~/hooks/use-is-dark";

import type { Route } from "./+types/root";

export const links: Route.LinksFunction = () => [
  { href: "/favicon.svg", rel: "icon", type: "image/svg+xml" },
];

export const meta: Route.MetaFunction = () => [
  { title: "Santiago Correa | Senior Engineer" },
  {
    content:
      "Senior frontend engineer with 9+ years building consumer products at scale. React, Remix, TypeScript. Currently at Statista. Building with the Anthropic API.",
    name: "description",
  },
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "Person",
      address: {
        "@type": "PostalAddress",
        addressCountry: "DE",
        addressLocality: "Berlin",
      },
      email: "scorrea.dev@gmail.com",
      jobTitle: "Senior Frontend Engineer",
      knowsAbout: [
        "React",
        "TypeScript",
        "Remix",
        "Node.js",
        "Anthropic API",
        "Claude",
        "Python",
        "Three.js",
      ],
      name: "Santiago Correa",
      sameAs: [
        "https://github.com/scorrea-ui",
        "https://www.linkedin.com/in/wegrix/",
        "https://deliver-ai.xyz/",
      ],
      url: "https://wegrix.dev",
      worksFor: {
        "@type": "Organization",
        name: "Statista",
      },
    },
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isDark = useIsDark();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={isDark ? "#000000" : "#ffffff"} />
        <Meta />
        <Links />
      </head>
      <body className="overflow-x-hidden bg-background text-foreground selection:bg-zinc-200 selection:text-black dark:selection:bg-zinc-800 dark:selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background focus:outline-none"
        >
          Skip to main content
        </a>
        <MotionConfig reducedMotion="user">
          <IntlayerProvider>
            <ThemeManager />
            <SmoothScroll>
              <MouseFollower />
              <Grain />
              <Noise />
              <ControlCenter />
              <AnimatePresence mode="wait">
                <motion.main
                  id="main-content"
                  tabIndex={-1}
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
        </MotionConfig>
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
