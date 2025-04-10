import { useState } from "react";

const ChatHeader = ({ userinfo }) => {
    const [popUp, setPopUp] = useState(false);

    const OpenFunction = () => {
        setPopUp(true);
    };

    return (
        <div className="flex items-center gap-2 w-full p-2 bg-black shadow-md rounded-md justify-between">
            <div className="flex items-center gap-2">
                <img
                    src={userinfo?.profilepic}
                    alt="User Profile"
                    className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
                />
                <p className="text-lg font-semibold text-gray-800">
                    {userinfo?.username}
                </p>
            </div>

            <button
                onClick={OpenFunction}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
                Report
            </button>

            {popUp && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                        <p className="text-lg font-semibold mb-4">Report this user?</p>
                        <button
                            onClick={() => setPopUp(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatHeader;
