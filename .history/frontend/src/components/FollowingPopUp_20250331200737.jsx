import  React  from "react";
import { FollowStore } from "../utilis/follow";

const FollowingPopUp = ({ following ,loading  }) => {
    const { handleUnfollow } = FollowStore();

    console.log(following.status)
    console.log(following)

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Followers </h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                
                    <div>
                        <h3 className="text-lg font-medium mb-2">Following</h3>
                        {following.length > 0 ? (
                            following.map((user) => (
                                <div key={user._id} className="flex items-center justify-between gap-3 p-2 border rounded-md mb-2">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={user?.followedId?.profilepic || "https://via.placeholder.com/50"}
                                            className="w-10 h-10 rounded-full"
                                            alt="Profile"
                                        />
                                        <div>
                                            <p>{user?.followedId?.username || "Unknown User"}</p>
                                            <p className="text-sm text-gray-500">
                                                Status: {user?.followedId?.status || "Pending"}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleUnfollow(user.followedId._id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                    >
                                        Unfollow
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>Not following anyone yet</p>
                        )}
                    </div>
            )}
        </div>
    );
};

export default FollowingPopUp;
