import { User } from "../models/userModels.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from "jsonwebtoken";
import { UsersetCookieGenerateToken } from "../utilis/userGenerateToken.js";
// import { userGenerateTokenAndSetCookie } from "../utilis/userGenerateToken.js";
export  const signup = async (req,res)=>{
    try {
        const {username, email,phoneNumber, gender,password} = req.body;
        if(!username ||!email ||!phoneNumber ||!gender ||!password){
            return res.status(400).json({ message: 'All fields are required'});
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({ message: 'User already exists'});
        }
        const existingPhone = await User.findOne({ phoneNumber });
        if (existingPhone) {
            return res.status(400).json({ message: 'phoneNumber already taken' });
        }
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists please try another ' });
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

//login \
const generateToken = () =>{
    token = jwt.asign(id, process.env.SECTRET_KEY, {expiresIn:"15mins"})
}
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by admission number
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid email address" });
        }
 
        // Compare passwords
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Generate authentication tokens (if applicable)
        UsersetCookieGenerateToken(res, user);
        await user.save();

        // ✅ Store user details in session
        req.session.user = {
            id: user._id,
            // admNo: user.admNo,
            email: user.email,
            username:user.username,
            //     year:user.year,
            phoneNumber: user.phoneNumber,
            profilepic: user.profilepic, // Add the avatar URL or path here
        };
        console.log("✅ Session after login:", req.session);

        // ✅ Return user details in response (excluding password)
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
};

// const generateToken = (userId) => {
//     return jwt.sign({ userId }, process.env.SECTRET_KEY, { expiresIn: "15m" });
// };

// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Check if user exists
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: "Invalid email address" });
//         }

//         // Compare passwords
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: "Invalid password" });
//         }

//         // Generate JWT token
//         const accessToken = generateToken(user._id);

//         // Set cookie with the token
//         res.cookie("token", accessToken, {
//             httpOnly: true,
//             secure: true,
//             sameSite: "None",
//             maxAge: 15 * 60 * 1000, // 15 minutes
//         });

//         res.status(200).json({
//             message: "Login successful",
//             user: {
//                 _id: user._id,
//                 username: user.username,
//                 email: user.email,
//                 phoneNumber: user.phoneNumber,
//                 gender: user.gender,
//                 profilepic: user.profilepic, // Include profile picture
//                 createdAt: user.createdAt,
//             },
//         });

//     } catch (error) {
//         console.error("❌ Login Error:", error);
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// };

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
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the new username is already taken (excluding the current user)
        if (username) {
            const existingUsername = await User.findOne({ username });
            if (existingUsername && existingUsername._id.toString() !== id) {
                return res.status(400).json({ message: "Username already exists. Please try another." });
            }
        }

        // Check if the new email is already taken (excluding the current user)
        if (email) {
            const existingEmail = await User.findOne({ email });
            if (existingEmail && existingEmail._id.toString() !== id) {
                return res.status(400).json({ message: "Email already exists. Please use a different one." });
            }
        }

        // Check if the new phone number is already taken (excluding the current user)
        if (phoneNumber) {
            const existingPhone = await User.findOne({ phoneNumber });
            if (existingPhone && existingPhone._id.toString() !== id) {
                return res.status(400).json({ message: "Phone number already exists. Please use a different one." });
            }
        }

        // If password is being updated, hash it
        let updatedFields = { ...req.body };
        if (password) {
            if (password.length < 8) {
                return res.status(400).json({ message: "Password must be at least 8 characters long." });
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
        const user = await User.findByIdAndDelete({_id:id});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) { 
        console.error("�� Delete Error:", error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
}
export const checkAuth = async (req, res) => {

    try {
        const existinguser = await User.findOne({ User: User._id }).select("-password");
        if (!existinguser) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        console.log(existinguser)
        res.status(200).json({ success: true, existinguser });
    } catch (error) {
        console.log("Error in checkAuth ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};


