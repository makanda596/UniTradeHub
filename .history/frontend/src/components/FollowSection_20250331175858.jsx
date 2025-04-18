import React, { useState } from "react";

const FollowSection = () => {
    const [activetab, setActivetab] = useState("followers");
    const [isPopupOpen, setIsPopupOpen] = useState(false);

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
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500 gap-10 space-x-6">
                <button className="p-2 bg-green-400" onClick={openFollowers}>
                    {"No Followers"}
                </button>
                <button className="p-2 bg-blue-400" onClick={openFollowing}>
                    {"No Following"}
                </button>
            </div>

            {/* Popup Modal */}
            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-lg font-semibold mb-4">
                            {activetab === "followers" ? "Followers" : "Following"}
                        </h2>
                        <div>
                            {activetab === "followers" ? (
                                <p>List of followers</p>
                            ) : (
                                <p>List of following</p>
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
