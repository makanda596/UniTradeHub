import React from "react";

const UserFollowersPopUp = ({ userfollowers, loading }) => {


    return (
        <div className="p-6 max-w-4xl mx-auto">
          
                <div className="grid grid-cols-2 gap-6"> 
                    {/* Followers Section */}
                    <div>
                        <h3 className="text-lg font-medium mb-2">Followers</h3>
                        {userfollowers.length > 0 ? (
                            userfollowers.map((user) => (
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
        </div>
    );
};

export default UserFollowersPopUp;
