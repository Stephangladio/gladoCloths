
import { Link } from "react-router-dom";
import heroImage from "../../assets/images/hero.png";

function Hero() {
    return (
        <section className="relative w-full h-[550px] md:h-[650px] overflow-hidden">

            <img
                src={heroImage}
                alt="GLADO fashion collection"
                className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/30" />

            <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-center items-start text-white">

                <p className="text-sm uppercase tracking-[0.3em] mb-4">
                    New Collection
                </p>

                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold max-w-xl leading-tight">
                    Everyday Style.
                    <br />
                    Made for You.
                </h1>

                <p className="mt-5 text-sm md:text-base max-w-md text-gray-200">
                    Discover comfortable essentials and timeless styles
                    for every day.
                </p>

                <Link
                    to="/shop"
                    className="mt-8 inline-block bg-white text-black px-8 py-3 text-sm font-semibold hover:bg-gray-200 transition-colors"
                >
                    SHOP NOW
                </Link>

            </div>
        </section>
    );
}

export default Hero;