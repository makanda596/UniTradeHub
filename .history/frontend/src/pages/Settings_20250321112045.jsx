import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Logout from "../components/Logout";

const Settings = ({ logout }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [profilepic, setProfilepic] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [user, setUser] = useState(null);

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
            setUsername(response.data.user.username );
            setEmail(response.data.user.email || "");
            setPhoneNumber(response.data.user.phoneNumber || "");
            setProfilepic(response.data.user.profilepic || "");
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
                phoneNumber,
                password: password || undefined, // Only send password if provided
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
            alert("Failed to delete account.");
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

                            <div className="md:col-span-2">
                                <label className="block text-gray-700">Password</label>
                                <input type="password" className="w-full p-2 border border-gray-300 rounded" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-gray-700">Confirm Password</label>
                                <input type="password" className="w-full p-2 border border-gray-300 rounded" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-gray-700">Profile Picture</label>
                                <input type="file" className="w-full p-2 border border-gray-300 rounded" onChange={handleProfilePicChange} />
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
                                <h1 className="text-xl md:text-2xl font-bold">{user.username}</h1>
                            </div>
                        )}
                        <button><Logout logout={logout} /></button>
                    </div>
                </div>
            </div>

            {showDeletePopup && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold">Close Account</h2>
                        <p className="text-gray-700 mt-2">Are you sure you want to delete your account? You will lose all your data.</p>
                        <div className="mt-4 flex justify-end gap-4">
                            <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowDeletePopup(false)}>Cancel</button>
                            <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={confirmDeleteAccount}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Settings;
