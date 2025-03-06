import express from "express"
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import UserRoutes from './routes/UserRoutes.js'
const app = express()
dotenv.config()
//middleware
app.use(cors(
    {
        origin: 'http://localhost:3000', // replace with your frontend URL
        credentials: true,
    }
))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())


//routes
app.use('/auth' ,UserRoutes)
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
app.listen(PORT,() =>{
    console.log(`Server running on port {PORT}`)
})