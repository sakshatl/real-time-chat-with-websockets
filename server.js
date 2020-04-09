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
    socket.emit('message', { type: "Welcome text", sender: "Chatbot", message: "Welcome to ChatIt!" });

    // Broadcast when a user connects
    socket.broadcast.emit("message", { type: "New user", sender: "Chatbot", message: "A new user has joined" });  // This will emit to everybody except the user

    // io.emit(); // this will emit to all the clients in general
    // listen for chat message
    socket.on("chatMessage", data => {
        // console.log(chatMessage);
        io.emit("message", data);
    })

    // when client disconnects
    socket.on("disconnect", () => {
        io.emit("message", { type: "Disconnect text", sender: "Chatbot", message: "A user has left" });
    })

})


const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => {
    console.log("server up and running on port", PORT)
})