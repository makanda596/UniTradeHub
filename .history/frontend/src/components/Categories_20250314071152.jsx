import React from "react";
import { FaLaptop, FaTshirt, FaHome, FaCogs, FaCar, FaBriefcase, FaUtensils, FaHeart } from "react-icons/fa";

const Categories = () => {
    const categories = [
        { name: "Electronics", icon: <FaLaptop />, bgColor: "bg-blue-100", textColor: "text-blue-600" },
        { name: "Fashion & Clothing", icon: <FaTshirt />, bgColor: "bg-pink-100", textColor: "text-pink-600" },
        { name: "Home Appliances", icon: <FaHome />, bgColor: "bg-green-100", textColor: "text-green-600" },
        { name: "Services", icon: <FaCogs />, bgColor: "bg-yellow-100", textColor: "text-yellow-600" },
        { name: "Automobiles", icon: <FaCar />, bgColor: "bg-gray-100", textColor: "text-gray-600" },
        { name: "Jobs & Vacancies", icon: <FaBriefcase />, bgColor: "bg-purple-100", textColor: "text-purple-600" },
        { name: "Food & Restaurants", icon: <FaUtensils />, bgColor: "bg-red-100", textColor: "text-red-600" },
        { name: "Health & Beauty", icon: <FaHeart />, bgColor: "bg-teal-100", textColor: "text-teal-600" },
    ];

    return (
        <div className="p-6 rounded-2xl shadow-lg bg-white w-80">
            <h1 className="text-xl font-bold mb-4 text-gray-800">📌 Post Categories</h1>
            <ul className="flex flex-col gap-4">
                {categories.map((category, index) => (
                    <li key={index} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${category.bgColor} hover:shadow-md transition duration-300`}>
                        <span className={`text-xl ${category.textColor}`}>{category.icon}</span>
                        <p className={`font-medium ${category.textColor}`}>{category.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
