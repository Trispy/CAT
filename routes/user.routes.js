const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.post('/createaccount', async (req, res) => {
  try {
    const { firstName, lastName, username, email } = req.body;
    if (!firstName || !lastName || !username || !email) {
      return res.status(400).json({ message: 'All fields are needed' });
    }
    const user = new User({ firstName, lastName, username, email });
    await user.save();
    res.status(201).json({ message: 'Account created successfully with user: ', user });
  } 
  catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/login', async (req, res) => {
    try {
        const { username, email } = req.query;
        if (!username || !email) {
            return res.status(400).json({ message: 'Username and email are required' });
        }
        const user = await User.find({ username, email });
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        else {
            return res.status(200).json({ message: 'Login successful with user: ', user });
        
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;