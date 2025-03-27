import React from "react";
import { Link } from "react-router-dom";
import { FaLaptop, FaTshirt, FaGasPump, FaHome, FaUtensils, FaCouch, FaCut, FaStore, FaEllipsisH } from "react-icons/fa";

const Categories = () => {
   

    return (
        <div className="p-2 rounded-2xl shadow-lg bg-white w-full max-w-xs mx-auto">
            <h1 className="text-xl font-bold mb-2 text-gray-800 text-center">Post Categories</h1>
            <ul className="flex flex-col gap-2">
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
