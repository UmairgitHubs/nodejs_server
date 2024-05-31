const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.get('/events', (req, res) => {
    let serialNumber = "SMPH00123";

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const sendEvent = () => {
        const longitude = (Math.random() * 360 - 180).toFixed(6); // Random longitude between -180 and 180
        res.write(`data: {"serialNumber": ${serialNumber}, "longitude": ${longitude}}\n\n`);

        if (res.finished) {
            clearInterval(interval);
        }
    };

    const interval = setInterval(sendEvent, 2000);

    req.on('close', () => {
        clearInterval(interval);
    });

    sendEvent();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
