
import type { CartItem } from "../context/ShopContext";

export interface ShippingAddress {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
}

export type PaymentMethod = "UPI" | "Card" | "COD";

export interface Order {
    orderId: string;
    items: CartItem[];
    address: ShippingAddress;
    paymentMethod: PaymentMethod;
    subtotal: number;
    shipping: number;
    total: number;
    orderDate: string;
    status: string;
}