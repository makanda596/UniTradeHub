import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



const RelatedProducts = () => {
    const { categoryName } = useParams(); // Get category from URL
        const [posts, setPosts] = useState([]);
    
    console.log(categoryName)
        useEffect(() => {
            axios.get(`http://localhost:5000/posts/posts?category=${categoryName}`)
                .then(response => {
                    setPosts(response);
                    console.log(response.data.posts)
                })
                .catch(error => {
                    console.error("Error fetching posts:", error);
                });
        }, [categoryName]);
    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {posts.map((post,index) => (
                    <div
                        key={index}
                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                    >
                        <img
                            src={post.image}
                            alt=""
                            className="w-full h-40 object-cover rounded-lg"
                        />
                        <h3 className="text-lg font-semibold text-gray-800 mt-4">{post.name}</h3>
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
