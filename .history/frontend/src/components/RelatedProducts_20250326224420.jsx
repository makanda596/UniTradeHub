import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";



const RelatedProducts = () => {
    // const { categoryName } = useParams(); 
        const [posts, setPosts] = useState([]);
    
    // console.log(categoryName)
        useEffect(() => {
            axios.get('http://localhost:5000/posts/posts?category=Electronics')
                .then(response => {
                    setPosts(response.data);
                    console.log(response.data.posts.data)
                })
                .catch(error => {
                    console.error("Error fetching posts:", error);
                });
        }, []);
    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               <>{posts.productName||"no"}</>
            </div>
        </div>
    );
};

export default RelatedProducts;
