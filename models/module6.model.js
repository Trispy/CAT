const mongoose = require("mongoose");

const module6SummarySchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  serviceSetup: { type: Boolean, required: true, unique: true },
  foodServiceMishaps: {type: Boolean, required: true, default: false},
});
module.exports = mongoose.model("module6SummarySchema", module6SummarySchema);