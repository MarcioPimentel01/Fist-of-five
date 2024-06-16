// const express = require('express');
// const authController = require('../controllers/authController');
// const router = express.Router();

// router.post('/register', authController.register);
// router.post('/login', authController.login);

// module.exports = router;

const express = require('express');
const bcryptjs = require('bcryptjs');
const { User } = require('../models');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    await User.create({ username, password: hashedPassword });
    res.send('Signup successful! Please <a href="/login">login</a>.');
  } catch (err) {
    console.error('Error during user signup:', err); // Log detailed error
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.send('Username already exists! <a href="/signup.html">Try again</a>.');
    } else {
      res.send('An error occurred. Please <a href="/signup.html">try again</a>.');
    }
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (user) {
      const isValid = await bcryptjs.compare(password, user.password);

      if (isValid) {
        res.send('Login successful!');
      } else {
        res.send('Invalid username or password. <a href="/login">Try again</a>.');
      }
    } else {
      res.send('Invalid username or password. <a href="/login">Try again</a>.');
    }
  } catch (err) {
    console.error('Error during user login:', err); // Log detailed error
    res.send('An error occurred. Please <a href="/login">try again</a>.');
  }
});

module.exports = router;
