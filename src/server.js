import express from "express"
import { createServer } from 'http'
import cors from 'cors'
import router from "./routes/routes.js";
import { connectDatabase } from "./sevices/database.js";
import { Server as SocketIO } from 'socket.io'

const app = express();

const httpServer = createServer(app)

export const io = new SocketIO(httpServer, {
    cors: {
        origin: "http://localhost:3000", // Your frontend's URL
        methods: ["GET", "POST"],
        credentials: true // Allow cookies and authentication if needed
    }
})

app.use(
    cors({
        origin: '*',
    })
)

app.use(express.json())


io.on('connection', (socket) => {
    console.log('Client connected')
    socket.on('disconnect', () => {
        console.log('A client disconnected')
    })
})

app.set('io', io)

const PORT = process.env.PORT || 4000

connectDatabase();

app.use('/', router)

httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})