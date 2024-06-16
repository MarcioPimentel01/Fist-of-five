const express = require('express');
const bcryptjs = require('bcryptjs');
const { User } = require('../models');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password, 'password-repeat': passwordRepeat } = req.body;

  try {
    // Check if passwords match
    if (password !== passwordRepeat) {
      return res.status(400).send('Passwords do not match');
    }

    // Check if username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create new user
    await User.create({ username, password: hashedPassword });

   // Redirect to login page after successful signup
   res.redirect('/login');
  } catch (err) {
    console.error('Error during user signup:', err); // Log detailed error
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.send('Username already exists! <a href="/signup.html">Try again</a>.');
    } else {
      res.send('An error occurred. Please <a href="/signup.html">try again</a>.');
    }
  }
});

// Login route handler
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (user) {
      const isValid = await bcryptjs.compare(password, user.password);

      if (isValid) {
        // Redirect to post.html after successful login
        res.send('Login successful! Redirecting...');
        res.redirect('/post.html'); // Ensure this path is correct
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