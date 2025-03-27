import { Conversation } from "../models/conversationModel.js"
import { Message } from "../models/MessageModel.js"
import  cloudinary from '../utilis/cloudinary.js'
export const sendMessage = async(req,res)=>{
    const { id:recieverId } = req.params
    const senderId  = req.user.id
    const {message,image} = req.body

    try {
        // if (!message || !recieverId) {
        //     return res.status(400).json({ message: "Message content and receiver ID are required" });
        // }

        let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
        let conversation = await Conversation.findOne({
            participants: { $all: [recieverId, senderId]}
        })
        if(!conversation){ 
             conversation = await Conversation.create({
                participants: [recieverId, senderId]
            })
        }

        const newMessage = new Message({
            message, recieverId,image: imageUrl, senderId
        })
        await newMessage.save()
        conversation.messages.push(newMessage._id);
        await conversation.save();
        res.status(201).json({ message: "Message sent successfully!", newMessage });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}