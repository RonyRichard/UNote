document.getElementById('joinSessionButton').addEventListener('click', showJoinSession);
document.getElementById('createSessionButton').addEventListener('click', showCreateSession);
document.getElementById('enterJoinSessionButton').addEventListener('click', enterJoinSession);
document.getElementById('enterCreateSessionButton').addEventListener('click', enterCreateSession);

function showJoinSession() {
    document.querySelector('.buttons').style.display = 'none';
    document.querySelector('.join-session').style.display = 'flex';
}

function showCreateSession() {
    document.querySelector('.buttons').style.display = 'none';
    document.querySelector('.create-session').style.display = 'flex';
    const sessionId = generateSessionId();
    document.getElementById('generatedSessionId').innerText = `Session ID: ${sessionId}`;
}

function generateSessionId() {
    return Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
}

function enterJoinSession() {
    const sessionId = document.getElementById('joinSessionId').value;
    const sessionName = document.getElementById('joinSessionName').value;
    if (sessionId && sessionName) {
        fetch(`/check-session/${sessionId}`)
            .then(response => response.json())
            .then(data => {
                if (data.exists) {
                    window.location.href = `main.html?sessionId=${sessionId}&sessionName=${sessionName}`;
                } else {
                    alert('Session ID does not exist');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error checking session ID');
            });
    } else {
        alert('Please enter both Session ID and Session Name');
    }
}

function enterCreateSession() {
    const sessionId = document.getElementById('generatedSessionId').innerText.split(': ')[1];
    const userName = document.getElementById('userName').value;
    if (userName) {
        fetch('/create-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sessionId, userName })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = `main.html?sessionId=${sessionId}&userName=${userName}`;
            } else {
                alert('Error creating session: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error creating session');
        });
    } else {
        alert('Please enter your name');
    }
}