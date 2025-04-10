import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post.jsx";
import moment from "moment";
import { FaThumbsUp, FaComment, FaShare, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton.jsx";
import ReportPost from "./ReportPost.jsx";

const AllPosts = ({ user }) => {
        const [popUp, setPopUp] = useState(false);
      
    
    const [posts, setPosts] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    // const [likedPosts, setLikedPosts] = useState({});



    const defaultAvatar = "https://via.placeholder.com/50";

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem("token")
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/posts/allposts`, {
                    headers:{Authorization:`Bearer ${token}`}
                });
                setPosts(response.data);
            } catch (err) {
                console.error("Failed to fetch posts", err);
            }
        };
        fetchPosts();
    }, []);
   

    const timeAgo = (date) => moment(date).fromNow();

    const addNewPost = (newPost) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]);
        setIsCreating(false);
    };

    // const handleLike = (index) => {
    //     setPosts((prevPosts) => {
    //         const updatedPosts = [...prevPosts];
    //         updatedPosts[index].likes = (updatedPosts[index].likes || 0) + (likedPosts[index] ? -1 : 1);
    //         setLikedPosts((prev) => ({ ...prev, [index]: !prev[index] }));
    //         return updatedPosts;
    //     });
    // };

    // const handleComment = () => console.log("Comment feature coming soon!");

    // const handleShare = (post) => {
    //     navigator.clipboard.writeText(`Check out this post: ${post.productName}`);
    //     alert("Post link copied to clipboard!");
    // };

    // const generateWhatsAppLink = (phoneNumber, post) => {
    //     let formattedPhone = phoneNumber.replace(/\D/g, "");
    //     if (formattedPhone.startsWith("254") && formattedPhone.length === 12) {
    //         return `https://wa.me/${formattedPhone}?text=Check out this post: ${post.productName}`;
    //     }
    //     return null;
    // };

    return (
        <div className="flex flex-col flex-1 max-w-xl mx-auto  mt-0">
            <div className="flex gap-6 justify-center items-center bg-white p-2">
          <img src={user?.profilepic} alt="" className="w-12 h-12 object-cover"/>  
          {!isCreating ? (

                <button
                    onClick={() => setIsCreating(true)}
                    className="w-96 bg-blue-600 text-white py-1 h-8 rounded-lg hover:bg-blue-700 transition"
                >
                     make a Post 
                </button>
            ) : (
                <Post  onClose={() => setIsCreating(false)} onPostCreated={addNewPost} />
            )}
            </div>

            <div className="p-1 mt-4 w-full bg-white mb-2">
                <h1 className="text-lg font-bold ml-4 text-gray-800">Trending Posts</h1>
 
                {/* Scrollable Container */}
                <div className="mt-1 flex gap-2 px-4 ">
                    {posts?.slice(0, 5)?.map((post,index)=>{
                        return <div key={index}>
                            <div key={index} className="relative shadow-md hover:shadow-xl transition duration-300">
                                <Link to={`/Profile/${post?.createdBy?._id}`}>
                                    <img src={post?.image} alt="" className="w-30 h-52 object-cover rounded-lg mb-2" />

                                    {/* Profile Picture */}
                                    <div className="absolute top-3 ml-2">
                                        <img
                                            src={post?.createdBy?.profilepic || defaultAvatar}
                                            alt={post?.createdBy?.username}
                                            className="w-8 h-8 rounded-full border-2 border-blue-400 object-cover"
                                        />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    })}
                                 </div>
            </div>



            <div className="py-6 bg-gray-100">
                <h1 className="text-xl font-bold text-gray-800 mb-2 ml-6"> All Posts</h1>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
                    {posts.length > 0 ? (
                        posts.map((post, index) => (

                            <li key={index} className="pl-4  pb-4 bg-white shadow-md hover:shadow-lg transition duration-300 flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <a href={`/Profile/${post?.createdBy?._id}`}>   <img
                                            src={post?.createdBy?.profilepic || defaultAvatar}
                                            alt={post?.createdBy?.username} 
                                            className="w-12 h-12 rounded-full border-1 border-gray-300 object-cover"
                                        /></a>
                                        <div>
                                            <a href={`/Profile/${post?.createdBy?._id}`} className="text-md font-bold text-gray-800 cursor-pointer hover:underline hover:text-blue-600">
                                                {post?.createdBy?.username || "Unknown"}
                                            </a>
                                            <p className="text-xs text-gray-500">{timeAgo(post.createdAt)}</p>

                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            onClick={()=>setOpen(true)}
                                            cassName="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Report
                                        </button>
                                        <FollowButton userId={post?.createdBy?._id} />
                                    <p className="text-sm font-medium text-black pr-2">{post?.category || "N/A"}</p>
                                    </div>
                                </div>
                                <Link to={`/Onepost/${post.category}/${post._id}`}>
                                    <div>
                                        <h3 className="text-md font-semibold text-gray-800">{post.productName}</h3>
                                        <div className="text-gray-600">{post.description.length > 60 ? (<p>{post.description.slice(0, 60)}...<span className="text-blue-500">see more</span></p>) : (<p>{post.description}</p>)}</div>
                                    </div>

                                    <img src={post.image} alt="Post" className="w-full -ml-0 h-96 object-cover " />
                                    {/* <div className="flex justify-between items-center py-1 text-gray-600">

                                        <button onClick={() => handleLike(index)} className={`flex items-center gap-1 ${likedPosts[index] ? 'text-blue-600' : ''} transition`}>
                                            <FaThumbsUp />{post.likes || 0} Like
                                        </button>
                                        <button onClick={handleComment} className="flex items-center gap-1 hover:text-blue-600 transition">
                                            <FaComment /> Comment
                                        </button>

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

                                        <button onClick={() => handleShare(post)} className="flex items-center  hover:text-blue-600 transition">
                                            <FaShare />Share
                                        </button>
                                    </div> */}
                                </Link>
                                <ReportPost popUp={popUp} setPopUp={setPopUp} post={post._id}/>

                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center text-lg">No posts found.</p>
                    )}
                </div>

            </div>
        </div>
    );
};

export default AllPosts;