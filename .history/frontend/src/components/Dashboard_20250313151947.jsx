import { useEffect, useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { FaRegBookmark, FaPlus, FaSignOutAlt, FaBars } from "react-icons/fa";
import { MdDashboard, MdList } from "react-icons/md";
import Logout from "./Logout";
import axios from "axios";

// Page Components
const DashboardHome = () => <div>Welcome to the Dashboard!</div>;
const CreateListing = () => <div>Create a new listing here.</div>;
const MyListings = () => <div>View and manage your listings.</div>;
const SavedListings = () => <div>Your saved listings will appear here.</div>;

const Dashboard = ({ logout, user }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [details, setDetails] = useState(null);
    const navigate = useNavigate();

    const menuItems = [
        { name: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
        { name: "Create Listing", path: "/create-listing", icon: <FaPlus /> },
        { name: "My Listings", path: "/my-listings", icon: <MdList /> },
        { name: "Saved Listings", path: "/saved-listings", icon: <FaRegBookmark /> },
    ];

    // Function to fetch user details
    const fetchDetails = async () => {
        try {
            const response = await axios.get("http://localhost:5000/auth/profile", {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });
            setDetails(response.data);
        } catch (error) {
            console.error("Failed to fetch profile details");
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    return (
        <div className="flex flex-col md:flex-row h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                className={`fixed md:relative z-20 w-64 bg-white shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-64"
                    } md:translate-x-0 transition-transform duration-300 ease-in-out md:flex md:flex-col p-5`}
            >
                <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
                    UnitradeHub
                </h2>
                <nav>
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer text-gray-700 hover:bg-blue-100 transition"
                            onClick={() => setSidebarOpen(false)}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    ))}
                    <div
                        onClick={() => logout()}
                        className="flex items-center gap-3 p-3 rounded-lg cursor-pointer text-red-500 hover:bg-red-100 transition"
                    >
                        <FaSignOutAlt /> Logout
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto">
                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-3 text-gray-600 fixed top-4 left-4 z-30 bg-white shadow-md rounded-full"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <FaBars size={24} />
                </button>

                {/* Dynamic Page Rendering */}
                <Routes>
                          <AllPosts />
                    
                    <Route path="/" element={<DashboardHome />} />
                    <Route path="/dashboard" element={<DashboardHome />} />
                    <Route path="/create-listing" element={<CreateListing />} />
                    <Route path="/my-listings" element={<MyListings />} />
                    <Route path="/saved-listings" element={<SavedListings />} />
                </Routes>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-80 p-5 shadow-md bg-white space-y-4">
                {/* User Profile Section */}
                <div className="bg-gray-200 p-4 rounded-lg flex flex-col items-center text-center">
                    <img
                        src={user?.profilepic}
                        className="object-cover h-20 w-20 rounded-full mb-2 mt-4"
                        alt="Profile"
                    />
                    <h2 className="text-xl font-bold">{user?.username || "Guest"}</h2>
                    <p className="text-lg text-gray-600">Email: {user?.email || "N/A"}</p>
                    <p className="text-lg text-gray-600">
                        Phone: {user?.phoneNumber || "N/A"}
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-2">
                    <div className="bg-blue-100 text-blue-800 p-3 rounded-lg text-center">
                        <p className="text-lg font-bold">{user?.postsCreated || 0}</p>
                        <h3 className="text-sm">Posts</h3>
                    </div>
                    <div className="bg-green-100 text-green-800 p-3 rounded-lg text-center">
                        <p className="text-lg font-bold">
                            {details?.user?.bookmarkedItems || 0}
                        </p>
                        <h3 className="text-sm">Bookmarked</h3>
                    </div>
                    <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg text-center">
                        <p className="text-lg font-bold">
                            {details?.user?.likedPhotos || 0}
                        </p>
                        <h3 className="text-sm">Liked Photos</h3>
                    </div>
                </div>

                {/* Trending Section */}
                <div className="bg-gray-200 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2 text-center">Trending</h3>
                    <ul className="space-y-2">
                        {[...Array(3)].map((_, index) => (
                            <li key={index} className="flex items-center gap-3">
                                <img
                                    src={details?.user?.profilepic}
                                    className="object-cover h-10 w-10 rounded-full"
                                    alt="Profile"
                                />
                                <span className="text-blue-600 font-semibold cursor-pointer">
                                    Electronics - 17
                                </span>
                            </li>
                        ))}
                    </ul>
                    <p className="text-center text-blue-600 cursor-pointer mt-2">
                        See more
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
