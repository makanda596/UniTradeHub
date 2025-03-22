import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AllPosts = ({ user }) => {
    const [posts, setPosts] = useState([]);
    const [trendingPosts, setTrendingPosts] = useState([
        { productName: "Smartphone X", description: "The latest smartphone with AI features." },
        { productName: "Gaming Laptop Y", description: "A powerful laptop for gaming enthusiasts." },
        { productName: "Wireless Earbuds Z", description: "High-quality sound with noise cancellation." },
        { productName: "Smartwatch A", description: "Track your health with this smartwatch." },
        { productName: "Tablet B", description: "A high-performance tablet for work and play." }
    ]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchPosts = async () => {
            if (!user?._id) return; // Ensure user is defined

            try {
                const response = await axios.get("http://localhost:5000/posts/allposts");
                setPosts(response.data); // Ensure it's an array
            } catch (err) {
                console.log("Failed to fetch posts");
                console.error(err);
            }
        };

        fetchPosts();
    }, [user?._id]); // Refetch when user changes

    const nextSlide = () => {
        if (trendingPosts.length > 4) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingPosts.length);
        }
    };

    const prevSlide = () => {
        if (trendingPosts.length > 4) {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + trendingPosts.length) % trendingPosts.length);
        }
    };

    return (
        <div className="flex flex-col w-full h-screen p-6">
            {/* Trending Posts */}
            <div className="p-6 rounded-2xl shadow-lg mb-6 relative flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-4">Trending Posts</h1>
                <div className="relative w-full max-w-md flex items-center justify-center">
                    {trendingPosts.length > 4 && (
                        <button className="absolute left-0 p-2 bg-gray-200 rounded-full shadow-md" onClick={prevSlide}>
                            <FaChevronLeft />
                        </button>
                    )}
                    <div className="p-4 border rounded-lg shadow-md w-64 text-center">
                        <h3 className="text-lg font-bold">{trendingPosts[currentIndex].productName}</h3>
                        <p className="text-gray-700">{trendingPosts[currentIndex].description}</p>
                    </div>
                    {trendingPosts.length > 4 && (
                        <button className="absolute right-0 p-2 bg-gray-200 rounded-full shadow-md" onClick={nextSlide}>
                            <FaChevronRight />
                        </button>
                    )}
                </div>
            </div>

            {/* All Posts */}
            <div className="p-6 rounded-2xl shadow-lg">
                <h1 className="text-2xl font-bold">All Posts</h1>
                <ul>
                    {posts.length > 0 ? (
                        posts.map((post, index) => (
                            <li key={index} className="p-4 border-b">
                                <h3 className="text-lg font-bold">{post.productName}</h3>
                                <p className="text-gray-700">{post.description}</p>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">No posts found.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default AllPosts;
