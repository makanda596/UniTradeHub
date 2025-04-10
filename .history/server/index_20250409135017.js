import express from "express"
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import UserRoutes from './routes/UserRoutes.js'
import session from 'express-session'
import PostRoutes from "./routes/PostRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import adminRoutes from './routes/adminRoutes.js'
import conversationRoutes from './routes/conversationRoutes.js'
import FollowingRoutes from './routes/FollowingRoutes.js'
import { app, server } from "./utilis/socket.js"
import ReviewRoutes from './routes/ReviewRoutes.js'
import ReportRoutes from './routes/ReportRoutes.js'

import CartRoutes from './routes/CartRoutes.js'
// import imageRoute from './routes/imageRoute.js'
dotenv.config()
//middleware

app.use(cors(
    {
        // origin:"https://unitradehub-kesf.onrender.com",
        origin: 'http://localhost:5173', 
        credentials: true,
    }
))
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser())
app.use(session({
    secret: "your_secret_key", // Change this to a secure secret
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 } // 1-day session
}));

// Increase the size limit for URL-encoded payloads

//routes
app.use('/auth' ,UserRoutes)
app.use('/chart', messageRoutes)
// app.use('/image', imageRoute)
app.use('/conversation', conversationRoutes) 
app.use("/uploads", express.static("uploads"));
app.use("/posts", PostRoutes);
app.use("/follow", FollowingRoutes);
app.use('/admin', adminRoutes)
app.use('/reviews', ReviewRoutes)
app.use('/reports', ReportRoutes)
app.use('/carts', CartRoutes)
const PORT = process.env.PORT || 6000;
const MONGO_URL= process.env.MONGO_URL
//mongo db connect
mongoose.connect(MONGO_URL) 
try {
    console.log("mongodb conneted")
    // console.log("Mongo URI:", process.env.MONGO_URL);

}
catch (error) {
    console.error(error)
}
server.listen(PORT,() =>{
    console.log(`Server running on port {PORT}`)
})