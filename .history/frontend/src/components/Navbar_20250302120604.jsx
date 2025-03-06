import { useState } from "react";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo */}
                <a href="/" className="text-2xl font-bold text-blue-600">UniTradeHub</a>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6 text-gray-700">
                    <li><a href="/" className="hover:text-blue-600">Home</a></li>
                    <li><a href="/shop" className="hover:text-blue-600">Shop</a></li>
                    <li><a href="/categories" className="hover:text-blue-600">Categories</a></li>
                </ul>

                {/* Search Bar */}
                <div className="hidden md:flex items-center border rounded-lg px-2">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="p-1 outline-none"
                    />
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-4">
                    <a href="/cart" className="relative text-gray-700 hover:text-blue-600">
                        <FaShoppingCart size={24} />
                    </a>
                    <a href="/login" className="text-gray-700 hover:text-blue-600">
                        <FaUser size={24} />
                    </a>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-md">
                    <ul className="flex flex-col items-center space-y-4 py-4">
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
