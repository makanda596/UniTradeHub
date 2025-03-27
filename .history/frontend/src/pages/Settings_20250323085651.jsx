import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Logout from "../components/Logout";
import { useAuthStore } from "../utilis/auth";

const Settings = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [profilepic, setProfilepic] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [user, setUser] = useState(null);
    const [bio, setBio] = useState("");
    const { logout } = useAuthStore();

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("No authentication token found. Please log in again.");
                return;
            }

            const response = await axios.get("http://localhost:5000/auth/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const userData = response.data.user;
            setUser(userData);
            setUsername(userData.username || "");
            setEmail(userData.email || "");
            setLocation(userData.location || "");
            setPhoneNumber(userData.phoneNumber || "");
            setProfilepic(userData.profilepic || "");
            setBio(userData.bio || "");
        } catch (error) {
            console.error("Error fetching user data:", error);
            alert("Failed to load user data.");
        }
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("No authentication token found. Please log in again.");
                return;
            }

            if (password && password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            const updatedData = {
                username,
                email,
                location,
                bio,
                phoneNumber,
                password: password || undefined,
            };

            const response = await axios.put(
                `http://localhost:5000/auth/update/${user?._id}`,
                updatedData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setUser(response.data.user);
            alert("Settings updated successfully!");
        } catch (error) {
            console.error("Error updating settings:", error);
            alert("Failed to update settings.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center w-full">
                <h1 className="text-2xl font-bold text-blue-600 mb-6">Settings</h1>
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
                    <label className="block text-gray-700">Location</label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded" value={location} onChange={(e) => setLocation(e.target.value)} />
                    <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all mt-6" onClick={handleSave}>Save Changes</button>
                </div>
            </div>
        </>
    );
};

export default Settings;
