const socket = new WebSocket('ws://localhost:8080');

function joinSession() {
    const sessionId = document.getElementById('sessionInput').value;
    socket.send(JSON.stringify({ sessionId: sessionId, action: 'join' }));
}

function sendEdit(content) {
    const sessionId = document.getElementById('sessionInput').value;
    socket.send(JSON.stringify({ sessionId: sessionId, action: 'edit', content: content }));
}

document.getElementById('editor').addEventListener('input', function(event) {
    sendEdit(event.target.value);
});

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    document.getElementById('editor').value = data.content;
};
