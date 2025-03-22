const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    gender: { type: String, required: true, enum: ["male", "female"] },
    profilepic: { type: String, default: "" },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }], // Store user’s posts
});

export const User = mongoose.model("User", UserSchema);
