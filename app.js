console.log('Current directory:', __dirname);
require('dotenv').config();
const express = require('express');
const path = require('path');
const { sequelize, initModels } = require('./models'); // Ensure this path is correct
const bodyParser = require('body-parser');
// const bcyrptjs = require('bcryptjs');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const audioRoutes = require('./routes/audioRoutes');
const cors = require('cors');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


// Sync database and initialize models
initModels();

app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/audio', audioRoutes);

// app.get('/', (req, res) => {
//   res.status(200).json({
//     status: "success",
//     message: "Welcome to the Social Network API"
//   });
// });

// Route to render the login page
app.get('/', (req, res) => {
  res.render('index', {
      backgroundUrl: '/images/2to1+-+GettyImages-1221309165_Geometric+abstract+background+with+connected+line+and+dots.jpeg',
      headerImgUrl: '/images/nft.icon.png'
  });
});

app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(middleware.route);
  } else if (middleware.name === 'router') {
    middleware.handle.stack.forEach((handler) => {
      if (handler.route) {
        console.log(handler.route);
      }
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

module.exports = app;
