import React, { useEffect, useRef } from "react";
import { formatMessageTime } from "../utilis/time";

const Conversation = ({ user, conversations, userinfo }) => {
  const conversationEndRef = useRef(null);

  useEffect(() => {
    if (conversationEndRef.current && conversations) {
      conversationEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversations]);

  return (
    <div className="h-[400px] overflow-y-auto p-4 bg-gray-100 rounded-lg shadow-md">
      {conversations.map((conversation, index) => (
        <div
          key={index}
          ref={conversationEndRef}
          className={`flex items-start mb-3 ${
            conversation.senderId === user._id ? "justify-end" : "justify-start"
          }`}
        >
          {conversation.senderId !== user._id && (
            <img
              src={userinfo.profilepic}
              alt="User Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
          )}
          <div
            className={`p-3 rounded-lg max-w-xs text-sm shadow-md ${
              conversation.senderId === user._id
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
            <div className="text-xs text-gray-500 mt-1">
              {formatMessageTime(conversation.createdAt)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Conversation;
