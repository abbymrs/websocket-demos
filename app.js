var WebSocketServer = require('websocket').server;
var http = require('http');
var express = require('express');
var app = express();

var server = http.createServer(app);
server.listen(5000, function() {
    console.log((new Date()) + " Server is listening on port " + 5000);   
 });
 app.use(express.static('public'));
 app.get('/',function(req,res){
     res.sendFile(__dirname + '/public/view/index.html');
 })

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

let msg = [];
// WebSocket server
wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
    var connection = request.accept(null, request.origin);

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            // process WebSocket message
            // console.log(message);
            msg.push(message.utf8Data);
            connection.send(JSON.stringify({data:msg}));
            console.log(msg);
        }
    });
    connection.on('error',function(err){
        console.log(err);
    });

    connection.on('close', function(connection) {
        // close user connection
        console.log('disconnect');
    });


   
});

