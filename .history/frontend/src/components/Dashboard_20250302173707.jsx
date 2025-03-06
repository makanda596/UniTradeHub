import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
    const [user, setUser] = useState(null); // Store user data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token"); // Get token from storage
                if (!token) {
                    setError("Unauthorized. Please log in.");
                    return;
                }

                const response = await axios.get("http://localhost:5000/posts/me", {
                    headers: { Authorization: `Bearer ${token}` }, // Send token to backend
                });

                setUser(response.data); // Store user data
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch user data.");
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <p>Loading user data...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2>Welcome, {user.name}!</h2>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <button onClick={() => localStorage.removeItem("token") || (window.location.href = "/")}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
