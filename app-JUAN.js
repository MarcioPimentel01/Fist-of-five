// const express = require('express');
// const path = require('path');
// const app = express();
// const PORT = process.env.PORT || 3001;
// const htmlRoutes = require('./public/routes/htmlroutes');
// const cookieParser = require('cookie-parser');
// const loginRoute = require('public/routes/loginroutes');
// require('dotenv').config();
// console.log(process.env)

// // Middleware for our application
// app.use(
//     express.urlencoded({
//        extended: true,
//     })
// );
// app.use(cookieParser());

// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.json());
// app.use("/", htmlRoutes);
// app.post("/login", loginRoute);
// // 


// const posts = [];

// class Post {
//     constructor(username, thoughts) {
//         this.username = username;
//         this.thoughts = thoughts;
//     }
// }

// const addPost = (username, thoughts) => {
//     posts.push(new Post(username, thoughts));
// }

// app.listen(PORT, () => {
//     console.log(`Running on port ${PORT}`);
// });

// app.get('/api/posts', (req, res) => {
//     res.json(posts);
// });

// app.post('/api/posts', (req, res) => {
//     const { username, thoughts } = req.body;
//     addPost(username, thoughts);
//     res.json({ message: 'Post added' });
// });

// app.delete('/api/posts', (req, res) => {
//     posts.length = 0;
//     res.json({ message: 'All posts deleted' });
// });

require('dotenv').config();
const express = require('express');
const path = require('path');
const { sequelize, initModels } = require('./models'); // Ensure this path is correct
const bodyParser = require('body-parser');
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
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sync database and initialize models
initModels();

app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
router.use('/api/audio', audioRoutes);

// app.get('/', (req, res) => {
//   res.status(200).json({
//     status: "success",
//     message: "Welcome to the Social Network API"
//   });
// });

// Route to render the login page
app.get('/', (req, res) => {
  res.render('index.ejs', {
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

// Set the view engine to EJS
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

module.exports = app;
