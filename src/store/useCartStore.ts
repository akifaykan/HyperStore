import { create } from "zustand";
import { ICartItem, IProduct } from "@/types";

/**
 * Interface for cart store state
 * @interface ICartStore
 */
interface ICartStore {
    /**
     * Array of items in the cart
     */
    items: ICartItem[];

    /**
     * Flag indicating if the cart sidebar is open
     */
    isOpen: boolean;

    /**
     * Total number of items in the cart
     */
    totalItems: number;

    /**
     * Total price of all items in the cart
     */
    totalPrice: number;

    /**
     * Add product to cart or increase quantity if already exists
     * @param {IProduct} product - Product to add to cart
     */
    addToCart: (product: IProduct) => void;

    /**
     * Remove an item from the cart
     * @param {number} productId - ID of product to remove
     */
    removeFromCart: (productId: number) => void;

    /**
     * Update quantity of an item in the cart
     * @param {number} productId - ID of product to update
     * @param {number} quantity - New quantity (must be positive)
     */
    updateQuantity: (productId: number, quantity: number) => void;

    /**
     * Toggle cart sidebar visibility
     */
    toggleCart: () => void;

    /**
     * Clear all items from the cart
     */
    clearCart: () => void;
}

/**
 * Zustand hook for cart state management
 */
export const useCartStore = create<ICartStore>((set) => ({
    items: [],
    isOpen: false,
    totalItems: 0,
    totalPrice: 0,

    addToCart: (product) => {
        set((state) => {
            // Check if product already exists in cart
            const existingItemIndex = state.items.findIndex((item) => item.id === product.id);

            let updatedItems: ICartItem[];

            if (existingItemIndex >= 0) {
                // Product exists, increase quantity
                updatedItems = [...state.items];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + 1,
                };
            } else {
                // Product doesn't exist, add new item
                updatedItems = [...state.items, { ...product, quantity: 1 }];
            }

            // Calculate totals
            const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = updatedItems.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );

            return { items: updatedItems, totalItems, totalPrice };
        });
    },

    removeFromCart: (productId) => {
        set((state) => {
            const updatedItems = state.items.filter((item) => item.id !== productId);

            // Calculate totals
            const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = updatedItems.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );

            return { items: updatedItems, totalItems, totalPrice };
        });
    },

    updateQuantity: (productId, quantity) => {
        set((state) => {
            if (quantity <= 0) {
                // If quantity is 0 or negative, remove the item
                return state;
            }

            const updatedItems = state.items.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            );

            // Calculate totals
            const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = updatedItems.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );

            return { items: updatedItems, totalItems, totalPrice };
        });
    },

    toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
    },

    clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
    },
}));
