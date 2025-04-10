import React, { useState } from "react";
import { FiUserPlus, FiUsers, FiAlertCircle, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FollowStore } from "../utilis/follow";

const UserFollowingPopUp = ({ userfollowing}) => {
    const { handleUserUnfollow } = FollowStore();

    const [message,setMessage]= useState("")
    const handleUnfollowUser = async (followedUserId) => {
        try {
            await handleUserUnfollow(followedUserId);
            setMessage("succesfull unfollowed User")
            window.location.reload()
        } catch (error) {
            console.error("Unfollow failed:", error);
        }
    };

    return (
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <FiUsers className="w-6 h-6 text-purple-600" />
                    <h2 className="text-xl font-bold text-gray-800">
                        Following ({userfollowing?.length || 0})
                    </h2>
                </div>
            </div>

<h1 className="text-green-600">{message}</h1>
            <div className="max-h-96 overflow-y-auto">
                {userfollowing?.length > 0 ? (
                    userfollowing.map((user) => (
                        <div
                            key={user._id}
                            className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
                        >
                            <Link
                                to={`/profile/${user.followedId._id}`}
                                className="flex items-center gap-4 flex-1"
                            >
                                   <div className="flex-shrink-0">
                                                                   {user.followedId.profilepic ? (
                                                                       <img
                                                                           src={user.followedId.profilepic}
                                                                           alt={user.followedId.username}
                                                                           className="w-10 h-10 rounded-full object-cover border-2 border-purple-100"
                                                                       />
                                                                   ) : (
                                                                       <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                                                           <FiUser className="text-purple-600" />
                                                                       </div>
                                                                   )}
                                                               </div>
                               
                                                               <div className="flex-1 min-w-0">
                                                                   <h3 className="font-medium text-gray-900 truncate">
                                                                       {user.followedId.username || "Anonymous User"}
                                                                   </h3>
                                                                   <p className="text-sm text-gray-500 truncate">
                                                                       {user.followedId.bio || "No bio available"}
                                                                   </p>
                                                               </div>
                            </Link>

                            <button
                                onClick={() => handleUnfollowUser(user.followedId._id)}
                                className="ml-4 px-3 py-1 text-sm text-red-600 bg-red-50 rounded-full hover:bg-red-100 transition-colors"
                            >
                                Unfollow
                            </button>
                        </div>
                    ))
                ) : (
                    /* Empty state remains same */(<>no user</>)
                )}
            </div>
        </div>
    );
};



export default UserFollowingPopUp;
