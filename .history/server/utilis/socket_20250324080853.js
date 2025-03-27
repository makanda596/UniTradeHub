import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Change this if frontend URL is different
        credentials: true,
    },
});

// Handling WebSocket Connection
io.on("connection", (socket) => {
    console.log(`✅ User Connected: ${socket.id}`);

    // Send a test message to the client
    socket.emit("server_message", "Hello from server!");

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log(`❌ User Disconnected: ${socket.id}`);
    });

    // Debugging: Log all events received from client
    socket.onAny((event, ...args) => {
        console.log(`📩 Event received: ${event}`, args);
    });

    // Handle connection errors
    socket.on("connect_error", (err) => {
        console.error(`🚨 Socket connection error: ${err.message}`);
    });
});



export { io, app, server };
