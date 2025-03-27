import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

const categories = [
    { name: "Electronics" },
    { name: "Fashion & Clothing" },
    { name: "Gas Supply" },
    { name: "Home" },
    { name: "Kitchen" },
    { name: "Furniture" },
    { name: "Beauty & Cosmetics" },
    { name: "Food & Beverages" },
    { name: "Salon" },
    { name: "Others" },
];

const RelatedProducts = () => {
    // const { categoryName } = useParams(); // Uncomment if using URL params
    const [category, setCategory] = useState(categories[1]);

    useEffect(() => {
        // Simulating setting category dynamically, e.g., based on props or URL
        setCategory(categories[1]); // Replace with categoryName if using URL params
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>

            {/* Display only the selected category */}
            {categories
                .filter((cat) => cat.name === category) // Show only the selected category
                .map((filteredCategory, index) => (
                    <div key={index}>
                        <p className="text-lg font-semibold text-gray-700">{filteredCategory.name}</p>
                    </div>
                ))}
        </div>
    );
};

export default RelatedProducts;
