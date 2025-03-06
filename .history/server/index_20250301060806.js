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

app.listen(5000 ,() =>{
    console.log("Server running on port 5000")
})