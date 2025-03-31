import React, { useState } from 'react';

const ChartPage = () => {
    // Hardcoded user data
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
    ];

    // Hardcoded chart data for each user
    const userCharts = {
        1: [
            { month: 'Jan', sales: 4000 },
            { month: 'Feb', sales: 3000 },
            { month: 'Mar', sales: 5000 },
            { month: 'Apr', sales: 2780 },
        ],
        2: [
            { month: 'Jan', sales: 2400 },
            { month: 'Feb', sales: 1398 },
            { month: 'Mar', sales: 9800 },
            { month: 'Apr', sales: 3908 },
        ],
        3: [
            { month: 'Jan', sales: 8000 },
            { month: 'Feb', sales: 4567 },
            { month: 'Mar', sales: 2345 },
            { month: 'Apr', sales: 6789 },
        ],
        4: [
            { month: 'Jan', sales: 1000 },
            { month: 'Feb', sales: 2000 },
            { month: 'Mar', sales: 3000 },
            { month: 'Apr', sales: 4000 },
        ],
    };

    const [selectedUser, setSelectedUser] = useState(users[0].id);

    // Simple bar chart component
    const BarChart = ({ data }) => {
        const maxValue = Math.max(...data.map(item => item.sales));

        return (
            <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Monthly Sales</h3>
                <div className="flex items-end h-40 gap-2 border-b-2 border-l-2 border-gray-300 p-2">
                    {data.map((item, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                            <div
                                className="bg-blue-500 w-full rounded-t hover:bg-blue-600 transition"
                                style={{ height: `${(item.sales / maxValue) * 100}%` }}
                            ></div>
                            <span className="text-xs mt-1">{item.month}</span>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-2 text-sm">
                    <span>0</span>
                    <span>{maxValue}</span>
                </div>
            </div>
        );
    };

    return (
        <div className="flex h-screen">
            {/* Users Section (Left Sidebar) */}
            <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Users</h2>
                <div className="space-y-3">
                    {users.map(user => (
                        <div
                            key={user.id}
                            onClick={() => setSelectedUser(user.id)}
                            className={`p-3 rounded-lg cursor-pointer transition ${selectedUser === user.id ? 'bg-blue-100 border-l-4 border-blue-500' : 'bg-white hover:bg-gray-50'}`}
                        >
                            <div className="flex items-center">
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-10 h-10 rounded-full mr-3"
                                />
                                <div>
                                    <p className="font-medium">{user.name}</p>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chart Section (Main Content) */}
            <div className="flex-1 p-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center mb-6">
                        <img
                            src={users.find(u => u.id === selectedUser).avatar}
                            alt="User"
                            className="w-16 h-16 rounded-full mr-4"
                        />
                        <div>
                            <h2 className="text-2xl font-bold">
                                {users.find(u => u.id === selectedUser).name}
                            </h2>
                            <p className="text-gray-500">
                                {users.find(u => u.id === selectedUser).email}
                            </p>
                        </div>
                    </div>

                    {/* Display the chart for selected user */}
                    <BarChart data={userCharts[selectedUser]} />

                    {/* Additional stats */}
                    <div className="grid grid-cols-3 gap-4 mt-8">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <p className="text-sm text-blue-600">Total Sales</p>
                            <p className="text-2xl font-bold">
                                {userCharts[selectedUser].reduce((sum, item) => sum + item.sales, 0)}
                            </p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-sm text-green-600">Average</p>
                            <p className="text-2xl font-bold">
                                {Math.round(userCharts[selectedUser].reduce((sum, item) => sum + item.sales, 0) / userCharts[selectedUser].length)}
                            </p>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg">
                            <p className="text-sm text-yellow-600">Best Month</p>
                            <p className="text-2xl font-bold">
                                {userCharts[selectedUser].reduce((max, item) => item.sales > max.sales ? item : max).month}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartPage;