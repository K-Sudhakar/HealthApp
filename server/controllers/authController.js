// controllers/authController.js
import User from '../models/user.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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



export const loginUser = async (req, res, next) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ message: "Both username/email and password are required" });
    }

    try {
        // Fetch the user by username or email
        const user = await User.findOne({
            $or: [{ email: username }, { name: username }],
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid username/email or password" });
        }

        // Compare provided password with stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if ((password != user.password)) {
            return res.status(400).json({ message: "Invalid username/email or password" });
        }

        // Optionally, generate a JWT token for the user
        const token = jwt.sign(
            { id: user.registrationId, email: user.email, name: user.name },
            process.env.JWT_SECRET, // Store secret key in environment variables
            { expiresIn: "1h" } // Token expiry time
        );

        // Respond with success message and token
        res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user.registrationId, name: user.name, email: user.email },
        });
    } catch (error) {
        console.error("Error during login:", error);
        next(error);
    }
};
