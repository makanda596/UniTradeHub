import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RelatedProducts = ({ category, currentPostId }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

    useEffect(() => {
        const fetchRelated = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/posts/related/${category}/${currentPostId}`
                );
                setRelatedPosts(response.data);
            } catch (error) {
                console.error("Error fetching related posts:", error);
            }
        };

        if (category) {
            fetchRelated();
        }
    }, [category, currentPostId]);


 

  if (relatedPosts.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h3 className="text-xl font-semibold mb-4">Related Posts in {category}</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {relatedPosts.map((post) => (
          <Link
                to={`/Onepost/${post._id}`}
            key={post._id}
            className="border p-4 rounded-lg shadow hover:shadow-lg transition"
          >
                <img
                    src={post?.createdBy?.profilepic || "/default-profile.png"}
                    alt="Seller"
                    className="w-14 h-14 object-cover rounded-full border"
                />
                <div className="flex flex-col">

                    <p className="text-lg font-semibold text-gray-800">{post?.createdBy?.username}</p>
                </div>
            <img
              src={post.image}
              alt={post.productName}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h4 className="text-lg font-bold">{post.productName}</h4>
            <p className="text-sm text-gray-600">{post.description?.slice(0, 60)}...</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
