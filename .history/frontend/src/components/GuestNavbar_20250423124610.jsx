import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const GuestNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="text-xl font-bold text-blue-600">
                    <Link to="/">MyApp</Link>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link to="/" className="text-gray-700 hover:text-blue-500 transition">Home</Link>
                    <Link to="/about" className="text-gray-700 hover:text-blue-500 transition">About</Link>
                    <Link to="/login" className="text-blue-600 font-medium hover:underline">Login</Link>
                    <Link
                        to="/register"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Register
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-blue-600"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <h1>menu</h1>me>}
                </button>
            </div>

            {/* Mobile Nav Links */}
            {isOpen && (
                <div className="flex flex-col mt-4 space-y-3 md:hidden">
                    <Link
                        to="/"
                        className="text-gray-700 hover:text-blue-500 transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className="text-gray-700 hover:text-blue-500 transition"
                        onClick={() => setIsOpen(false)}
                    >
                        About
                    </Link>
                    <Link
                        to="/login"
                        className="text-blue-600 font-medium hover:underline"
                        onClick={() => setIsOpen(false)}
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        onClick={() => setIsOpen(false)}
                    >
                        Register
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default GuestNavbar;
