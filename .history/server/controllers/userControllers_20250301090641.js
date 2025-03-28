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


export const getUsers = async (req, res) => {
    try {
        const student = await User.find({}).sort({ createdAt: -1 })
        if (!student) {
            return res.status(400).json({ message: "no user found" })
        }
        res.status(200).json(student)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const profile = async (req, res) => {
    console.log("Session Data:", req.session);
    if (req.session.user) {
        return res.send({
            message: "profiile details",
            user: req.session.user
        })
    }
    else {
        res.status(401).json({ message: "you need to log in" })
    }
}


export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, phoneNumber, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the new username is already taken (excluding the current user)
        if (username) {
            const existingUsername = await User.findOne({ username });
            if (existingUsername && existingUsername._id.toString() !== id) {
                return res.status(400).json({ error: "Username already exists. Please try another." });
            }
        }

        // Check if the new email is already taken (excluding the current user)
        if (email) {
            const existingEmail = await User.findOne({ email });
            if (existingEmail && existingEmail._id.toString() !== id) {
                return res.status(400).json({ error: "Email already exists. Please use a different one." });
            }
        }

        // Check if the new phone number is already taken (excluding the current user)
        if (phoneNumber) {
            const existingPhone = await User.findOne({ phoneNumber });
            if (existingPhone && existingPhone._id.toString() !== id) {
                return res.status(400).json({ error: "Phone number already exists. Please use a different one." });
            }
        }

        // If password is being updated, hash it
        let updatedFields = { ...req.body };
        if (password) {
            if (password.length < 8) {
                return res.status(400).json({ error: "Password must be at least 8 characters long." });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedFields.password = hashedPassword;
        }

        // Update user details
        const updatedUser = await User.findByIdAndUpdate({_id:id}, updatedFields, { new: true });

        res.status(200).json({ message: "User updated successfully", updatedUser });

    } catch (error) {
        console.error("❌ Update Error:", error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};


export const deleteUser = async (req,res)=>{
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
        console.error("�� Delete Error:", error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
}