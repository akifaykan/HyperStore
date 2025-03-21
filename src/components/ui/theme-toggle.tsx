import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/useThemeStore";
import { Moon, Sun } from "lucide-react";

/**
 * Theme toggle component to switch between light and dark mode
 * @returns {React.ReactElement} Theme toggle button
 */
export function ThemeToggle() {
    const { mode, toggleMode } = useThemeStore();

    // Apply the theme class to document when mode changes
    useEffect(() => {
        const root = window.document.documentElement;

        // Remove the previous theme class
        root.classList.remove("light", "dark");

        // Add the current theme class
        root.classList.add(mode);
    }, [mode]);

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleMode}
            aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
        >
            {mode === "light" ? (
                <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0" />
            ) : (
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 transition-all dark:-rotate-90" />
            )}
        </Button>
    );
}
