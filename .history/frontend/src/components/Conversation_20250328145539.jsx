import React, { useEffect, useRef } from "react";
import { formatMessageTime } from "../utilis/time";

const Conversation = ({ user = {}, conversations = [], userinfo = {} }) => {
    const conversationEndRef = useRef(null);

    useEffect(() => {
        conversationEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    }, [conversations]);

    if (!user?._id) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg">
                <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-800">Authentication Required</h3>
                    <p className="mt-2 text-gray-600">Please login to view your conversations</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-white to-gray-50">
            {conversations.length > 0 ? (
                <div className="space-y-3">
                    {conversations.map((message, index) => {
                        if (!message || !message.senderId) return null;

                        const isCurrentUser = message.senderId === user._id;
                        const isPreviousSameSender = index > 0 && conversations[index - 1]?.senderId === message.senderId;

                        return (
                            <div
                                key={index}
                                className={`flex items-start ${isCurrentUser ? "justify-end" : "justify-start"} ${isPreviousSameSender ? "mt-1" : "mt-3"}`}
                            >
                                {!isCurrentUser && (
                                    <div className={`flex-shrink-0 ${isPreviousSameSender ? "invisible" : ""}`}>
                                        <img
                                            src={userinfo?.profilepic || 'https://ui-avatars.com/api/?background=random&name=' + encodeURIComponent(userinfo?.username || '')}
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                    </div>
                                )}

                                <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"} mx-2 max-w-[80%]`}>
                                    {!isPreviousSameSender && !isCurrentUser && (
                                        <span className="text-xs font-medium text-gray-500 mb-1">
                                            {userinfo?.username || 'Unknown'}
                                        </span>
                                    )}

                                    <div
                                        className={`p-3 rounded-2xl text-sm shadow-sm transition-all duration-150 ${isCurrentUser
                                            ? "bg-indigo-600 text-white rounded-br-none"
                                            : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                                            }`}
                                    >
                                        {message.image && (
                                            <div className="mb-2 overflow-hidden rounded-lg">
                                                <img
                                                    src={message.image}
                                                    alt="Message content"
                                                    className="max-w-full max-h-64 object-contain rounded-lg"
                                                />
                                            </div>
                                        )}
                                        <p className="whitespace-pre-wrap break-words">{message.message}</p>
                                        <div className={`text-xs mt-1 flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                                            <span className={`px-1 ${isCurrentUser ? 'text-indigo-200' : 'text-gray-400'}`}>
                                                {message.createdAt ? formatMessageTime(message.createdAt) : ''}
                                            </span>
                                            {isCurrentUser && (
                                                <span className="ml-1">
                                                    {message.seen ? (
                                                        <svg className="w-3 h-3 text-indigo-300" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 12.586l7.293-7.293a1 1 0 011.414 1.414l-8 8z" />
                                                        </svg>
                                                    ) : (
                                                        <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 12.586l7.293-7.293a1 1 0 011.414 1.414l-8 8z" />
                                                        </svg>
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-500">No messages yet</h3>
                    <p className="mt-1 text-gray-400">Start the conversation by sending a message</p>
                </div>
            )}
            <div ref={conversationEndRef} className="h-4" />
        </div>
    );
};

export default Conversation;