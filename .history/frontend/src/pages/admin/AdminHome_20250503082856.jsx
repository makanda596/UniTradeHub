import React, { useState, useEffect } from 'react';
import Orders from '../components/Orders';
import Settings from '../components/Settings';
import AdminFlash from '../components/AdminFlash';
import PostFlash from '../components/PostFlash';
import PostProduct from '../components/PostProduct';
import AdminProducts from '../components/AdminProducts';
import { FiMenu, FiX, FiBell, FiUser } from 'react-icons/fi';
import LoadSpinner from '../components/LoadSpinner';
import Enquiries from '../components/Enquiries';
import { useAuthStore } from '../utilis/auth';

const TABS = [
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'post', label: 'Create Post', icon: '✍️' },
    { id: 'postflash', label: 'Post Flash', icon: '⚡' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'flash', label: 'Flash Sales', icon: '⚡' },
    { id: 'enquiries', label: 'Enquiries', icon: '📬' },
    { id: 'products', label: 'AdminProduct', icon: '🛍️' },
];

const AdminHome = () => {
    const { profile, admin } = useAuthStore();
    const [activeTab, setActiveTab] = useState(() => {
        const savedTab = localStorage.getItem('activeTab');
        return savedTab || 'orders';
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchDetails = async () => {
        await profile();  // Fetch admin details (assuming this updates the admin state)
    };

    useEffect(() => {
        if (!admin) {
            fetchDetails();
        }
        localStorage.setItem('activeTab', activeTab);
    }, [activeTab, admin]);

    const renderContent = () => {
        if (isLoading) return <LoadSpinner />;

        switch (activeTab) {
            case 'orders':
                return <Orders search={searchQuery} />;
            case 'post':
                return <PostProduct />;
            case 'postflash':
                return <PostFlash />;
            case 'settings':
                return <Settings />;
            case 'flash':
                return <AdminFlash />;
            case 'enquiries':
                return <Enquiries />;
            case 'products':
                return <AdminProducts search={searchQuery} />;
            default:
                return <div className="text-gray-500">Select a tab to view content</div>;
        }
    };

    const handleTabChange = (tabId) => {
        setIsLoading(true);
        setActiveTab(tabId);
        setIsMobileMenuOpen(false);  // Close the mobile menu after selecting a tab
        setTimeout(() => setIsLoading(false), 300); // Simulate loading
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-gray-600 hover:text-purple-600"
                >
                    {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
                <div className="flex items-center space-x-4">
                    <FiBell className="text-gray-600" size={20} />
                    <FiUser className="text-gray-600" size={20} />
                </div>
            </header>

            <div className="flex flex-col lg:flex-row">
                {/* Sidebar */}
                <aside className={`lg:w-64 bg-white shadow-lg transform lg:transform-none fixed lg:relative inset-0 z-50 transition-transform duration-300 ease-in-out 
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
                >
                    <div className="p-6 border-b border-gray-100">
                        <h1 className="text-xl font-bold text-purple-600">Admin Dashboard</h1>
                    </div>

                    <nav className="p-4 space-y-1">
                        {TABS.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all
                  ${activeTab === tab.id
                                        ? 'bg-purple-50 text-purple-600 font-semibold'
                                        : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <span className="text-lg">{tab.icon}</span>
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-2 lg:p-8">
                    {/* Desktop Header */}
                    <div className="hidden lg:flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-6">
                            <button className="relative text-gray-600 hover:text-purple-600">
                                <FiBell size={20} />
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                    <FiUser className="text-purple-600" />
                                </div>
                                <span className="text-gray-700">{admin?.username || 'Admin User'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminHome;
