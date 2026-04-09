const mongoose = require("mongoose");
const module4SummarySchema = new mongoose.Schema({

  username: {type: String, required: true, unique: true},
  cleanTote: { type: Boolean, required: true, unique: true },
  sorting: {type: Boolean, required: true, default: false},
  packing: {type: Boolean, required: true, default: false}
});
module.exports = mongoose.model("module4SummarySchema", module4SummarySchema);