import { User } from "../models/userModels.js";
import bcrypt from 'bcrypt';
import { userGenerateTokenAndSetCookie } from "../utilis/userGenerateToken.js";
export  const signup = async (req,res)=>{
    try {
        const {username, email,phoneNumber, password} = req.body;
        if(!username ||!email ||!phoneNumber ||!password){
            return res.status(400).json({error: 'All fields are required'});
        }
        if (password.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters long" });
        }
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
        if(!user){
            return res.status(404).json({ error: 'invalid email address' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({ error: 'invalid password' });
        }
        userGenerateTokenAndSetCookie(res,user)
        await user.save()
        req.session.user = ({
            _id:user._id,
            username: user.username,
            email: user.email,
        })
        return res.json({ message: 'Logged in successfully', user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
}