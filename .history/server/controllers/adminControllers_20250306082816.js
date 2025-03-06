import bcrypt from "bcrypt"
import { adminGenerateToken } from "../utilis/adminGenerateToken"
export const adminsignup = async(req,res)=>{

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
        
        adminGenerateToken(admin)
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
        if(adminEmail && adminEmail._id.toString() !== id )

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
        
    }
}