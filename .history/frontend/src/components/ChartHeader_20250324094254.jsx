const ChatHeader = ({ userinfo }) => {
    return (
        <div className="flex items-center gap-4 p-4 bg-gray-100 shadow-md rounded-md">
            <img
                src={userinfo.profilepic}
                alt="User Profile"
                className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
            />
            <p className="text-lg font-semibold text-gray-800">{userinfo.username}</p>
        </div>
    );
};

export default ChatHeader;
