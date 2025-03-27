import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        credentials: true,
    }
});

// Handling WebSocket Connection
io.on("connection", (socket) => {
    console.log("User Connected", socket.id);

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });

    socket.on("connect_error", (err) => {
        console.error(`Socket connection error: ${err.message}`);
    });
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export { io, app, server };
