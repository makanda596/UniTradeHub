import { User } from "../models/userModels.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';

import { userGenerateTokenAndSetCookie } from "../utilis/userGenerateToken.js";
export  const signup = async (req,res)=>{
    try {
        const {username, email,phoneNumber, gender,password} = req.body;
        if(!username ||!email ||!phoneNumber ||!gender ||!password){
            return res.status(400).json({error: 'All fields are required'});
        }
        if (password.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters long" });
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({error: 'User already exists'});
        }
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: 'Username already exists please try another ' });
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const boyprofilepic = (`https://avatar.iran.liara.run/public/boy?username=${username}`)
        const girlprofilepic = (`https://avatar.iran.liara.run/public/girl?username=${username}`)

            
        const user = new User({ 
            username, 
            email, 
            phoneNumber, 
            password: hashedPassword,
            gender,
            profilepic: gender === "male" ? boyprofilepic : girlprofilepic
        });
        await user.save();
        return res.status(201).json({message: 'User registered successfully',
            user:{
                ...user._doc,
                password:undefined,
            }}
        );
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Server error'});
    }
}

export const login = async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({ error: 'invalid email address' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({ error: 'invalid password' });
        }
        // Generate JWT token and set cookie
        userGenerateTokenAndSetCookie(res,user)
        await user.save()
        req.session.user = ({
            _id:user._id,
            username: user.username,
            email: user.email,
            gender:user.gender,
            profilepic: user.profilepic,
            phoneNumber: user.phoneNumber,
        })
        console.log("✅ Session after login:", req.session);

        req.session.save((err) => {
            if (err) {
                console.error("Session save error:", err);
                return res.status(500).json({ message: "Session error" });
            }
            res.json({ message: "Login successful", user: req.session.user });
        });

    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "None" });
        res.clearCookie("refreshtoken", { httpOnly: true, secure: true, sameSite: "None" });
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};