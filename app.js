require('dotenv').config();
const express = require('express');
const path = require('path');
const sequelize = require('./config/database'); // Ensure correct path for sequelize instance
const { initModels } = require('./models'); // Ensure correct path for models initialization
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const audioRoutes = require('./routes/audioRoutes');
const cors = require('cors');

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors()); // Enable CORS if needed

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected...');
    initModels(); // Initialize models after database connection is successful
  })
  .catch(err => console.error('Error connecting to the database:', err));

// Routes setup
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/audio', audioRoutes);

// Route to render the login page
app.get('/', (req, res) => {
  res.render('index', {
    backgroundUrl: '/images/2to1+-+GettyImages-1221309165_Geometric+abstract+background+with+connected+line+and+dots.jpeg',
    headerImgUrl: '/images/nft.icon.png'
  });
});

// Route to serve signup.html
app.get('/signup.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Route to render the login page
app.get('/login', (req, res) => {
  res.render('index', {
    backgroundUrl: '/images/2to1+-+GettyImages-1221309165_Geometric+abstract+background+with+connected+line+and+dots.jpeg',
    headerImgUrl: '/images/nft.icon.png'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

module.exports = app;
