import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user_id: { type: String, required: true, unique: true } 
});

export const Users = mongoose.model('User', userSchema);
