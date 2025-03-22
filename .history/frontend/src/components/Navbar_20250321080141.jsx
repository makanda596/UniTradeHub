import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch, FaChevronRight } from "react-icons/fa";
import Logout from "./Logout";

const categories = [
    "Supermarket", "Health & Beauty", "Home & Office", "Phones & Tablets",
    "Computing", "Electronics", "Fashion", "Gaming", "Baby Products", "Sporting Goods"
];

const Navbar = ({ logout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setCategoryOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-white shadow-md fixed w-full z-50">
            <div className="container mx-auto flex justify-between items-center p-2">
                
                {/* Logo */}
                <a href="/home" className="text-xl font-bold text-blue-600">UniTradeHub</a>

                {/* Large Screen Navbar */}
                <ul className="hidden md:flex space-x-6 text-gray-700">
                    <li><a href="/" className="hover:text-blue-600">Home</a></li>
                    <li><a href="/shop" className="hover:text-blue-600">Shop</a></li>
                    <li className="relative" ref={dropdownRef}>
                        <button onClick={() => setCategoryOpen(!categoryOpen)} className="hover:text-blue-600 flex items-center">
                            Categories <FaChevronRight className="ml-2" />
                        </button>
                        {categoryOpen && (
                            <div className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                                <ul className="text-gray-700">
                                    {categories.map((category, index) => (
                                        <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
                                            <Link to={`/category/${category.toLowerCase().replace(/ /g, "-")}`}>{category}</Link>
                                        </li>
                                    ))}
                                    <li className="p-2 hover:bg-gray-100 cursor-pointer text-blue-600 font-semibold">
                                        <Link to="/categories">See All</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-md p-4">
                    <ul className="flex flex-col items-start space-y-4">
                        <li><a href="/" className="hover:text-blue-600">Home</a></li>
                        <li><a href="/shop" className="hover:text-blue-600">Shop</a></li>
                        <li className="relative">
                            <button onClick={() => setCategoryOpen(!categoryOpen)} className="hover:text-blue-600 flex items-center">
                                Our Categories <FaChevronRight className="ml-2" />
                            </button>
                            {categoryOpen && (
                                <div className="mt-2 w-48 bg-white border rounded-lg shadow-lg">
                                    <ul className="text-gray-700">
                                        {categories.map((category, index) => (
                                            <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
                                                <Link to={`/category/${category.toLowerCase().replace(/ /g, "-")}`}>{category}</Link>
                                            </li>
                                        ))}
                                        <li className="p-2 hover:bg-gray-100 cursor-pointer text-blue-600 font-semibold">
                                            <Link to="/categories">See All</Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
