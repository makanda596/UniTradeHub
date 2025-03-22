make a drop down on the usericon when one clicks it show a my account and logout import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch,
    FaLaptop, FaTshirt, FaGasPump, FaHome, FaUtensils,
    FaCouch, FaCut, FaStore, FaEllipsisH
} from "react-icons/fa";
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

                {/* Desktop Menu */}


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
                <ul className="hidden md:flex space-x-8 text-gray-700">
                    <button className="text-gray-700 hover:text-blue-600">
                        <FaUser size={24} />
                    </button>
                </ul>
                {/* Icons */}
                <div className="flex items-center space-x-6">
                    <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
                        <FaShoppingCart size={24} />
                    </Link>
                    <div className="relative">
                        <button className="text-gray-700 hover:text-blue-600">
                            <FaUser size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden fixed top-0 left-0 w-3/4 h-full bg-gray-100 shadow-md p-6 overflow-y-auto z-50">
                    <button className="absolute top-4 right-4 text-gray-700" onClick={() => setIsOpen(false)}>
                        <FaTimes size={24} />
                    </button>

                    <ul className="mt-8 space-y-4 text-gray-700">
                        <li><Link to="/" className="block hover:text-blue-600">Home</Link></li>
                        <li><Link to="/shop" className="block hover:text-blue-600">Shop</Link></li>
                        <li><Link to="/profile" className="block hover:text-blue-600 flex items-center">
                            <FaUser size={24} className="mr-2" /> My Account
                        </Link></li>

                        {/* Categories */}
                        <li>
                            <h1 className="text-lg mb-2 text-gray-800">Categories</h1>
                            <ul className="space-y-2">
                                {categories.map((category, index) => (
                                    <li key={index}>
                                        <Link
                                            to={`/category/${category.name}`}
                                            className={`flex items-center gap-2 p-2 rounded-lg ${category.bgColor} hover:shadow-md transition duration-300`}
                                        >
                                            <span className={`text-lg ${category.textColor}`}>{category.icon}</span>
                                            <p className={`font-semibold ${category.textColor}`}>{category.name}</p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        {/* Logout */}
                        <li className="mt-4">
                            <button className="block px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer w-full text-left">
                                <Logout logout={logout} />
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
