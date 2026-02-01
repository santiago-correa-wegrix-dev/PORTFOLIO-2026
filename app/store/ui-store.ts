import { create } from 'zustand';
import { createJSONStorage,persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';

interface UIState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    showCustomCursor: boolean;
    toggleCustomCursor: () => void;
    soundEnabled: boolean;
    toggleSound: () => void;
    reducedMotion: boolean;
    toggleReducedMotion: () => void;
}

export const useUIStore = create<UIState>()(
    persist(
        (set) => ({
            theme: 'system',
            setTheme: (theme) => set({ theme }),
            showCustomCursor: true,
            toggleCustomCursor: () => set((state) => ({ showCustomCursor: !state.showCustomCursor })),
            soundEnabled: true,
            toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
            reducedMotion: false,
            toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),
        }),
        {
            name: 'portfolio-ui-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
