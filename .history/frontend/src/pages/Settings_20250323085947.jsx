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

            setUser(response.data.user);
            console.log(response.data);
            setUsername(response.data.user.username);
            setEmail(response.data.user.email || "");
            setLocation(response.data.user.location || "");
            setPhoneNumber(response.data.user.phoneNumber || "");
            setProfilepic(response.data.user.profilepic || "");
            setBio(response.data.user.bio || "");
        } catch (error) {
            console.error("Error fetching user data:", error.message);
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

    const handleProfilePicChange = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                setProfilepic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteAccount = () => {
        setShowDeletePopup(true);
    };

    const confirmDeleteAccount = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("No authentication token found. Please log in again.");
                return;
            }

            await axios.delete(`http://localhost:5000/auth/delete/${user?._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            localStorage.removeItem("token");
            alert("Your account has been deleted.");
            window.location.href = "/";
        } catch (error) {
            console.log(error.message);
        }
        setShowDeletePopup(false);
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center w-full">
                <h1 className="text-2xl font-bold text-blue-600 mb-6">Settings</h1>
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-3/4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700">Username</label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <input type="email" className="w-full p-2 border border-gray-300 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-gray-700">Phone Number</label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-gray-700">Bio</label>
                                <textarea className="w-full p-2 border border-gray-300 rounded" placeholder="Tell us about yourself..." value={bio} onChange={(e) => setBio(e.target.value)} />
                            </div>
                        </div>
                        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all mt-6" onClick={handleSave}>Save Changes</button>
                        <button className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-all mt-4" onClick={handleDeleteAccount}>Delete Account</button>
                    </div>
                    <div className="w-full md:w-1/4 flex flex-col items-center">
                        {user && (
                            <div className="text-center">
                                <img src={profilepic || "https://via.placeholder.com/100"} alt="Profile" className="w-24 h-24 rounded-full mt-2 mx-auto" />
                                <p className="text-gray-600">{user?.email}</p>
                                <p className="text-gray-600">{user?.bio || "NO BIO YET"}</p>
                                <h1 className="text-xl md:text-2xl font-bold">{user.username}</h1>
                            </div>
                        )}
                        <button><Logout logout={logout} /></button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;
