const mongoose = require("mongoose");
const module3SummarySchema = new mongoose.Schema({

  username: {type: String, required: true, unique: true},
  module3part1: {type: Boolean, required: true, default: false}, 
  module3part2: {type: Boolean, required: true, default: false}, 
  module3part3: {type: Boolean, required: true, default: false}, 
});
module.exports = mongoose.model("module3SummarySchema", module3SummarySchema);