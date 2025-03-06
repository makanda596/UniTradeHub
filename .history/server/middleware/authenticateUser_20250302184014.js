import { User } from "../models/userModels";

export const authenticateUser = async (req, res, next) => {
    let token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Unauthorized. No token provided." });
    }

    token = token.split(" ")[1]; // Remove 'Bearer ' part

    try {
        const decoded = jwt.verify(token, process.env.SECTRET_KEY);

        // Fetch the full user object from the database
        const user = await User.findById(decoded.id).select("-password"); // Exclude password for security

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user; // Store full user object in req.user
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token." });
    }
};
