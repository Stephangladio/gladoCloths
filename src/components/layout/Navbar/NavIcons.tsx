
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

function NavIcons() {
    return (
        <div className="flex items-center gap-4">
            <Link to="/wishlist" aria-label="Wishlist">
                <FaRegHeart size={19} />
            </Link>

            <Link to="/profile" aria-label="Profile">
                <FaRegUser size={18} />
            </Link>

            <Link to="/cart" aria-label="Shopping cart">
                <FiShoppingCart size={20} />
            </Link>
        </div>
    );
}

export default NavIcons;