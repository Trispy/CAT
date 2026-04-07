const express = require("express");
const router = express.Router();
const User = require('../models/user.model');
const Module1 = require("../models/module1.model");
const Module2 = require("../models/module2.model");
const Module3 = require("../models/module3.model");
const Module4 = require("../models/module4.model");
const Module5 = require("../models/module5.model");
const Module6 = require("../models/module6.model");
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
router.get('/moduleSummary', requireAuth, async (req, res) => {
  try {
    const username = req.user.username;

    const [user, mod1, mod2, mod3, mod4, mod5, mod6] = await Promise.all([
      User.findOne({ username }),
      Module1.findOne({ username }),
      Module2.findOne({ username }),
      Module3.findOne({ username }),
      Module4.findOne({ username }),
      Module5.findOne({ username }),
      Module6.findOne({ username }),
    ]);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      finished_m1: user.finished_m1,
      module1: {
        symptoms: mod1?.symptoms ?? false,
        personalHygiene: mod1?.personalHygiene ?? false,
        location: mod1?.location ?? false
      },

      finished_m2: user.finished_m2,
      module2: {
        module2part1: mod2?.module2part1 ?? false,
        chopping: mod2?.chopping ?? false,
        cooking: mod2?.cooking ?? false
      },

      finished_m3: user.finished_m3,
      module3: {
        cansort: mod3?.cansort ?? false,
        expiration: mod3?.expiration ?? false,
        allergenIdentification: mod3?.allergenIdentification ?? false
      },
      finished_m4: user.finished_m4,
      module4: {
        module4part1: mod4?.module4part1 ?? false,
        module4part2: mod4?.module4part2 ?? false,
        module4part3: mod4?.module4part3 ?? false
      },

      finished_m5: user.finished_m5,
      module5: {
        module5part1: mod5?.module5part1 ?? false,
        module5part2: mod5?.module5part2 ?? false,
        module5part3: mod5?.module5part3 ?? false
      },
      finished_m6: user.finished_m6,
      module6: {
        module6part1: mod6?.module6part1 ?? false,
        module6part2: mod6?.module6part2 ?? false,
        module6part3: mod6?.module6part3 ?? false
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
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