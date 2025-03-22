import { useEffect, useState } from "react";
import { FaRegBookmark, FaPlus, FaSignOutAlt, FaBars } from "react-icons/fa";
import { MdDashboard, MdList } from "react-icons/md";
import Logout from "./Logout";
import axios from "axios";

const Dashboard = ({ logout, user }) => {
    const [activeTab, setActiveTab] = useState("Dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [details, setDetails] = useState(null);

    const menuItems = [
        { name: "Dashboard", icon: <MdDashboard /> },
        { name: "Create Listing", icon: <FaPlus /> },
        { name: "My Listings", icon: <MdList /> },
        { name: "Saved Listings", icon: <FaRegBookmark /> },
    ];

    // Function to fetch details
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
                        <div
                            key={item.name}
                            onClick={() => {
                                setActiveTab(item.name);
                                setSidebarOpen(false);
                            }}
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer text-gray-700 hover:bg-blue-100 transition ${activeTab === item.name ? "bg-blue-200 text-blue-700" : ""
                                }`}
                        >
                            {item.icon}
                            {item.name}
                        </div>
                    ))}
                    <div className="flex items-center gap-3 p-3 rounded-lg cursor-pointer text-red-500 hover:bg-red-100 transition">
                        <FaSignOutAlt /> <Logout logout={logout} />
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
                <h1 className="text-3xl font-semibold mb-4">{activeTab}</h1>

                <div className="bg-white p-5 shadow-md rounded-lg">
                    <p className="text-gray-600">
                        Content for <span className="font-bold">{activeTab}</span> will be displayed here.
                    </p>
                </div>
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
