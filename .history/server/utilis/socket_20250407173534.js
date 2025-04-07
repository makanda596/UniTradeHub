import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
        cors: {
       origin:"https://unitradehub-kesf.onrender.com",
        // origin: 'http://localhost:5173', 

    //    ebdjlen
      // Change this if frontend URL is different
        credentials: true,
    },
});

// Handling WebSocket Connection
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.emit("server_message", "Hello from server!");
    socket.on("send-chart-message",message =>{
console.log(message)
    })
    socket.on("disconnect", () => {
        console.log(` User Disconnected: ${socket.id}`);
    });

    socket.onAny((event, ...args) => {
        console.log(` Event received: ${event}`, args);
    });

    socket.on("connect_error", (err) => {
        console.error(` Socket connection error: ${err.message}`);
    });
});



export { io, app, server };
 