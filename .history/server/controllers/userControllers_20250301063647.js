import { User } from "../models/userModels.js";
import bcrypt from 'bcrypt';
export  const signup = async (req,res)=>{
    try {
        const {username, email,phoneNumber, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({error: 'User already exists'});
        }
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: 'Username already exists please try another ' });
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = new User({ username, email, phoneNumber, password: hashedPassword });
        await user.save();
        return res.status(201).json({message: 'User registered successfully'});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: 'Server error'});
    }
}

export const login = async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user ||!(await user.matchPassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = await user.generateAuthToken();
        return res.json({ message: 'Logged in successfully', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}