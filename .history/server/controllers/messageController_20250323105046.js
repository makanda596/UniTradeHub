import { Conversation } from "../models/conversationModel"
export const sendMessage = async(req,res)=>{
    const { id:recieverId } = req.params
    const { senderId } = req.user.id
    const {message} = req.body

    try {
        if (!message || !reciverId) {
            return res.status(400).json({ message: "Message content and receiver ID are required" });
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
            message, recieverId, senderId
        })
        await newMessage.save()
        conversation.messages.push(newMessage._id);
        await conversation.save();
    } catch (error) {
        
    }
}