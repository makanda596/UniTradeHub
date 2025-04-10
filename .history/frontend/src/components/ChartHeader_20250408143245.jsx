import { useState } from "react";

const ChatHeader = ({ userinfo }) => {

    const [popUp, setPopUp] = useState(false)

    const OpenFunction = () => {
        setPopUp(true)
    }
    return (
        <div className="flex items-center gap-2 w-20 p-2 bg-black shadow-md rounded-md">
            <img
                src={userinfo?.profilepic}
                alt="User Profile"
                className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
            />
            <p className="text-lg font-semibold text-gray-800">{userinfo?.username}</p>
            <button onClick={OpenFunction}>report</button>
            {popUp && <div className='fixed bg-red-300 ml-10'>helo report him </div>}
        </div>
    );
};

export default ChatHeader;
