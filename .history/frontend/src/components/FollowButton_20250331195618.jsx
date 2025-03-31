import React from "react";
import axios from "axios";

const FollowButton = ({ userId }) => {
    const API_BASE_URL = "http://localhost:5000/follow"; // Adjust backend URL if needed


    const handleFollowFunction = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("User is not authenticated");
                return;
            }

            const response = await axios.post(
                `${API_BASE_URL}/followUser/${userId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log(response.data.newFollower.statu);
        } catch (error) {
            console.error("Error following user:", error.response?.data || error.message);
        }
    };

    return <button onClick={handleFollowFunction} className="bg-blue-500 text-white px-4 py-2 rounded-md">Follow</button>;
};

export default FollowButton;
