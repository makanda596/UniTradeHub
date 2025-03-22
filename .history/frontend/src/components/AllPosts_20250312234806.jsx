import React, { useEffect ,useState} from 'react'
import axios from 'axios'
const AllPosts = ({user}) => {
        const [posts, setPosts] = useState([]);
    
     useEffect(() => {
            const fetchPosts = async () => {
                if (!user?._id) return; // Ensure user is defined
    
                try {
                    const response = await axios.get("http://localhost:5000/posts/allposts");
                    setPosts(response.data); // Ensure it's an array
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
        {posts.map((index,post)=>{
            return <div key={index}>
                <p>post:{post.productName}</p>
            </div>
        })}
          <>AllPosts</>
    </div>
  )
}

export default AllPosts