import React, { useEffect, useState } from "react";
import market from "../assets/market.avif";
import AllPosts from "./AllPosts";
import Categories from "./Categories";
import axios from "axios";

const Dashboard = ({ user }) => {
    const [error,setError]= useState("")
    const [count, setCount] = useState("")

    const countPosts = async ()=>{
        try{
            const response = await axios.get('http://localhost:5000/auth/countposts/67d1de6db4e9f9c5e2276538')
            setCount(response.data)
            console.log(response.data.postCount)
        }
        catch(error){
            setError(error.message)
        }
    } 

    useEffect(()=>{
        countPosts()
    },[])
    return (
        <div className="flex flex-col lg:flex-row pt-16 lg:px-10 px-0 bg-white">
            {error && (<>{error}</>)}

            {/* User Information - Fixed on large screens */}
            <div className="pl-4 rounded-sm md:rounded-xl shadow-lg 
                bg-gray-200  lg:fixed lg:w-[300px] lg:h-96 lg:overflow-auto">
                <div className="flex flex-col items-center p-2 relative">
                    <div
                        className="w-full h-24 bg-cover bg-center rounded-t-2xl"
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
                        <li href={`/Myposts/${user?._id}` }className="py-1 flex text-blue-600 justify-between">Posts {count}</li>
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
