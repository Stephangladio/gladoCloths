
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import type { Product } from "../../types/product";
import { useShop } from "../../context/ShopContext";

interface ProductCardProps {
    product: Product;
    onWishlistClick?: (product: Product) => void;
}

function ProductCard({ product, onWishlistClick }: ProductCardProps) {
    const { wishlist } = useShop();

    const isWishlisted = wishlist.some(
        (item) => item.id === product.id
    );

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);
    };

    const discount = product.oldPrice
        ? Math.round(
            ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
        : 0;

    return (
        <div className="group">

            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">

                <Link to={`/products/${product.id}`}>
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>

                {product.isNew && (
                    <span className="absolute top-3 left-3 bg-white px-3 py-1 text-xs font-medium">
                        NEW
                    </span>
                )}

                {discount > 0 && (
                    <span className="absolute bottom-3 left-3 bg-black text-white px-2 py-1 text-xs">
                        {discount}% OFF
                    </span>
                )}

                {onWishlistClick && (
                    <button
                        type="button"
                        onClick={() => onWishlistClick(product)}
                        aria-label={
                            isWishlisted
                                ? "Remove from wishlist"
                                : "Add to wishlist"
                        }
                        aria-pressed={isWishlisted}
                        className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
                    >
                        {isWishlisted ? (
                            <FaHeart
                                size={17}
                                className="text-red-500"
                            />
                        ) : (
                            <FaRegHeart
                                size={17}
                                className="text-black"
                            />
                        )}
                    </button>
                )}

            </div>

            <div className="pt-4">

                <Link to={`/products/${product.id}`}>
                    <h3 className="text-sm font-medium text-gray-800 hover:text-black">
                        {product.title}
                    </h3>
                </Link>

                <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm font-semibold">
                        {formatPrice(product.price)}
                    </span>

                    {product.oldPrice && (
                        <span className="text-sm text-gray-400 line-through">
                            {formatPrice(product.oldPrice)}
                        </span>
                    )}
                </div>

                <p className="text-xs text-gray-500 mt-2">
                    ★ {product.rating} ({product.reviewCount} reviews)
                </p>

            </div>
        </div>
    );
}

export default ProductCard;