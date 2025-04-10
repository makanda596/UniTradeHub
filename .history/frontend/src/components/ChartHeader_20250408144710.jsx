import { useState } from "react";
import Report from "./Report";

const ChatHeader = ({ userinfo }) => {
    const [popUp, setPopUp] = useState(false);

    return (
        <div className="flex  gap-2 w-full p-2  shadow-md rounded-md justify-between">
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
                onClick={()=>setPopUp(true)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
                Report
            </button>

            <Report popUp={popUp} setPopUp={setPopUp} />
            
        </div>
    );
};

export default ChatHeader;
