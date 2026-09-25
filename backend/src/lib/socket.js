import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express();
const server = http.createServer(app);

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173"

const io = new Server(server, { cors: { origin: [allowedOrigin] } })

function getReceiverSocketId(userId) {
    return userSocketMap[userId]
}

// online user map = {userId:socketId}
const userSocketMap = {}

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId

    if (userId) {
        userSocketMap[userId] = socket.id
    }

    // io.emit() sent event to everyone on server - broadcast
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    // socket.on is used to listen for event
    socket.on("disconnect", () => {
        delete userSocketMap[userId]

        // knowing everyone that who is online or not (that this use is get logged out)
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })

})

export { app, server, io, getReceiverSocketId }

