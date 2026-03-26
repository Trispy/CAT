const express = require("express");
const router = express.Router();

const Module1 = require("../models/module1.model");
const Module2 = require("../models/module2.model");

const checkAccess = require("../middleware/checkAccess");

//mod 1 routes

// mark as complete
router.post(
  "/module1/symptoms/completed",
  checkAccess("module1", "symptoms"),
  async (req, res) => {
    try {
      const username = req.user.username;

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

// --- GET STATUS ---
router.get("/module1/status", async (req, res) => {
  try {
    const username = req.user.username;

    const data = await Module1.findOne({ username });

    res.json({
      symptoms: data?.symptoms || false,
      personalHygiene: data?.personalHygiene || false,
      location: data?.location || false,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// --- SUMMARY ---
router.get("/module1/summary", async (req, res) => {
  try {
    const username = req.user.username;

    const data = await Module1.findOne({ username });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
router.get("/module2/status", async (req, res) => {
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

// mod2 summary
router.get("/module2/summary", async (req, res) => {
  try {
    const username = req.user.username;

    const data = await Module2.findOne({ username });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;