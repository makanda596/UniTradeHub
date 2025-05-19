import React, { useEffect, useState } from 'react';
import {
  Home, Users, Settings, AlertCircle,Box, FileText, ShoppingCart,
} from 'lucide-react';
import {
  LineChart, Line,
  BarChart, Bar,
  PieChart, Pie, Cell,
  AreaChart, Area,
  ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
} from 'recharts';

import Setting from '../../components/admin/Setting'
import User from '../../components/admin/User'
import { AdminAuthStore } from '../../utilis/admin';
import Products from '../../components/admin/Products';
import Reports from '../../components/admin/Reports';
import Alert from '../../components/Alert';

// Sidebar tabs
const tabs = [
  { name: 'Dashboard', icon: <Home size={20} /> },
  { name: 'Users', icon: <Users size={20} /> },
  { name: 'Products', icon: <Box size={20} /> },
  { name: 'Reports', icon: <FileText size={20} /> },
  { name: 'Settings', icon: <Settings size={20} /> },
  { name: 'Alert', icon: <AlertCircle size={20} /> },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1'];

const AdminHome = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const {
    countUsers, countPosts, categoryCounts,
    topUser, topUserFollowers, otherUsers,
    getTopUserWithFollowers, fetchCategoryCounts,
    allReports, countReports, allReportedPosts, countAccount, allAccounts,
    ReportedPosts, allPosts, allUsers,
  } = AdminAuthStore();

  // Static fallback analytics
  const analyticsData = [
    { name: 'Jan', users: 400, posts: 150, reportedPosts: 10, reportedAccounts: 5 },
    { name: 'Feb', users: 300, posts: 120, reportedPosts: 8, reportedAccounts: 6 },
    { name: 'Mar', users: 200, posts: 130, reportedPosts: 12, reportedAccounts: 7 },
    { name: 'Apr', users: 278, posts: 140, reportedPosts: 14, reportedAccounts: 9 },
    { name: 'May', users: 189, posts: 110, reportedPosts: 6, reportedAccounts: 4 },
  ];

  // Overview stats
  const data = [
    { name: 'Total Users', value: countUsers || 0, color: 'blue' },
    { name: 'Total Posts', value: countPosts || 0, color: 'green' },
    { name: 'Active Users', value: 6 || 0, color: 'orange' },
    { name: 'Reported Posts', value: ReportedPosts || 0, color: 'purple' },
    { name: 'Reported Accounts', value: countReports || 0, color: 'red' },
    { name: 'suspended Accounts', value: countAccount|| 0, color: 'red' },
  ];

  const topSellersData = [
    ...(topUser && Array.isArray(topUser.followers)
      ? [{ name: topUser.username, followers: topUser.followers.length }]
      : []),

    ...otherUsers.map((user) => ({
      name: user.username,
      followers: user.followersCount,
    })),
  ];

  const pieData = categoryCounts.map(item => ({
    name: item.category,
    value: item.count,
  }));

  // Initial data fetch
  useEffect(() => {
    allUsers();
    allPosts();
    allAccounts();
    allReports();
    allReportedPosts();
    fetchCategoryCounts();
    getTopUserWithFollowers();
  }, []);

  // Render main dashboard
  const renderDashboard = () => (
    <div className="space-y-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-6 gap-2 ">
        <Card title="Total Users"  value={countUsers || 'N/A'} color="blue" />
        <Card title="Total Posts" value={countPosts || 'N/A'} color="green" />
        <Card title="Active Users" value="6" color="yellow" />
        <Card title="Reported Posts" value={ReportedPosts || 'N/A'} color="purple" />
        <Card title="Reported Accounts" value={countReports || 'N/A'} color="red" />
        <Card title="Suspended Accounts" value={countAccount || 'N/A'} color="darkred" />
      </div>

      {/* Line and Bar Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* <ChartCard title="User Growth (Line)">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard> */}

        <ChartCard title="Data Overview (Bar)">
          <ResponsiveContainer width="80%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Product Categories (Pie)">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={100} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Pie and Area Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
        {/* <ChartCard title="Revenue Trend (Area)">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="users" stroke="#6366f1" fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard> */}
      </div>

      {/* Additional insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Most Active Hours">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { hour: '8 AM', count: 30 },
              { hour: '10 AM', count: 45 },
              { hour: '12 PM', count: 60 },
              { hour: '2 PM', count: 70 },
              { hour: '4 PM', count: 55 },
              { hour: '6 PM', count: 80 },
              { hour: '8 PM', count: 40 },
            ]}>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top Followed Sellers">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart layout="vertical" data={topSellersData}>
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Bar dataKey="followers" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Platform Engagement Trends">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsData}>
              <defs>
                <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="posts" stroke="#f59e0b" fill="url(#engagementGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Review Sentiment Analysis">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { month: 'Jan', positive: 80, negative: 20 },
              { month: 'Feb', positive: 70, negative: 30 },
              { month: 'Mar', positive: 90, negative: 10 },
              { month: 'Apr', positive: 60, negative: 40 },
            ]}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="positive" stackId="a" fill="#10b981" />
              <Bar dataKey="negative" stackId="a" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Pending vs Completed Transactions">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { month: 'Jan', pending: 40, completed: 160 },
              { month: 'Feb', pending: 30, completed: 170 },
              { month: 'Mar', pending: 50, completed: 150 },
              { month: 'Apr', pending: 20, completed: 180 },
            ]}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="pending" fill="#f59e0b" />
              <Bar dataKey="completed" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );

  // Handle tab switching
  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return renderDashboard();
      case 'Users':
        return <User />;
      case 'Products':
        return <Products />;
  
      case 'Reports':
        return <Reports />;
      case 'Settings':
        return <Setting />;
      case 'Alert':
        return <Alert />;
      default:
        return <div className="text-xl">Unknown Tab: {activeTab}</div>;
    } 
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-center">Unitrade Admin</h2>
        <nav className="flex flex-col space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center px-4 py-2 rounded-lg transition font-medium
                ${activeTab === tab.name
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-blue-100'}`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-y-auto">
        <h1 className="text-xl font-semibold mb-2">{activeTab}</h1>
        {renderContent()}
      </main>
    </div>
  );
};

// Card component
const Card = ({ title, value, color }) => {
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
    darkred:'bg-red-800'
  };
  return (
    <div className={`${colors[color]} text-white p-4 rounded-xl shadow`}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-2xl mt-2 font-bold">{value}</p>
    </div>
  );
};

// Wrapper for charts
const ChartCard = ({ title, children }) => (
  <div className="bg-white p-5 rounded-xl shadow-md">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

export default AdminHome;
