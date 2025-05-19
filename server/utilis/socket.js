import { Server } from "socket.io";
import http from "http";
import dotenv from 'dotenv'
import express from "express";

dotenv.config()
const app = express();
const server = http.createServer(app);

const URL = process.env.FRONTEND_URL
const io = new Server(server, {
        cors: {
        origin: "https://unitradehubs.onrender.com",
        // origin:"http://localhost:5173", 
        credentials: true,
    },
});

// Handling WebSocket Connection
io.on("connection", (socket) => {
    socket.emit("server_message", "Hello from server!");
    socket.on("send-chart-message",message =>{
    })
    socket.on("disconnect", () => {
    });

    socket.onAny((event, ...args) => {
    });

    socket.on("connect_error", (err) => {
        console.error(` Socket connection error: ${err.message}`);
    });
});



export { io, app, server };
 