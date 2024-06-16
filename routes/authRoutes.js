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

    // Redirect or respond with success message
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

module.exports = router;
