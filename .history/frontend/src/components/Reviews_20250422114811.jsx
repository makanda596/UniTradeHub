import axios from 'axios'
import React, {useEffect, useState}from 'react'

const Reviews = ({ userId }) => {
    const {reviews, setReviews} = useState([])

    const fetchReviews = async ()=>{
        try{
        const response =  await axios.get(`http://localhost:5000/reviews/getReview/${userId}`)
        console.log(response.data)
        setReviews(response.data)
        }
        catch(error){
            console.log(error.message)
        }
    }
    useEffect(()=>{
        fetchReviews()
    }, [userId])

  return (
      <section id="reviews">
          <p>user{userId}</p>
          {reviews.length > 0 ? 
         ( reviews.map((item,index)=>{
            return <div key={index}>
                <h1>{item.text}</h1>
            </div>):<>no</>
          })}
        </section>
  )
}

export default Reviews