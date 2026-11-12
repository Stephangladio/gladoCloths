
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import type { Order } from "../../types/order";

function Profile() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    let orders: Order[] = [];

    try {
        orders = JSON.parse(
            localStorage.getItem("glado-orders") || "[]"
        ) as Order[];
    } catch {
        orders = [];
    }

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);

    function handleLogout() {
        logout();
        navigate("/login");
    }

    if (!user) {
        return (
            <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
                <h1 className="text-2xl font-semibold">
                    Please Sign In
                </h1>

                <p className="text-sm text-gray-500 mt-3">
                    Sign in to view your profile and orders.
                </p>

                <Link
                    to="/login"
                    className="mt-6 bg-black text-white px-8 py-3 text-sm"
                >
                    SIGN IN
                </Link>
            </section>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-6 py-12">

            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-5 mb-10">

                <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                        My Account
                    </p>

                    <h1 className="text-3xl font-semibold mt-2">
                        Hello, {user.fullName}
                    </h1>

                    <p className="text-sm text-gray-500 mt-2">
                        Manage your account and orders.
                    </p>
                </div>

                <button
                    onClick={handleLogout}
                    className="border border-gray-300 px-6 py-3 text-sm hover:border-black"
                >
                    SIGN OUT
                </button>

            </div>

            <div className="border border-gray-200 p-6 mb-10">

                <h2 className="text-lg font-semibold mb-5">
                    Account Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    <div>
                        <p className="text-xs text-gray-500">
                            Full Name
                        </p>
                        <p className="text-sm font-medium mt-2">
                            {user.fullName}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">
                            Email Address
                        </p>
                        <p className="text-sm font-medium mt-2">
                            {user.email}
                        </p>
                    </div>

                </div>
            </div>

            <div>

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">
                        Order History
                    </h2>

                    <span className="text-sm text-gray-500">
                        {orders.length} orders
                    </span>
                </div>

                {orders.length === 0 ? (
                    <div className="border border-gray-200 p-10 text-center">
                        <h3 className="font-medium">
                            No orders yet
                        </h3>

                        <p className="text-sm text-gray-500 mt-2">
                            Your purchases will appear here.
                        </p>

                        <Link
                            to="/shop"
                            className="inline-block mt-5 underline text-sm"
                        >
                            Explore Products
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-5">

                        {[...orders].reverse().map((order) => (
                            <div
                                key={order.orderId}
                                className="border border-gray-200 p-5 sm:p-6"
                            >

                                <div className="flex flex-col sm:flex-row justify-between gap-3 border-b border-gray-200 pb-4">

                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Order ID
                                        </p>
                                        <p className="text-sm font-semibold mt-1">
                                            {order.orderId}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Order Date
                                        </p>
                                        <p className="text-sm mt-1">
                                            {new Date(order.orderDate).toLocaleDateString("en-IN")}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-500">
                                            Total
                                        </p>
                                        <p className="text-sm font-semibold mt-1">
                                            {formatPrice(order.total)}
                                        </p>
                                    </div>

                                </div>

                                <div className="flex flex-wrap gap-3 mt-5">
                                    {order.items.map((item) => (
                                        <img
                                            key={`${order.orderId}-${item.product.id}-${item.selectedSize}`}
                                            src={item.product.image}
                                            alt={item.product.title}
                                            title={item.product.title}
                                            className="w-16 h-20 object-cover bg-gray-100"
                                        />
                                    ))}
                                </div>

                                <p className="text-xs text-green-700 mt-4">
                                    {order.status}
                                </p>

                            </div>
                        ))}

                    </div>
                )}

            </div>
        </section>
    );
}

export default Profile;