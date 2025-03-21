import { IProduct } from "@/types";

/**
 * Fake Store API base URL
 * @constant {string}
 */
const API_BASE_URL = "https://fakestoreapi.com";

/**
 * Fetches all products from the API
 * @returns {Promise<IProduct[]>} Promise resolving to array of products
 */
export const fetchProducts = async (): Promise<IProduct[]> => {
    const response = await fetch(`${API_BASE_URL}/products`);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
};

/**
 * Fetches a single product by ID
 * @param {number} id - The product ID
 * @returns {Promise<IProduct>} Promise resolving to a product
 */
export const fetchProductById = async (id: number): Promise<IProduct> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
};

/**
 * Fetches products by category
 * @param {string} category - The category to filter by
 * @returns {Promise<IProduct[]>} Promise resolving to array of products
 */
export const fetchProductsByCategory = async (category: string): Promise<IProduct[]> => {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
};

/**
 * Fetches all available product categories
 * @returns {Promise<string[]>} Promise resolving to array of category names
 */
export const fetchCategories = async (): Promise<string[]> => {
    const response = await fetch(`${API_BASE_URL}/products/categories`);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
};
