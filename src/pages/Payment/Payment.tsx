
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useShop } from "../../context/ShopContext";
import type { ShippingAddress, PaymentMethod, Order } from "../../types/order";

function Payment() {
    const navigate = useNavigate();

    const { cart, removeFromCart } = useShop();

    const [paymentMethod, setPaymentMethod] =
        useState<PaymentMethod>("UPI");

    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    let address: ShippingAddress | null = null;

    try {
        const savedAddress = localStorage.getItem(
            "glado-checkout-address"
        );

        address = savedAddress
            ? JSON.parse(savedAddress) as ShippingAddress
            : null;
    } catch {
        address = null;
    }

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);

    const subtotal = cart.reduce(
        (total, item) =>
            total + item.product.price * item.quantity,
        0
    );

    const shipping = subtotal >= 1999 ? 0 : 99;
    const total = subtotal + shipping;

    function handlePlaceOrder() {
        if (!address || cart.length === 0 || isPlacingOrder) {
            return;
        }

        setIsPlacingOrder(true);

        const order: Order = {
            orderId: `GLD-${Date.now()}`,
            items: [...cart],
            address,
            paymentMethod,
            subtotal,
            shipping,
            total,
            orderDate: new Date().toISOString(),
            status:
                paymentMethod === "COD"
                    ? "Confirmed - Cash on Delivery"
                    : "Confirmed - Demo Payment",
        };

        // Save order details
        const previousOrders = JSON.parse(
            localStorage.getItem("glado-orders") || "[]"
        );

        const updatedOrders = [...previousOrders, order];

        localStorage.setItem(
            "glado-orders",
            JSON.stringify(updatedOrders)
        );

        localStorage.setItem(
            "glado-last-order",
            JSON.stringify(order)
        );

        // Clear purchased cart items
        cart.forEach((item) => {
            removeFromCart(item.product.id, item.selectedSize);
        });

        localStorage.removeItem("glado-checkout-address");

        navigate("/success");
    }

    if (!address || cart.length === 0) {
        return (
            <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
                <h1 className="text-2xl font-semibold">
                    Checkout details not found
                </h1>

                <p className="text-sm text-gray-500 mt-3">
                    Please return to your cart and start checkout again.
                </p>

                <Link
                    to="/cart"
                    className="mt-6 bg-black text-white px-7 py-3 text-sm"
                >
                    BACK TO CART
                </Link>
            </section>
        );
    }

    const methods: {
        value: PaymentMethod;
        title: string;
        description: string;
    }[] = [
            {
                value: "UPI",
                title: "UPI",
                description: "Demo UPI payment selection",
            },
            {
                value: "Card",
                title: "Credit / Debit Card",
                description: "Demo card payment selection",
            },
            {
                value: "COD",
                title: "Cash on Delivery",
                description: "Pay when your order arrives",
            },
        ];

    return (
        <section className="max-w-7xl mx-auto px-6 py-12">

            <div className="mb-10">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                    Almost There
                </p>

                <h1 className="text-3xl font-semibold mt-2">
                    Payment
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                <div className="lg:col-span-2">

                    <h2 className="text-xl font-semibold mb-6">
                        Select Payment Method
                    </h2>

                    <div className="space-y-4">
                        {methods.map((method) => (
                            <label
                                key={method.value}
                                className={`flex items-start gap-4 border p-5 cursor-pointer transition-colors ${paymentMethod === method.value
                                    ? "border-black bg-gray-50"
                                    : "border-gray-200 hover:border-gray-400"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value={method.value}
                                    checked={paymentMethod === method.value}
                                    onChange={() => setPaymentMethod(method.value)}
                                    className="mt-1 accent-black"
                                />

                                <div>
                                    <h3 className="text-sm font-semibold">
                                        {method.title}
                                    </h3>

                                    <p className="text-xs text-gray-500 mt-1">
                                        {method.description}
                                    </p>
                                </div>
                            </label>
                        ))}
                    </div>

                    <div className="border border-gray-200 p-5 mt-8">
                        <h3 className="text-sm font-semibold mb-3">
                            Delivering To
                        </h3>

                        <p className="text-sm">{address.fullName}</p>
                        <p className="text-sm text-gray-500 mt-1">
                            {address.address}, {address.city}, {address.state} - {address.pincode}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            {address.phone}
                        </p>

                        <Link
                            to="/checkout"
                            className="inline-block text-xs underline mt-4"
                        >
                            Change Address
                        </Link>
                    </div>

                </div>

                <aside className="border border-gray-200 p-6 h-fit">

                    <h2 className="text-xl font-semibold mb-6">
                        Order Summary
                    </h2>

                    <div className="space-y-4 text-sm">

                        <div className="flex justify-between">
                            <span className="text-gray-500">
                                Items ({cart.length})
                            </span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-gray-500">Shipping</span>
                            <span>
                                {shipping === 0 ? "FREE" : formatPrice(shipping)}
                            </span>
                        </div>

                        <div className="border-t border-gray-200 pt-4 flex justify-between font-semibold text-base">
                            <span>Total</span>
                            <span>{formatPrice(total)}</span>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={handlePlaceOrder}
                        disabled={isPlacingOrder}
                        className="w-full bg-black text-white py-4 mt-7 text-sm font-semibold hover:bg-gray-800 disabled:opacity-50"
                    >
                        {isPlacingOrder ? "PROCESSING..." : "PLACE ORDER"}
                    </button>

                    <p className="text-xs text-gray-400 text-center mt-4">
                        Demo checkout only. No real payment will be processed.
                    </p>

                </aside>
            </div>
        </section>
    );
}

export default Payment;