
// require('dotenv').config({path: `${process.cwd()}/.env`}) //? This will read the .env file and set the environment variables. The cwd() function returns the current working directory. stands for current working directory. must to change when hosting  on render
// const express = require('express')
// const app = express()

// const authRouter = require('./route/authRoute')

// // respond with "hello world" when a GET request is made to the homepage
// app.get('/', (req, res) => {
//     res.status(200).json(
//     {   status: 'success', 
//         message: 'REST API is on'
//     }
//     )
// })

// //!All routes go here --------------------------------

// app.use('/api/v1/auth', authRouter)

// //!Route to display an error in case someone tries to access a route that doesn't exist
// app.use('*', (req, res) => {
//     res.status(404).json(
//     {   status: 'error/fail', 
//         message: 'Route not found'
//     }
//     )
// })

// const PORT = process.env.APP_PORT || 4000

// app.listen(PORT, () => {
//     console.log('Server is running on port 3000', PORT)
// })

// ROUTE!!
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Route to render the login page
app.get('/', (req, res) => {
    res.render('index', {
        backgroundUrl: '/images/2to1+-+GettyImages-1221309165_Geometric+abstract+background+with+connected+line+and+dots.jpeg',
        headerImgUrl: '/images/nft.icon.png'
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
