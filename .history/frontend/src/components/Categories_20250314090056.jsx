import React from "react";
import { Link } from "react-router-dom";
import { FaLaptop, FaTshirt, FaGasPump, FaHome, FaUtensils, FaCouch, FaCut, FaStore, FaEllipsisH } from "react-icons/fa";

const Categories = () => {
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
        { name: "others", icon: <FaEllipsisH />, bgColor: "bg-gray-100", textColor: "text-gray-700" },
    ];

    return (
        <div className="p-2 rounded-2xl shadow-lg bg-white w-full max-w-xs mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">Post Categories</h1>
            <ul className="flex flex-col gap-3">
                {categories.map((category, index) => (
                    <Link
                        to={`/category/${category.name}`}
                        key={index}
                        className={`flex items-center gap-1 p-2 rounded-xl cursor-pointer ${category.bgColor} hover:shadow-md transition duration-300 transform hover:scale-105`}
                    >
                        <span className={`text-lg ${category.textColor}`}>{category.icon}</span>
                        <p className={`font-semibold ${category.textColor}`}>{category.name}</p>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
