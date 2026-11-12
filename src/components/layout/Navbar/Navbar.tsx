
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import NavIcons from "./NavIcons";
import SearchBar from "./SearchBar";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
        `block py-3 text-sm font-medium ${isActive ? "text-black" : "text-gray-600"
        }`;

    return (
        <header className="w-full max-w-full bg-white border-b border-gray-200 relative z-50">
            <nav className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-4 flex items-center justify-between gap-2 sm:gap-6">

                <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden shrink-0"
                        aria-label="Toggle navigation menu"
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? (
                            <IoClose size={24} />
                        ) : (
                            <RxHamburgerMenu size={22} />
                        )}
                    </button>

                    <Logo />
                </div>

                <NavLinks />

                <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                    <SearchBar />
                    <NavIcons />
                </div>
            </nav>

            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-md px-6 py-4">
                    <NavLink to="/shop" className={mobileLinkClass} onClick={closeMenu}>
                        Shop
                    </NavLink>

                    <NavLink to="/men" className={mobileLinkClass} onClick={closeMenu}>
                        Men
                    </NavLink>

                    <NavLink to="/women" className={mobileLinkClass} onClick={closeMenu}>
                        Women
                    </NavLink>

                    <NavLink to="/about" className={mobileLinkClass} onClick={closeMenu}>
                        About
                    </NavLink>
                </div>
            )}
        </header>
    );
}

export default Navbar;