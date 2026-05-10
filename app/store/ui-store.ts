import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";

export type Theme = "light" | "dark" | "system";

interface UIState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  showCustomCursor: boolean;
  toggleCustomCursor: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      setTheme: (theme) => set({ theme }),
      showCustomCursor: true,
      theme: "light",
      toggleCustomCursor: () => set((state) => ({ showCustomCursor: !state.showCustomCursor })),
    }),
    {
      name: "portfolio-ui-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
