require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const gameRoutes = require('./routes/game.routes');
const app = express();
app.use(cors());
app.use(express.json());
let MONGODB_URI = '';
if (process.env.MONGODB_URI) {
  MONGODB_URI = process.env.MONGODB_URI;
}

 
const PORT = 3001;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB has been connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
  app.use('/api/users', userRoutes); // use the route http://localhost:3000/api/users/createaccount or http://localhost:3000/api/users/login
  app.use('/api/game', gameRoutes); // use the route http://localhost:3000/api/game/addModule1Summary or http://localhost:3000/api/game/getModule1Summary
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

