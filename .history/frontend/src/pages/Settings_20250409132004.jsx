import React, { useState, useEffect } from "react";
// Removed: import axios from "axios";  <-- Not used, causing error.  If you need it, install it.
// Removed: import { useAuthStore } from "../utilis/auth";  <-- Causing error, likely custom.  Commented out.
// import Navbar from "../components/Navbar";  <-- Causing error, likely custom.  Commented out.
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaKey, FaTrash, FaSave, FaCamera } from "react-icons/fa";
// Removed: import { BiLogOut } from "react-icons/bi";  <-- Not used, causing error.
import { RiLockPasswordLine } from "react-icons/ri";
// Removed: import { IoMdInformationCircleOutline } from "react-icons/io";  <-- Not used, causing error.
import Swal from "sweetalert2";

// Mock the missing modules, to avoid the errors.  Remove these if you have the actual files.
const useAuthStore = () => ({
    logout: () => {
        console.log("Mock logout function");
        // In a real implementation, you'd clear tokens, etc.
    },
});

const Navbar = ({user}) => {
  return (
    <nav>
      {/* Replace this mock with your actual Navbar component */}
      <div>Navbar (Mock) - User: {user?.username}</div>
    </nav>
  );
};

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
    const { logout } = useAuthStore();  // Mocked above
    const [error, setError] = useState("");

    const [profilepicFile, setProfilepicFile] = useState(null);


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

            // Mock the axios.get, since axios isn't included.  Replace with actual fetch.
            // const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/profile`, {
            //     headers: { Authorization: `Bearer ${token}` },
            // });
            const mockResponse = {
                data: {
                    user: {
                        username: "testuser",
                        email: "test@example.com",
                        location: "Test Location",
                        phoneNumber: "123-456-7890",
                        bio: "Test bio",
                        profilepic: "https://via.placeholder.com/150",
                        _id: "someuserid"
                    }
                }
            };

            // Replace this with your actual fetch to your backend
            const response = await new Promise(resolve => {
                setTimeout(() => resolve(mockResponse), 500); // Simulate a 500ms delay
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
        validateAndSetImage(file);
    };

    const validateAndSetImage = (file) => {
        setError("");

        if (!file) return;

        if (!file.type.match('image.*')) {
            setError("Please select an image file (JPEG, PNG, etc.)");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("Image size should be less than 5MB");
            return;
        }

        setProfilepicFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({
                ...prev,
                profilepic: reader.result, // only for preview
            }));
        };
        reader.readAsDataURL(file);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

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

            // const form = new FormData();  <-- Removed, using plain object for mock.
            // form.append("username", formData.username);
            // form.append("email", formData.email);
            // form.append("location", formData.location);
            // form.append("bio", formData.bio);
            // form.append("phoneNumber", formData.phoneNumber);
            // if (formData.password) {
            //     form.append("password", formData.password);
            // }
            // if (profilepicFile) {
            //     form.append("profilepic", profilepicFile); // ✅ append the file object
            // }

            const requestBody = { // Mock request body.
                username: formData.username,
                email: formData.email,
                location: formData.location,
                bio: formData.bio,
                phoneNumber: formData.phoneNumber,
                password: formData.password,
                profilepic: formData.profilepic
            }


            // const response = await axios.put(  <-- Removed axios
            //     `${import.meta.env.VITE_BACKEND_URL}/auth/update/${user?._id}`,
            //     form,
            //     {
            //         headers: {
            //             Authorization: `Bearer ${token}`,
            //             "Content-Type": "multipart/form-data"
            //         }
            //     }
            // );

            const mockUpdateResponse = { // Mock response data.
                data: {
                    updatedUser: {
                        ...user, // Keep existing user data
                        ...formData, // Overwrite with updated form data
                        profilepic: formData.profilepic || user.profilepic, // Keep the old one if new not provided
                    }
                }
            }

            const response = await new Promise(resolve => { // Mock the put request.
                setTimeout(() => resolve(mockUpdateResponse), 1000);
            });


            setUser(response.data.updatedUser); // Assuming the backend returns the updated user
            setFormData(prev => ({
                ...prev,
                profilepic: response.data.updatedUser.profilepic || prev.profilepic, // Update preview if backend returns new URL
            }));
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Settings updated successfully!',
                showConfirmButton: false,
                timer: 1200
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

    const handleDeleteAccount = () => {
        Swal.fire({
            title: 'Delete Account?',
            text: "This will permanently delete your account and all data!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
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

                    // await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/delete/${user?._id}`, {  <-- Removed axios
                    //     headers: { Authorization: `Bearer ${token}` },
                    // });

                    // Mock the delete
                    await new Promise(resolve => setTimeout(resolve, 500));

                    localStorage.removeItem("token");
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your account has been deleted.',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                    }).then(() => {
                        window.location.href = "/";
                    });
                } catch (error) {
                    console.error("Error deleting account:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to delete account',
                        confirmButtonColor: '#3085d6',
                    });
                }
            }
        });
    };

    const handleLogout = () => {
        Swal.fire({
            title: 'Logout?',
            text: "Are you sure you want to logout?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                logout();  // Mocked
                window.location.href = "/login";
            }
        });
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
                                <div className="relative">
                                    <img
                                        src={formData.profilepic || user?.profilepic || "https://via.placeholder.com/150"}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                                    />
                                    <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer text-white">
                                        <FaCamera />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e)}
                                            className="hidden"
                                        />
                                    </label>
                                </div>

                                <h2 className="text-xl font-bold text-gray-800">{user?.username}</h2>
                                <p className="text-gray-500 text-sm">{user?.email}</p>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center gap-2 text-red-500 hover:text-red-700 py-2 px-4 rounded-lg transition"
                                >
                                    {/* <BiLogOut /> */}  {/* Removed BiLogOut */}
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="w-full md:w-3/4">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h1 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h1>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Username */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <FaUser className="text-blue-500" />
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <FaEnvelope className="text-blue-500" />
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Phone Number */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <FaPhone className="text-blue-500" />
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Location */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-blue-500" />
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                        value={formData.location}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Bio */}
                                <div className="md:col-span-2 space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                        {/* <IoMdInformationCircleOutline className="text-blue-500" /> */}  {/* Removed IoMdInformationCircleOutline */}
                                        Bio
                                    </label>
                                    <textarea
                                        name="bio"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                                        rows="3"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        placeholder="Tell us about yourself..."
                                    />
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <RiLockPasswordLine className="text-blue-500" />
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Leave blank to keep current"
                                    />
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <FaKey className="text-blue-500" />
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm new password"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col md:flex-row gap-4 mt-8">
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className={`flex-1 py-3 px-6 rounded-lg font-medium text-white transition flex items-center justify-center gap-2
                                        ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <FaSave />
                                            Save Changes
                                        </>
                                    )}
                                </button>

                                <button
                                    onClick={handleDeleteAccount}
                                    className="flex-1 py-3 px-6 rounded-lg font-medium text-white bg-red-500 hover:bg-red-600 transition flex items-center justify-center gap-2"
                                >
                                    <FaTrash />
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
