import React, { useEffect, useState } from "react";
import FollowingPopUp from "./FollowingPopUp";
import FollowersPopUp from "./followersPopUp";
import { FollowStore } from "../utilis/follow";

const FollowSection = () => {
    const [activetab, setActivetab] = useState("followers");
    const [loading, setLoading] = useState(true);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { fetchFollowing, fetchFollowers, countfollowers,followers, following, countfollowing } = FollowStore()


    useEffect(() => {
        const fetchData = async () => {
            await fetchFollowing();
            await fetchFollowers()
            setLoading(false);
        };
        fetchData();
    }, []);
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
            <div className="bg-white rounded-xl shadow-sm p-2 border-l-4 border-gray-500">
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={openFollowers}
                        className="relative group flex flex-col items-center p-4 w-32 rounded-lg transition-all duration-300
               bg-gradient-to-br from-purple-50 to-white hover:from-purple-100 hover:shadow-md"
                    >
                        <span className="text-3xl font-bold text-blue-600 group-hover:text-gray-400 transition-colors">
                            {countfollowers.count || 0}
                        </span>
                        <span className="text-sm font-medium   transition-colors">
                            Followers
                        </span>
                        <div className="absolute -bottom-1 h-1 w-8 bg-purple-500 rounded-full opacity-0 
                     group-hover:opacity-100 transition-opacity duration-300" />
                    </button>

                    {/* Divider */}
                    <div className="h-12 w-px bg-gray-200" />

                    <button
                        onClick={openFollowing}
                        className="relative group flex flex-col items-center p-4 w-32 rounded-lg transition-all duration-300
               bg-gradient-to-br from-blue-50 to-white hover:from-blue-100 hover:shadow-md"
                    >
                        <span className="text-3xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                            {countfollowing.count || 0}
                        </span>
                        <span className="text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
                            Following
                        </span>
                        <div className="absolute -bottom-1 h-1 w-8 bg-blue-500 rounded-full opacity-0 
                     group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                </div>
            </div>

            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        
                        <div>
                            {activetab === "followers" ? (
                                <FollowersPopUp loading={loading} followers={followers} />
                            ) : (
                            <FollowingPopUp loading={loading} following={following }/>
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

export default FollowSection;
