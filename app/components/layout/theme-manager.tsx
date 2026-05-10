import { useEffect } from "react";

import { useUIStore } from "~/store/ui-store";

export function ThemeManager() {
  const { theme, showCustomCursor } = useUIStore();

  // Handle Theme Changes
  useEffect(() => {
    const root = globalThis.document.documentElement;
    root.classList.remove("light", "dark");

    const mediaQuery = globalThis.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      let effectiveDark = false;

      if (theme === "system") {
        effectiveDark = mediaQuery.matches;
      } else {
        effectiveDark = theme === "dark";
      }

      // Apply to DOM
      if (effectiveDark) {
        root.classList.add("dark");
        // Update meta theme-color
        document
          .querySelector('meta[name="theme-color"][media="(prefers-color-scheme: dark)"]')
          ?.setAttribute("content", "#000000");
        document
          .querySelector('meta[name="theme-color"][media="(prefers-color-scheme: light)"]')
          ?.setAttribute("content", "#000000");
      } else {
        root.classList.add("light");
        // Update meta theme-color
        document
          .querySelector('meta[name="theme-color"][media="(prefers-color-scheme: dark)"]')
          ?.setAttribute("content", "#ffffff");
        document
          .querySelector('meta[name="theme-color"][media="(prefers-color-scheme: light)"]')
          ?.setAttribute("content", "#ffffff");
      }
    };

    applyTheme();

    const handler = () => {
      if (theme === "system") {applyTheme();}
    };

    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [theme]);

  // Handle Cursor Preferences
  useEffect(() => {
    const root = globalThis.document.documentElement;
    root.classList.toggle("custom-cursor-active", showCustomCursor);
  }, [showCustomCursor]);

  return null; // Headless component
}
