import { useState, useRef, useEffect } from "react";
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { FaLaptop, FaTshirt, FaGasPump, FaHome, FaUtensils, FaCouch, FaCut, FaStore, FaEllipsisH } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logout from '../components/Logout.jsx';

const Navbar = ({ logout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const categories = [
        { name: "Electronics", icon: <FaLaptop />, bgColor: "bg-blue-100", textColor: "text-blue-700" },
        { name: "Fashion & Clothing", icon: <FaTshirt />, bgColor: "bg-pink-100", textColor: "text-pink-700" },
        { name: "Gas Supply", icon: <FaGasPump />, bgColor: "bg-yellow-100", textColor: "text-yellow-700" },
        { name: "Home", icon: <FaHome />, bgColor: "bg-green-100", textColor: "text-green-700" },
        { name: "Kitchen", icon: <FaUtensils />, bgColor: "bg-orange-100", textColor: "text-orange-700" },
        { name: "Furniture", icon: <FaCouch />, bgColor: "bg-purple-100", textColor: "text-purple-700" },
        { name: "Beauty & Cosmetics", icon: <FaCut />, bgColor: "bg-teal-100", textColor: "text-teal-700" },
        { name: "Food & Beverages", icon: <FaStore />, bgColor: "bg-red-100", textColor: "text-red-700" },
        { name: "Salon", icon: <FaCut />, bgColor: "bg-indigo-100", textColor: "text-indigo-700" },
        { name: "others", icon: <FaEllipsisH />, bgColor: "bg-gray-100", textColor: "text-gray-700" },
    ];

    return (
        <nav className="bg-white shadow-md fixed w-full z-10">
            <div className="container mx-auto flex md:justify-between items-center p-1">
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
                <a href="/home" className="text-2xl font-bold text-blue-600 ml-4">UniTradeHub</a>

                <ul className="hidden md:flex space-x-6 text-gray-700">
                    <li><a href="/" className="hover:text-blue-600">Home</a></li>
                    <li><a href="/shop" className="hover:text-blue-600">Shop</a></li>
                    <li><button className="hover:text-blue-600">Categories</button></li>
                </ul>

                {/* Search Section */}
                <div ref={searchRef} className="relative hidden md:flex items-center">
                    {!searchOpen ? (
                        <button onClick={() => setSearchOpen(true)} className="text-gray-700 hover:text-blue-600">
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
                    <a href="/cart" className="relative hidden md:flex text-gray-700 hover:text-blue-600">
                        <FaShoppingCart size={24} />
                    </a>

                    {/* User Dropdown */}
                    <div className="relative hidden md:flex">
                        <button className="text-gray-700 hover:text-blue-600">
                            <FaUser size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden w-96 h-screen bg-gray-100 shadow-md p-4 overflow-y-auto">
                    <ul className="flex flex-col items-start space-y-4">
                           <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                            <Logout logout={logout} />
                        </button>
                        <li><a href="/" className="hover:text-blue-600">Home</a></li>
                        <li><a href="/shop" className="hover:text-blue-600">Shop</a></li>
                        <li><a href="/shop" className="hover:text-blue-600 flex items-center"><FaUser size={24} /> My Account</a></li>
                        <h1 className="text-lg mb-2 text-gray-800 text-center">View Categories</h1>
                        <ul className="flex flex-col gap-2">
                            {categories.map((category, index) => (
                                <Link
                                    to={`/category/${category.name}`}
                                    key={index}
                                    className={`flex items-center gap-1 p-2 rounded-xl cursor-pointer ${category.bgColor} hover:shadow-md transition duration-300 transform hover:scale-105`}
                                >
                                    <span className={`text-lg ${category.textColor}`}>{category.icon}</span>
                                    <p className={`font-semibold ${category.textColor}`}>{category.name}</p>
                                </Link>
                            ))}
                        </ul>
                        {/* Logout Button */}
                     
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;