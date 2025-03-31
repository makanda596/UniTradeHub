// ... (previous imports remain the same)

const ChatPage = ({ user = {} }) => {  // Add default value for user prop
    // ... (previous code remains the same until the Conversation component usage)

    return (
        <div className="flex h-screen">
            {/* ... (previous sidebar code remains the same) */}

            {/* Chat Section (Main Content) */}
            <div className="flex-1 flex flex-col">
                {selectedUser ? (
                    <>
                        {/* ... (chat header remains the same) */}

                        {user && user._id ? (
                            <Conversation
                                conversations={conversations}
                                user={user}
                                userinfo={users.find(u => u._id === selectedUser) || {}}
                            />
                        ) : (
                            <div className="flex-1 flex items-center justify-center bg-gray-50">
                                <p className="text-gray-500">User information not available</p>
                            </div>
                        )}

                        {/* ... (message input remains the same) */}
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-gray-50">
                        <p className="text-gray-500">Select a user to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;