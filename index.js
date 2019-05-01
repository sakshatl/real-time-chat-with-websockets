const express = require('express');
const socket = require('socket.io');

let app = express();

app.use(express.static('./public'))

let server = app.listen(5000);

let io = socket(server);

io.on('connection', function(socket){
    console.log('socket connection made', socket.id);
    
    socket.on('chat', function(data){
        io.emit('chat', data)
    })

});

