import { useState, useRef, useEffect } from "react";
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { FaLaptop, FaTshirt, FaGasPump, FaHome, FaUtensils, FaCouch, FaCut, FaStore, FaEllipsisH } from "react-icons/fa";
import { Link } from "react-router-dom";

import Logout from "./Logout";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [categoriesOpen, setCategoriesOpen] = useState(false);
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
        { name: "Others", icon: <FaEllipsisH />, bgColor: "bg-gray-100", textColor: "text-gray-700" },
    ];

    return (
        <nav className="bg-white shadow-lg fixed w-full z-50 py-3 px-6">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/home" className="text-2xl font-bold text-blue-600">UniTradeHub</Link>
                
                <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
                    <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
                    <li><Link to="/shop" className="hover:text-blue-600">Shop</Link></li>
                    <li><button className="hover:text-blue-600">Categories</button></li>
                </ul>

                <div ref={searchRef} className="relative hidden md:flex items-center">
                    {!searchOpen ? (
                        <button onClick={() => setSearchOpen(true)} className="text-gray-700 hover:text-blue-600">
                            <FaSearch size={20} />
                        </button>
                    ) : (
                        <input type="text" autoFocus placeholder="Search products..." className="p-2 border rounded-md w-64 focus:outline-none" onBlur={() => setSearchOpen(false)} />
                    )}
                </div>

                <div className="flex items-center space-x-4">
                    <Link to="/cart" className="hidden md:flex text-gray-700 hover:text-blue-600">
                        <FaShoppingCart size={24} />
                    </Link>
                    <div className="relative hidden md:flex">
                        <button className="text-gray-700 hover:text-blue-600">
                            <FaUser size={24} />
                        </button>
                    </div>
                    <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>
            
            {isOpen && (
                <div className="md:hidden bg-white shadow-md p-4">
                    <ul className="flex flex-col space-y-4">
                        <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
                        <li><Link to="/shop" className="hover:text-blue-600">Shop</Link></li>
                        <h1 className="text-lg font-bold text-gray-800">Post Categories</h1>
                        <ul className="flex flex-col space-y-2">
                            {categories.map((category, index) => (
                                <Link key={index} to={`/category/${category.name}`} className={`flex items-center p-2 rounded-lg ${category.bgColor} hover:shadow-md transition-transform transform hover:scale-105`}>
                                    <span className={`text-lg ${category.textColor}`}>{category.icon}</span>
                                    <p className={`ml-2 font-semibold ${category.textColor}`}>{category.name}</p>
                                </Link>
                            ))}
                        </ul>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
