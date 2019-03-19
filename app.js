var express = require('express');


// App setup
var app = express();

// serving static files
app.use(express.static('public'))

// server
app.listen(4000, function(){
    console.log('start chatting on port 4000!')
}) 