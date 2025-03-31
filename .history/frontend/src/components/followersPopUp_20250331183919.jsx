import React from "react";

const FollowersPopUp= () => {


    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Followers & Following</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-2 gap-6">
                    {/* Followers Section */}
                    <div>
                        <h3 className="text-lg font-medium mb-2">Followers</h3>
                        {followers.length > 0 ? (
                            followers.map((user) => (
                                <div key={user._id} className="flex items-center justify-between gap-3 p-2 border rounded-md mb-2">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={user?.followerId?.profilepic || "https://via.placeholder.com/50"}
                                            className="w-10 h-10 rounded-full"
                                            alt="Profile"
                                        />
                                        <p>{user?.followerId?.username || "Unknown User"}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No followers yet</p>
                        )}
                    </div>

               
                </div>
            )}
        </div>
    );
};

export default FollowersPopUp;
