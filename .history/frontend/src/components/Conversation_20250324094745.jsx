import React from 'react'

const Conversation = ({ user, conversations }) => {
  return (

    <div> 
         <div className="h-60 overflow-y-auto space-y-3 p-2">
                    {conversations.map((conversation, index) => (
                        <div
                            key={index}
                            ref={conversationEndRef}
                            className={`flex ${conversation.senderId === user._id ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`${conversation.senderId === user._id
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-700"
                                    } p-3 rounded-lg max-w-xs`}
                            
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
                            </div>
                            <div className="chat-header mb-1">
                                <>{userinfo.username}</>
                                <time className="text-xs opacity-50 ml-1">
                                    {formatMessageTime(conversation.createdAt)}
                                </time>
                            </div>
                        </div>
                    ))}
                </div>
    
               
               </div>
  )
}

export default Conversation