import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const GuestNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="text-xl font-bold text-blue-600">
                    <Link to="/">Unitrade Hub</Link>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    <Link to="/" className="text-gray-700 hover:text-blue-500 transition">
                        Home
                    </Link>
                    <a href="/#contact" className="text-gray-700 hover:text-blue-500 transition">
                        contact Us
                    </a>
                    <Link to="/login" className="text-blue-600 font-medium hover:underline">
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Register
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-blue-600 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                >
                    {isOpen ? <X size={28} /> : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>}
                </button>
            </div>

            {/* Mobile Nav Links */}
            {isOpen && (
                <div className="md:hidden mt-4">
                    <div className="flex flex-col space-y-3">
                        <Link
                            to="/"
                            className="text-gray-700 hover:text-blue-500 transition py-2 block"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/about"
                            className="text-gray-700 hover:text-blue-500 transition py-2 block"
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </Link>
                        <Link
                            to="/login"
                            className="text-blue-600 font-medium hover:underline py-2 block"
                            onClick={() => setIsOpen(false)}
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition block w-fit"
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