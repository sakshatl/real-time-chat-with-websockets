const express = require('express');
const socket = require('socket.io');

let app = express();

app.use(express.static('./public'))

let server = app.listen(5000);

let io = socket(server);

io.on('connection', function(socket){
    console.log('connected');
    socket.on('chat', function(data){
        console.log(data);
    })
    socket.on('disconnect', function(){
        console.log('disconnected');
    });
});

