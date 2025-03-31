import React, { useState } from 'react';

const ChatPage = () => {
    // Hardcoded user data
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
    ];

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
    };

    const [selectedUser, setSelectedUser] = useState(users[0].id);
    const [newMessage, setNewMessage] = useState('');

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

    return (
        <div className="flex h-screen">
            {/* Users Section (Left Sidebar) */}
            <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Chats</h2>
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
                                    <p className="text-sm text-gray-500 truncate w-40">
                                        {userConversations[user.id][userConversations[user.id].length - 1].text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Section (Main Content) */}
            <div className="flex-1 flex flex-col">
                {/* Chat header */}
                <div className="bg-white p-4 border-b flex items-center">
                    <img
                        src={users.find(u => u.id === selectedUser).avatar}
                        alt="User"
                        className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                        <h2 className="font-bold">
                            {users.find(u => u.id === selectedUser).name}
                        </h2>
                        <p className="text-xs text-gray-500">Online</p>
                    </div>
                </div>

                {/* Messages area */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                    <div className="space-y-4">
                        {userConversations[selectedUser].map((message) => (
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