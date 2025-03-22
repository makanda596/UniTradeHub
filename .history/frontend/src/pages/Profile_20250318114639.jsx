import React from 'react'
import market from "../assets/market.avif";

const Profile = ({user,posts}) => {
  return (
    <>
       <div className="p-0">
                    <h1 className="text-xl font-bold text-gray-800 mb-4"> All Posts</h1>
                    <ul className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                        {posts.length > 0 ? (
                            posts.map((post, index) => (
                                <li key={index} className="pl-4  bg-white shadow-md hover:shadow-lg transition duration-300 flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={post?.createdBy?.profilepic }
                                                alt={post?.createdBy?.username}
                                                className="w-12 h-12 rounded-full border-1 border-gray-300 object-cover"
                                            />
                                            <div>
                                                <a href={`/Profile/${post?.createdBy?._id}`} posts={posts} className="text-md font-bold text-gray-800 cursor-pointer hover:underline hover:text-blue-600">
                                                    {post?.createdBy?.username || "Unknown"}
                                                </a>
                                                <p className="text-xs font-medium text-blue-500">{post?.createdBy?.phoneNumber || "N/A"}</p>
    
                                            </div>
                                        </div>
                                        <p className="text-sm font-medium text-black pr-2">{post?.category || "N/A"}</p>
    
                                    </div>
    
                                    <div>
                                        <h3 className="text-md font-semibold text-gray-800">{post.productName}</h3>
                                        <p className="text-gray-600">{post.description}</p>
                                    </div>
    
                                    <img src={market} alt="Post" className="w-full h-auto object-cover " />
    <div className="border-1 border-gray-400 w-full mb-[-10px]"></div>
                                    <div className="flex justify-between items-center py-1 text-gray-600">
    
                                       
                                        <button
                                            onClick={() => {
                                                if (post?.createdBy?.phoneNumber) {
                                                    let formattedPhone = post.createdBy.phoneNumber.trim();
    
                                                    // Ensure it starts with country code (+254 for Kenya)
                                                    if (!formattedPhone.startsWith("+")) {
                                                        formattedPhone = "+254" + formattedPhone.slice(-9); // Assume last 9 digits are the valid number
                                                    }
    
                                                    const waLink = `https://wa.me/${formattedPhone}`;
                                                    window.open(waLink, "_blank");
                                                } else {
                                                    alert("Phone number is not available for this post.");
                                                }
                                            }}
                                            className="flex items-center text-green-600 transition"
                                        >
                                            <FaWhatsapp /> WhatsApp
                                        </button>
    
                                        {/* <button onClick={() => handleShare(post)} className="flex items-center  hover:text-blue-600 transition">
                                            <FaShare />Share
                                        </button> */}
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center text-lg">No posts found.</p>
                        )}
                    </ul>
                </div>
    <div>{user ? (<h1>{user?.email}</h1>):(<h1>no user found</h1>)} </div>
    </>
  )
}

export default Profile