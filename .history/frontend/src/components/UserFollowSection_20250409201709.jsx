import React, { useEffect, useState } from "react";

import { FollowStore } from "../utilis/follow";
import UserFollowingPopUp from "./UserFollowingPopUp";
import UserFollowersPopUp from "./UserfollowersPopUp";

const UserFollowSection = () => {
    const [activetab, setActivetab] = useState("followers");
    const [loading, setLoading] = useState(true);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { userfetchFollowing, userfetchFollowers, usercountfollowers,userfollowers, userfollowing, usercountfollowing } = FollowStore()

 
    useEffect(() => {
        const fetchData = async () => {  
            await userfetchFollowing();  
            await userfetchFollowers()
            
            setLoading(false);
        };
import React from "react";
import { FiUserPlus, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";

const UserFollowingPopUp = ({ userfollowing, loading, error }) => {
    console.log("hey", userfollowing)

    return (
        <div className="p-2 max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
            <div className="flex items-center gap-3 mb-6">
                <FiUsers className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-bold text-gray-800">Following</h2>
            </div>

            {error && (
                <div className="p-2 mb-4 text-red-600 bg-red-50 rounded-lg flex items-center gap-2">
                    <FiAlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                </div>
            )}

               
                    {userfollowing.map((user,index)=>{
                        return <div key={index}>
                            <img src={user.followedId.profilepic} alt=""/>
                            <p>{user.followedId.username || "no name"}</p>
                        </div>
                    })}
                    
                   
        </div>
    );
};

export default UserFollowingPopUp;        fetchData();
    }, [userfetchFollowing]);
    const openFollowers = () => {
        setActivetab("followers");
        setIsPopupOpen(true);
    };

    const openFollowing = () => {
        setActivetab("following");
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <div>
            <div className="bg-white rounded-xl shadow-sm p-1 border-l-2 border-gray-500">
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={openFollowers}
                        className="relative group flex flex-col items-center p-2 hover:bg-gray-200 w-32 rounded-lg "
                    >
                        <span className="text-xl font-bold text-blue-600  ">
                            {usercountfollowers.count || 0}
                        </span>
                        <span className="text-sm font-medium   ">
                            Followers
                        </span>
                    </button>

                    <div className="h-10 w-px bg-gray-200" />

                    <button
                        onClick={openFollowing}
                        className="relative group flex flex-col items-center p-2 w-30 rounded-lg hover:bg-gray-200"
                    >
                        <span className="text-xl font-bold text-blue-600 group-hover:text-blue-700 ">
                            {usercountfollowing.count || 0}
                        </span>
                        <span className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
                            Following
                        </span>
                     </button>
                </div>
            </div>

            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center  z-50">
                    <div className="bg-blue-200 p-6 rounded-lg shadow-lg w-80">
                        
                        <div>
                            {activetab === "followers" ? (
                                <UserFollowersPopUp loading={loading} userfollowers={userfollowers} />
                            ) : (
                            <UserFollowingPopUp loading={loading} userfollowing={userfollowing }/>
                             )}
                        </div>
                        <button
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
                            onClick={closePopup}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserFollowSection;
