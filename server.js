const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let sessions = {};

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const parsedMessage = JSON.parse(message);

        switch (parsedMessage.type) {
            case 'join':
                ws.sessionId = parsedMessage.sessionId;
                ws.userName = parsedMessage.userName;

                if (!sessions[ws.sessionId]) {
                    sessions[ws.sessionId] = {
                        content: '',
                        clients: []
                    };
                }

                sessions[ws.sessionId].clients.push(ws);

                // Send current content to the new client
                ws.send(JSON.stringify({
                    type: 'update',
                    content: sessions[ws.sessionId].content
                }));
                break;
            case 'update':
                sessions[ws.sessionId].content = parsedMessage.content;

                // Broadcast the new content to all clients in the session
                sessions[ws.sessionId].clients.forEach(client => {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            type: 'update',
                            content: parsedMessage.content
                        }));
                    }
                });
                break;
        }
    });

    ws.on('close', () => {
        if (ws.sessionId && sessions[ws.sessionId]) {
            sessions[ws.sessionId].clients = sessions[ws.sessionId].clients.filter(client => client !== ws);
        }
    });
});

app.use(express.static('public'));

server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});
