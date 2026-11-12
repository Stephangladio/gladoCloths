
import { products } from "../../data/products";
import ProductCard from "../../components/products/ProductCard";
import { useShop } from "../../context/ShopContext";

function Men() {
    const { toggleWishlist } = useShop();

    const menProducts = products.filter(
        (product) => product.category === "men"
    );

    return (
        <section className="max-w-7xl mx-auto px-6 py-12">

            <div className="mb-10">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                    GLADO Collection
                </p>

                <h1 className="text-3xl md:text-4xl font-semibold mt-2">
                    Men's Collection
                </h1>

                <p className="text-sm text-gray-500 mt-3">
                    Discover comfortable essentials and everyday styles.
                </p>
            </div>

            <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-8">
                <p className="text-sm text-gray-500">
                    {menProducts.length} Products
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
                {menProducts.map((product) => (
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

export default Men;