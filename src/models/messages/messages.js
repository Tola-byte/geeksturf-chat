import mongoose from "mongoose";
const  Schema = mongoose.Schema;

const messageSchema = new Schema({
    id: {
        type: String,
        required: true
     },
    thread_id: { type: String, ref: 'Thread', required: true },  
    user_id: { type: String, ref: 'User', required: true },  
    content: { type: String, required: true },  
    time: { type: Date, default: Date.now },
    reply_to: { type: String, ref: 'Messages' }
});

export const Messages  = mongoose.model('Message', messageSchema);
