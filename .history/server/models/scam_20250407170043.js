import mongoose from 'mongoose'

const ScamSchema = new mongoose.Schema({
     participants:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }],
    
},{timestamps:true})

export default Scam = new mongoose.model("Scam", ScamSchema)