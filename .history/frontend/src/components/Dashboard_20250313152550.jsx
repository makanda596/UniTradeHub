import React from "react";

const Dashboard = () => {
    return (
        <div className="flex h-screen bg-gray-100 p-6">
            {/* Main Content */}
            <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome to your dashboard. Here you can see the latest updates and analytics.</p>
                {/* Add more dashboard content here */}
            </div>

            {/* User Information */}
            <div className="w-1/4 bg-white p-6 ml-6 rounded-2xl shadow-lg">
                <h2 className="text-xl font-semibold">User Information</h2>
                <div className="mt-4">
                    <p className="text-gray-700"><strong>Name:</strong> John Doe</p>
                    <p className="text-gray-700 mt-2"><strong>Email:</strong> john.doe@example.com</p>
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Logout</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
