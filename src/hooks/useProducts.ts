import { useQuery } from "@tanstack/react-query";
import {
    fetchCategories,
    fetchProductById,
    fetchProducts,
    fetchProductsByCategory,
} from "@/services/api";
import { IProduct } from "@/types";

/**
 * Query keys for product related queries
 */
export const productKeys = {
    all: ["products"] as const,
    lists: () => [...productKeys.all, "list"] as const,
    list: (filters: string) => [...productKeys.lists(), { filters }] as const,
    details: () => [...productKeys.all, "detail"] as const,
    detail: (id: number) => [...productKeys.details(), id] as const,
    categories: ["categories"] as const,
};

/**
 * Custom hook to fetch all products
 * @returns {Object} Query result with products data, loading and error states
 */
export const useProducts = () => {
    return useQuery({
        queryKey: productKeys.lists(),
        queryFn: fetchProducts,
    });
};

/**
 * Custom hook to fetch a product by ID
 * @param {number} id - Product ID
 * @returns {Object} Query result with product data, loading and error states
 */
export const useProduct = (id: number) => {
    return useQuery({
        queryKey: productKeys.detail(id),
        queryFn: () => fetchProductById(id),
        enabled: !!id, // Only run the query if we have an ID
    });
};

/**
 * Custom hook to fetch products by category
 * @param {string} category - Category name
 * @returns {Object} Query result with filtered products data, loading and error states
 */
export const useProductsByCategory = (category: string) => {
    return useQuery<IProduct[]>({
        queryKey: productKeys.list(category),
        queryFn: () => fetchProductsByCategory(category),
        enabled: !!category, // Only run the query if we have a category
    });
};

/**
 * Custom hook to fetch all product categories
 * @returns {Object} Query result with categories data, loading and error states
 */
export const useCategories = () => {
    return useQuery({
        queryKey: productKeys.categories,
        queryFn: fetchCategories,
    });
};
