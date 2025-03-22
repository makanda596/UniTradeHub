import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Logout from "../components/Logout";
import { useAuthStore } from "../store/auth";

const Settings = ({ logout }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [user, setUser] = useState(null);
    const {error} = useAuthStore()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("https://gessamusystem.onrender.com/auth/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(response.data);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setPhoneNumber(response.data.phoneNumber);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
 /''
        fetchUser();
    }, []);

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("No authentication token found. Please log in again.");
                return;
            }

            const response = await axios.put(
                `https://gessamusystem.onrender.com/auth/update/${user._id}`,
                {
                    firstName,
                    lastName,
                    email,
                    phoneNumber,

                }, // ✅ Send user details in the request body
                {
                    headers: { Authorization: `Bearer ${token}` }
                } // ✅ Move headers to Axios config
            );

            setUser(response.data);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmail(response.data.email);
            setPhoneNumber(response.data.phoneNumber);

            alert("Settings saved successfully!");
        } catch (error) {
            console.error("Error updating settings:", error.message);
            alert(error?.message || "Failed to save settings");
        }
    };

    const handleDeleteAccount = () => {
        setShowDeletePopup(true);
    };

    const confirmDeleteAccount = async () => {
        if (!user || !user._id) {
            alert("User ID not found. Please try again.");  
            return;
        }

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`https://gessamusystem.onrender.com/auth/deleteUser/${user._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            window.location.href = "/";
            alert("Your account has been deleted.");
            localStorage.removeItem("token"); // Log out user
        } catch (error) {
            alert("Failed to delete account. Please try again.");
        }
        setShowDeletePopup(false);
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-cover bg-center bg-gray-100 p-4 flex flex-col items-center w-full">
                {error && <p className="text-red-500 text-center mb-2 font-bold">{error}</p>}

                <h1 className="text-2xl font-bold text-blue-600 mb-6">Settings</h1>
                <h2>make some changes here</h2>
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-3/4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700">First Name</label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-gray-700">Last Name</label>
                                <input type="text" className="w-full p-2 border border-gray-300 rounded" value={lastName} onChange={(e) => setLastName(e.target.value)} />
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
                                <label className="block text-gray-700">Profile Picture</label>
                                <input type="file" className="w-full p-2 border border-gray-300 rounded" onChange={(e) => setProfilePicture(URL.createObjectURL(e.target.files[0]))} />
                            </div>
                        </div>
                        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all mt-6" onClick={handleSave}>Save Changes</button>
                        <button className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-all mt-4" onClick={handleDeleteAccount}>Delete Account</button>
                    </div>
                    <div className="w-full md:w-1/4 flex flex-col items-center">
                        {/* https://gessamusystem.onrender.com/update/${user?.avatar} */}
                        {user && (
                            <div className="text-center">  
                                <img src={user?.avatar} alt="Profile" className="w-24 h-24 rounded-full mt-2 mx-auto" />
                                <p className="text-gray-600">{user.email}</p>
                                <h1 className="text-xl md:text-2xl font-bold">{user.firstName} {user.lastName}</h1>
                            </div>
                        )}
                        <Logout logout={logout} />
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
