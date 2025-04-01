import bcrypt from "bcryptjs"
import { adminGenerateToken } from "../utilis/adminGenerateToken.js"
import { Admin } from "../models/adminModels.js"
export const adminlogin = async(req,res)=>{

    const {email,password}=req.body
    try {
    
        const admin = await Admin.findOne({email})
        if(!admin){
            res.status(404).json({message: 'Email does not exist'})
        }
        const ispassword = bcrypt.compare(admin.password, password)
        if(!ispassword){
            res.status(404).json({message: 'inccorect password'})
        }
        
        adminGenerateToken(res,admin)
       await  admin.save()
        req.session.admin={
            id:admin._id,
            email:admin.email,
        }
        req.session.save((err) => {
            if (err) {
                console.error("Session save error:", err);
                return res.status(500).json({ message: "Session error" });
            }
            res.json({ message: "Login successful", user: req.session.user });
        });
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const updateAdmin = async (req,res)=>{
    const {id} = req.params
    const {email,password} = req.body
    try {
        const adminId = await Admin.findById(id)
        if(!adminId) {
            res.status(400).json({message:"user not found"})
        }
        //update the email 
        const adminEmail = await Admin.find({email})
        if (adminEmail && adminEmail._id.toString() !== id) {
            return res.status(400).json({ message: "Email already exists. Please use a different one." });
        }

            if(password){
            let updatedfields = {...req.body}
            //updatepassword
        const hashpassword = await bcrypt.hash(password,10)
        updatedfields.password = hashpassword
            }

        const updateadmin = await Admin.findByIdAndUpdate({_id:id}, updatedfields , {new:true})
        if(!updateadmin){
            res.satus(401).json({message:"failed to update the infomation"})
        }
        res.status(200).json({ message: "admin updated successfully", updateadmin });


    } catch (error) {
        console.error("❌ Update Error:", error);
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
}

export const adminprofile = (req, res) => {
    if(req.session.admin){
        return res.send( {
            message:"admin details",
            admin:req.session.admin
        })
    }
    else{
        res.status(401).json({ message: "you need to log in" })

    }
}

export const adminsignup = async (req,res)=>{
    const {email,password}= req.body
    try {
        const existingadmin = await Admin.findOne({email})
        if (existingadmin){
            res.status(404).json({message:"email already exist"})
        }
        const hashpassword = await bcrypt.hash(password,10)

        const admin = new Admin({
            email, password:hashpassword
        })
        await admin.save()
        res.status(200).json({message:"user signed up", 
            admin:{
                ...admin._doc,
                password: undefined,
            }
        }       
        )
    } catch (error) {
       res.status(404).json(error.message) 
    }
}