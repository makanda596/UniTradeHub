import mongoose from "mongoose";

const imagSchema = new mongoose.Schema(
    {
       
        image: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Imag = mongoose.model("Imag", imagSchema);

export default Imag;
