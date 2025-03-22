import React from "react";
// import axios from "axios";
import { Link } from "react-router-dom";

const Categories = () => {
    const categories = [
        "Electronics", "Fashion & Clothing", "Gas Supply", "Home",
        "Kitchen", "furniture", "Beauty & Cosmetics", "Food & Beverages", "Salon", "Others"
    ]; // Hardcoded since they're enums in the backend

    return (
        <div className="p-4 rounded-xl shadow-lg bg-white w-80">
            <h1 className="text-xl font-bold mb-4 text-gray-800">Post Categories</h1>
            <ul className="flex flex-col gap-2">
                {categories.map((category, index) => (
                    <Link
                        to={`/category/${category}`}
                        key={index}
                        className="p-3 rounded-lg bg-gray-100 hover:shadow-md transition"
                    >
                        <p className="font-medium text-gray-800">{category}</p>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
