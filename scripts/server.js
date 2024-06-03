// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ port: 8080 });

// const sessions = new Map(); // Stores session data

// wss.on('connection', function connection(ws) {
//     ws.on('message', function incoming(message) {
//         const { sessionId, action, content } = JSON.parse(message);
        
//         if (action === 'create') {
//             sessions.set(sessionId, { content: content, clients: [ws] });
//         } else if (action === 'join') {
//             const session = sessions.get(sessionId);
//             if (session) {
//                 session.clients.push(ws);
//                 ws.send(JSON.stringify({ content: session.content }));
//             }
//         } else if (action === 'edit') {
//             const session = sessions.get(sessionId);
//             if (session) {
//                 session.content = content;
//                 session.clients.forEach(client => {
//                     if (client !== ws) {
//                         client.send(JSON.stringify({ content: content }));
//                     }
//                 });
//             }
//         }
//     });
// });
