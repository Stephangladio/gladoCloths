
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { products } from "../../data/products";
import { useShop } from "../../context/ShopContext";
import ProductCard from "../../components/products/ProductCard";

function Shop() {
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("featured");

    const { toggleWishlist } = useShop();

    const [searchParams, setSearchParams] = useSearchParams();

    // Get search value from URL
    const search = searchParams.get("search") || "";

    // Handle search
    function handleSearch(value: string) {
        if (value.trim()) {
            setSearchParams({ search: value });
        } else {
            setSearchParams({});
        }
    }

    // Filter products
    let filteredProducts = products.filter((product) => {
        const matchesCategory =
            category === "all" || product.category === category;

        const matchesSearch = product.title
            .toLowerCase()
            .includes(search.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    // Sort products
    if (sort === "low-to-high") {
        filteredProducts = [...filteredProducts].sort(
            (a, b) => a.price - b.price
        );
    }

    if (sort === "high-to-low") {
        filteredProducts = [...filteredProducts].sort(
            (a, b) => b.price - a.price
        );
    }

    if (sort === "newest") {
        filteredProducts = [...filteredProducts].sort(
            (a, b) => Number(b.isNew) - Number(a.isNew)
        );
    }

    // Clear filters
    function clearFilters() {
        setCategory("all");
        setSort("featured");
        setSearchParams({});
    }

    return (
        <section className="max-w-7xl mx-auto px-6 py-12">

            <div className="mb-10">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                    Discover GLADO
                </p>

                <h1 className="text-3xl md:text-4xl font-semibold mt-2">
                    Shop All
                </h1>

                <p className="text-sm text-gray-500 mt-2">
                    Explore our collection of everyday essentials.
                </p>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

                <div className="flex items-center gap-3 flex-wrap">
                    {["all", "men", "women"].map((item) => (
                        <button
                            key={item}
                            onClick={() => setCategory(item)}
                            className={`px-5 py-2 text-sm border transition-colors ${category === item
                                ? "bg-black text-white border-black"
                                : "bg-white text-gray-600 border-gray-300 hover:border-black"
                                }`}
                        >
                            {item === "all"
                                ? "All"
                                : item.charAt(0).toUpperCase() + item.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">

                    <input
                        type="search"
                        value={search}
                        onChange={(event) => handleSearch(event.target.value)}
                        placeholder="Search products..."
                        className="border border-gray-300 px-4 py-2 text-sm outline-none focus:border-black"
                    />

                    <select
                        value={sort}
                        onChange={(event) => setSort(event.target.value)}
                        className="border border-gray-300 px-4 py-2 text-sm outline-none focus:border-black"
                    >
                        <option value="featured">Featured</option>
                        <option value="newest">Newest</option>
                        <option value="low-to-high">Price: Low to High</option>
                        <option value="high-to-low">Price: High to Low</option>
                    </select>

                </div>
            </div>

            <div className="border-b border-gray-200 pb-4 mb-8">
                <p className="text-sm text-gray-500">
                    Showing {filteredProducts.length} products
                </p>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">

                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onWishlistClick={toggleWishlist}
                        />
                    ))}

                </div>
            ) : (
                <div className="py-20 text-center">

                    <h2 className="text-xl font-semibold">
                        No products found
                    </h2>

                    <p className="text-sm text-gray-500 mt-2">
                        Try another search or category.
                    </p>

                    <button
                        onClick={clearFilters}
                        className="mt-5 bg-black text-white px-6 py-3 text-sm"
                    >
                        CLEAR FILTERS
                    </button>

                </div>
            )}

        </section>
    );
}

export default Shop;