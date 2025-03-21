import React from "react";
import { ShoppingBag } from "lucide-react";

/**
 * Footer component with logo and copyright information
 * @returns {React.ReactElement} Footer component
 */
export const Footer: React.FC = () => {
    return (
        <footer className="border-t sticky bottom-0 z-40 bg-background">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <ShoppingBag className="h-5 w-5" />
                    <span className="text-sm font-medium">HyperStore</span>
                </div>
                <div className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} KryexThemes. Tüm hakları saklıdır.
                </div>
            </div>
        </footer>
    );
}; 