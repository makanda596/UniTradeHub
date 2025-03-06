import { User } from "../models/userModels.js";

export  const signup = async (req,res)=>{
    try {
        const {name, email,phoneNumber, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({error: 'User already exists'});
        }
        const user = new User({ name, email, phoneNumber, password});
        await user.save();
        return res.status(201).json({message: 'User registered successfully'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Server error'});
    }
}