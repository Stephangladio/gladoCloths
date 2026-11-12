
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import type { ReactNode } from "react";
import type { Product } from "../types/product";

export interface CartItem {
    product: Product;
    quantity: number;
    selectedSize: string;
}

interface ShopContextType {
    cart: CartItem[];
    wishlist: Product[];
    addToCart: (
        product: Product,
        quantity?: number,
        size?: string
    ) => void;
    removeFromCart: (id: number, size: string) => void;
    updateQuantity: (
        id: number,
        size: string,
        quantity: number
    ) => void;
    toggleWishlist: (product: Product) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(
    undefined
);

function readStorage<T,>(key: string, fallback: T): T {
    try {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) as T : fallback;
    } catch {
        return fallback;
    }
}

export function ShopProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>(() =>
        readStorage("glado-cart", [])
    );

    const [wishlist, setWishlist] = useState<Product[]>(() =>
        readStorage("glado-wishlist", [])
    );

    useEffect(() => {
        localStorage.setItem("glado-cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem("glado-wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    function addToCart(
        product: Product,
        quantity = 1,
        size = "M"
    ) {
        setCart((previousCart) => {
            const existingItem = previousCart.find(
                (item) =>
                    item.product.id === product.id &&
                    item.selectedSize === size
            );

            if (existingItem) {
                return previousCart.map((item) =>
                    item.product.id === product.id &&
                        item.selectedSize === size
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [
                ...previousCart,
                {
                    product,
                    quantity,
                    selectedSize: size,
                },
            ];
        });
    }

    function removeFromCart(id: number, size: string) {
        setCart((previousCart) =>
            previousCart.filter(
                (item) =>
                    item.product.id !== id ||
                    item.selectedSize !== size
            )
        );
    }

    function updateQuantity(
        id: number,
        size: string,
        quantity: number
    ) {
        if (quantity < 1) return;

        setCart((previousCart) =>
            previousCart.map((item) =>
                item.product.id === id &&
                    item.selectedSize === size
                    ? { ...item, quantity }
                    : item
            )
        );
    }

    function toggleWishlist(product: Product) {
        setWishlist((previousWishlist) => {
            const alreadyExists = previousWishlist.some(
                (item) => item.id === product.id
            );

            if (alreadyExists) {
                return previousWishlist.filter(
                    (item) => item.id !== product.id
                );
            }

            return [...previousWishlist, product];
        });
    }

    return (
        <ShopContext.Provider
            value={{
                cart,
                wishlist,
                addToCart,
                removeFromCart,
                updateQuantity,
                toggleWishlist,
            }}
        >
            {children}
        </ShopContext.Provider>
    );
}

export function useShop() {
    const context = useContext(ShopContext);

    if (!context) {
        throw new Error("useShop must be used inside ShopProvider");
    }

    return context;
}