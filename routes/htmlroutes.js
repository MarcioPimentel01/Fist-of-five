const express = require('express');
const router = express.Router();
const path = require('path');

// get route for index files
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = router;