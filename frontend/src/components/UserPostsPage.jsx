import { useState, useEffect } from "react";
import axios from "axios";

const UserPostsPage = ({ user }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            if (!user?._id) return; // Ensure user is defined

            try {
                const response = await axios.get(`http://localhost:5000/posts/userposts/${user._id}`);
                setPosts(response.data.posts); // Ensure it's an array
                console.log(response.data.posts)
            } catch (err) {
                setError("Failed to fetch posts");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [user?._id]); // Depend on user._id to refetch when user changes

    return (
        <div className="container">
            <h2>User Posts</h2>
            {/* {post ? (<p>{post.description}</p>) : (<p>noegwg</p>)} */}
{user ?(<p>{user?.email}</p>):(<p>no user email found</p>)}
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {posts.length > 0 ? (
                    posts.map((post, index) => (
                        <li key={index}>
                            <h3>{post.productName}</h3>
                            <p>{post.description}</p>
                        </li>
                    ))
                ) : (
                    <p>No posts found.</p>
                )}
            </ul>
        </div>
    );
};

export default UserPostsPage;
