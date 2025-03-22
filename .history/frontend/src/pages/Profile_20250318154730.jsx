import React from "react";
import { useState ,useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [error, setError] = useState("")
  const [user ,setUser]=useState("")
  const { userId } = useParams()
  const fetchUser = async ()=>{
  try{
    const response = await axios.get(`http://localhost:5000/auth/profile/${userId}`)
    setUser(response.data)
    console.log(response.data)
  }catch(error){
    console.log(error.message)
    setError(error.message)
  }
}

  useEffect(()=>{
   fetchUser()
 },[])
  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      {/* Profile Header */}
      {error && <>{error}</>}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative bg-black h-40 flex items-end p-4">
          <img
            src="/profile-pic.jpg"
            alt="Profile"
            className="absolute -bottom-12 left-4 w-24 h-24 border-4 border-white rounded-full"
          />
        </div>
        {user ? (<h1>{user?.username}</h1>) : (<h1>no user found</h1>)}

        <div className="p-6">
          <div className="w-1/3 bg-white p-4 shadow-lg rounded-lg">
            <h3 className="text-lg font-semibold">Recent Posts</h3>
            {user?.posts?.length > 0 ? (
              user.posts.map((post) => (
                <div key={post._id} className="p-2 border-b border-gray-200">
                  <p className="text-gray-700">{post.description}</p>
                  <p className="text-gray-500 text-sm">{post.productName}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No posts available</p>
            )}
          </div>

          {/* <h2 className="text-xl font-bold">{user?.username || "guest"}</h2>
          <p className="text-gray-600">{user?.email}          </p> */}
          <p className="text-gray-500">Helping Businesses & Personal Brands Use AI...</p>
          <p className="text-gray-400 text-sm">Nairobi County, Kenya</p>
          <div className="flex space-x-2 mt-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Message</button>
            <button className="px-4 py-2 border border-gray-400 rounded-lg">Following</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex w-full max-w-4xl mt-6 space-x-6">
        {/* Left Section (Profile Info) */}
        <div className="w-2/3 bg-white p-4 shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold">About</h3>
          <p className="text-gray-600 mt-2">
            Helping Businesses & Personal Brands Use AI, SEO & Digital Marketing to Grow Faster.
          </p>
        </div>

        {/* Right Section (Posts) */}
        <div className="w-1/3 bg-white p-4 shadow-lg rounded-lg">
          <h3 className="text-lg font-semibold">Recent Posts</h3>
          <div className="mt-2">
            <div className="p-2 border-b border-gray-200">
              <p className="text-gray-700">"AI is changing the future of marketing..."</p>
              <p className="text-gray-400 text-sm">2 hours ago</p>
            </div>
            <div className="p-2 border-b border-gray-200">
              <p className="text-gray-700">"SEO tips for 2025: Stay ahead of the game!"</p>
              <p className="text-gray-400 text-sm">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
