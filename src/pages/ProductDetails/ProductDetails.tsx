
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import { products } from "../../data/products";
import { useShop } from "../../context/ShopContext";

function ProductDetails() {
    const { id } = useParams();

    const product = products.find(
        (item) => item.id === Number(id)
    );

    const { addToCart, wishlist, toggleWishlist } = useShop();

    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState("");

    if (!product) {
        return (
            <section className="min-h-[60vh] flex flex-col items-center justify-center px-6">
                <h1 className="text-2xl font-semibold">
                    Product Not Found
                </h1>
                <Link
                    to="/shop"
                    className="mt-5 bg-black text-white px-6 py-3 text-sm"
                >
                    Back to Shop
                </Link>
            </section>
        );
    }

    const sizes = ["XS", "S", "M", "L", "XL"];

    const isWishlisted = wishlist.some(
        (item) => item.id === product.id
    );

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);

    const discount = product.oldPrice
        ? Math.round(
            ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
        : 0;

    function handleAddToCart() {
        if (!product) return;

        if (!selectedSize) {
            setMessage("Please select a size.");
            return;
        }

        addToCart(product, quantity, selectedSize);
        setMessage("Product added to your cart!");
    }

    function handleWishlist() {
        if (!product) return;

        toggleWishlist(product);
    }

    return (
        <section className="max-w-7xl mx-auto px-6 py-12">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                <div className="relative bg-gray-100">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full aspect-[3/4] object-cover"
                    />

                    {product.isNew && (
                        <span className="absolute top-4 left-4 bg-white px-3 py-1 text-xs">
                            NEW
                        </span>
                    )}
                </div>

                <div className="py-4">

                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                        {product.category} Collection
                    </p>

                    <h1 className="text-3xl font-semibold mt-3">
                        {product.title}
                    </h1>

                    <p className="text-sm text-gray-500 mt-3">
                        ★ {product.rating} ({product.reviewCount} reviews)
                    </p>

                    <div className="flex items-center gap-3 mt-6">
                        <span className="text-2xl font-semibold">
                            {formatPrice(product.price)}
                        </span>

                        {product.oldPrice && (
                            <span className="text-gray-400 line-through">
                                {formatPrice(product.oldPrice)}
                            </span>
                        )}

                        {discount > 0 && (
                            <span className="text-sm text-red-600">
                                {discount}% OFF
                            </span>
                        )}
                    </div>

                    <p className="text-gray-600 text-sm leading-7 mt-6">
                        {product.description}
                    </p>

                    <div className="mt-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-semibold">
                                Select Size
                            </h3>
                            <span className="text-xs text-gray-500">
                                Size Guide
                            </span>
                        </div>

                        <div className="flex gap-3 flex-wrap">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => {
                                        setSelectedSize(size);
                                        setMessage("");
                                    }}
                                    className={`w-12 h-12 border text-sm transition-colors ${selectedSize === size
                                        ? "bg-black text-white border-black"
                                        : "border-gray-300 hover:border-black"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-sm font-semibold mb-4">
                            Quantity
                        </h3>

                        <div className="flex items-center border border-gray-300 w-fit">
                            <button
                                onClick={() =>
                                    setQuantity((previous) =>
                                        Math.max(1, previous - 1)
                                    )
                                }
                                className="px-4 py-2"
                                aria-label="Decrease quantity"
                            >
                                -
                            </button>

                            <span className="px-4 text-sm">
                                {quantity}
                            </span>

                            <button
                                onClick={() =>
                                    setQuantity((previous) => previous + 1)
                                }
                                className="px-4 py-2"
                                aria-label="Increase quantity"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-8">

                        <button
                            onClick={handleAddToCart}
                            className="flex-1 bg-black text-white py-4 text-sm font-semibold hover:bg-gray-800 transition-colors"
                        >
                            ADD TO CART
                        </button>

                        <button
                            onClick={handleWishlist}
                            aria-label="Toggle wishlist"
                            className="border border-gray-300 px-5 hover:border-black"
                        >
                            {isWishlisted ? (
                                <FaHeart className="text-red-500" size={19} />
                            ) : (
                                <FaRegHeart size={19} />
                            )}
                        </button>

                    </div>

                    {message && (
                        <p className="text-sm mt-4 text-gray-600">
                            {message}
                        </p>
                    )}

                    <div className="border-t border-gray-200 mt-8 pt-6 text-sm text-gray-500 space-y-3">
                        <p>✓ Comfortable everyday clothing</p>
                        <p>✓ Easy shopping experience</p>
                        <p>✓ Secure checkout experience (demo)</p>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default ProductDetails;