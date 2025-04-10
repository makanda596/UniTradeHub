import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthStore } from "../utilis/auth";
import Navbar from "../components/Navbar";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaKey, FaTrash, FaSave, FaCamera } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Swal from "sweetalert2";

const Settings = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        location: "",
        phoneNumber: "",
        bio: "",
        password: "",
        confirmPassword: "",
        profilepic: ""
    });
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const { logout } = useAuthStore();

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                Swal.fire({
                    icon: 'error',
                    title: 'Session Expired',
                    text: 'Please log in again',
                    confirmButtonColor: '#3085d6',
                });
                return;
            }

            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUser(response.data.user);
            setFormData({
                username: response.data.user.username,
                email: response.data.user.email || "",
                location: response.data.user.location || "",
                phoneNumber: response.data.user.phoneNumber || "",
                bio: response.data.user.bio || "",
                password: "",
                confirmPassword: "",
                profilepic: response.data.user.profilepic || ""
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to load user data',
                confirmButtonColor: '#3085d6',
            });
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result;
            setFormData(prev => ({
                ...prev,
                profilepic: base64
            }));
        };
        reader.readAsDataURL(file);
    };

    // ... keep existing handleChange, handleSave, handleDeleteAccount, and handleLogout functions the same ...

    // Modified handleSave function
    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                Swal.fire({
                    icon: 'error',
                    title: 'Session Expired',
                    text: 'Please log in again',
                    confirmButtonColor: '#3085d6',
                });
                return;
            }

            if (formData.password && formData.password !== formData.confirmPassword) {
                Swal.fire({
                    icon: 'error',
                    title: 'Password Mismatch',
                    text: 'Passwords do not match!',
                    confirmButtonColor: '#3085d6',
                });
                return;
            }

            setLoading(true);

            const updatedData = {
                username: formData.username,
                email: formData.email,
                location: formData.location,
                bio: formData.bio,
                phoneNumber: formData.phoneNumber,
                password: formData.password || undefined,
                profilepic: formData.profilepic || undefined
            };

            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/auth/update/${user?._id}`,
                updatedData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setUser(response.data.user);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Settings updated successfully!',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error("Error updating settings:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Failed to update settings',
                confirmButtonColor: '#3085d6',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar user={user} />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full md:w-1/4">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
                            <div className="flex flex-col items-center mb-6">
                                <div className="mb-4 relative">
                                    <label htmlFor="profile-pic-upload" className="cursor-pointer">
                                        <img
                                            src={formData.profilepic || user?.profilepic || "https://via.placeholder.com/150"}
                                            alt="Profile"
                                            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                                        />
                                        <div className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full">
                                            <FaCamera className="text-white text-sm" />
                                        </div>
                                    </label>
                                    <input
                                        type="file"
                                        id="profile-pic-upload"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                    />
                                </div>
                                <h2 className="text-xl font-bold text-gray-800">{user?.username}</h2>
                                <p className="text-gray-500 text-sm">{user?.email}</p>
                            </div>

                            {/* ... rest of the sidebar remains the same ... */}
                        </div>
                    </div>

                    {/* ... rest of the component remains the same ... */}
                </div>
            </div>
        </div>
    );
};

export default Settings;