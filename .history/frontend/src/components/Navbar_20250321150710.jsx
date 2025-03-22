import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch,
    FaLaptop, FaTshirt, FaGasPump, FaHome, FaUtensils,
    FaCouch, FaCut, FaStore, FaEllipsisH
} from "react-icons/fa";
import Logout from '../components/Logout.jsx';

const Navbar = ({ logout, user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const searchRef = useRef(null);
    const userMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setSearchOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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

                {/* User Account Section */}
                <div className="flex items-center space-x-6">
                    <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
                        <FaShoppingCart size={24} />
                    </Link>

                    {/* User Dropdown */}
                    <div className="relative" ref={userMenuRef}>
                        <button
                            className="flex items-center text-gray-700 hover:text-blue-600"
                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                        >
                            <FaUser size={24} />
                            <span className="ml-2">{user?.username || "no"}</span>
                        </button>

                        {/* Dropdown Menu */}
                        {userMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
                                <ul className="py-2">
                                    <li>
                                        <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            My Account
                                        </Link>
                                    </li>
                                    <li>
                                       <button><Logout/></button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
