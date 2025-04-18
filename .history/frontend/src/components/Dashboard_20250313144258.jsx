import { useEffect, useState } from "react";
import { FaRegBookmark, FaPlus, FaSignOutAlt, FaBars } from "react-icons/fa";
import { MdDashboard, MdList } from "react-icons/md";
import Logout from "./Logout";
import axios from "axios";
import { Post } from "../../../server/models/postModel";
import AllPosts from "./AllPosts";
import UserPostsPage from "./UserPostsPage";

// Import tab components


const Dashboard = ({ logout, user }) => {
    const [activeTab, setActiveTab] = useState("Dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [details, setDetails] = useState(null);

    const menuItems = [
        { name: "All posts", icon: <MdDashboard /> },
        { name: "Make a post", icon: <FaPlus /> },
        { name: "user", icon: <MdList /> },
        { name: "Saved Listings", icon: <FaRegBookmark /> },
    ];

    // Fetch user details
    const fetchDetails = async () => {
        try {
            const response = await axios.get("http://localhost:5000/auth/profile", {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });
            setDetails(response.data);
        } catch (error) {
            console.error("Failed to fetch profile details", error);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    // Function to render active tab content
    const renderContent = () => {
        switch (activeTab) {
            case "All posts":
                return <AllPosts />;
            case "Make a post":
                return <Post user={user}/> ;
            case "user":
                return <UserPostsPage user={user} />
           
        }
    };

    return (
        <div className="flex h-screen px-14 py-4">
            {/* Sidebar */}
            <div
                className={`fixed md:relative z-10 w-64 bg-white p-5 shadow-md transform ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 transition-transform duration-300 ease-in-out`}
            >
                <h2 className="text-2xl font-bold text-blue-600 mb-6">UnitradeHub</h2>
                <nav>
                    {menuItems.map((item) => (
                        <div
                            key={item.name}
                            onClick={() => {
                                setActiveTab(item.name);
                                setSidebarOpen(false);
                            }}
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer mb-2 text-gray-700 hover:bg-blue-100 transition ${activeTab === item.name ? "bg-blue-200 text-blue-700" : ""}`}
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
            <div className="flex-1 p-6 md:ml-64">
                <button
                    className="md:hidden p-3 text-gray-600"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <FaBars size={24} />
                </button>
                <h1 className="text-3xl font-semibold mb-4">{activeTab}</h1>
                <div className="bg-white p-5 shadow-md rounded-lg">{renderContent()}</div>
            </div>

            {/* Right Section (User Details) */}
            <div className="md:block w-80 space-y-4 p-5 shadow-md flex flex-col">
                <div className="bg-gray-400 rounded-lg p-4 text-center">
                    <img src={user?.profilepic} className="object-cover h-20 w-20 rounded-full mb-2" alt="Profile" />
                    <h2 className="text-2xl font-bold">{user?.username || "Guest"}</h2>
                    <p className="text-lg">Email: {user?.email || "N/A"}</p>
                    <p className="text-lg">Phone: {user?.phoneNumber || "N/A"}</p>
                </div>

                {/* Cards Section */}
                <div className="mt-5 space-x-2 flex flex-row justify-around items-center mb-4">
                    <div className="border-0 p-1 rounded-lg shadow-md flex flex-col items-center">
                        <p className="text-black font-bold">{user?.postsCreated || 0}</p>
                        <h3 className="text-sm font-semibold text-blue-800">Posts</h3>
                    </div>
                    <div className="rounded-lg shadow-md flex flex-col items-center p-1">
                        <p className="text-black font-bold">{details?.user?.bookmarkedItems || 0}</p>
                        <h3 className="text-sm font-semibold text-green-800">Bookmarked</h3>
                    </div>
                    <div className="rounded-lg shadow-md flex flex-col items-center p-1">
                        <p className="text-black font-bold">{details?.user?.likedPhotos || 0}</p>
                        <h3 className="text-sm font-semibold text-yellow-800">Liked Photos</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
