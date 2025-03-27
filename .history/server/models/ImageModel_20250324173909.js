import mongoose from "mongoose";

const imagSchema = new mongoose.Schema(
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

const Imag = mongoose.model("Imag", imagSchema);

export default Image;
