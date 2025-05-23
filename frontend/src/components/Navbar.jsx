import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { FiMessageSquare } from 'react-icons/fi'
import { IoNotifications } from "react-icons/io5";
import {
    FaShoppingCart, FaUser, FaBars, FaTimes, FaSearch,
    FaLaptop, FaTshirt, FaGasPump, FaHome, FaUtensils,  
    FaCouch, FaCut, FaStore, FaEllipsisH
} from "react-icons/fa";
import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";
import Logout from '../components/Logout.jsx';
import axios from "axios";
import { MdFlashOn } from "react-icons/md";
import { useAuthStore } from "../utilis/auth.js";

const Navbar = ({ logout }) => {
      const [user, setUser] = useState(null);
        const [isOpen, setIsOpen] = useState(false); 
    const [searchOpen, setSearchOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false); 
    const searchRef = useRef(null);
    const { countCarts, count, countReviwes, CountReviews }= useAuthStore()
    const userDropdownRef = useRef(null); 
     const fetchUser = async () => {
        try {
          const token = localStorage.getItem("token");
                if (!token) return 
    
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/profile`, {
                  headers: { Authorization: `Bearer ${token}` },
                  withCredentials: true,
                });
    
          setUser(response.data.user);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
    
      useEffect(() => {
        fetchUser();
          countCarts();
          countReviwes();
      }, []);

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
        { name: "Fashion & Clothing", icon: <FaTshirt />, bgColor: "bg-pink-100", textColor: "text-pink-700" },
        { name: "Gas Supply", icon: <FaGasPump />, bgColor: "bg-yellow-100", textColor: "text-yellow-700" },
        { name: "Home", icon: <FaHome />, bgColor: "bg-green-100", textColor: "text-green-700" },
        { name: "Kitchen", icon: <FaUtensils />, bgColor: "bg-orange-100", textColor: "text-orange-700" },
        { name: "Furniture", icon: <FaCouch />, bgColor: "bg-purple-100", textColor: "text-purple-700" },
        { name: "beauty&cosmetics", icon: <FaCut />, bgColor: "bg-teal-100", textColor: "text-teal-700" },
        { name: "Food&Beverages", icon: <FaStore />, bgColor: "bg-red-100", textColor: "text-red-700" },
        { name: "Salon", icon: <FaCut />, bgColor: "bg-indigo-100", textColor: "text-indigo-700" },
        { name: "Others", icon: <FaEllipsisH />, bgColor: "bg-gray-100", textColor: "text-gray-700" },
    ];

    return (
        <nav className="bg-white shadow-md fixed w-full z-50">
            <div className="container mx-auto flex justify-between items-center px-4 py-2">
                <div className="flex items-center">
                    <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <FaTimes size={24} className="text-gray-700" /> : <FaBars size={24} className="text-gray-700" />}
                    </button>
                    <Link to="/home" className="text-xl font-bold text-blue-600 ml-4">UniTradeHub</Link>
                </div>

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

                <div className="flex items-center space-x-4">
                    {/* <Link to="/flashsales" className="relative text-gray-700 hover:text-yellow-600">
                        <p>flassSales</p>
                    </Link> */}

                    <Link to='/customerreviews' className="relative inline-block">
                        <IoNotifications size={24} />
                        {CountReviews > 0 && (
                            <span className="absolute -top-2 -right-2 text-xs w-5 h-5 flex items-center justify-center rounded-full bg-red-600 text-white border-2 border-white shadow-md">
                                {CountReviews}
                            </span>
                        )}
                    </Link>
                    <Link to="/saved" className=" relative inline-block ">
                        <FaShoppingCart size={24} className="text-black hidden md:flex" />
                        {count > 0 && (
                            <span className="absolute hidden md:flex -top-2 -right-2 text-xs w-5 h-5 flex items-center justify-center rounded-full bg-red-600 text-white border-2 border-white shadow-md">
                                {count}
                            </span>
                        )}
                    </Link>
                    <Link to="/chart" className="relative  text-gray-700 hover:text-blue-600">
                        < FiMessageSquare size={20} />
                    </Link>

                    <div className="relative" ref={userDropdownRef}>
                        <button
                            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                            className="flex items-center cursor-pointer hover:text-blue-600 text-black space-x-1"
                        >
                           
                            <span>
                                {user?.username.length > 7 ? (<p> {user?.username.slice(0,7)}</p>) : (<p>{user?.username}</p>)}
                               </span>
                            <FiChevronDown size={18} />
                        </button>

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

            {isOpen && (
                <div className="md:hidden fixed top-0 left-0 w-full h-full bg-gray-100 shadow-md p-4  z-50">
                    <span className="text-blue-500 font-bold text-xl">UniTradeHub</span>
                    <button className="absolute top-2 right-4 text-gray-700" onClick={() => setIsOpen(false)}>
                        <FaTimes size={24} />
                    </button>

                    <ul className="mt-4 space-y-3 text-gray-700">
                        <li><Link to="/" className="block hover:text-blue-600 text-black font-semibold ">Home</Link></li>
                        <li>
                            <Link to="/chart" className="flex items-centre  gap-2 text-black font-semibold  hover:text-blue-600">
 Charts
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="/customerreviews" className="flex items-centre  gap-2  text-gray-700 hover:text-blue-600">
                               Customer`s reviews
                            </Link>
                        </li> */}
                        <li>  <Link to="/saved" className=" relative inline-block text-black font-semibold">
                           Saved Posts
                            {count > 0 && (
                                <span className="absolute -top-2 -right-2 text-xs w-5 h-5 flex items-center justify-center rounded-full bg-red-600 text-white border-2 border-white shadow-md">
                                    {count}
                                </span>
                            )}
                        </Link></li>
                        <li>
                            <h1 className="text-md mb-2 text-gray-800">Categories</h1>
                            <div className="space-y-2 space-x-4 grid grid-cols-2">
                                {categories.map((category, index) => (
                                    <div key={index} className="">
                                        <Link
                                            to={`/category/${category.name}`}
                                            className={`flex items-center gap-2 p-2 rounded-md ${category.bgColor} hover:shadow-md transition duration-300`}
                                        >
                                            <span className={`text-md ${category.textColor}`}>{category.icon}</span>
                                            <p className={`font-semibold ${category.textColor}`}>{category.name}</p>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </li>
                        <li> <Link
                            to="/Settings"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 w-48 text-white rounded-lg"
                        >
                            <FiSettings size={18} /> Settings
                        </Link></li>

                        {/* Logout */}
                        {/* <li className="mt-4">
                            <button
                                onClick={logout}
                                className="flex items-center gap-1 px-4 py-2 bg-red-500  text-white hover:bg-gray-200 cursor-pointer w-48 text-left"
                            >
                                <FiLogOut size={18} /> Logout
                            </button>
                        </li> */}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;