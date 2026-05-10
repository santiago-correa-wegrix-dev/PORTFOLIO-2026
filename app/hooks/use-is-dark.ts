import { useEffect, useState } from "react";

import { useUIStore } from "~/store/ui-store";

export function useIsDark() {
  const { theme } = useUIStore();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (globalThis.window === undefined) { return; }

    const mediaQuery = globalThis.matchMedia("(prefers-color-scheme: dark)");

    const update = () => {
      if (theme === "system") {
        setIsDark(mediaQuery.matches);
      } else {
        setIsDark(theme === "dark");
      }
    };

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, [theme]);

  return isDark;
}
