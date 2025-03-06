import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Function to determine greeting based on time
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get("http://localhost:5000/auth/profile", {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                });
                setDetails(response.data);
            } catch (error) {
                setError("Failed to fetch profile details");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6 flex items-center justify-center">
            <div className="max-w-4xl w-full bg-white p-8 rounded-2xl shadow-lg">
                {/* Dynamic Greeting */}
                <h1 className="text-2xl font-bold text-center mb-6 text-indigo-700">
                    {getGreeting()}, Welcome to Gessamu Portal
                </h1>

                {loading ? (
                    <div className="flex justify-center">
                        <div className="w-16 h-16 border-4 border-t-red-600 border-b-green-600 border-l-white border-r-white rounded-full animate-spin"></div>
                    </div>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <>
                        {/* Profile Section */}
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl shadow-md mb-6 flex items-center space-x-6">
                            <img src={details?.user?.avatar} alt="Profile" className="w-20 h-20 rounded-full border-4 border-white" />
                            <div>
                                <h2 className="text-2xl font-bold">{details?.user?.firstName} {details?.user?.lastName}</h2>
                                <p className="text-lg">Admission No: {details?.user?.admNo || "N/A"}</p>
                                <p className="text-lg">Email: {details?.user?.email || "N/A"}</p>
                                <p className="text-lg">Year: {details?.user?.year || "N/A"}</p>
                                <p className="text-lg">Phone: {details?.user?.phoneNumber || "N/A"}</p>
                            </div>
                        </div>

                        {/* Dashboard Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { title: "Tasks Completed", count: 12, color: "from-green-400 to-green-200" },
                                { title: "Projects Submitted", count: 8, color: "from-blue-400 to-blue-200" },
                                { title: "Upcoming Deadlines", count: 3, color: "from-yellow-400 to-yellow-200" },
                                { title: "New Messages", count: 0, color: "from-red-400 to-red-200" },
                            ].map((stat, index) => (
                                <div key={index} className={`bg-gradient-to-tr ${stat.color} p-6 rounded-xl shadow-md text-center`}>
                                    <h3 className="text-xl font-semibold">{stat.title}</h3>
                                    <p className="text-3xl font-extrabold">{stat.count}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
