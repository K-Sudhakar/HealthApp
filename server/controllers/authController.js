// controllers/authController.js
import User from '../models/user.js';
import mongoose from 'mongoose';
export const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user
        const registrationId = new mongoose.Types.ObjectId().toString();
        const newUser = new User({ registrationId, name, email, password });
        // You may want to hash the password before saving
        await newUser.save();

        // Respond with the created user (excluding the password)
        res.status(201).json({ message: "User registered successfully", user: { id: newUser._id, name: newUser.name, email: newUser.email } });
    } catch (error) {
        next(error);
    }
};
