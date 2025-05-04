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
import {client } from './utilis/twilio.js'
import CartRoutes from './routes/CartRoutes.js'
dotenv.config()
//middleware
const URL = process.env.FRONTEND_URL

app.use(cors(
    {
        origin: URL,
        credentials: true,
    }
))
//for files limit 
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser())


//routes
app.use('/auth' ,UserRoutes)
app.use('/chart', messageRoutes)
app.use('/conversation', conversationRoutes) 
app.use("/posts", PostRoutes);
app.use("/follow", FollowingRoutes);
app.use('/admin', adminRoutes)
app.use('/reviews', ReviewRoutes)
app.use('/reports', ReportRoutes)
app.use('/carts', CartRoutes)

app.post('/send-otp', async (req, res) => {
    const { phone } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        await client.messages.create({
            body: `Your verification code is ${otp}`,
            from: +19787763106,
            to: phone,
        });

        otpStore[phone] = otp;
        setTimeout(() => delete otpStore[phone], 300000); // Expires in 5 min

        res.json({ success: true, message: 'OTP sent' });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Failed to send OTP' });
    }
});

app.post('/verify-otp', (req, res) => {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
        return res.status(400).json({ success: false, message: 'Phone and OTP are required' });
    }

    const isValid = otpStore[phone] === otp;

    if (isValid) {
        delete otpStore[phone]; // Optional: remove OTP after successful verification
        return res.json({ success: true, message: 'OTP verified successfully' });
    }

    res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
});


const PORT = process.env.PORT || 6000;
const MONGO_URL= process.env.MONGO_URL
//mongo db connect
mongoose.connect(MONGO_URL) 
try {
    console.log("mongodb conneted")
}
catch (error) {
    console.error(error)
}
server.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`)
})