const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./formatMessage');

let app = express();
const server = http.createServer(app);
const io = socketio(server);

// use the static folder
app.use(express.static(path.join(__dirname, "public")));

// run when a client connects
io.on('connection', socket => {
    // console.log("Client connected")
    socket.emit('message', "Welcome to ChatIt!");

    // Broadcast when a user connects
    socket.broadcast.emit("message", "A new user has joined");  // This will emit to everybody except the user
    // io.emit(); // this will emit to all the clients in general


    // listen for chat message
    socket.on("chatMessage", chatMessage => {
        // console.log(chatMessage);
        io.emit("message", chatMessage);
    })


    socket.on("disconnect", () => {
        io.emit("message", "A user has left the chat");
    })

})


const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => {
    console.log("server up and running on port", PORT)
})