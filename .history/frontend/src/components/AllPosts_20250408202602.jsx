import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post.jsx";
import moment from "moment";
import { FaThumbsUp, FaComment, FaShare, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton.jsx";
import ReportPost from "./ReportPost.jsx";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
const AllPosts = ({ user }) => {
    const [selectedPost, setSelectedPost] = useState({ id: null, name: '' });
    const [posts, setPosts] = useState([]);
    const [openTab, setOpenTab]=useState(false)
    const [openPostId, setOpenPostId] = useState(null);

    const [isCreating, setIsCreating] = useState(false);
    const defaultAvatar = "https://via.placeholder.com/50";

    // sharing of the post
    const handleShare = (postId, productName) => {
        const shareUrl = `${window.location.origin}/Onepost/${postId}`;

        if (navigator.share) {
            navigator.share({
                title: productName,
                text: `Check out this post: ${productName}`,
                url: shareUrl,
            })
                .then(() => console.log("Post shared successfully"))
                .catch((err) => console.error("Error sharing:", err));
        } else {
            navigator.clipboard.writeText(shareUrl)
               
        }
    };
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem("token")
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/posts/allposts`, {
                    headers: { Authorization: `Bearer ${token}` }
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

    const handleReportClick = (postId, postName) => {
        setSelectedPost({ id: postId, name: postName });
        setOpenTab(false)
    };

    return (
        <div className="flex flex-col flex-1 max-w-xl mx-auto mt-0">
            <div className="flex gap-6 justify-center items-center bg-white p-2">
                <img src={user?.profilepic} alt="" className="w-12 h-12 object-cover" />
                {!isCreating ? (
                    <button
                        onClick={() => setIsCreating(true)}
                        className="w-96 bg-blue-600 text-white py-1 h-8 rounded-lg hover:bg-blue-700 transition"
                    >
                        make a Post
                    </button>
                ) : (
                    <Post onClose={() => setIsCreating(false)} onPostCreated={addNewPost} />
                )}
            </div>

            <div className="p-1 mt-4 w-full bg-white mb-2">
                <h1 className="text-lg font-bold ml-4 text-gray-800">Trending Posts</h1>
                <div className="mt-1 flex gap-2 px-4">
                    {posts?.slice(0, 5)?.map((post, index) => (
                        <div key={index} className="relative shadow-md hover:shadow-xl transition duration-300">
                            <Link to={`/Profile/${post?.createdBy?._id}`}>
                                <img src={post?.image} alt="" className="w-30 h-52 object-cover rounded-lg mb-2" />
                                <div className="absolute top-3 ml-2">
                                    <img
                                        src={post?.createdBy?.profilepic || defaultAvatar}
                                        alt={post?.createdBy?.username}
                                        className="w-8 h-8 rounded-full border-2 border-blue-400 object-cover"
                                    />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <div className="py-6 bg-gray-100">
                <h1 className="text-xl font-bold text-gray-800 mb-2 ml-6">All Posts</h1>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
                    {posts.length > 0 ? (
                        posts.map((post, index) => (
                            <li key={index} className="pl-4 pb-4 bg-white shadow-md hover:shadow-lg transition duration-300 flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <a href={`/Profile/${post?.createdBy?._id}`}>
                                            <img
                                                src={post?.createdBy?.profilepic || defaultAvatar}
                                                alt={post?.createdBy?.username}
                                                className="w-12 h-12 rounded-full border-1 border-gray-300 object-cover"
                                            />
                                        </a>
                                        <div>
                                            <a href={`/Profile/${post?.createdBy?._id}`} className="text-md font-bold text-gray-800 cursor-pointer hover:underline hover:text-blue-600">
                                                {post?.createdBy?.username || "Unknown"}
                                            </a>
                                            <p className="text-xs text-gray-500">{timeAgo(post.createdAt)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 relative">
                                        <p className="text-sm font-medium text-black pr-2">{post?.category || "N/A"}</p>

                                        <BsThreeDotsVertical
                                            onClick={() => setOpenPostId(post._id)}
                                            className="cursor-pointer text-2xl text-gray-600 hover:text-gray-800 transition duration-200"
                                        />

                                        {openPostId === post._id && (
                                            <div className="absolute justify-centre top-40 right-40 flex flex-col items-center space-y-3 bg-white shadow-lg p-4 rounded-xl z-50">
                                                <button
                                                    onClick={() => setOpenPostId(null)}
                                                    className="text-gray-500 hover:text-red-500 transition duration-200 text-xl"
                                                >
                                                    <MdCancel />
                                                </button>

                                                <button
                                                    onClick={() => handleReportClick(post._id, post.productName)}
                                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 text-sm font-semibold"
                                                >
                                                    Report
                                                </button>

                                                <FollowButton userId={post?.createdBy?._id} />

                                                <button
                                                    onClick={() => handleShare(post._id, post.productName)}
                                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 text-sm font-semibold"
                                                >
                                                    Share Post
                                                </button>
                                            </div>
                                        )}


                                     
                                    </div>

                                </div>
                                <Link to={`/Onepost/${post._id}`}>
                                    <div>
                                        <h3 className="text-md font-semibold text-gray-800">{post.productName}</h3>
                                        <div className="text-gray-600">
                                            {post.description.length > 60 ? (
                                                <p>{post.description.slice(0, 60)}...<span className="text-blue-500">see more</span></p>
                                            ) : (
                                                <p>{post.description}</p>
                                            )}
                                        </div>
                                    </div>
                                    <img src={post.image} alt="Post" className="w-full -ml-0 h-96 object-cover" />
                                </Link>
                                <ReportPost
                                    popUp={selectedPost.id === post._id}
                                    setPopUp={() => setSelectedPost({ id: null, name: '' })}
                                    postId={post._id}
                                    postName={post.productName}
                                />
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