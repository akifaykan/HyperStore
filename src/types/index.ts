/**
 * Interface representing a product in the system
 * @interface IProduct
 */
export interface IProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

/**
 * Interface for cart item which extends product with quantity
 * @interface ICartItem
 */
export interface ICartItem extends IProduct {
    quantity: number;
}
