
export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    oldPrice?: number;
    image: string;
    category: "men" | "women";
    subCategory: string;
    rating: number;
    reviewCount: number;
    isNew: boolean;
}