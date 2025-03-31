import React, { useEffect, useRef } from "react";
import { formatMessageTime } from "../utilis/time";

const Conversation = ({ user, conversations = [], userinfo = {} }) => {
    const conversationEndRef = useRef(null);

    useEffect(() => {
        if (conversationEndRef.current) {
            conversationEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [conversations]);

    return (
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {conversations.length > 0 ? (
                conversations.map((conversation, index) => (
                    <div
                        key={index}
                        className={`flex items-start mb-3 ${conversation.senderId === user._id ? "justify-end" : "justify-start"}`}
                    >
                        {conversation.senderId !== user._id && (
                            <img
                                src={userinfo?.profilepic || 'https://via.placeholder.com/40'}
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full mr-2"
                            />
                        )}
                        <div
                            className={`p-3 rounded-lg max-w-xs text-sm shadow-md ${conversation.senderId === user._id
                                    ? "bg-blue-500 text-white"
                                    : "bg-white text-gray-800 border border-gray-300"
                                }`}
                        >
                            {conversation.message}
                            {conversation.image && (
                                <img
                                    src={conversation.image}
                                    alt="Message"
                                    className="mt-2 rounded-lg"
                                    style={{ maxWidth: "100%" }}
                                />
                            )}
                            <div className="text-xs mt-1">
                                {formatMessageTime(conversation.createdAt)}
                            </div>
                        </div>
                    </div>
                ))
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