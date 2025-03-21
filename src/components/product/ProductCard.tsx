import React from "react";
import { IProduct } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

/**
 * Props for ProductCard component
 * @interface ProductCardProps
 */
interface ProductCardProps {
    /**
     * Product data to display
     */
    product: IProduct;
}

/**
 * Component to display a product card with image, details and add to cart button
 * @param {ProductCardProps} props - Component props
 * @returns {React.ReactElement} Product card component
 */
export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCartStore();

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
     * Handle adding product to cart
     */
    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <Card className="w-full h-full flex flex-col">
            <CardHeader className="p-4 flex items-center justify-center">
                <div className="aspect-square w-full h-[200px] relative bg-slate-50 rounded-md overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="object-contain w-full h-full p-4"
                    />
                </div>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow p-6 pt-2">
                <CardTitle className="text-xl font-medium line-clamp-2 h-14">
                    {product.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground mt-2 line-clamp-3 flex-grow">
                    {product.description}
                </CardDescription>
                <div className="flex items-center gap-2 mt-4">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {product.category}
                    </span>
                    <div className="text-xs text-gray-500 flex items-center">
                        ★ {product.rating.rate} ({product.rating.count})
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex justify-between items-center">
                <div className="text-xl font-bold">{formatPrice(product.price)}</div>
                <Button onClick={handleAddToCart} size="sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Sepete Ekle
                </Button>
            </CardFooter>
        </Card>
    );
};
