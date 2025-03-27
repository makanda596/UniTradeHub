import React from "react";

const relatedProducts = [
    {
        id: 1,
        name: "Smart Watch",
        price: "$150",
        image: "https://via.placeholder.com/150",
    },
    {
        id: 2,
        name: "Wireless Headphones",
        price: "$200",
        image: "https://via.placeholder.com/150",
    },
    {
        id: 3,
        name: "Gaming Mouse",
        price: "$75",
        image: "https://via.placeholder.com/150",
    },
    {
        id: 4,
        name: "Bluetooth Speaker",
        price: "$120",
        image: "https://via.placeholder.com/150",
    },
];

const RelatedProducts = () => {
    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-40 object-cover rounded-lg"
                        />
                        <h3 className="text-lg font-semibold text-gray-800 mt-4">{product.name}</h3>
                        <p className="text-green-600 font-bold">{product.price}</p>
                        <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
