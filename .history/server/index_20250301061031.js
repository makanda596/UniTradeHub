import express from "express"
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from "dotenv"
const app = express()


//middleware
app.use(cors(
    {
        origin: 'http://localhost:3000', // replace with your frontend URL
        credentials: true,
    }
))
app.use(express.json())

const PORT = process.env.PORT || 6000;
const MONGO_URL = process.env.MONGO_URL
//mongo db connect
mongoose.connect(MONGO_URL)
try {
    console.log("mongodb connected")
}
catch (error) {
    console.error(error)
}
app.listen(5000 ,() =>{
    console.log("Server running on port 5000")
})