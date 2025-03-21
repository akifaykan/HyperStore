import React, { useState } from "react";
import { ProductCard } from "./ProductCard";
import { useProducts, useCategories } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";

/**
 * Component to display a grid of product cards with category filtering
 * @returns {React.ReactElement} Product list component
 */
export const ProductList: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const { data: products = [], isLoading: productsLoading, error: productsError } = useProducts();

    const { data: categories = [], isLoading: categoriesLoading } = useCategories();

    /**
     * Handle category selection for filtering
     * @param {string | null} category - Selected category or null for all
     */
    const handleCategorySelect = (category: string | null) => {
        setSelectedCategory(category);
    };

    /**
     * Filter products by selected category
     * @returns {Array} Filtered products array
     */
    const filteredProducts = selectedCategory
        ? products.filter((product) => product.category === selectedCategory)
        : products;

    if (productsLoading) {
        return (
            <div className="w-full min-h-[400px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (productsError) {
        return (
            <div className="w-full min-h-[400px] flex items-center justify-center">
                <div className="text-red-500 text-center">
                    Ürünler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Category filters */}
            <div className="flex flex-wrap gap-2 pb-4 border-b">
                <Button
                    variant={selectedCategory === null ? "default" : "outline"}
                    onClick={() => handleCategorySelect(null)}
                    className="rounded-full"
                >
                    Tümü
                </Button>

                {!categoriesLoading &&
                    categories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "outline"}
                            onClick={() => handleCategorySelect(category)}
                            className="rounded-full capitalize"
                        >
                            {category}
                        </Button>
                    ))}
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Empty state */}
            {filteredProducts.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-muted-foreground">Bu kategoride ürün bulunamadı.</p>
                </div>
            )}
        </div>
    );
};
