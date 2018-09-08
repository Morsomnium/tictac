const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = 80;

const app = express();
const server = http.createServer(app);
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