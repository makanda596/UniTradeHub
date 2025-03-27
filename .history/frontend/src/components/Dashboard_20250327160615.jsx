import React, { useEffect, useState } from "react";
import market from "../assets/market.avif";
import AllPosts from "./AllPosts";
import Categories from "./Categories";
import axios from "axios";

const Dashboard = ({ user, userId }) => {
    const [error,setError]= useState("")
    const [count, setCount] = useState("")
    const [countReviews, setCountReviews] = useState("")
    const countPosts = async ()=>{
        try{
            const response = await axios.get(`http://localhost:5000/auth/countposts/${userId}`)
            setCount(response.data)
            
            console.log(response.data.postCount)
        }
        catch(error){
            setError(error.message)
        }
    } 

    useEffect(()=>{
        countPosts()
    }, [userId])

    const countReview = async () => {
        try {
            
            const token = localStorage.getItem("token")
            const response = await axios.get(`http://localhost:5000/reviews/countReviews/${user._id}`, {
                headers:{Authorization:`Bearer${token}`}
            })

            setCountReviews(response.data)

        }
        catch (error) {
            setError(error.message)
        }
    }

   useEffect(()=>{
    countReview()
   },[])
    return (
        <div className="flex flex-col lg:flex-row pt-20 lg:px-16 px-0 bg-white">
            {error && (<>{error}</>)}

            {/* User Information - Fixed on large screens */}
            <div className="pl-4 rounded-sm bg-white md:rounded-xl shadow-lg 
                 lg:fixed lg:w-[300px] lg:h-96 lg:overflow-auto">
                <div className="flex flex-col items-center bg-gray-200  p-1 relative">
                    <div
                        className="w-full h-24 bg-cover bg-center rounded-t-xl"
                        style={{ backgroundImage: `url(${market})` }}
                    ></div>

                    <img
                        src={user?.profilepic || "https://via.placeholder.com/100"} 
                        alt="Profile"
                        className="w-20 h-20 object-cover rounded-full border-2 border-gray-300 mt-[-40px]"
                    />

                    <h2 className="text-lg font-semibold mt-2">{user?.username}</h2>
                    <h2 className="text-lg font-semibold mt-2">{user?.email}</h2>
                </div>

                {/* Dashboard Stats */}
                <div className="mt-2 bg-blue-300 p-1 rounded-lg text-center">
                    <h3 className="text-lg font-semibold">Dashboard Stats</h3>
                    <ul className="text-gray-700 mt-2">
                        <a href={`/Myposts/${user?._id}` }className="py-1 flex text-blue-600 justify-between">Posts <span className="font-bold">{count.postCount}</span></a>
                        <li className="py-1 flex justify-between">Bookmarked <span className="font-bold">0</span></li>
                        <li className="py-1 flex justify-between">Alerts <span className="font-bold">0</span></li>
                    </ul>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="lg:ml-[320px] flex flex-col lg:flex-row w-full gap-4 px-0">
                {/* All Posts */}
                <div className="flex-1">
                    <AllPosts user={user} />
                </div>

                {/* Categories - Positioned on the right */}
                <div className="hidden lg:block w-[320px]">
                    <Categories />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
