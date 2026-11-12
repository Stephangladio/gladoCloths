
import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

function Cart() {
    const { cart, removeFromCart, updateQuantity } = useShop();

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

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const shipping = subtotal === 0 || subtotal >= 1999 ? 0 : 99;
    const total = subtotal + shipping;

    if (cart.length === 0) {
        return (
            <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
                <h1 className="text-3xl font-semibold">
                    Your Cart is Empty
                </h1>

                <p className="text-sm text-gray-500 mt-3">
                    Discover something you love from our collection.
                </p>

                <Link
                    to="/shop"
                    className="mt-6 bg-black text-white px-8 py-3 text-sm"
                >
                    CONTINUE SHOPPING
                </Link>
            </section>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-6 py-12">

            <div className="mb-10">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                    Your Selection
                </p>

                <h1 className="text-3xl font-semibold mt-2">
                    Shopping Cart
                </h1>

                <p className="text-sm text-gray-500 mt-2">
                    {totalItems} items in your cart
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                <div className="lg:col-span-2 space-y-6">

                    {cart.map((item) => (
                        <div
                            key={`${item.product.id}-${item.selectedSize}`}
                            className="flex gap-5 border-b border-gray-200 pb-6"
                        >
                            <Link
                                to={`/products/${item.product.id}`}
                                className="w-28 sm:w-36 shrink-0"
                            >
                                <img
                                    src={item.product.image}
                                    alt={item.product.title}
                                    className="w-full aspect-[3/4] object-cover bg-gray-100"
                                />
                            </Link>

                            <div className="flex-1">

                                <div className="flex justify-between gap-3">
                                    <div>
                                        <Link to={`/products/${item.product.id}`}>
                                            <h3 className="font-medium text-sm sm:text-base">
                                                {item.product.title}
                                            </h3>
                                        </Link>

                                        <p className="text-sm text-gray-500 mt-2">
                                            Size: {item.selectedSize || "M"}
                                        </p>

                                        <p className="text-sm font-semibold mt-3">
                                            {formatPrice(item.product.price)}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() =>
                                            removeFromCart(
                                                item.product.id,
                                                item.selectedSize || "M"
                                            )
                                        }
                                        className="text-xs text-gray-500 hover:text-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>

                                <div className="flex items-center border border-gray-300 w-fit mt-5">

                                    <button
                                        onClick={() =>
                                            updateQuantity(
                                                item.product.id,
                                                item.selectedSize || "M",
                                                item.quantity - 1
                                            )
                                        }
                                        disabled={item.quantity <= 1}
                                        className="px-3 py-1 disabled:opacity-30"
                                        aria-label="Decrease quantity"
                                    >
                                        -
                                    </button>

                                    <span className="px-3 text-sm">
                                        {item.quantity}
                                    </span>

                                    <button
                                        onClick={() =>
                                            updateQuantity(
                                                item.product.id,
                                                item.selectedSize || "M",
                                                item.quantity + 1
                                            )
                                        }
                                        className="px-3 py-1"
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>

                                </div>

                                <p className="text-sm text-gray-500 mt-3">
                                    Item total: {formatPrice(
                                        item.product.price * item.quantity
                                    )}
                                </p>

                            </div>
                        </div>
                    ))}

                </div>

                <div className="border border-gray-200 p-6 h-fit">

                    <h2 className="text-xl font-semibold mb-6">
                        Order Summary
                    </h2>

                    <div className="space-y-4 text-sm">

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

                        {shipping > 0 && (
                            <p className="text-xs text-gray-500">
                                Add {formatPrice(1999 - subtotal)} more for free shipping.
                            </p>
                        )}

                        <div className="border-t border-gray-200 pt-4 flex justify-between font-semibold text-base">
                            <span>Total</span>
                            <span>{formatPrice(total)}</span>
                        </div>

                    </div>

                    <Link
                        to="/checkout"
                        className="block text-center bg-black text-white py-4 mt-7 text-sm font-semibold hover:bg-gray-800"
                    >
                        PROCEED TO CHECKOUT
                    </Link>

                    <Link
                        to="/shop"
                        className="block text-center text-sm mt-5 underline"
                    >
                        Continue Shopping
                    </Link>

                </div>
            </div>
        </section>
    );
}

export default Cart;