
import type { Product } from "../types/product";

import menTshirtImage from "../../public/images/products/men-tshirt.png";
import womenShirtImage from "../../public/images/products/women-tshirt.png";
import menTrousersImage from "../../public/images/products/men-trousers.png";
import womenDressImage from "../../public/images/products/women-dress.png";
import menJacketImage from "../../public/images/products/men-jacket.png";
import womenTopImage from "../../public/images/products/women-top.png";

export const products: Product[] = [
    {
        id: 1,
        title: "Essential Cotton T-Shirt",
        description: "A comfortable cotton T-shirt for everyday wear.",
        price: 899,
        oldPrice: 1199,
        image: menTshirtImage,
        category: "men",
        subCategory: "t-shirts",
        rating: 4.5,
        reviewCount: 120,
        isNew: true,
    },
    {
        id: 2,
        title: "Classic Oversized Shirt",
        description: "A relaxed-fit shirt with a timeless look.",
        price: 1299,
        oldPrice: 1599,
        image: womenShirtImage,
        category: "women",
        subCategory: "shirts",
        rating: 4.7,
        reviewCount: 85,
        isNew: true,
    },
    {
        id: 3,
        title: "Relaxed Fit Trousers",
        description: "Versatile trousers designed for everyday comfort.",
        price: 1499,
        oldPrice: 1899,
        image: menTrousersImage,
        category: "men",
        subCategory: "trousers",
        rating: 4.4,
        reviewCount: 64,
        isNew: true,
    },
    {
        id: 4,
        title: "Minimal Summer Dress",
        description: "A lightweight dress with a simple silhouette.",
        price: 1799,
        oldPrice: 2199,
        image: womenDressImage,
        category: "women",
        subCategory: "dresses",
        rating: 4.8,
        reviewCount: 92,
        isNew: true,
    },
    {
        id: 5,
        title: "Casual Denim Jacket",
        description: "A classic denim jacket for casual styling.",
        price: 1999,
        image: menJacketImage,
        category: "men",
        subCategory: "jackets",
        rating: 4.6,
        reviewCount: 48,
        isNew: false,
    },
    {
        id: 6,
        title: "Everyday Knit Top",
        description: "A soft knit top for effortless everyday outfits.",
        price: 999,
        oldPrice: 1299,
        image: womenTopImage,
        category: "women",
        subCategory: "tops",
        rating: 4.5,
        reviewCount: 76,
        isNew: false,
    },
];