const mongoose = require("mongoose");
const module2SummarySchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  username: {type: String, required: true},
  chopping: { type: Boolean, required: true, default: false },
  cooking: {type: Boolean, required: true, default: false},
  module2part1: {type: Boolean, required: true, default: false}, 
});
module.exports = mongoose.model("module2SummarySchema", module2SummarySchema);