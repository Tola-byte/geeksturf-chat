import { ConversationThread } from "../models/conversations/conversations.js";
import { Messages } from "../models/messages/messages.js";
import { v4 as uuidv4} from "uuid"
import { io } from "../server.js";


export const getConversationThread = async (req, res) => {
    const { thread_id } = req.params;

    try {

        const messages = await Messages.find({
            $or: [
                { thread_id: thread_id },
                { thread_id: thread_id.split('-').reverse().join('-') } // Reverse the thread_id
            ]
        });

        if (messages.length === 0) {
            return res.status(404).json({ message: 'No messages found for this thread.' });
        }

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error retrieving messages for thread:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



export const createConversationThread = async (req, res) => {
    const { user1, user2, messageContent, reply_to } = req.body;

    // user 1 is usually the sender, user 2 is the receiver

    try {
    
        const threadId = `${user1}-${user2}`;

        let thread = await ConversationThread.findOne({
            $or: [
                { thread_id: threadId },
                { thread_id: `${user2}-${user1}` } // Check for the reverse order too
            ]
        })

        if (!thread) {

            thread = new ConversationThread({
                thread_id: threadId,
                participant1 : user1,
                participant2 : user2,
            })

            await thread.save();
        }
        
        const newMessage = new Messages({
            thread_id: threadId,
            id: uuidv4(),
            user_id: user1,  
            content: messageContent,
            reply_to : reply_to || null
        })

        await newMessage.save().then(() => {
            console.log("saved message")
        })

        io.emit('newMessage', { data: newMessage });

        res.status(201).json({
            message: "Message added to conversation",
            thread_id: thread.thread_id
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create or update the conversation thread" });
    }
};
