import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserPostsPage = () => {
    const { id } = useParams(); // Get user ID from URL
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${id}/posts`);
                setPosts(response.data.post); // Assuming "post" holds the array
            } catch (err) {
                setError("Failed to fetch posts");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [id]);

    return (
        <div className="container">
            <h2>User Posts</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {posts.length > 0 ? (
                    posts.map((post, index) => (
                        <li key={index}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
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
