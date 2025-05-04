import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const GuestNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md px-6 py-2 w-full z-50 fixed ">
            <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-blue-600">
                    <Link to="/">Unitrade Hub</Link>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    <Link to="/" className="text-gray-700 hover:text-blue-500 transition">
                        Home
                    </Link>
                    <a href="/about" className="text-gray-700 hover:text-blue-500 transition">
                        About Us
                    </a>
                    <a href="/contact" className="text-gray-700 hover:text-blue-500 transition">
                        Contact Us
                    </a>
                    <Link to="/login" className="text-blue-600 font-medium hover:underline">
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        className="bg-blue-600 text-white px-2 py-1 hover:bg-green-600 rounded-lg  transition"
                    >
                        Register
                    </Link>
                </div>

                <button
                    className="md:hidden text-blue-600 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                >
                    {isOpen ? (
                        <a>X</a>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden absolute left-0 top-full w-full bg-white shadow-lg py-4 px-6 mt-0 animate-slide-down">
                    <div className="flex flex-col space-y-4">
                        <Link to="/" className="text-gray-700 hover:text-blue-500" onClick={() => setIsOpen(false)}>
                            Home
                        </Link>
                        <a href="/about" className="text-gray-700 hover:text-blue-500" onClick={() => setIsOpen(false)}>
                            About Us
                        </a>
                        <a href="/contact" className="text-gray-700 hover:text-blue-500 transition">
                            Contact Us
                        </a>
                        <Link to="/login" className="text-blue-600 font-medium hover:underline" onClick={() => setIsOpen(false)}>
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="w-24 bg-blue-600 text-white text-center px-2 py-1 rounded-lg hover:bg-green-600 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            Register
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default GuestNavbar;
