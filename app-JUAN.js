const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Route to render the login page
app.get('/', (req, res) => {
    res.render('index.ejs', {
        backgroundUrl: '/images/2to1+-+GettyImages-1221309165_Geometric+abstract+background+with+connected+line+and+dots.jpeg',
        headerImgUrl: '/images/nft.icon.png'
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});