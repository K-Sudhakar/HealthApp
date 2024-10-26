// models/user.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    registrationId: { type: String, unique: true },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
   
    // Add any other fields you need
});

const User = mongoose.model('User', userSchema);
export default User;
