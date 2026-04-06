const mongoose = require("mongoose");
const module4SummarySchema = new mongoose.Schema({

  username: {type: String, required: true, unique: true},
  module4part1: { type: Boolean, required: true, unique: true },
  module4part2: {type: Boolean, required: true, default: false},
  module4part3: {type: Boolean, required: true, default: false}
});
module.exports = mongoose.model("module4SummarySchema", module4SummarySchema);