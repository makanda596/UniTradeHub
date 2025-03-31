import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ChatPage = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Hardcoded conversation data for each user
    const userConversations = {
        1: [
            { id: 1, sender: 'me', text: 'Hi John, how are you doing?', time: '10:30 AM' },
            { id: 2, sender: 'them', text: "I'm good, thanks! How about you?", time: '10:32 AM' },
            { id: 3, sender: 'me', text: 'Pretty good! Just working on some projects.', time: '10:33 AM' },
            { id: 4, sender: 'them', text: 'That sounds interesting. What kind of projects?', time: '10:35 AM' },
        ],
        // ... rest of the conversations
    };

    const [selectedUser, setSelectedUser] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:5000/auth/getUsers");
            const usersWithDefaults = response.data.map(user => ({
                ...user,
                name: user.name || 'Unknown User',
                email: user.email || 'no-email@example.com',
                avatar: user.avatar || 'https://via.placeholder.com/40'
            }));
            setUsers(usersWithDefaults);
            if (usersWithDefaults.length > 0) {
                setSelectedUser(usersWithDefaults[0].id);
            }
            setError(null);
        } catch (error) {
            console.error("Error fetching users:", error);
            setError(error.message || "Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSendMessage = () => {
        if (newMessage.trim() === '' || !selectedUser) return;

        const newMsg = {
            id: userConversations[selectedUser].length + 1,
            sender: 'me',
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        userConversations[selectedUser].push(newMsg);
        setNewMessage('');
    };

    // Filter users based on search term with null checks
    const filteredUsers = users.filter(user => {
        const name = user?.name?.toLowerCase() || '';
        const email = user?.email?.toLowerCase() || '';
        const search = searchTerm.toLowerCase();
        return name.includes(search) || email.includes(search);
    });

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading users...</div>;
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-red-500">Error: {error}</div>
                <button 
                    onClick={fetchUsers} 
                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="flex h-screen">
            {/* Users Section (Left Sidebar) */}
            <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto flex flex-col">
                <h2 className="text-xl font-bold mb-4">Chats</h2>

                {/* Search Bar */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 pl-8 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <svg
                        className="absolute left-2.5 top-3 h-4 w-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                {/* Users List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <div
                                key={user.id}
                                onClick={() => setSelectedUser(user.id)}
                                className={`p-3 rounded-lg cursor-pointer transition ${selectedUser === user.id ? 'bg-blue-100 border-l-4 border-blue-500' : 'bg-white hover:bg-gray-50'} mb-2`}
                            >
                                <div className="flex items-center">
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-10 h-10 rounded-full mr-3"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">{user.name}</p>
                                        <p className="text-sm text-gray-500 truncate">
                                            {userConversations[user.id]?.[userConversations[user.id]?.length - 1]?.text || 'No messages yet'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center p-4 text-gray-500">
                            {users.length === 0 ? 'No users available' : `No users found matching "${searchTerm}"`}
                        </div>
                    )}
                </div>
            </div>

            {/* Chat Section (Main Content) - remains the same as previous version */}
            {/* ... */}
        </div>
    );
};

export default ChatPage;