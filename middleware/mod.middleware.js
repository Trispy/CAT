const jwt = require("jsonwebtoken");
const User = require("./models/user.model");
const Module1 = require("../models/module1.model");
const Module2 = require("../models/module2.model");
const Module3 = require("../models/module3.model");
const Module4 = require("../models/module4.model");
const Module5 = require("../models/module5.model");
const Module6 = require("../models/module6.model");

const checkAccess = (moduleName, gameName) => {
  return async (req, res, next) => {
    try {

    
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
      }

      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      let startingModule1 = "symptoms"; 
      let startingModule2 = "module2part1"; 
      // MODULE 1
      if (moduleName === "module1") {
        if (user.finished_m1 === "locked") {
          return res.status(403).json({ message: "Module 1 is locked" });
        }

        const mod1 = await Module1.findOne({ username: user.username });

        if (!mod1) {
          return res.status(404).json({ message: "Module 1 data not found" });
        }
        if (gameName !== startingModule1 && mod1[startingModule1] === false) {
            return res.status(403).json({ message: "You must start the first step first" });
        }

        if (gameName !== startingModule1 && mod1[gameName] === false) {
            return res.status(403).json({ message: `${gameName} not unlocked` });
        }
      }

      // MODULE 2
      if (moduleName === "module2") {
        if (user.finished_m2 === "locked") {
          return res.status(403).json({ message: "Module 2 is locked" });
        }

        const mod2 = await Module2.findOne({ username: user.username });

        if (!mod2) {
          return res.status(404).json({ message: "Module 2 data not found" });
        }
        if (gameName !== startingModule2 && mod2[startingModule2] === false) {
            return res.status(403).json({ message: "You must start the first step first" });
        }

        if (gameName !== startingModule2 && mod2[gameName] === false) {
            return res.status(403).json({ message: `${gameName} not unlocked` });
        }
      }

      // MODULE 3
      if (moduleName === "module3") {
        if (user.finished_m3 === "locked") {
          return res.status(403).json({ message: "Module 3 is locked" });
        }

        const mod3 = await Module3.findOne({ username: user.username });

        if (!mod3) {
          return res.status(404).json({ message: "Module 3 data not found" });
        }

        if (gameName && mod3[gameName] === false) {
          return res.status(403).json({ message: `${gameName} not unlocked` });
        }
      }

      // MODULE 4
      if (moduleName === "module4") {
        if (user.finished_m4 === "locked") {
          return res.status(403).json({ message: "Module 4 is locked" });
        }

        const mod4 = await Module4.findOne({ username: user.username });

        if (!mod4) {
          return res.status(404).json({ message: "Module 4 data not found" });
        }

        if (gameName && mod4[gameName] === false) {
          return res.status(403).json({ message: `${gameName} not unlocked` });
        }
      }

      // MODULE 5
      if (moduleName === "module5") {
        if (user.finished_m5 === "locked") {
          return res.status(403).json({ message: "Module 5 is locked" });
        }

        const mod5 = await Module5.findOne({ username: user.username });

        if (!mod5) {
          return res.status(404).json({ message: "Module 5 data not found" });
        }

        if (gameName && mod5[gameName] === false) {
          return res.status(403).json({ message: `${gameName} not unlocked` });
        }
      }

      // MODULE 6
      if (moduleName === "module6") {
        if (user.finished_m6 === "locked") {
          return res.status(403).json({ message: "Module 6 is locked" });
        }

        const mod6 = await Module6.findOne({ username: user.username });

        if (!mod6) {
          return res.status(404).json({ message: "Module 6 data not found" });
        }

        if (gameName && mod6[gameName] === false) {
          return res.status(403).json({ message: `${gameName} not unlocked` });
        }
      }

      next();

    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

module.exports = checkAccess;