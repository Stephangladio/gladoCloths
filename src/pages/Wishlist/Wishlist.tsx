
import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

function Wishlist() {
    const { wishlist, toggleWishlist, addToCart } = useShop();

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);

    if (wishlist.length === 0) {
        return (
            <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">

                <h1 className="text-3xl font-semibold">
                    Your Wishlist is Empty
                </h1>

                <p className="text-sm text-gray-500 mt-3">
                    Save your favourite products and find them here.
                </p>

                <Link
                    to="/shop"
                    className="mt-6 bg-black text-white px-8 py-3 text-sm"
                >
                    EXPLORE PRODUCTS
                </Link>

            </section>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-6 py-12">

            <div className="mb-10">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                    Your Favourites
                </p>

                <h1 className="text-3xl font-semibold mt-2">
                    My Wishlist
                </h1>

                <p className="text-sm text-gray-500 mt-2">
                    {wishlist.length} saved products
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">

                {wishlist.map((product) => (
                    <div key={product.id}>

                        <Link to={`/products/${product.id}`}>
                            <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </Link>

                        <div className="pt-4">

                            <Link to={`/products/${product.id}`}>
                                <h3 className="text-sm font-medium">
                                    {product.title}
                                </h3>
                            </Link>

                            <p className="text-sm font-semibold mt-2">
                                {formatPrice(product.price)}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3 mt-4">

                                <button
                                    onClick={() => addToCart(product, 1, "M")}
                                    className="flex-1 bg-black text-white py-3 text-xs font-semibold hover:bg-gray-800"
                                >
                                    ADD TO CART
                                </button>

                                <button
                                    onClick={() => toggleWishlist(product)}
                                    className="border border-gray-300 px-3 py-3 text-xs hover:border-black"
                                >
                                    REMOVE
                                </button>

                            </div>

                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
}

export default Wishlist;