const express = require('express');
const app = express();
const path = require('path');

// Define the absolute path 
const audioFilePath = path.join(__dirname, 'controllers', 'audioController.js');

// Serve the audioController.js file when a GET request is made to '/audio-controller' endpoint
app.get('/audio-controller', function(req, res) {
    res.sendFile(audioFilePath);
});
