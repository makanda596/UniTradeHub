import axios from 'axios'
import React, {useState}from 'react'

const Reviews = ({ userId }) => {
    const {reviews, setReviews} = useState("")

    const fetchReviews = async ()=>{
        try{
        const response =   axios.get(`http://localhost:5000/reviews/getReview/${userId}`)
        console.log(response.data)
        }
        catch(error){
            console.log(error.message)
        }
    }

  return (
      <div>user{userId}</div>
  )
}

export default Reviews