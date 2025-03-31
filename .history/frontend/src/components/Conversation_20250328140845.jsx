import React, { useEffect, useRef } from "react";
import { formatMessageTime } from "../utilis/time";

const Conversation = ({ user = {}, conversations = [], userinfo = {} }) => {
    const conversationEndRef = useRef(null);

    useEffect(() => {
        if (conversationEndRef.current) {
            conversationEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [conversations]);

    // If user is not properly defined, show an error message
    if (!user || !user._id) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
                <p className="text-red-500">User information not available</p>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {conversations.length > 0 ? (
                conversations.map((message, index) => {
                    // Skip rendering if message is invalid
                    if (!message || !message.senderId) return null;
                    
                    return (
                        <div
                            key={index}
                            className={`flex items-start mb-3 ${message.senderId === user._id ? "justify-end" : "justify-start"}`}
                        >
                            {message.senderId !== user._id && (
                                <img
                                    src={userinfo?.profilepic || 'https://via.placeholder.com/40'}
                                    alt="User Avatar"
                                    className="w-8 h-8 rounded-full mr-2"
                                />
                            )}
                            <div
                                className={`p-3 rounded-lg max-w-xs text-sm shadow-md ${
                                    message.senderId === user._id
                                        ? "bg-blue-500 text-white"
                                        : "bg-white text-gray-800 border border-gray-300"
                                }`}
                            >
                                {message.message}
                                {message.image && (
                                    <img
                                        src={message.image}
                                        alt="Message"
                                        className="mt-2 rounded-lg max-w-full h-auto"
                                    />
                                )}
                                <div className={`text-xs mt-1 ${
                                    message.senderId === user._id 
                                        ? 'text-blue-100' 
                                        : 'text-gray-500'
                                }`}>
                                    {message.createdAt ? formatMessageTime(message.createdAt) : ''}
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">No messages yet</p>
                </div>
            )}
            <div ref={conversationEndRef} />
        </div>
    );
};

export default Conversation;