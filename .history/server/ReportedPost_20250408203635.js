import mongoose from 'mongoose'

const ReportedPostSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", // ensure "Post" matches your actual model name
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    reason: {
        type: String,
        enum: [
            "Inappropriate Content",
            "Spam or misleading",
            "Harassment",
            "False Information",
            "Other"
        ],
        required: true
    }
}, { timestamps: true })

const ReportedPost = mongoose.model('ReportedPost', ReportedPostSchema)
export default ReportedPost
