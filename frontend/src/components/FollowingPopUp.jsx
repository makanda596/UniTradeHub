import  React  from "react";
import { FollowStore } from "../utilis/follow";
import { FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";


const FollowingPopUp = ({ following ,loading  }) => {
    const { handleUnfollow } = FollowStore();



    return (
        <div className="p-6 max-w-4xl mx-auto">
            {loading ? (
                <p>Loading...</p>
            ) : (
                
                    <div>
                        <h3 className="text-lg font-medium mb-2">Following</h3>
                        {following.length > 0 ? (
                            following.map((user) => (
                                <div key={user._id} className="flex bg-gray-100 rounded-md items-center justify-between gap-3 p-2  mb-2">
                                    <Link to={`/Profile/${user?.followedId?._id}`} >
                                    <div className="flex items-center gap-3 ">
                                        <img
                                            src={user?.followedId?.profilepic || "https://via.placeholder.com/50"}
                                            className="w-10 h-10 rounded-full border-2 border-blue-300"
                                            alt="Profile" 
                                        />
                                        <div>
                                            <p>{user?.followedId?.username || "Unknown User"}</p>
                                                <p className="text-sm text-gray-500">
                                                    Bio: {user?.followedId?.bio
                                                        ? user.followedId.bio.length > 35
                                                            ? <span>{user.followedId.bio.slice(0, 35)}..</span>
                                                            : <span>{user.followedId.bio}</span>
                                                        : "No bio available"}
                                                </p>
                                        </div>
                                    </div>
                                    </Link>
                                    {/* <button
                                        onClick={() => handleUnfollow(user.followedId._id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                    >
                                        Unfollow
                                    </button> */}
                                </div>
                            ))
                        ) : (
                             <div className="text-center py-8">
                                                        <div className="mx-auto mb-4 text-gray-400">
                                                            <FiUsers className="w-16 h-16 mx-auto" />
                                                        </div>
                                                        <h3 className="text-lg font-medium text-gray-600 mb-2">
                                                            not being followed by anyone yet
                                                        </h3>
                                                        
                                                    </div>
                        )}
                    </div>
            )}
        </div>
    );
};

export default FollowingPopUp;
