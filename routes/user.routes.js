const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Module1 = require('../models/module1.model'); 
const Module2 = require('../models/module2.model');
const Module3 = require('../models/module3.model');
const Module4 = require('../models/module4.model');
const Module5 = require('../models/module5.model');
const Module6 = require('../models/module6.model');


router.post('/createaccount', async (req, res) => {
  try {
    const { firstName, lastName, username, email } = req.body;
    if (!firstName || !lastName || !username || !email) {
      return res.status(400).json({ message: 'All fields are needed' });
    }
     
    const user = new User({ firstName, lastName, username, email });
    await Module1.create({
      username: user.username,
      symptoms: false,
      personalHygiene: false,
      location: false
    });
    await Module2.create({
      username: user.username, 
      module2part1: false, 
      chopping: false, 
      cooking: false
    })
    await Module3.create({
      username: user.username, 
      cansort: false, 
      expiration: false, 
      allergenIdentification: false
    })
    await Module4.create({
      username: user.username, 
      module4part1: false, 
      module4part2: false, 
      module4part3: false
    })
    await Module5.create({
      username: user.username, 
      module5part1: false, 
      module5part2: false, 
      module5part3: false
    })
    await Module6.create({
      username: user.username, 
      module6part1: false, 
      module6part2: false, 
      module6part3: false
    })

    await user.save();
    res.status(201).json({ message: 'Account created successfully with user: ', user });
  } 
  catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.post('/login', async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({ message: 'Username and email are required' });
    }

    const user = await User.findOne({ username, email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
   
    
    res.status(200).json({
      message: 'Login successful',
      token,
      user
    });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;