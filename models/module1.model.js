const mongoose = require("mongoose");
const module1SummarySchema = new mongoose.Schema({
  username: { type: String, required: true},
  symptoms: {type: Boolean, required: true, default: false},
  personalHygiene: {type: Boolean, required: true, default: false}, 
  location: {type: Boolean, required: true, default: false}
});
module.exports = mongoose.model("module1SummarySchema", module1SummarySchema);