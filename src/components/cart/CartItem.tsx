import React from "react";
import { ICartItem } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

/**
 * Props for CartItem component
 * @interface CartItemProps
 */
interface CartItemProps {
    /**
     * Cart item data to display
     */
    item: ICartItem;
}

/**
 * Component to display a single cart item with quantity controls
 * @param {CartItemProps} props - Component props
 * @returns {React.ReactElement} Cart item component
 */
export const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCartStore();

    /**
     * Format price with currency symbol
     * @param {number} price - Price to format
     * @returns {string} Formatted price
     */
    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
        }).format(price);
    };

    /**
     * Handle increasing item quantity
     */
    const handleIncrease = () => {
        updateQuantity(item.id, item.quantity + 1);
    };

    /**
     * Handle decreasing item quantity
     */
    const handleDecrease = () => {
        if (item.quantity > 1) {
            updateQuantity(item.id, item.quantity - 1);
        } else {
            removeFromCart(item.id);
        }
    };

    /**
     * Handle removing item from cart
     */
    const handleRemove = () => {
        removeFromCart(item.id);
    };

    // Determine if we should show the remove icon or minus icon
    const isQuantityOne = item.quantity === 1;

    return (
        <div className="px-6 py-4 hover:bg-muted/30 transition-colors group">
            <div className="flex gap-4">
                {/* Product Image */}
                <div className="rounded-lg overflow-hidden bg-slate-50 flex-shrink-0 w-20 h-20 border">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain p-2"
                    />
                </div>

                {/* Product Details */}
                <div className="flex-grow">
                    <div className="flex flex-col h-full justify-between">
                        <div className="flex justify-between">
                            <h4 className="font-medium line-clamp-1 pr-2">{item.title}</h4>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500"
                                onClick={handleRemove}
                                title="Ürünü Sepetten Çıkar"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 flex items-center">
                            <span className="bg-muted px-1.5 py-0.5 rounded text-xs mr-1.5">
                                {item.category}
                            </span>
                            Birim Fiyat: {formatPrice(item.price)}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center">
                                <div className="flex items-center border rounded">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={`h-8 w-8 rounded-none ${isQuantityOne ? "text-red-500" : ""}`}
                                        onClick={handleDecrease}
                                        title={isQuantityOne ? "Ürünü Sil" : "Miktarı Azalt"}
                                    >
                                        {isQuantityOne ? (
                                            <Trash2 className="h-3 w-3" />
                                        ) : (
                                            <Minus className="h-3 w-3" />
                                        )}
                                    </Button>
                                    <span className="w-8 text-center text-sm mx-1 font-medium">
                                        {item.quantity}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 rounded-none"
                                        onClick={handleIncrease}
                                        title="Miktarı Artır"
                                    >
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>

                            <div className="font-medium text-right">
                                {formatPrice(item.price * item.quantity)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
