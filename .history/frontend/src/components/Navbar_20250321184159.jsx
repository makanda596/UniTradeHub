import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import {
    FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch,
    FaLaptop, FaTshirt, FaGasPump, FaHome, FaUtensils,
    FaCouch, FaCut, FaStore, FaEllipsisH
} from "react-icons/fa";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import Logout from '../components/Logout.jsx';

const Navbar = ({ logout,user }) => {
    const [isOpen, setIsOpen] = useState(false); // For mobile menu
    const [searchOpen, setSearchOpen] = useState(false); // For search bar
    const [userDropdownOpen, setUserDropdownOpen] = useState(false); // For user dropdown
    const searchRef = useRef(null);
    const userDropdownRef = useRef(null);

    // Close search bar and dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchOpen(false);
            }
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setUserDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const categories = [
        { name: "Electronics", icon: <FaLaptop />, bgColor: "bg-blue-100", textColor: "text-blue-700" },
        { name: "Fashion", icon: <FaTshirt />, bgColor: "bg-pink-100", textColor: "text-pink-700" },
        { name: "Gas Supply", icon: <FaGasPump />, bgColor: "bg-yellow-100", textColor: "text-yellow-700" },
        { name: "Home", icon: <FaHome />, bgColor: "bg-green-100", textColor: "text-green-700" },
        { name: "Kitchen", icon: <FaUtensils />, bgColor: "bg-orange-100", textColor: "text-orange-700" },
        { name: "Furniture", icon: <FaCouch />, bgColor: "bg-purple-100", textColor: "text-purple-700" },
        { name: "Beauty", icon: <FaCut />, bgColor: "bg-teal-100", textColor: "text-teal-700" },
        { name: "Food & Beverages", icon: <FaStore />, bgColor: "bg-red-100", textColor: "text-red-700" },
        { name: "Salon", icon: <FaCut />, bgColor: "bg-indigo-100", textColor: "text-indigo-700" },
        { name: "Others", icon: <FaEllipsisH />, bgColor: "bg-gray-100", textColor: "text-gray-700" },
    ];

    return (
        <nav className="bg-white shadow-md fixed w-full z-50">
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo & Mobile Menu Button */}
                <div className="flex items-center">
                    <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FaTimes size={24} className="text-gray-700" /> : <FaBars size={24} className="text-gray-700" />}
                    </button>
                    <Link to="/home" className="text-2xl font-bold text-blue-600 ml-4">UniTradeHub</Link>
                </div>

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
                            className="p-2 border rounded-md outline-none w-64"
                            onBlur={() => setSearchOpen(false)}
                        />
                    )}
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-6">
                    <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
                        <FaShoppingCart size={24} />
                    </Link>

                    {/* User Dropdown */}
                    <div className="relative" ref={userDropdownRef}>
                        <button
                            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                            className="flex items-center cursor-pointer hover:text-blue-600 text-black space-x-1"
                        >
                            <FaUser size={24} />
                            <span>{user?.username}</span>
                            <FiChevronDown size={18} />
                        </button>

                        {/* Dropdown Menu */}
                        {userDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2">
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                                >
                                    <FiUser size={18} /> My Account
                                </Link>
                                <Link
                                    to="/Settings"
                                    className="lg:flex hidden items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                                >
                                    <FiSettings size={18} /> Settings
                                </Link>
                                <button
                                    onClick={logout}
                                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                                >
                                    <FiLogOut size={18} /> Logout
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden fixed top-0 left-0 w-3/4 h-full bg-gray-100 shadow-md p-6 overflow-y-auto z-50">juj
                    <button className="absolute top-4 right-4 text-gray-700" onClick={() => setIsOpen(false)}>
                        <FaTimes size={24} />
                    </button>

                    <ul className="mt-8 space-y-4 text-gray-700">
                        <li><Link to="/" className="block hover:text-blue-600 ">Home</Link></li>
                        <li>  <Link
                            to="/Settings"
                            className="flex items-center gap-2 px-1 py-2 w-full  text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                            <FaShoppingCart size={24} />Cart
                        </Link></li>
                        {/* Categories */}
                        <li>
                            <h1 className="text-md mb-2 text-gray-800">Categories</h1>
                            <ul className="space-y-2">
                                {categories.map((category, index) => (
                                    <li key={index}>
                                        <Link
                                            to={`/category/${category.name}`}
                                            className={`flex items-center gap-2 p-2 rounded-md ${category.bgColor} hover:shadow-md transition duration-300`}
                                        >
                                            <span className={`text-md ${category.textColor}`}>{category.icon}</span>
                                            <p className={`font-semibold ${category.textColor}`}>{category.name}</p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li> <Link
                            to="/Settings"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 w-48 text-white rounded-lg"
                        >
                            <FiSettings size={18} /> Settings
                        </Link></li>

                        {/* Logout */}
                        <li className="mt-4">
                            <button
                                onClick={logout}
                                className="flex items-center gap-1 px-4 py-2 bg-red-500  text-white hover:bg-gray-200 cursor-pointer w-48 text-left"
                            >
                                <FiLogOut size={18} /> Logout
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;