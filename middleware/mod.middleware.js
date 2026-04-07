const jwt = require("jsonwebtoken");
const User = require('../models/user.model');
const Module1 = require("../models/module1.model");
const Module2 = require("../models/module2.model");
const Module3 = require("../models/module3.model");


const mod1_dic = {"symptoms": 0, "personalHygiene": 1, "location": 2}; 
const mod2_dic = {"module2part1": 0, "chopping": 1, "cooking": 2}; 
const mod3_dic = {"cansort": 0, "expiration": 1, "allergenIdentification": 2};
const mod4_dic = {"module4part1": 0, "module4part2": 1, "module4part3": 2};
const mod5_dic = {"module5part1": 0, "module5part2": 1, "module5part3": 2};
const mod6_dic = {"module6part1": 0, "module6part2": 1, "module6part3": 2};

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
      console.log(user);

      let startingModule1 = "symptoms"; 
      let startingModule2 = "module2part1"; 
      let startingModule3 = "cansort";
      // MODULE 1
      if (moduleName === "module1") {
        

        const mod1 = await Module1.findOne({ username: user.username });

        if (!mod1) {
          return res.status(404).json({ message: "Module 1 data not found" });
        }
        if (gameName !== startingModule1 && mod1[startingModule1] === false) {
            return res.status(403).json({ message: "You must start the first step first" });
        }
        let prev_number = 0; 
      
        if (mod1_dic[gameName] - 1 >= 0) {
          prev_number = mod1_dic[gameName] - 1; 
        }
        const key = Object.keys(mod1_dic).find(k => mod1_dic[k] === prev_number);
        
        if (gameName !== startingModule1 && mod1[key] === false) {
            return res.status(403).json({ message: `${gameName} not unlocked` });
        }
      }

      // MODULE 2
      if (moduleName === "module2") {
        if (user.finished_m1 === false) {
          return res.status(403).json({ message: "Module 2 is locked- must complete module 1." });
        }

        const mod2 = await Module2.findOne({ username: user.username });

        if (!mod2) {
          return res.status(404).json({ message: "Module 2 data not found" });
        }
        if (gameName !== startingModule2 && mod2[startingModule2] === false) {
            return res.status(403).json({ message: "You must start the first step first" });
        }
        let prev_number = 0; 
        if (mod2_dic[gameName] - 1 >= 0) {
          prev_number = mod2_dic[gameName] - 1; 
        }
        const key = Object.keys(mod2_dic).find(k => mod2_dic[k] === prev_number);

        if (gameName !== startingModule2 && mod2[key] === false) {
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
        if (gameName !== startingModule3 && mod3[startingModule3] === false) {
            return res.status(403).json({ message: "You must start the first step first" });
        }
        let prev_number = 0; 
        if (mod3_dic[gameName] - 1 >= 0) {
          prev_number = mod3_dic[gameName] - 1; 
        }
        const key = Object.keys(mod3_dic).find(k => mod3_dic[k] === prev_number);

        if (gameName !== startingModule3 && mod3[key] === false) {
            return res.status(403).json({ message: `${gameName} not unlocked` });
        }
      }

      /* // MODULE 4
      if (moduleName === "module4") {
        if (user.finished_m4 === "locked") {
          return res.status(403).json({ message: "Module 4 is locked" });
        }

        const mod4 = await Module4.findOne({ username: user.username });

        if (!mod4) {
          return res.status(404).json({ message: "Module 4 data not found" });
        }
        let prev_number = 0; 
        if (mod4_dic[gameName] - 1 >= 0) {
          prev_number = mod4_dic[gameName] - 1; 
        }
        const key = Object.keys(obj).find(k => obj[k] === prev_number);
        if (gameName && mod4[key] === false) {
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
        let prev_number = 0; 
        if (mod5_dic[gameName] - 1 >= 0) {
          prev_number = mod5_dic[gameName] - 1; 
        }
        const key = Object.keys(obj).find(k => obj[k] === prev_number);

        if (gameName && mod5[key] === false) {
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
        let prev_number = 0; 
        if (mod6_dic[gameName] - 1 >= 0) {
          prev_number = mod6_dic[gameName] - 1; 
        }
        const key = Object.keys(obj).find(k => obj[k] === prev_number);
        if (gameName && mod6[key] === false) {
          return res.status(403).json({ message: `${gameName} not unlocked` });
        }
      }*/

      next();

    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

module.exports = checkAccess;