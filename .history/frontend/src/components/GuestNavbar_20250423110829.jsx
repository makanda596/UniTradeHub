import React from 'react';
import { Link } from 'react-router-dom';

const GuestNavbar = () => {
    return (
        <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
            <div className="text-xl font-bold text-blue-600">
                <Link to="/">MyApp</Link>
            </div>
            <div className="space-x-4">
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
        </nav>
    );
};

export default GuestNavbar;
