const express = require('express');
const https = require('https');
const socketIO = require('socket.io');

const port = 4001;

const app = express();
const server = https.createServer(app);
const io = socketIO(server);

io.on('connection', socket => {
    console.log('New User connected');
    socket.on('move', (coords) => {
        console.log('Move was placed on ', coords);
        io.sockets.emit('move', (coords))
    });

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
});

server.listen(port, () => console.log(`Listening on port ${port}`));