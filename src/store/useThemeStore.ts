import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Interface for theme store state
 * @interface IThemeStore
 */
interface IThemeStore {
    /**
     * Current theme mode
     */
    mode: "light" | "dark";

    /**
     * Toggle between light and dark mode
     */
    toggleMode: () => void;

    /**
     * Set specific theme mode
     * @param {string} mode - Theme mode to set
     */
    setMode: (mode: "light" | "dark") => void;
}

/**
 * Theme store for managing application theme
 */
export const useThemeStore = create<IThemeStore>()(
    persist(
        (set) => ({
            // Default to system preference or light
            mode:
                window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light",

            toggleMode: () =>
                set((state) => ({
                    mode: state.mode === "light" ? "dark" : "light",
                })),

            setMode: (mode) => set({ mode }),
        }),
        {
            name: "theme-store", // localStorage key
        }
    )
);
