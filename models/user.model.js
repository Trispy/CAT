const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  finished: { type: Boolean, default: false },
});
module.exports = userSchema;