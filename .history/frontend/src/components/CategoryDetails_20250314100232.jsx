import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CategoryDetails = () => {
    const { categoryName } = useParams(); // Get category from URL
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5000/posts/posts?category=${categoryName}`)
            .then(response => {
                setPosts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching posts:", error);
                setLoading(false);
            });
    }, [categoryName]);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Posts in {categoryName}</h1>
            {loading ? (
                <p>Loading posts...</p>
            ) : posts.length === 0 ? (
                <p>No posts available for this category.</p>
            ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {posts.map((post) => (
                        <li key={post._id} className="border p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold">{post.productName}</h2>
                            <p className="text-gray-700">{post.description}</p>
                            <p className="text-gray-700">{post.image}</p>
                            <img src={post.image} alt=""/>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CategoryDetails;
