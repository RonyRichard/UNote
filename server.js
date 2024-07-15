const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname)));  // Serve static files from the root directory

io.on('connection', (socket) => {
    socket.on('join-session', (sessionId) => {
        socket.join(sessionId);
    });

    socket.on('text-change', (data) => {
        socket.to(data.sessionId).emit('receive-change', data.change);
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
