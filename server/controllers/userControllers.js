import { User } from "../models/userModels.js";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from "jsonwebtoken";
import { Post } from "../models/postModel.js";
import { sendEmail, sendRestPasswordConfirmationEmail, sendConfirmationEmail, sendEmailVerification } from "../utilis/sendEmail.js";
import dotenv from 'dotenv';
dotenv.config();

//SIGN UP SECTION
export const signup = async (req, res) => {
    try {
        const { username, email, phoneNumber, gender, password, bio, location } = req.body;
        if (!username || !email || !phoneNumber || !gender || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const existingPhone = await User.findOne({ phoneNumber });
        if (existingPhone) {
            return res.status(400).json({ message: 'phoneNumber already taken' });
        }
       if(phoneNumber.length <10){
        return res.status(400).json({message:"invalid phone number"})
       }
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists please try another ' });
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const boyprofilepic = (`https://avatar.iran.liara.run/public/boy?username=${username}`)
        const girlprofilepic = (`https://avatar.iran.liara.run/public/girl?username=${username}`)

        //sending of verification code
        const verificationCodeExpires = Date.now() + 15 * 60 * 1000;
        const verificationCode = crypto.randomBytes(2).toString("hex")

        //saving the user            
        const user = new User({
            username,
            email,
            phoneNumber,
            bio: bio || "",
            location: location || "",
            password: hashedPassword,
            gender,
            profilepic: gender === "male" ? boyprofilepic : girlprofilepic,
            verificationCode: verificationCode,
            verificationCodeExpires: verificationCodeExpires,
        });

        await user.save();
        await sendEmailVerification(email, verificationCode)

        res.status(200).json({
            message: "User signed up",
            user: {
                ...user._doc,
                password: undefined,
            },
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}

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
    const { email, password } = req.body;
    const generateToken = (id) => {
        return jwt.sign({ id }, process.env.SECTRET_KEY, { expiresIn: "1d" })
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid email address" });
        }

        // Check if user is verified
        if (!user.isVerified) {
            return res.status(403).json({
                message: "Please verify your email first",
                isVerified: false,
                userId: user._id
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        user.lastLogin = new Date()
        await user.save()
        res.status(200).json({
            message: "User logged in",
            user: {
                ...user._doc,
                password: undefined,
            },
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
    const userId = req.user.id
    try {
        const users = await User.find({ _id: { $ne: userId } }).select("-password").sort({ createdAt: -1 })
        if (!users) {
            return res.status(400).json({ message: "no user found" })
        }
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

//USER PROFILE
export const profile = async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password").populate("cart", "postId")
        if (!user) {
            res.status(400).json({ message: "not authoticated" })
        }
        res.status(200).json({ mesage: "user info", user })
    } catch (error) {

    }
}

//UPDATING SECTION
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, phoneNumber, password, bio, location } = req.body;

    try {
        // Check if the user exists
        const user = await User.findById({ _id: id });
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
        const updatedUser = await User.findByIdAndUpdate({ _id: id }, updatedFields, { new: true });

        res.status(200).json({ message: "User updated successfully", updatedUser });

    } catch (error) {
        console.error("❌ Update Error:", error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};

//DELETING OF A USER
export const deleteUser = async (req, res) => {
    const { createdBy: userId } = req.user.id
    try {
        const user = await Post.findOneAndDelete(userId)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await User.findByIdAndDelete(req.user.id)
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