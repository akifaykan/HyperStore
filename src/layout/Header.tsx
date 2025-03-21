import React from "react";
import { Cart } from "@/components/cart/Cart";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { ThemeToggle } from "@/components/ui/theme-toggle";

/**
 * Header component with logo and cart button
 * @returns {React.ReactElement} Header component
 */
export const Header: React.FC = () => {
    const { toggleCart } = useCartStore();

    return (
        <header className="border-b sticky top-0 z-50 bg-background">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <ShoppingBag className="h-6 w-6" />
                    <h1 className="text-xl font-bold">HyperStore</h1>
                </div>

                <div className="flex items-center space-x-3">
                    <ThemeToggle />
                    <Button variant="ghost" onClick={toggleCart}>
                        Sepetim
                    </Button>
                    <Cart />
                </div>
            </div>
        </header>
    );
};
