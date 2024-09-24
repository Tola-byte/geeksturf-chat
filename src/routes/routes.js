import express from "express"
import { createConversationThread, getConversationThread } from "../controllers/getMessages.js"

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World! Your server is running successfully.')
})

router.post("/handleConversations", createConversationThread)

router.get("/getConversations/:thread_id", getConversationThread)



export default router