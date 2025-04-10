import React from "react";
import { FiUserPlus, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";

const UserFollowersPopUp = ({ userfollowers, loading, error }) => {
    console.log("hey", userfollowers)

    return (
        <div className="p-2 max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
                <FiUsers className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-800">Followers</h2>
            </div>

            {error && (
                <div className="p-2 mb-4 text-red-600 bg-red-50 rounded-lg flex items-center gap-2">
                    <FiAlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                </div>
            )}

               
                    {userfollowers.map((user,index)=>{
                        return <div key={index}>
                            <img src={user.followedId.profilepic} alt=""/>
                            <p>{user.followedId.username || "no name"}</p>
                        </div>
                    })}
                    
                   
        </div>
    );
};

export default UserFollowersPopUp;