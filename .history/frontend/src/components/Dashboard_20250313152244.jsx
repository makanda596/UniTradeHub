import { useEffect, useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { FaRegBookmark, FaPlus, FaSignOutAlt, FaBars } from "react-icons/fa";
import { MdDashboard, MdList } from "react-icons/md";
import axios from "axios";

const DashboardHome = ({ posts }) => (
    <div>
        <h2 className="text-2xl font-bold mb-4">All Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-white shadow-md rounded-lg overflow-hidden"
                    >
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-semibold text-lg">{post.title}</h3>
                            <p className="text-sm text-gray-600">{post.description}</p>
                            <button className="mt-2 text-blue-600">View Details</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    </div>
);

const Dashboard = ({ logout, user }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [posts, setPosts] = useState([]);

    const menuItems = [
        { name: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
        { name: "Create Listing", path: "/create-listing", icon: <FaPlus /> },
        { name: "My Listings", path: "/my-listings", icon: <MdList /> },
        { name: "Saved Listings", path: "/saved-listings", icon: <FaRegBookmark /> },
    ];

    // Fetch Posts (API or Dummy Data)
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/posts");
                setPosts(response.data);
            } catch (error) {
                console.error("Failed to fetch posts. Using dummy data.");
                setPosts([
                    {
                        id: 1,
                        title: "Gaming Laptop for Sale",
                        description: "High-performance laptop, barely used.",
                        image: "https://via.placeholder.com/300",
                    },
                    {
                        id: 2,
                        title: "Brand New Smartphone",
                        description: "Latest model, sealed in box.",
                        image: "https://via.placeholder.com/300",
                    },
                ]);
            }
        };

        fetchPosts();
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

            {/* Main Content (Posts) */}
            <div className="flex-1 p-6 overflow-y-auto">
                <button
                    className="md:hidden p-3 text-gray-600 fixed top-4 left-4 z-30 bg-white shadow-md rounded-full"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <FaBars size={24} />
                </button>

                <Routes>
                    <Route path="/" element={<DashboardHome posts={posts} />} />
                    <Route path="/dashboard" element={<DashboardHome posts={posts} />} />
                </Routes>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-80 p-5 shadow-md bg-white space-y-4">
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
            </div>
        </div>
    );
};

export default Dashboard;
