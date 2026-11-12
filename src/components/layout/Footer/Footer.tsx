
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-black text-white">
            <div className="max-w-7xl mx-auto px-6 py-12">

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

                    <div>
                        <h2 className="text-2xl font-bold tracking-widest">
                            GLADO
                        </h2>
                        <p className="text-sm text-gray-400 mt-4 leading-6">
                            Everyday essentials. Timeless style.
                            Discover comfortable clothing made for you.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Shop</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link to="/shop" className="hover:text-white">All Products</Link></li>
                            <li><Link to="/men" className="hover:text-white">Men</Link></li>
                            <li><Link to="/women" className="hover:text-white">Women</Link></li>
                            <li><Link to="/wishlist" className="hover:text-white">Wishlist</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Information</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                            <li><Link to="/profile" className="hover:text-white">My Account</Link></li>
                            <li><Link to="/cart" className="hover:text-white">Shopping Cart</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Contact</h3>
                        <p className="text-sm text-gray-400 leading-6">
                            Have questions about your order?
                            <br />
                            Email: support@glado.com
                        </p>
                    </div>

                </div>

                <div className="border-t border-gray-800 mt-10 pt-6">
                    <p className="text-center text-sm text-gray-500">
                        © {new Date().getFullYear()} GLADO. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;