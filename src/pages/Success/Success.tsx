
import { Link } from "react-router-dom";

import type { Order } from "../../types/order";

function Success() {
    let order: Order | null = null;

    try {
        const savedOrder = localStorage.getItem("glado-last-order");

        order = savedOrder
            ? JSON.parse(savedOrder) as Order
            : null;
    } catch {
        order = null;
    }

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);

    if (!order) {
        return (
            <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
                <h1 className="text-2xl font-semibold">
                    No Order Found
                </h1>

                <p className="text-sm text-gray-500 mt-3">
                    You haven't placed an order yet.
                </p>

                <Link
                    to="/shop"
                    className="mt-6 bg-black text-white px-7 py-3 text-sm"
                >
                    EXPLORE GLADO
                </Link>
            </section>
        );
    }

    return (
        <section className="max-w-4xl mx-auto px-6 py-16">

            <div className="text-center mb-12">

                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <span className="text-green-600 text-3xl">✓</span>
                </div>

                <h1 className="text-3xl font-semibold mt-6">
                    Thank You for Your Order!
                </h1>

                <p className="text-sm text-gray-500 mt-3">
                    Your order has been placed successfully.
                </p>

                <p className="text-sm text-gray-500 mt-2">
                    Order ID: <span className="font-semibold text-black">
                        {order.orderId}
                    </span>
                </p>

            </div>

            <div className="border border-gray-200 p-6 md:p-8">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-gray-200">

                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">
                            Order Date
                        </p>

                        <p className="text-sm font-medium mt-2">
                            {new Date(order.orderDate).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">
                            Payment Method
                        </p>

                        <p className="text-sm font-medium mt-2">
                            {order.paymentMethod}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">
                            Order Status
                        </p>

                        <p className="text-sm font-medium text-green-700 mt-2">
                            {order.status}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">
                            Total Amount
                        </p>

                        <p className="text-sm font-semibold mt-2">
                            {formatPrice(order.total)}
                        </p>
                    </div>

                </div>

                <div className="py-7 border-b border-gray-200">

                    <h2 className="text-lg font-semibold mb-6">
                        Order Items
                    </h2>

                    <div className="space-y-6">

                        {order.items.map((item) => (
                            <div
                                key={`${item.product.id}-${item.selectedSize}`}
                                className="flex gap-4"
                            >
                                <img
                                    src={item.product.image}
                                    alt={item.product.title}
                                    className="w-20 h-24 object-cover bg-gray-100"
                                />

                                <div className="flex-1">
                                    <h3 className="text-sm font-medium">
                                        {item.product.title}
                                    </h3>

                                    <p className="text-xs text-gray-500 mt-2">
                                        Size: {item.selectedSize} · Quantity: {item.quantity}
                                    </p>

                                    <p className="text-sm font-semibold mt-3">
                                        {formatPrice(
                                            item.product.price * item.quantity
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

                <div className="py-7 border-b border-gray-200">

                    <h2 className="text-lg font-semibold mb-4">
                        Shipping Address
                    </h2>

                    <p className="text-sm font-medium">
                        {order.address.fullName}
                    </p>

                    <p className="text-sm text-gray-500 mt-2 leading-6">
                        {order.address.address}
                        <br />
                        {order.address.city}, {order.address.state} - {order.address.pincode}
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                        Phone: {order.address.phone}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                        Email: {order.address.email}
                    </p>

                </div>

                <div className="pt-7 space-y-4 text-sm">

                    <div className="flex justify-between">
                        <span className="text-gray-500">Subtotal</span>
                        <span>{formatPrice(order.subtotal)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Shipping</span>
                        <span>
                            {order.shipping === 0
                                ? "FREE"
                                : formatPrice(order.shipping)}
                        </span>
                    </div>

                    <div className="flex justify-between border-t border-gray-200 pt-4 text-base font-semibold">
                        <span>Order Total</span>
                        <span>{formatPrice(order.total)}</span>
                    </div>

                </div>

            </div>

            <div className="text-center mt-10">
                <Link
                    to="/shop"
                    className="inline-block bg-black text-white px-10 py-4 text-sm font-semibold hover:bg-gray-800"
                >
                    CONTINUE SHOPPING
                </Link>
            </div>

        </section>
    );
}

export default Success;