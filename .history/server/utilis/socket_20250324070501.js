import {Server} from 'socket.io'

import http from 'http'
import express from 'express'
const app =express()

const server = http.createServer(app)
const io = new Server(server,{
    cors: { origin: ["http://localhost:5173"]}
})

// Handling WebSocket Connection
io.on("connection",(socket) =>{
    console.log("user Connected",socket.id)
    socket.on("disconnection",() =>{
        console.log("user Disconnected",socket.id)
    })
})

export{io, app ,server}