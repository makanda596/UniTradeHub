import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ChatPage = () => {
    const [users,setUsers]=useState())
    const[error,setError]= useState("")
    // Hardcoded user data
    // const users = [
    //     { id: 1, name: 'John Doe', email: 'john@example.com', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    //     { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    //     { id: 3, name: 'Mike Johnson', email: 'mike@example.com', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    //     { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
    //     { id: 5, name: 'David Brown', email: 'david@example.com', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
    //     { id: 6, name: 'Emily Davis', email: 'emily@example.com', avatar: 'https://randomuser.me/api/portraits/women/6.jpg' },
    // ];

    const fetchUsers = async ()=>{
        try {
            const response = await axios.get("http://localhost:5000/auth/getUsers")
            setUsers(response.data)
            console.log(response.data)
            setError("")
        } catch (error) {
            console.log(error.message)
            setError(error)
        }
    }
    useEffect(()=>{
        fetchUsers()
    },[])
    // Hardcoded conversation data for each user
    const userConversations = {
        1: [
            { id: 1, sender: 'me', text: 'Hi John, how are you doing?', time: '10:30 AM' },
            { id: 2, sender: 'them', text: "I'm good, thanks! How about you?", time: '10:32 AM' },
            { id: 3, sender: 'me', text: 'Pretty good! Just working on some projects.', time: '10:33 AM' },
            { id: 4, sender: 'them', text: 'That sounds interesting. What kind of projects?', time: '10:35 AM' },
        ],
        2: [
            { id: 1, sender: 'me', text: 'Hello Jane, are we still meeting tomorrow?', time: '9:15 AM' },
            { id: 2, sender: 'them', text: 'Yes, definitely! 2 PM at the coffee shop?', time: '9:20 AM' },
            { id: 3, sender: 'me', text: 'Perfect, see you then!', time: '9:21 AM' },
        ],
        3: [
            { id: 1, sender: 'them', text: 'Hey, did you get the documents I sent?', time: '3:45 PM' },
            { id: 2, sender: 'me', text: 'Not yet, when did you send them?', time: '3:50 PM' },
            { id: 3, sender: 'them', text: 'About an hour ago. I can resend if needed.', time: '3:51 PM' },
            { id: 4, sender: 'me', text: 'Please do, I might have missed them.', time: '3:52 PM' },
        ],
        4: [
            { id: 1, sender: 'them', text: 'Happy birthday! 🎉', time: '12:00 AM' },
            { id: 2, sender: 'me', text: 'Thank you so much! 😊', time: '8:30 AM' },
            { id: 3, sender: 'them', text: 'Any plans for celebration?', time: '8:35 AM' },
            { id: 4, sender: 'me', text: 'Just a quiet dinner with family.', time: '8:36 AM' },
            { id: 5, sender: 'them', text: 'Sounds lovely! Enjoy your day!', time: '8:40 AM' },
        ],
        5: [
            { id: 1, sender: 'me', text: 'David, about the project deadline...', time: '11:15 AM' },
            { id: 2, sender: 'them', text: 'Yes, we can extend it by a week if needed', time: '11:20 AM' },
        ],
        6: [
            { id: 1, sender: 'them', text: 'Emily here, just checking in!', time: '4:30 PM' },
            { id: 2, sender: 'me', text: 'Hi Emily! Everything is going well', time: '4:35 PM' },
        ],
    };

    const [selectedUser, setSelectedUser] = useState(users[0].id);
    const [newMessage, setNewMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        const newMsg = {
            id: userConversations[selectedUser].length + 1,
            sender: 'me',
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        userConversations[selectedUser].push(newMsg);
        setNewMessage('');
    };

    // Filter users based on search term
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                                            {userConversations[user.id][userConversations[user.id].length - 1].text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center p-4 text-gray-500">
                            No users found matching "{searchTerm}"
                        </div>
                    )}
                </div>
            </div>

            {/* Chat Section (Main Content) */}
            <div className="flex-1 flex flex-col">
                {/* Chat header */}
                <div className="bg-white p-4 border-b flex items-center">
                    <img
                        src={users.find(u => u.id === selectedUser)?.avatar}
                        alt="User"
                        className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                        <h2 className="font-bold">
                            {users.find(u => u.id === selectedUser)?.name}
                        </h2>
                        <p className="text-xs text-gray-500">Online</p>
                    </div>
                </div>

                {/* Messages area */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                    <div className="space-y-4">
                        {userConversations[selectedUser]?.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${message.sender === 'me' ? 'bg-blue-500 text-white' : 'bg-white border'}`}
                                >
                                    <p>{message.text}</p>
                                    <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
                                        {message.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Message input */}
                <div className="bg-white p-4 border-t">
                    <div className="flex">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;