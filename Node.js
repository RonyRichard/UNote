const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(bodyParser.json());

app.post('/save', (req, res) => {
    const { sessionId, content } = req.body;
    const filePath = path.join(__dirname, 'sessions', `${sessionId}.json`);

    fs.writeFile(filePath, JSON.stringify(content), (err) => {
        if (err) {
            console.error('Error saving session:', err);
            return res.json({ success: false });
        }
        res.json({ success: true });
    });
});

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});