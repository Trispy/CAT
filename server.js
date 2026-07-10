const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const gameRoutes = require('./routes/game.routes');
const app = express();
import { rateLimit } from 'express-rate-limit'

app.use(cors());
app.use(express.json());
let MONGODB_URI = '';
if (process.env.MONGODB_URI) {
  MONGODB_URI = process.env.MONGODB_URI;
}

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 100, // Limit each IP to 100 requests per window
  statusCode: 429,
  message: {
    error: "Too Many Requests",
    message: "You have exceeded your 100 requests per 15-minute quota."
  },
  standardHeaders: true, // Return standard draft-7 RateLimit-* headers
  legacyHeaders: false,  // Disable the X-RateLimit-* headers
});


const PORT = 3001;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB has been connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
  app.get("/test", (req, res) => {
  res.send("API is working");
});
  app.use('/api/users', apiLimiter); // limits pages under "users", pages under "game" rely on a jwt token
  app.use('/api/users', userRoutes); // use the route http://localhost:3000/api/users/createaccount or http://localhost:3000/api/users/login
  app.use('/api/game', gameRoutes); // use the routes from game.model.js with http://localhost:3000/api/game/routesingame.model.js
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const serverless = require("serverless-http");

module.exports.handler = serverless(app);
