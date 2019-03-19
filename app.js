var express = require('express');
// getting socket.io
var socket = require('socket.io');

// App setup
var app = express();

// serving static files
app.use(express.static('public'))

// setting up a server
var server = app.listen(4000, function(){
    console.log('start chatting on port 4000!')
}) 


// socket setup on back-end

var io = socket(server);
io.on('connection', function(socket){
    console.log('made socket connection', socket.id);
    socket.on('chat', (data) => {
       io.sockets.emit('chat', data)
    });
})

