import { useEffect, useState } from "react";
import { FaRegBookmark, FaPlus, FaSignOutAlt, FaBars } from "react-icons/fa";
import { MdDashboard, MdList } from "react-icons/md";
import Logout from "./Logout";
import axios from 'axios'

const Dashboard = ({logout}) => {
    const [activeTab, setActiveTab] = useState("Dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [details, setDetails] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get("https://gessamubackend.onrender.com/auth/profile", {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                });
                setDetails(response.data);
            } catch (err) {
                setError("Failed to fetch profile details");
            } 
        fetchDetails();
    }, []);
    const menuItems = [
        { name: "Dashboard", icon: <MdDashboard /> },
        { name: "Create Listing", icon: <FaPlus /> },
        { name: "My Listings", icon: <MdList /> },
        { name: "Saved Listings", icon: <FaRegBookmark /> },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`fixed md:relative z-10 w-64 bg-white p-5 shadow-md transform ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
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
                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-3 text-gray-600"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <FaBars size={24} />
                </button>
                <h1 className="text-3xl font-semibold mb-4">{activeTab}</h1>
                <div className="bg-white p-5 shadow-md rounded-lg">
                    <p className="text-gray-600">This section will display {activeTab} content.</p>
                </div>
            </div>

            {/* Right Section */}
            
            <div className="hidden md:block w-80 bg-white p-5 shadow-md">
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-blue-300 rounded-full mb-3"></div>
                    <h2 className="text-2xl font-bold">{details?.user?.username} </h2>
                    <p className="text-lg">Email: {details?.user?.email || "N/A"}</p>
                    <p className="text-lg">Phone: {details?.user?.phoneNumber || "N/A"}</p>
                    </div>
                        <hr className="my-4" />
                        <h3 className="text-lg font-semibold mb-2">Trending</h3>
                        <ul className="text-gray-700">
                            <li className="mb-1">Electronics - 17</li>
                            <li className="mb-1">Clothing - 10</li>
                            <li className="mb-1">Books - 9</li>
                            <li className="mb-1">Furniture - 8</li>
                        </ul>
                    </div>
        </div>
    );
};

export default Dashboard;
