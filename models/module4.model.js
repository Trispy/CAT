const mongoose = require("mongoose");
const module4SummarySchema = new mongoose.Schema({

  username: {type: String, required: true, unique: true},
  chopping: { type: Boolean, required: true, unique: true },
  cooking: {type: Boolean, required: true, default: false},
  module2part1: {type: Boolean, required: true, default: false}, 
});
module.exports = mongoose.model("module4SummarySchema", module4SummarySchema);