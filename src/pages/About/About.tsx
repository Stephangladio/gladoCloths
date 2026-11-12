
import { Link } from "react-router-dom";
import heroImage from "../../assets/images/hero.png";
import menRoyalDress from "../../assets/images/men-royal.png";

function About() {
    return (
        <main className="w-full overflow-hidden">

            <section className="relative h-[400px] sm:h-[500px]">
                <img
                    src={heroImage}
                    alt="GLADO fashion collection"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40" />

                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
                    <p className="text-xs sm:text-sm uppercase tracking-[0.3em] mb-5">
                        Get to Know Us
                    </p>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
                        About GLADO
                    </h1>

                    <p className="mt-5 max-w-xl text-sm sm:text-base text-gray-200">
                        Everyday essentials. Timeless style.
                        Designed to make you feel comfortable and confident.
                    </p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

                    <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-4">
                            Our Story
                        </p>

                        <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">
                            Style should feel as good as it looks.
                        </h2>

                        <p className="mt-6 text-gray-600 leading-7">
                            GLADO was created with a simple idea: everyday clothing
                            should be comfortable, versatile and effortlessly stylish.
                        </p>

                        <p className="mt-4 text-gray-600 leading-7">
                            We believe fashion doesn't need to be complicated.
                            The right essentials can help you express your style
                            while feeling comfortable throughout the day.
                        </p>

                        <p className="mt-4 text-gray-600 leading-7">
                            From relaxed everyday outfits to timeless wardrobe
                            staples, GLADO is about making everyday dressing simple.
                        </p>
                    </div>

                    <div className="w-full h-full object-cover">
                        <img
                            src={menRoyalDress}
                            alt="Everyday GLADO fashion"
                            className="w-full h-full object-cover"
                        />
                    </div>

                </div>
            </section>

            <section className="bg-gray-50 py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">

                    <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-4">
                        Our Philosophy
                    </p>

                    <h2 className="text-3xl sm:text-4xl font-semibold">
                        Less, but better.
                    </h2>

                    <p className="mt-6 text-gray-600 leading-8">
                        We focus on clothing that fits naturally into your
                        everyday life. Simple designs, versatile styles and
                        comfortable essentials that you can wear your way.
                        Because great style is not about following every trend.
                        It's about finding what feels right for you.
                    </p>

                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">

                <div className="text-center mb-12">
                    <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-4">
                        What Matters to Us
                    </p>

                    <h2 className="text-3xl sm:text-4xl font-semibold">
                        The GLADO Approach
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

                    <div className="text-center">
                        <h3 className="text-xl font-semibold">
                            Everyday Comfort
                        </h3>
                        <p className="mt-4 text-sm text-gray-600 leading-7">
                            Clothing designed around comfort, ease and
                            the moments that make up everyday life.
                        </p>
                    </div>

                    <div className="text-center">
                        <h3 className="text-xl font-semibold">
                            Timeless Style
                        </h3>
                        <p className="mt-4 text-sm text-gray-600 leading-7">
                            Simple and versatile designs that work beyond
                            changing fashion trends.
                        </p>
                    </div>

                    <div className="text-center">
                        <h3 className="text-xl font-semibold">
                            Everyday Versatility
                        </h3>
                        <p className="mt-4 text-sm text-gray-600 leading-7">
                            Easy-to-style essentials that fit different
                            occasions and personal styles.
                        </p>
                    </div>

                </div>
            </section>

            <section className="bg-gray-100 text-black py-16 md:py-20 px-4 text-center">

                <h2 className="text-3xl sm:text-4xl font-semibold">
                    Find Your Everyday Style.
                </h2>

                <p className="mt-4 text-sm text-gray-600">
                    Explore comfortable essentials made for everyday living.
                </p>

                <Link
                    to="/shop"
                    className="inline-block mt-8 bg-black text-white px-8 py-3 text-sm font-semibold hover:bg-gray-800 transition-colors"
                >
                    EXPLORE COLLECTION
                </Link>

            </section>

        </main>
    );
}

export default About;