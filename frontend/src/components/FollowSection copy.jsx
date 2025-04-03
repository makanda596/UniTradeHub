import React, { useEffect, useState } from "react";
import FollowingPopUp from "./FollowingPopUp";
import FollowersPopUp from "./followersPopUp";
import { FollowStore } from "../utilis/follow";
import { useParams } from 'react-router-dom';

const FollowSection = () => {
    const [activetab, setActivetab] = useState("followers");
    const [loading, setLoading] = useState(true);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const { fetchFollowing, fetchFollowers, countfollowers, countfollowingfunction,countfollowersfunction,followers, following, countfollowing } = FollowStore()
 const {userId} = useParams()
 
    useEffect(() => {
        const fetchData = async () => {
            await fetchFollowing(userId);
            await fetchFollowers(userId); 
            await countfollowersfunction(userId)
            await countfollowingfunction(userId)
            setLoading(false);
        };
        fetchData();
        console.log(userId)
    }, [userId, fetchFollowing, fetchFollowers, countfollowersfunction, countfollowingfunction]);
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
                            {countfollowers.count || 0}
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
                            {countfollowing.count || 0}
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
