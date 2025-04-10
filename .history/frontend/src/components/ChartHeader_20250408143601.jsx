import { useState } from "react";

const ChatHeader = ({ userinfo }) => {

    const [popUp, setPopUp] = useState(false)

    const OpenFunction = () => {
        setPopUp(true)
    }
    return (
        <div className="flex items-center gap-2 w-ful p-2  shadow-md rounded-md justify-between">
            
            <div className="flex items-centre"><img
                src={userinfo?.profilepic}
                alt="User Profile"
                className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
            />
            <p className="text-lg font-semibold text-gray-800">{userinfo?.username}</p>
            </div>
            <button onClick={OpenFunction}>report</button>
            {popUp && <div className='fixed bg-red-300 ml-10 flex-centre'>helo report him </div>}
        </div>
    );
};

export default ChatHeader;
