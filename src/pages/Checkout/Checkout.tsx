
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useShop } from "../../context/ShopContext";
import type { ShippingAddress } from "../../types/order";

function Checkout() {
    const navigate = useNavigate();
    const { cart } = useShop();

    const [address, setAddress] = useState<ShippingAddress>({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

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

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = event.target;

        setAddress((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (cart.length === 0) {
            return;
        }

        localStorage.setItem(
            "glado-checkout-address",
            JSON.stringify(address)
        );

        navigate("/payment");
    }

    if (cart.length === 0) {
        return (
            <section className="min-h-[60vh] flex flex-col items-center justify-center px-6">
                <h1 className="text-2xl font-semibold">
                    Your cart is empty
                </h1>

                <Link
                    to="/shop"
                    className="mt-6 bg-black text-white px-7 py-3 text-sm"
                >
                    Continue Shopping
                </Link>
            </section>
        );
    }

    const inputClass =
        "w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black";

    return (
        <section className="max-w-7xl mx-auto px-6 py-12">

            <div className="mb-10">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                    GLADO Checkout
                </p>

                <h1 className="text-3xl font-semibold mt-2">
                    Shipping Details
                </h1>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    <div className="lg:col-span-2">

                        <h2 className="text-xl font-semibold mb-6">
                            Delivery Address
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            <div className="sm:col-span-2">
                                <label className="block text-sm mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={address.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={address.email}
                                    onChange={handleChange}
                                    placeholder="example@email.com"
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={address.phone}
                                    onChange={handleChange}
                                    placeholder="10-digit mobile number"
                                    pattern="[0-9]{10}"
                                    maxLength={10}
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-sm mb-2">
                                    Street Address
                                </label>
                                <textarea
                                    name="address"
                                    value={address.address}
                                    onChange={(event) =>
                                        setAddress((previous) => ({
                                            ...previous,
                                            address: event.target.value,
                                        }))
                                    }
                                    placeholder="House number, street, area"
                                    rows={3}
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-2">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={address.city}
                                    onChange={handleChange}
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-2">
                                    State
                                </label>
                                <input
                                    type="text"
                                    name="state"
                                    value={address.state}
                                    onChange={handleChange}
                                    className={inputClass}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm mb-2">
                                    PIN Code
                                </label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={address.pincode}
                                    onChange={handleChange}
                                    pattern="[0-9]{6}"
                                    maxLength={6}
                                    placeholder="6-digit PIN code"
                                    className={inputClass}
                                    required
                                />
                            </div>

                        </div>
                    </div>

                    <aside className="border border-gray-200 p-6 h-fit">

                        <h2 className="text-xl font-semibold mb-6">
                            Order Summary
                        </h2>

                        <div className="space-y-5">
                            {cart.map((item) => (
                                <div
                                    key={`${item.product.id}-${item.selectedSize}`}
                                    className="flex gap-4"
                                >
                                    <img
                                        src={item.product.image}
                                        alt={item.product.title}
                                        className="w-16 h-20 object-cover bg-gray-100"
                                    />

                                    <div className="flex-1">
                                        <p className="text-sm font-medium">
                                            {item.product.title}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Size: {item.selectedSize} · Qty: {item.quantity}
                                        </p>
                                        <p className="text-sm font-semibold mt-2">
                                            {formatPrice(
                                                item.product.price * item.quantity
                                            )}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-200 mt-6 pt-5 space-y-4 text-sm">

                            <div className="flex justify-between">
                                <span className="text-gray-500">Subtotal</span>
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
                            type="submit"
                            className="w-full bg-black text-white py-4 mt-7 text-sm font-semibold hover:bg-gray-800"
                        >
                            CONTINUE TO PAYMENT
                        </button>

                    </aside>
                </div>
            </form>
        </section>
    );
}

export default Checkout;