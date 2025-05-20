import { Flashsale } from "../models/Flashsale.js";
import { User } from "../models/userModels.js";
import cloudinary from '../utilis/cloudinary.js';


export const postFlash = async (req, res) => {
    const {  description,  image } = req.body;

    try {
        if (!description || !image) {
            return res.status(400).json({ error: "All fields including image are required." });
        }

        const existingUser = await User.findById(req.user.id);
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const uploadResponse = await cloudinary.uploader.upload(image);
        const expiring = new Date(Date.now()+48*60*60*1000)

        const flash = new Flashsale({
            description,
            image: uploadResponse.secure_url,
            createdBy: existingUser._id,
            expiresAt:expiring
        }); 

        await flash.save()
        existingUser.flash.push(flash._id)
         await existingUser.save()
        console.log(existingUser)
        res.status(201).json({ message: "Post created successfully!", flash });

    } catch (error) {
        console.error("❌ Post Creation Error:", error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};

// Example: getFlashsales.js
export const getFlash = async (req, res) => {
    try {
        const now = new Date();
        const flashsales = await Flashsale.find({expiresAt: { $gt: now }, createdBy: { $ne: req.user.id}})
        .sort({ createdAt: -1 })
        .populate({
            path:"createdBy",
            select:"username profilepic"
        });
        res.status(200).json({ flashsales });
    } catch (error) {
        console.error("Error fetching flash sales:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getUserFlash = async (req, res) => {
    try {
        const now = new Date();

        const userFlash = await Flashsale.find({
            expiresAt: { $gt: now },
            createdBy: req.user.id
        })
            .sort({ createdAt: -1 });


        res.status(200).json({ userFlash });
    } catch (error) {
        console.error("Error fetching flash sales:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
  
