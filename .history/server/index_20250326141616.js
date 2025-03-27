import express from "express"
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import UserRoutes from './routes/UserRoutes.js'
import session from 'express-session'
import postRoutes from "./routes/postRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import adminRoutes from './routes/adminRoutes.js'
import conversationRoutes from './routes/conversationRoutes.js'
import { app, server } from "./utilis/socket.js"
import imageRoute from './routes/imageRoute.js'
import bodyParser from 'body-parser'
dotenv.config()
//middleware

app.use(cors(
    {
        origin: 'http://localhost:5173', // replace with your frontend URL
        credentials: true,
    }
))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(session({
    secret: "your_secret_key", // Change this to a secure secret
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 } // 1-day session
}));

app.use(bodyParser.json({ limit: '10mb' })); // Increase the size limit for JSON payloads
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // Increase the size limit for URL-encoded payloads

//routes
app.use('/auth' ,UserRoutes)
app.use('/chart', messageRoutes)
app.use('/image', imageRoute)
app.use('/conversation', conversationRoutes)
app.use("/uploads", express.static("uploads"));
app.use("/posts", postRoutes);
app.use('/admin', adminRoutes)
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
server.listen(PORT,() =>{
    console.log(`Server running on port {PORT}`)
})