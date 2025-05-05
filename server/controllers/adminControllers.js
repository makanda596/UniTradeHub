import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/adminModels.js';
import { User } from '../models/userModels.js';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECTRET_KEY, { expiresIn: '20mins' });
};

export const adminSignup = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: 'Please provide both username and password' });
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(409).json({ message: 'Admin with this username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            username,
            password: hashedPassword,
        });

        const savedAdmin = await newAdmin.save();
        res.status(201).json({
            message: 'Admin created successfully',
            admin: {
                _id: savedAdmin._id,
                username: savedAdmin.username,
            },
        });
    } catch (error) {
        console.error('Error during admin signup:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: 'Please provide both username and password' });
        }

        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' }); // Use 401 for unauthorized
        }

        const isPasswordMatch = await bcrypt.compare(password, admin.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' }); // Use 401 for unauthorized
        }

        const token = generateToken(admin._id);

        res.status(200).json({
            message: 'Admin logged in successfully',
            admin: {
                _id: admin._id,
                username: admin.username,
            },
            token,
        });
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
export const profile = async (req, res) => {
    try {
        // Assuming req.user.id is populated after authentication
        const admin = await Admin.findById(req.admin.id).select("-password"); // Use the correct method to find by ID
        if (!admin) {
            return res.status(404).json({ message: "No admin found" });
        }
        return res.json(admin);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
};


export const update = async (req, res) => {
    const { username, password } = req.body;

    try {
        const adminToUpdate = await Admin.findById(req.admin.id);
        if (!adminToUpdate) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (username) {
            const existingAdmin = await Admin.findOne({ username });
            if (existingAdmin && existingAdmin._id.toString() !== req.admin.id) {
                return res.status(400).json({ message: 'Username already exists. Please try another.' });
            }
            adminToUpdate.username = username;
        }

        if (password) {
            if (password.length < 8) {
                return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            adminToUpdate.password = hashedPassword;
        }

        const updatedAdmin = await adminToUpdate.save();

        res.status(200).json({
            message: 'Admin updated successfully',
            admin: {
                _id: updatedAdmin._id,
                username: updatedAdmin.username,
            },
        });
    } catch (error) {
        console.error('Error during admin update:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const checkAuth = async (req, res) => {
    try {
        const existingAdmin = await Admin.findById(req.admin.id).select('-password');
        if (!existingAdmin) {
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        res.status(200).json({ success: true, admin: existingAdmin });
    } catch (error) {
        console.error('Error in checkAuth:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        // Consider what "logout" means for an API. Often, it involves the client discarding the token.
        // Clearing the cookie on the server-side can be a good practice if you're using cookies for session management.
        res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'None' });
        res.status(200).json({ message: 'Admin logged out successfully' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

//getting all users

export const getUsers = async (req,res)=>{
    try {
        const admin = await Admin.findById(req.admin.id)
        if(!admin){
            res.json({message:"please log in "})
        }
        const users = await User.find({}).sort({createdAt:-1})
        if(!users){
            res.status(401).json({message:"users not found"})
        }
        res.json(users)
    } catch (error) {
     console.error("error getting users",error)
        res.status(500).json({ message: 'Internal server error', error: error.message });
 
    }
}

//counting of users
export const countUsers = async (req,res)=>{
    try {
        const admin = await Admin.findById(req.admin.id)
        if(!admin){
            res.json({message:"please log infirst"})
        }
        const count = await User.countDocuments()
        res.json(count)
    } catch (error) {
        console.error("error counting users",error)
        res.json({message:"error counting the users"})
    }
}

//get one user
export const oneUser = async (req,res)=>{
    const {userId} = req.params
    try {
        const admin = await Admin.findById(req.admin.id)
        if (!admin) {
          return  res.status(401).json({ message: "please log infirst" })
        }
        const user = await User.findById(userId)
        if(!user){
        return    res.status(401).json({message:"no user found with this id"})
        }
        res.status(200).json(user)
    } catch (error) {
        console.error("error counting users", error)
        res.json({ message: "error counting the users" }) 
    }
}