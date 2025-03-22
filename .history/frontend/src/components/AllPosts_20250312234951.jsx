import React, { useEffect ,useState} from 'react'
import axios from 'axios'
const AllPosts = ({user}) => {
        const [posts, setPosts] = useState([]);
    
     useEffect(() => {
            const fetchPosts = async () => {
                if (!user?._id) return; // Ensure user is defined
    
                try {
                    const response = await axios.get("http://localhost:5000/posts/allposts");
                    setPosts(response); // Ensure it's an array
                    console.log(response.data)
                } catch (err) {
                    console.log("Failed to fetch posts");
                    console.error(err);
                } 
            };
    
            fetchPosts();
        }, []); // Depend on user._id to refetch when user changes
    
  return (
    <div>
          <>AllPosts</>
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
          <>AllPosts</>
    </div>
  )
}

export default AllPosts