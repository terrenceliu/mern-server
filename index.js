const PORT = process.env.PORT || 8000

// Library
var express = require('express');
var db = require('./db');
var cors = require('cors');
var bodyParser = require('body-parser');

var caseController = require('./controllers/case-controller');

// Express App
var app = express();

// Server
var server = require('http').Server(app);

// SocketIO
var io = require('socket.io')(server);

// Socket logic

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/case', caseController);

// Routers
app.get('/', function (req, res) {
    console.log("Hit / dir.");
    res.status(200).send("Hello, World.");
})

/**
 * Socket.io logic
 * 
 * TODO: Seperate the codes into a single file.
 */


var dash_sockets = new Set([]);
// New Connection
io.on('connection', function (socket) {
    console.log("[New Connection] socket id = ", socket.id);

    // Validate client type
    socket.emit('client_type')

    socket.on('client_type', function (type) {
        console.log('[Client Type] ', type);
        if (type == 'dashboard') {
            dash_sockets.add(socket);
        }
    });

    // Receive request
    socket.on('packet', function (data) {
        console.log('[New Packet] ', data);
        
        // Relay the new data packet to connected dashboard instance
        dash_sockets.forEach(s => {
            s.emit('packet', data);
        });
    });
});

server.listen(PORT, function () {
    console.log('Server listens on port ' + PORT);
})