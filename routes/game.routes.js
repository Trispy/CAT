const express = require("express");
const router = express.Router();
const User = require('../models/user.model');
const Module1 = require("../models/module1.model");
const Module2 = require("../models/module2.model");
const Module3 = require("../models/module3.model");
const requireAuth = require('../middleware/auth.middleware');

const checkAccess = require("../middleware/mod.middleware");
//mod 1 routes

// mark as complete
router.post(
  "/module1/symptoms/completed",
  checkAccess("module1", "symptoms"),
  async (req, res) => {
    try {
      const username = req.user.username;
      console.log(req.user);
      console.log("HELLO");

      const updated = await Module1.findOneAndUpdate(
        { username },
        { symptoms: true },
        { new: true }
      );

      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.post(
  "/module1/personalHygiene/completed",
  checkAccess("module1", "personalHygiene"),
  async (req, res) => {
    try {
      const username = req.user.username;

      const updated = await Module1.findOneAndUpdate(
        { username },
        { personalHygiene: true },
        { new: true }
      );

      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.post(
  "/module1/location/completed",
  checkAccess("module1", "location"),
  async (req, res) => {
    try {
      const username = req.user.username;

      const updated = await Module1.findOneAndUpdate(
        { username },
        { location: true },
        { new: true }
      );

      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// status
router.get("/module1/status", requireAuth, async (req, res) => {
  try {
    const username = req.user.username;
    console.log("TESTING");
    console.log(req.user);

    const data = await Module1.findOne({ username });

    res.json({
      symptoms: data?.symptoms || false,
      personalHygiene: data?.personalHygiene || false,
      location: data?.location || false,
    });
  } catch (err) {
    res.status(500).json({ message: req.user.username });
  }
});

//mod 2 routes

// mark as complete
router.post(
  "/module2/module2part1/completed",
  checkAccess("module2", "module2part1"),
  async (req, res) => {
    try {
      const username = req.user.username;

      const updated = await Module2.findOneAndUpdate(
        { username },
        { module2part1: true },
        { new: true }
      );

      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.post(
  "/module2/chopping/completed",
  checkAccess("module2", "chopping"),
  async (req, res) => {
    try {
      const username = req.user.username;

      const updated = await Module2.findOneAndUpdate(
        { username },
        { chopping: true },
        { new: true }
      );

      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.post(
  "/module2/cooking/completed",
  checkAccess("module2", "cooking"),
  async (req, res) => {
    try {
      const username = req.user.username;

      const updated = await Module2.findOneAndUpdate(
        { username },
        { cooking: true },
        { new: true }
      );

      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// mod 2 status
router.get("/module2/status", requireAuth, async (req, res) => {
  try {
    const username = req.user.username;

    const data = await Module2.findOne({ username });

    res.json({
      module2part1: data?.module2part1 || false,
      chopping: data?.chopping || false,
      cooking: data?.cooking || false,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/updateComplete', async (req, res) => {
  try {
    const { username, module } = req.body;

    const user = await User.findOne({ username });

    if (module === "m1") user.finished_m1 = true;
    else if (module === "m2") user.finished_m2 = true;
    else if (module === "m3") user.finished_m3 = true;
    await user.save();
    res.status(200).json({ message: 'Module 1 summary created successfully with user: ', user });
  }
  catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//mod 3 routes

// mark as complete
router.post(
  "/module3/canSorting/completed",
  checkAccess("module3", "cansort"),
  async (req, res) => {
    try {
      const username = req.user.username;
      console.log(req.user);

      const updated = await Module3.findOneAndUpdate(
        { username },
        { cansort: true },
        { new: true }
      );

      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.post(
  "/module3/expiration/completed",
  checkAccess("module3", "expiration"),
  async (req, res) => {
    try {
      const username = req.user.username;

      const updated = await Module3.findOneAndUpdate(
        { username },
        { expiration: true },
        { new: true }
      );

      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.post(
  "/module3/allergenIdentification/completed",
  checkAccess("module3", "allergenIdentification"),
  async (req, res) => {
    try {
      const username = req.user.username;

      const updated = await Module3.findOneAndUpdate(
        { username },
        { allergenIdentification: true },
        { new: true }
      );

      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// status
router.get("/module3/status", requireAuth, async (req, res) => {
  try {
    const username = req.user.username;
    console.log("TESTING");
    console.log(req.user);

    const data = await Module3.findOne({ username });

    res.json({
      cansort: data?.cansort || false,
      expiration: data?.expiration || false,
      allergenIdentification: data?.allergenIdentification || false,
    });
  } catch (err) {
    res.status(500).json({ message: req.user.username });
  }
});

module.exports = router;