import { useState, useRef, useEffect } from "react";
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import Logout from "./Logout";

const Navbar = ({ logout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const dropdownRef = useRef(null);
    const searchRef = useRef(null);

    // Close dropdown and search bar if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-white shadow-md fixed">
            <div className="container mx-auto flex justify-between items-center p-1">
                
                <a href="/home" className="text-xl font-bold text-blue-600">UniTradeHub</a>

                <ul className="hidden md:flex space-x-6 text-gray-700">
                    <li><a href="/" className="hover:text-blue-600">Home</a></li>
                    <li><a href="/shop" className="hover:text-blue-600">Shop</a></li>
                    <li><a href="/categories" className="hover:text-blue-600">Categories</a></li>
                </ul>

                {/* Search Section */}
                <div ref={searchRef} className="relative flex items-center">
                    {!searchOpen ? (
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="text-gray-700 hover:text-blue-600"
                        >
                            <FaSearch size={20} />
                        </button>
                    ) : (
                        <input
                            type="text"
                            autoFocus
                            placeholder="Search products..."
                            className="p-1 border rounded-md outline-none w-full md:w-64"
                            onBlur={() => setSearchOpen(false)}
                        />
                    )}
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-4">
                    <a href="/cart" className="relative text-gray-700 hover:text-blue-600">
                        <FaShoppingCart size={24} />
                    </a>

                    {/* User Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="text-gray-700 hover:text-blue-600">
                            <FaUser size={24} />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
                                <ul className="text-gray-700">
                                    <li className="p-2 hover:bg-gray-100 cursor-pointer">
                                        <a href="/profile">Profile</a>
                                    </li>
                                    <li className="p-2 hover:bg-gray-100 cursor-pointer">
                                        <a href="/settings">Settings</a>
                                    </li>
                                    <li className="p-2 hover:bg-gray-100 cursor-pointer border-t">
                                        <button ><Logout logout={logout} /></button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-md p-4">
                    <ul className="flex flex-col items-center space-y-4">
                        <li><a href="/" className="hover:text-blue-600">Home</a></li>
                        <li><a href="/shop" className="hover:text-blue-600">Shop</a></li>
                        <li><a href="/categories" className="hover:text-blue-600">Categories</a></li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
