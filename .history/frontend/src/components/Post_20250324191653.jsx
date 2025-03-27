export const createPost = async (req, res) => {
    const { productName, description, category, image } = req.body;
    const { id } = req.params;

    try {
        if (!productName || !description || !category) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        
        if (!image) {
                   return res.status(400).json({ error: "No image provided." });
               }
       
               // Upload to Cloudinary
               const uploadResponse = await cloudinary.v2.uploader.upload(image);

        const post = new Post({
            productName,
            description,
            category,
            image: uploadResponse.secure_url ,
            createdBy: existingUser._id,
        });

        const savedPost = await post.save();
        existingUser.posts.push(savedPost._id);
        await existingUser.save();

        res.status(201).json({ 
            message: "Post created successfully!", 
            post: savedPost 
        });
    } catch (error) {
        console.error("❌ Post Creation Error:", error);
        res.status(500).json({ 
            error: "Internal server error", 
            message: error.message 
        });
    }
};
