const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  finished_m1: { type: Boolean, default: false }, 
  finished_m2: { type: Boolean, default: false }, 
  finished_m3: { type: Boolean, default: false }, 
  finished_m4: { type: Boolean, default: false }, 
  finished_m5: { type: Boolean, default: false }, 
  finished_m6: { type: Boolean, default: false }, 
});
module.exports = mongoose.model("User", userSchema);