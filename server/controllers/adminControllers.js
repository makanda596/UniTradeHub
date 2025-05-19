import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/adminModels.js';
import { User } from '../models/userModels.js';
import { Post } from '../models/postModel.js';
import ReportedPost from '../models/ReportedPost.js';
import { Report } from '../models/Report.js';
import { Suspended } from '../models/SuspendedModel.js';
import { Alert } from '../models/Alert.js';





export const adminLogin = async (req, res) => {
    const generateToken = (id) => {
        try {  
            const token = jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "20m" });

            res.cookie("token", token, {
                sameSite: "Strict",
                httpOnly: true,
                secure: true,
                maxAge: 20 * 60 * 1000,
            });

            return token; // ✅ Important to return the token
        } catch (error) {
            console.error("Token generation failed:", error.message);
            throw new Error("Token generation failed");
        }
    };

    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Please provide both username and password' });
        }

        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordMatch = await bcrypt.compare(password, admin.password);
        if (!isPasswordMatch) {
            admin.limit +=1
            if(admin.limit >=2){
                admin.limitUntil = new Date(Date.now()+24*60*60*1000)
            } 
          await  admin.save()
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        admin.limit=0,
            admin.limitUntil = null  
        const token = generateToken(admin._id); 

        await admin.save()
        res.status(200).json({
            message: 'Admin logged in successfully',
            admin: {
                _id: admin._id,
                username: admin.username,
            },
            token
        });
        
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const profile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id).select("-password"); 
        if (!admin) {
            return res.status(404).json({ message: "No admin found" });
        }
         res.json(admin);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};

export const update = async (req, res) => {
    const { username, password } = req.body;

    try {
        const adminToUpdate = await Admin.findById(req.admin.id);
        if (!adminToUpdate) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (username) {
            const existingAdmin = await Admin.findOne({ username });
            if (existingAdmin && existingAdmin._id.toString() !== req.admin.id) {
                return res.status(400).json({ message: 'Username already exists. Please try another.' });
            }
            adminToUpdate.username = username;
        }

        if (password) {
            if (password.length < 8) {
                return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            adminToUpdate.password = hashedPassword;
        }

        const updatedAdmin = await adminToUpdate.save();

        res.status(200).json({
            message: 'Admin updated successfully',
            admin: {
                _id: updatedAdmin._id,
                username: updatedAdmin.username,
            },
        });
    } catch (error) {
        console.error('Error during admin update:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const checkAuth = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id).select('-password');
        if (!admin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        res.status(200).json({ success: true});
    } catch (error) {
        console.error('Error in checkAuth:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        
        res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'None' });
        res.status(200).json({ message: 'Admin logged out successfully' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

//getting all users

export const getUsers = async (req,res)=>{
    try {
        const admin = await Admin.findById(req.admin.id)
        if(!admin){
            res.json({message:"please log in "})
        }
        const users = await User.find({}).sort({createdAt:-1})
        if(!users){
            res.status(401).json({message:"users not found"})
        }
        res.json(users)
    } catch (error) {
     console.error("error getting users",error)
        res.status(500).json({ message: 'Internal server error', error: error.message });
 
    }
}

//counting of users 
export const countUsers = async (req,res)=>{
    try {
        const admin = await Admin.findById(req.admin.id)
        if(!admin){
            res.json({message:"please log infirst"})
        }
        const count = await User.countDocuments()
        res.json(count)
    } catch (error) {
        console.error("error counting users",error)
        res.json({message:"error counting the users"})
    }
}

//get one user
export const oneUser = async (req,res)=>{
    const {userId} = req.params
    try {
        const admin = await Admin.findById(req.admin.id)
        if (!admin) {
          return  res.status(401).json({ message: "please log infirst" })
        }
        const user = await User.findById(userId)
        if(!user){
        return    res.status(401).json({message:"no user found with this id"})
        }
        res.status(200).json(user)
    } catch (error) {
        console.error("error counting users", error)
        res.json({ message: "error counting the users" }) 
    }
}

//getting all the posts 
export const getAllPosts = async (req, res) => {

    // $ne it means not equal to will retrive all the posts which are not equal to the user id
    try {
        const admin = await Admin.findById(req.admin.id)
        if (!admin) {
            return res.status(401).json({ message: "please log infirst" })
        }
        const posts = await Post.find({}).populate("createdBy", "username phoneNumber profilepic").sort({createdAt:-1});
        res.status(200).json(posts);
    } catch (error) {
        console.error("❌ Fetch Posts Error:", error); 
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};

//count all posts 
export const countPosts = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id)
        if (!admin) {
            res.json({ message: "please log infirst" })
        }
        const count = await Post.countDocuments()
        res.json(count)
    } catch (error) {
        console.error("error counting users", error)
        res.json({ message: "error counting the users" })
    }
}

export const deletePost = async (req,res)=>{
    const {postId}= req.params
    try {
        const admin = await Admin.findById(req.admin.id)
        if (!admin) {
            return res.status(401).json({ message: "please log infirst" })
        }
        const post = await Post.findByIdAndDelete(postId)
        if(!post){
            res.status(401).json({message:"no post found with this id"})
        }

        await User.findByIdAndUpdate(post.createdBy,{$pull:{posts:postId}},{new:true})
        res.json({message:"post deleted succesfully"})
    } catch (error) {
        console.error(error.message)
    }
}

//get the reported posts
export const  getReported = async (req,res)=>{
    try{
        const admin = await Admin.findById(req.admin.id)
        if (!admin) {
            return res.status(401).json({ message: "please log infirst" })
        }
        const all = await ReportedPost.find({}).sort({ createdAt: -1 }).populate("postId", "image").populate("userId","username")
        if(!all){
            return res.status(401).json({message:"no reported post found"})
        }
        res.json(all)
    }catch(error){
        console.error("failed to load the posts",error)
        res.status(400).json(error.message)
    }
}

//count reported posts
export const countReportedPosts = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id)
        if (!admin) {
            res.json({ message: "please log infirst" })
        }
        const count = await ReportedPost.countDocuments()
        res.json(count)
    } catch (error) {
        console.error("error counting users", error)
        res.json({ message: "error counting the users" })
    }
}
///VIEW ONE REPORT
export const oneReport = async (req, res) => {
    const { postId } = req.params;

    try {
        const admin = await Admin.findById(req.admin.id);
        if (!admin) {
            return res.status(401).json({ message: "Please log in first" });
        }

        const report = await ReportedPost.findById(postId)
        .populate({
            path:"postId",
            select:" productName description image createdBy",
            populate:{
                path:"createdBy",
                select:"username profilepic email phoneNumber"
            }
        })
            .populate("userId", "username");

        if (!report) {
            return res.status(404).json({ message: "The post reported with this ID does not exist" });
        }

        res.status(200).json(report);
    } catch (error) {
        console.error("Failed to load the post:", error);
        res.status(500).json({ message: error.message });
    }
};

//count of the all the reported accounts
export const countReports = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id)
        if (!admin) {
            res.json({ message: "please log infirst" })
        }
        const count = await Report.countDocuments()
        res.json(count)
    } catch (error) {
        console.error("error counting users", error)
        res.json({ message: "error counting the users" })
    }
}

//get all the userreports
export const getReports = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id)
        if (!admin) {
            return res.status(401).json({ message: "please log in first" })
        }
        const all = await Report.find({}).sort({ createdAt: -1 })
        if (!all) {
            return res.status(401).json({ message: "no reported account found" })
        }
        res.json(all)
    } catch (error) {
        console.error("failed to load the posts", error)
        res.status(400).json(error.message)
    }
}

//count post Categories 
export const getPostCategoryCounts = async (req, res) => {
    try {
        const categoryCounts = await Post.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    count: 1
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);

        res.status(200).json(categoryCounts);
    } catch (error) {
        console.error("Error counting post categories:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

//count uses with the most followerss

export const getUserWithMostFollowers = async (req, res) => {
    try {
        // Step 1: Find the user with the most followers
        const topUserResult = await User.aggregate([
            {
                $project: {
                    username: 1,
                    profilepic: 1,
                    followersCount: { $size: "$followers" },
                },
            },
            { $sort: { followersCount: -1 } },
            { $limit: 1 },
        ]);

        if (topUserResult.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        const topUser = topUserResult[0];

        // Step 2: Find users who are following the top user
        const followersOfTopUser = await User.find({
            following: topUser._id,
        }).select("username profilepic");

        // Step 3: Get other users with their follower count (excluding the top user)
        const otherUsers = await User.aggregate([
            {
                $project: {
                    username: 1,
                    profilepic: 1,
                    followersCount: { $size: "$followers" },
                },
            },
            {
                $match: {
                    _id: { $ne: topUser._id }, // exclude top user
                },
            },
            { $sort: { followersCount: -1 } }, // sort remaining users by followers
            { $limit: 10 }, // optional: limit how many others to return
        ]);

        return res.status(200).json({
            topUser,
            followersOfTopUser,
            otherUsers,
        });
    } catch (error) {
        console.error("Error in follower analysis:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


//getting users with the most customer reviews

// GET: /api/users/top-reviewer
export const getTopReviewer = async (req, res) => {
    try {
        // Step 1: Find the user with the most reviews
        const topReviewerResult = await User.aggregate([
            {
                $project: {
                    username: 1,
                    profilepic: 1,
                    email: 1,
                    reviewsCount: { $size: { $ifNull: ["$reviews", []] } },
                },
            },
            { $sort: { reviewsCount: -1 } },
            { $limit: 1 },
        ]);

        if (topReviewerResult.length === 0) {
            return res.status(404).json({ message: "No users with reviews found" });
        }

        const topReviewer = topReviewerResult[0];

        // Step 2: Find users who have reviews (excluding the top reviewer)
        const otherReviewers = await User.aggregate([
            {
                $project: {
                    username: 1,
                    profilepic: 1,
                    email: 1,
                    reviewsCount: { $size: { $ifNull: ["$reviews", []] } },
                },
            },
            {
                $match: {
                    _id: { $ne: topReviewer._id }, // exclude the top reviewer
                    reviews: { $exists: true, $ne: [] }, // ensure they have reviews
                },
            },
            { $sort: { reviewsCount: -1 } }, // sort by number of reviews
            { $limit: 10 }, // Optional: Limit how many others to return
        ]);

      
        // Step 3: Return the top reviewer and other users with reviews
        return res.status(200).json({
            topReviewer,
            otherReviewers,
        });
    } catch (err) { 
        console.error("Error fetching top reviewer:", err);
        res.status(500).json({ message: "Server error" });
    }

  
};
export const suspendAccount = async (req, res) => {
    const { email } = req.body
    try {
        const emailExist = await User.findOne({ email })
        if (!emailExist) {
            return res.status(401).json({ message: "no email found with this account" })
        }
        const alreadySuspended = await Suspended.findOne({ email })
        if (alreadySuspended) {
            return res.status(400).json({ message: "account already suspended" })
        }

       const newAccount = new Suspended({
            email
        })
        await newAccount.save()
        res.status(200).json({ message: "account suspended ",newAccount })
    } catch (error) {
        res.status(400).json(error.message)
    }
}

//getting of accountsuspended
export const getAccounts = async (req,res)=>{
    try{
        const all = await Suspended.find({}).sort({createdAt:-1})
        if(!all){
            res.status(401).json({message:"no accounts found"})
        }
        res.json(all)
    }catch(error){
        res.status(400).json(error.message)
    }
}

//removing of account susoension
export const removeSuspended = async (req,res)=>{
    const {email}= req.body
    try{
        const emailExist = await Suspended.findOneAndDelete({email})
        if(!emailExist){
            res.status(401).json({message:"this account is not suspeded"})
        }
        res.status(200).json(emailExist)
    }catch(error){
        res.status(400).json(error.message)
    }
}

//count suspended acounts 
export const countAccounts = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id)
        if (!admin) {
            res.json({ message: "please log infirst" })
        }
        const count = await Suspended.countDocuments()
        res.json(count)
    } catch (error) {
        console.error("error counting users", error)
        res.json({ message: "error counting the users" })
    }
}

//getting alerts
export const getAlerts = async (req, res) => {
    try {
        const all = await Alert.find({}).sort({ createdAt: -1 })
        if (!all) {
            res.status(401).json({ message: "no accounts found" })
        }
        res.json(all)
    } catch (error) {
        res.status(400).json(error.message)
    }
}
