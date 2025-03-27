import cloudinary from "cloudinary";
import dotenv from "dotenv";
import Imag from "../models/ImagModel.js";

dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: "db5pgr14l",
    api_key: "419672131612681",
    api_secret: "X6bdb7zw9Gae9IvWahEyzT9nB1o",
});

export const uploadImage = async (req, res) => {
    try {
        const { image } = req.body; // Expecting base64 string

        if (!image) {
            return res.status(400).json({ error: "No image provided." });
        }

        // Upload to Cloudinary
        const uploadResponse = await cloudinary.v2.uploader.upload(image);
        const newI = new Imag({
 imageUrl: uploadResponse.secure_url 
        })
        await newI.save()
        console.log()
        res.status(200).json({message:"phot",newI});
    } catch (error) {
        console.error("❌ Image Upload Error:", error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};
