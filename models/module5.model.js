const mongoose = require("mongoose");
const module5SummarySchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  module5part1: { type: Boolean, required: true, unique: true },
  module5part2: {type: Boolean, required: true, default: false},
  module5part3: {type: Boolean, required: true, default: false}
});
module.exports = mongoose.model("module5SummarySchema", module5SummarySchema);