import { useEffect, useState } from "react";
import { FaRegBookmark, FaPlus, FaSignOutAlt, FaBars } from "react-icons/fa";
import { MdDashboard, MdList } from "react-icons/md";
import Logout from "./Logout";
import axios from 'axios'
const Dashboard = ({ logout }) => {
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
            error("Failed to fetch profile details");
        }
    };

    // useEffect should be outside of fetchDetails
    useEffect(() => {
        fetchDetails();
    }, []);

    return (
        <div className="flex h-screen ">
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
            <div className=" md:block w-80 space-y-4 p-5 shadow-md flex flex-col">
                {/* User Profile Section */}
                <div className="bg-gray-400 rounded-lg">
                <div className="flex flex-col items-center">
                    <img src={details?.user?.profilepic} className="object-cover h-20 w-20 rounded-full mb-2 mt-4" alt="Profile" />
                    <h2 className="text-2xl font-bold">{details?.user?.username || "Guest"}</h2>
                    <p className="text-lg">Email: {details?.user?.email || "N/A"}</p>
                    <p className="text-lg">Phone: {details?.user?.phoneNumber || "N/A"}</p>
                </div>

                {/* Cards Section */}
                <div className="mt-5 space-x-2 flex flex-row justify-around items-center mb-4">
                    {/* Posts Created Card */}
                    <div className="border-0 p-1 rounded-lg shadow-md flex flex-col items-center justify-center ">
                        <p className="text-black font-bold ">{details?.user?.postsCreated || 0} </p>
                        <h3 className="text-sm font-semibold text-blue-800">Posts </h3>
                    </div>

                    {/* Items Bookmarked Card */}
                        <div className="  rounded-lg shadow-md flex flex-col text-bold items-center justify-center p-1">
                            <p className="text-black font-bold">{details?.user?.bookmarkedItems || 0} </p>
                        <h3 className="text-sm font-semibold text-green-800 "> Bookmarked</h3>
                    </div>

                    {/* Liked Photos Card */}
                    <div className="rounded-lg shadow-md flex flex-col items-center justify-center p-1">
                            <p className="text-black font-bold text-lg">{details?.user?.likedPhotos || 0} </p>
                        <h3 className="text-sm font-semibold text-yellow-800">Liked Photos</h3>
                    </div>

                </div>

                {/* Trending Section */}
                </div>
                <div className="bg-gray-400 rounded-lg">
                    <h3 className="text-lg font-semibold mt-6 mb-2 flex justify-center">Trending</h3>
                    <ul className="text-gray-700">
                        <div className="flex flex-row justify-between p-2">
                            <img src={details?.user?.profilepic} className="object-cover h-10 w-10 rounded-full cursor-pointer" alt="Profile" />
                            <li className="mb-1 font-semibold text-blue-600 px-2 cursor-pointer">Electronics - 17</li></div>
                        <div className="flex flex-row justify-between p-2">
                            <img src={details?.user?.profilepic} className="object-cover h-10 w-10 rounded-full cursor-pointer" alt="Profile" />
                            <li className="mb-1 font-semibold text-blue-600 px-2 cursor-pointer">Electronics - 17</li></div>
                        <div className="flex flex-row justify-between p-2">
                            <img src={details?.user?.profilepic} className="object-cover h-10 w-10 rounded-full cursor-pointer" alt="Profile" />
                            <li className="mb-1 font-semibold text-blue-600 px-2 cursor-pointer">Electronics - 17</li></div>
                    </ul>
                    <p className="flex justify-centre">See more </p>
                    </div>
            </div>

           
        </div>
    );
};

export default Dashboard;
