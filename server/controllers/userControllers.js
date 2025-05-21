import { User } from "../models/userModels.js";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from "jsonwebtoken";
import { Post } from "../models/postModel.js";
import { sendEmail, sendRestPasswordConfirmationEmail, 
    sendConfirmationEmail, sendEmailVerification, sendEmailChange, SuccessEmailChange, sendEmailDeleted } from "../utilis/sendEmail.js";
import dotenv from 'dotenv';
import { Suspended } from "../models/SuspendedModel.js";
import { Alert } from "../models/Alert.js";
dotenv.config();
import { validationResult } from 'express-validator';




export const signup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                message: 'Please check your inputs',
                errors: errors.array(),
            });
        }

        const { username, email, phoneNumber, gender, password } = req.body;

        // Basic validations
        if (!['male', 'female'].includes(gender.toLowerCase())) {
            return res.status(400).json({ message: "Gender must be either 'male' or 'female'" });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        if (phoneNumber.length < 10) {
            return res.status(400).json({ message: "Phone number must be at least 10 digits" });
        }

        // Check for existing records
        const [existingEmail, existingPhone, existingUsername] = await Promise.all([
            User.findOne({ email }),
            User.findOne({ phoneNumber }),
            User.findOne({ username }),
        ]);

        if (existingEmail) {
            return res.status(409).json({ message: "An account with this email already exists" });
        }

        if (existingPhone) {
            return res.status(409).json({ message: "Phone number is already registered" });
        }

        if (existingUsername) {
            return res.status(409).json({ message: "Username is already taken" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate profile picture URL
        const profilepic = gender.toLowerCase() === 'male'
            ? `https://avatar.iran.liara.run/public/boy?username=${username}`
            : `https://avatar.iran.liara.run/public/girl?username=${username}`;

        // Generate verification code
        const verificationCode = crypto.randomBytes(2).toString("hex");
        const verificationCodeExpires = Date.now() + 15 * 60 * 1000; // 15 mins

        // Create user
        const user = new User({
            username,
            email,
            phoneNumber,
            gender,
            password: hashedPassword,
            profilepic,
            verificationCode,
            verificationCodeExpires,
        });

        await user.save();

        // Send verification email
        try {
            await sendEmailVerification(email, verificationCode);
        } catch (emailError) {
            console.error("Failed to send email:", emailError);
            return res.status(500).json({ message: "User created but failed to send verification email" });
        }

        // Log new user alert
        try {
            const alert = new Alert({
                message: "New user signed up",
                type: "user",
            });
            await alert.save();
        } catch (alertError) {
            console.warn("User created but failed to save alert:", alertError);
        }

        // Respond success
        res.status(200).json({
            message: "User signed up successfully",
            user:{
                ...user._doc,
                password: undefined,
                username:undefined,
                phoneNumber:undefined,
                
                
            }
        });

    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

//EMAIL VERIFICATION RESEND CODE
export const EmailVerificationResend = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "The email does not exist" });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'User already verified. Please login.' });
        }

        const verificationCodeExpires = Date.now() + 15 * 60 * 1000;
        const verificationCode = crypto.randomBytes(2).toString("hex").toUpperCase();

        user.verificationCode = verificationCode;
        user.verificationCodeExpires = verificationCodeExpires;
        user.status = false;
        await user.save();

        await sendEmailVerification(email, verificationCode);


        res.status(200).json({
            message: "New verification code sent to your email",
            email: user.email
        });

    } catch (error) {
        console.error('Resend verification error:', error);
        res.status(500).json({
            message: "Error resending verification code",
            error: error.message
        });
    }
};
//EMAIL VERIFICATION 
export const EmailVerification = async (req, res) => {
    const { code } = req.body
    try {
        const user = await User.findOne({
            verificationCode: code,
            verificationCodeExpires: { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({ message: "invalid code or code already expired" })
        }

        user.isVerified = true;
        user.verificationCode = undefined;
        user.verificationCodeExpires = undefined;

        await user.save();
        await sendConfirmationEmail(user.email)
        return res.status(200).json({ message: "verified code succesfull" })
    }
    catch (error) {
        return res.status(400).json(error.message)
    }
}
// LPGIN SECTION
export const login = async (req, res) => {
     const generateToken = (id) => {
            try {  
                const token = jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "1d" });
    
                res.cookie("token", token, {
                    sameSite: "Strict",
                    httpOnly: true,
                    secure: true,
                });
    
                return token; // ✅ Important to return the token
            } catch (error) {
                console.error("Token generation failed:", error.message);
                throw new Error("Token generation failed");
            }
        };
    const { email, password } = req.body;
   
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid email address" });
        }
        const suspended = await Suspended.findOne({email})
        if(suspended){
            return res.status(401).json({message:"this is account has been suspended"})
        }

        if (!user.isVerified) {
            return res.status(403).json({
                message: "Please verify your email first",
                isVerified: false,
                userId: user._id
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            user.limits +=1;
            if(user.limits >= 3){
                user.limitUntil = new Date(Date.now() + 1*60 *1000)
            }
            await user.save()
            return res.status(400).json({ message: "Incorrect password" });
        }
        user.limits = 0,
            user.limitUntil=null
        user.lastLogin = new Date()
        await user.save()
        res.status(200).json({
            message: "User logged in",
        
            token: generateToken(user._id)
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

//LOGOUT SECTION PART
export const logout = async (req, res) => {
    try {
        res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "None" });
        res.clearCookie("refreshtoken", { httpOnly: true, secure: true, sameSite: "None" });
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
//GETTING ALL THE USERS
export const getUsers = async (req, res) => {
    const userId = req.user.id;
    try {
        const publicUserFields = "username profilepic ";

        const users = await User.find({ _id: { $ne: userId } })
            .select(publicUserFields)
            .lean()
            .sort({ createdAt: -1 });

        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//USER PROFILE
export const profile = async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select(" -password").populate("cart", "postId")
        if (!user) {
            res.status(400).json({ message: "not authoticated" })
        }
        res.status(200).json({ mesage: "user information",user})
    } catch (error) {

    }
}
//UPDATING SECTION
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, phoneNumber, password, bio, location, tempEmail } = req.body;

    try {
        const user = await User.findById({ _id: id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (username.length > 15) {
            return res.status(400).json({ message: "The username should not be more than 15 characters" });
        }

        if (username) {
            const existingUsername = await User.findOne({ username });
            if (existingUsername && existingUsername._id.toString() !== id) {
                return res.status(400).json({ message: "Username already exists. Please try another." });
            }
        }

        if (email && email !== user.email) {
            const existingEmail = await User.findOne({ email });
            if (existingEmail && existingEmail._id.toString() !== id) {
                return res.status(400).json({ message: "Email already exists. Please use a different one." });
            }

            const verification = crypto.randomBytes(2).toString("hex").toUpperCase();
            const verificationExpiresAt = Date.now() + 10 * 60 * 1000;

            user.tempEmail = email;
            user.verificationCode = verification;
            user.verificationCodeExpires = verificationExpiresAt;

            await user.save();
            await sendEmailChange(email, user.verificationCode)
                        return res.status(200).json({
                message: "Verification code sent to new email.",
                requiresVerification: true,
            });
        }
        

        if (phoneNumber) {
            const existingPhone = await User.findOne({ phoneNumber });
            if (existingPhone && existingPhone._id.toString() !== id) {
                return res.status(400).json({ message: "Phone number already exists. Please use a different one." });
            }
        }


        let updatedFields = { ...req.body };
        if (password) {
            if (password.length < 8) {
                return res.status(400).json({ message: "Password must be at least 8 characters long." });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedFields.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate({ _id: id }, updatedFields, { new: true });

        res.status(200).json({ message: "User updated successfully", updatedUser });

    } catch (error) {
        console.error("❌ Update Error:", error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};

export const EmailChangeResend = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const email = user.tempEmail;
        if (!email) {
            return res.status(400).json({ message: "No pending email change found." });
        }

        const verificationCode = crypto.randomBytes(2).toString("hex").toUpperCase();
        const verificationCodeExpires = Date.now() + 10 * 60 * 1000; 

        user.verificationCode = verificationCode;
        user.verificationCodeExpires = verificationCodeExpires;
        await user.save();
        await sendEmailChange(email, verificationCode)
        return res.status(200).json({
            message: "New verification code sent to your new email",
            email,
        });

    } catch (error) {
        console.error("Email resend error:", error);
        return res.status(500).json({
            message: "Failed to resend verification code",
            error: error.message,
        });
    }
};

//updating the email
export const verifyEmailChange = async (req, res) => {
    const { id } = req.params;
    const { code } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.verificationCode || !user.tempEmail) {
            return res.status(400).json({ message: "No pending email change" });
        }

        if (user.verificationCodeExpires < Date.now()) {
            return res.status(400).json({ message: "Verification code expired" });
        }

        if (user.verificationCode !== code.toUpperCase()) {
            return res.status(400).json({ message: "Invalid verification code" });
        }

        user.email = user.tempEmail;
        user.tempEmail = undefined;
        user.verificationCode = undefined;
        user.verificationCodeExpires = undefined;
        await SuccessEmailChange(user.email)
        await user.save();

        res.status(200).json({ message: "Email updated successfully" });

    } catch (err) {
        console.error("Email verification error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

//DELETING OF A USER
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(user.email)
        await sendEmailDeleted(user?.email)
        res.status(200).json({ message: "User deleted successfully", user });
    } catch (error) {
        console.error("�� Delete Error:", error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
}
//CHECKING AUTH
export const checkAuth = async (req, res) => {

    try {
        const existinguser = await User.findById(req.user.id).select("-password");
        if (!existinguser) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user: existinguser });
    } catch (error) {
        console.log("Error in checkAuth ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};


//USER PROFILE
export const userprofile = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findOne({ _id: id })
            .populate("posts", "productName description image createdAt")
            .populate("reviews", "text senderId").populate("following", "followedId followerId status");
        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }
        res.status(200).json(user)
    } catch (error) {
        return res.json(error.message)

    }
}
//GET USER SPECIFIC POSTS
export const usergetposts = async (req, res) => {
    try {
        const id = req.user.id;

        const user = await User.findById(id).populate("posts", "productName image description createdAt").sort({ createdAt: -1 });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//COUNTING OF THE USER SPECOFIC POSTS
export const countUserPost = async (req, res) => {
    try {
        const postCount = await Post.countDocuments({ createdBy: req.user.id });

        res.status(200).json({ success: true, postCount });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error counting posts", error });
    }
}


// Delete a post
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        // Ensure the user deleting is the owner
        if (post.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        await Post.findByIdAndDelete(req.params.postId);
        res.json({ success: true, message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting post", error });
    }
};

//ADDINF A POST TO CART
export const addToCart = async (req, res) => {
    try {
        const { postId } = req.params; // Get postId from URL params

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });

        // Find the user and check if the post is already in the cart
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.cart.includes(postId)) {
            return res.status(400).json({ message: "Post is already in your cart" });
        }

        // Add post to cart
        user.carts.push(postId);
        await user.save();

        res.status(200).json({ message: "Post added to cart", cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

//REMOVING A POST FROM CART
export const removeFromCart = async (req, res) => {
    try {
        const { postId } = req.params; // Get postId from URL params

        // Find the user
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Remove the post from the cart
        user.cart = user.cart.filter(id => id.toString() !== postId);
        await user.save();

        res.status(200).json({ message: "Post removed from cart", cart: user.cart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};



//FORGET PASSWORD SECTION
export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // 1. Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // 2. Generate reset token (expires in 10 mins)
        const resetToken = crypto.randomBytes(20).toString("hex")
        user.resetPasswordExpires = Date.now() + 20 * 60 * 1000; // 10 minutes
        user.resetPasswordToken = resetToken
        await user.save();

        const resetURL = `https://unitradehubs.onrender.com/ResetPassword/${resetToken}`
        await sendEmail(email, resetURL);
 
        res.status(200).json({ message: 'Reset email sent' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending email' });
    }
};

//RESETTING OF THE PASSWORD
export const resetPassword = async (req, res) => {
    const { password } = req.body;
    const { token } = req.params

    try {
        // const hashedToken = crypto
        //   .createHash('sha256')
        //   .update(token)
        //   .digest('hex');

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const hashPassword = await bcrypt.hash(password, 10)
        user.password = hashPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        sendRestPasswordConfirmationEmail(user.email, user.username)
        res.status(200).json({ message: 'Password updated' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password' }, error.message);
    }
};
