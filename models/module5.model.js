const mongoose = require("mongoose");
const module5SummarySchema = new mongoose.Schema({
  username: {type: String, required: true},
  cold: { type: Boolean, required: true, default: false },
  hot: {type: Boolean, required: true, default: false},
});
module.exports = mongoose.model("module5SummarySchema", module5SummarySchema);