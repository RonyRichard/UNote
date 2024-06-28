// Extract sessionId and userName from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const sessionId = urlParams.get('sessionId');
const userName = urlParams.get('userName') || urlParams.get('sessionName');

// Display the session ID
document.getElementById('sessionIdDisplay').innerText += sessionId;

// Initialize Quill editor
const quill = new Quill('#editor-container', {
    theme: 'snow',
    modules: {
        toolbar: [
            [{ 'font': [] }, { 'size': [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'header': 1 }, { 'header': 2 }, 'blockquote', 'code-block'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }, { 'align': [] }],
            ['link', 'image', 'video'],
            ['clean']
        ]
    }
});

// WebSocket setup
let socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
    console.log('WebSocket connection established');
    socket.send(JSON.stringify({ type: 'join', sessionId, userName }));
};

socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === 'update') {
        quill.setContents(message.content);
    }
};

socket.onclose = () => {
    console.log('WebSocket connection closed');
};

socket.onerror = (error) => {
    console.error('WebSocket error: ', error);
};

// Handle document edits
quill.on('text-change', (delta, oldDelta, source) => {
    if (source === 'user') {
        const content = quill.getContents();
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ type: 'update', sessionId, content }));
        }
    }
});

// Handle end session button click
document.getElementById('endSessionButton').addEventListener('click', () => {
    const content = quill.getContents();
    fetch('/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sessionId: sessionId,
            content: content
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Session saved successfully!');
            window.location.href = 'landing.html';
        } else {
            alert('Error saving session.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error saving session.');
    });
});