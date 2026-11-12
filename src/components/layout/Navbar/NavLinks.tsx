
import { NavLink } from "react-router-dom";

function NavLinks() {
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `text-sm font-medium transition-colors duration-200 ${isActive
            ? "text-black border-b-2 border-black pb-1"
            : "text-gray-600 hover:text-black"
        }`;

    return (
        <div className="hidden md:flex items-center gap-8">
            <NavLink to="/shop" className={linkClass}>
                Shop
            </NavLink>

            <NavLink to="/men" className={linkClass}>
                Men
            </NavLink>

            <NavLink to="/women" className={linkClass}>
                Women
            </NavLink>

            <NavLink to="/about" className={linkClass}>
                About
            </NavLink>
        </div>
    );
}

export default NavLinks;