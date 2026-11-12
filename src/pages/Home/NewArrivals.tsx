
import { Link } from "react-router-dom";

import { products } from "../../data/products";
import { useShop } from "../../context/ShopContext";
import ProductCard from "../../components/products/ProductCard";

function NewArrivals() {
    const { toggleWishlist } = useShop();
    const newProducts = products
        .filter((product) => product.isNew)
        .slice(0, 4);

    return (
        <section className="max-w-7xl mx-auto px-6 py-16">

            <div className="flex items-end justify-between mb-8">

                <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                        Fresh Styles
                    </p>

                    <h2 className="text-3xl font-semibold mt-2">
                        New Arrivals
                    </h2>
                </div>

                <Link
                    to="/shop"
                    className="text-sm font-medium border-b border-black pb-1 hover:text-gray-500"
                >
                    View All
                </Link>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">

                {newProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onWishlistClick={toggleWishlist}
                    />
                ))}

            </div>

        </section>
    );
}

export default NewArrivals;