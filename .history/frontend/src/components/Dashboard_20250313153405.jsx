import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = ({user}) => {
    const [posts, setPosts] = useState([]);
    const [error,setError]= useState("")

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/posts/allposts");
                setPosts(response.data);
            } catch (error) {
      setError(error.message)
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="flex h-screen bg-gray-100 p-6">
            {/* User Information */}
        
            <div className="w-1/4 bg-white p-6 mr-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-semibold">User Information</h2>
                <div className="mt-4">
                    <img src={user?.profilepic} alt="" className="w-20 h-20 object-cover"/>
                    <p className="text-gray-700"><strong>userName:</strong> {user.username}</p>
                    <p className="text-gray-700 mt-2"><strong>Email:</strong> {user?.email}</p>
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Logout</button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome to your dashboard. Here you can see the latest updates and analytics.</p>
                {/* Add more dashboard content here */}
                {posts.map((post,index)=>{
                    return <div key={index}>
                        <p>{post.description}</p>
                        <p>{post.productName}</p>
                    </div>
                })}
            </div>
        </div>
    );
};

export default Dashboard;
