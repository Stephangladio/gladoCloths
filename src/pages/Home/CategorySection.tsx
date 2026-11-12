import { Link } from "react-router-dom";
import menImage from "../../../public/images/categories/men.png";
import womenImage from "../../../public/images/categories/women.png";

const categories = [
    {
        title: "MEN",
        image: menImage,
        link: "/men",
        description: "Explore everyday essentials for men.",
    },
    {
        title: "WOMEN",
        image: womenImage,
        link: "/women",
        description: "Discover your everyday style.",
    },
];

function CategorySection() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-16">

            <div className="mb-8">
                <p className="text-xs tracking-[0.3em] text-gray-500 uppercase">
                    Explore GLADO
                </p>

                <h2 className="text-3xl font-semibold mt-2">
                    Shop by Category
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {categories.map((category) => (
                    <Link
                        to={category.link}
                        key={category.title}
                        className="group relative h-[420px] overflow-hidden"
                    >
                        <img
                            src={category.image}
                            alt={category.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />

                        <div className="absolute bottom-8 left-8 text-white">
                            <h3 className="text-3xl font-bold">
                                {category.title}
                            </h3>

                            <p className="text-sm mt-2">
                                {category.description}
                            </p>

                            <span className="inline-block mt-5 border-b border-white pb-1 text-sm">
                                SHOP NOW
                            </span>
                        </div>
                    </Link>
                ))}

            </div>
        </section>
    );
}

export default CategorySection;