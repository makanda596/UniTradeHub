import { Review } from "../models/Review.js"
import { User } from "../models/userModels.js";
import { sendReviewsEmail } from "../utilis/sendEmail.js";

// MAKING OF A REVIEW TO A SELLER
export const MakeReview = async (req, res) => {
    const senderId = req.user.id;
    const {recieverId} = req.params
    const { text } = req.body;

    try {
        if (!senderId || !recieverId || !text) {
            return res.status(400).json({ success: false, message: "Please input all fields" });
        }

        const existingUser = await User.findById(recieverId);
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const newReview = new Review({
            senderId,
            recieverId,
            text 
        });
        const ReviewUrl = `https://unitradehubs.onrender.com//customerreviews`
        await sendReviewsEmail(existingUser.email, ReviewUrl)
        await newReview.save();

       //save this ad push to reviews schema
        existingUser.reviews.push(newReview._id);
        await existingUser.save(); 

        res.status(201).json({ success: true, message: "Review posted successfully", review: newReview });
    } catch (error) {
        console.error("Error posting review:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

//GETTING OF ALL REVIEWS
export const getReview = async (req,res)=>{
    const { recieverId }=req.params
    try {
        if(!recieverId){
            res.status(400).json({ message: "user not found" })
        }
        const userReviews = await Review.find({ recieverId: recieverId  }).sort({createdAt:-1})
        res.json(userReviews)
    } catch (error) {
         console.error("Error sending message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

//GETTING OF A SPECIFIC USER`S REVIEW
export const getUserReview = async (req, res) => {
    try {
        
        const userReviews = await Review.find({ recieverId: req.user.id }).sort({ createdAt: -1 })
        res.json(userReviews)
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const deleteReview = async (req, res) => {
    const { id } = req.params; // ID of the review to delete

    try {
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ message: "No review found with this ID" });
        }

        // Remove review from the Review collection
        await Review.findByIdAndDelete(id);
        console.log(review.recieverId)
        // Find the user who received the review and update their reviews array
        const user = await User.findById(review.recieverId);
        if (user) {
            user.reviews = user.reviews.filter((reviewId) => reviewId.toString() !== id);
            await user.save(); // Save updated user document
        }

        res.json({ message: "Review deleted successfully", deletedReview: review });
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//COUNTING OF USER REVIEWS
export const countReview = async(req,res)=>{
       try {
           const Count = await Review.countDocuments({ recieverId: req.user.id});
   
           res.status(200).json( Count );
       } catch (error) {
           res.status(500).json({ success: false, message: "Error counting posts", error });
       }
}

