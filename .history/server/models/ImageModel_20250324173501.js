import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
    {
        text:{
            type:String
        },
        image: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);

export default Image;
