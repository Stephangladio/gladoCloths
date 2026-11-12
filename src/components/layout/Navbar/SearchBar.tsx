
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

function SearchBar() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    function handleSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const query = search.trim();

        if (!query) return;

        navigate(`/shop?search=${encodeURIComponent(query)}`);
        setSearch("");
    }

    return (
        <form
            onSubmit={handleSearch}
            className="flex items-center min-w-0 border-b border-gray-400"
        >
            <button type="submit" aria-label="Search products" className="shrink-0">
                <CiSearch size={21} />
            </button>

            <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products"
                aria-label="Search products"
                className="w-20 sm:w-36 md:w-40 min-w-0 px-1 sm:px-2 py-2 text-xs sm:text-sm outline-none bg-transparent"
            />
        </form>
    );
}

export default SearchBar;