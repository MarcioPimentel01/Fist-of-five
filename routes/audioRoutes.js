// const express = require('express');
// const app = express();
// const path = require('path');

// // Define the absolute path 
// const audioFilePath = path.join(__dirname, 'controllers', 'audioController.js');

// // Serve the audioController.js file when a GET request is made to '/audio-controller' endpoint
// app.get('/audio-controller', function(req, res) {
//     res.sendFile(audioFilePath);
// });


const express = require('express');
const audioController = require('../controllers/audioController');
const router = express.Router();

// Define audio routes here
router.post('/upload', audioController.upload);
router.get('/list', audioController.list);

module.exports = router;

