import axios from "axios";
import e from "express";
import { useState } from "react";
import Swal from "sweetalert2";

const ReviewForm = ({ recieverId }) => {
    const [text,setText]=useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token");
        if (!token) {
            Swal.fire("Unauthorized", "Please log in to submit a review.", "error");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/reviews/postReview/${recieverId}`,text, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

            console.log(response.data)
            const data = await response.json();
            Swal.fire(data.success ? "Success" : "Error", data.message, data.success ? "success" : "error");
        } catch (error) {
            Swal.fire("Error", error.message, "error");
        }
    };

  

    return (
        <div className="text-center">
            
            <form onClick={handleSubmit} >
                <input type="text" value={text} onChange={()=>{setText(e.target.value)}}
            <button

                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
                Leave a Review
            </button>
            </form>
        </div>
    );
};

export default ReviewForm;
