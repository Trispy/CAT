const mongoose = require("mongoose");
const module3SummarySchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  username: {type: String, required: true, unique: true},
  chopping: { type: String, required: true, unique: true },
  cooking: {type: Boolean, required: true, default: false},
  module2part1: {type: Boolean, required: true, default: false}, 
});
module.exports = mongoose.model("module3SummarySchema", module3SummarySchema);