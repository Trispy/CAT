const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const module1SummarySchema = require('../models/game.model');
const requireAuth = require('../middleware/auth.middleware');
router.post('/addModule1Summary', requireAuth, async (req, res) => {
  try {
    const { chillScore, cleanScore, separateScore, cookScore, strikes } = req.body;
    if (!chillScore || !cleanScore || !separateScore || !cookScore) {
      return res.status(400).json({ message: 'All scores are required' });
    }
    let averageScore = (chillScore + cleanScore + separateScore + cookScore) / 5;
    let completed = false; 
    if (strikes > 3 || averageScore < 90) {
      completed = false;
    }
    else {
      completed = true;
    }
    const module1summary = new module1SummarySchema({ userId: req.user.userId, username: req.user.username, chillScore, cleanScore, separateScore, cookScore, strikes, completed, averageScore });
    await module1summary.save();
    res.status(201).json({ message: 'Module 1 summary created successfully with user: ', module1summary });
  } 
  catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/getModule1Summary', requireAuth, async (req, res) => {
    try {
        const module1summary = await module1SummarySchema.find({ userId: req.user.userId });
        if (module1summary.length === 0) {
            return res.status(404).json({ message: 'Module 1 summary not found' });
        }
        else {
            return res.status(200).json({ message: 'Module 1 summary retrieved successfully with user: ', module1summary });
        }
    } catch (error) {
        console.error('Error retrieving module 1 summary:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/updateComplete', async (req, res) => {
  try {
    const { username, module } = req.body;

    const user = await User.findOne({ username });

    if(module === "m1") user.finished_m1 = true;
    else if(module === "m2") user.finished_m2 = true;
    await user.save();
    res.status(200).json({ message: 'Module 1 summary created successfully with user: ', user });
  } 
  catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;