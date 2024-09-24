import mongoose from "mongoose";

const  Schema  = mongoose.Schema

const threadSchema = new Schema({
    thread_id: { type: String, required: true, unique: true },  
    participant1: { type: String, ref: 'User', required: true },  
    participant2: { type: String, ref: 'User', required: true },  
//   date: { type: String }, 
    createdAt: { type: Date, default: Date.now }  
});

export const ConversationThread = mongoose.model('Thread', threadSchema);
