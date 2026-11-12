
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <main className="min-h-[65vh] flex items-center justify-center px-4 py-16">
            <div className="max-w-xl w-full text-center">

                <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-5">
                    GLADO — Page Not Found
                </p>

                <h1 className="text-7xl sm:text-9xl font-bold tracking-tight text-black">
                    404
                </h1>

                <h2 className="text-2xl sm:text-3xl font-semibold mt-6">
                    Oops! Lost your way?
                </h2>

                <p className="text-sm sm:text-base text-gray-500 leading-7 mt-4 max-w-md mx-auto">
                    The page you're looking for doesn't exist or may have
                    been moved. Let's get you back to discovering your
                    everyday style.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">

                    <Link
                        to="/"
                        className="bg-black text-white px-8 py-3 text-sm font-semibold hover:bg-gray-800 transition-colors"
                    >
                        BACK TO HOME
                    </Link>

                    <Link
                        to="/shop"
                        className="border border-black text-black px-8 py-3 text-sm font-semibold hover:bg-gray-100 transition-colors"
                    >
                        EXPLORE SHOP
                    </Link>

                </div>

            </div>
        </main>
    );
}

export default NotFound;