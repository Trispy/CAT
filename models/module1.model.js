const mongoose = require("mongoose");
const module1SummarySchem = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  username: { type: String, required: true},
  symptoms: {type: Boolean, required: true, default: false},
  personalHygiene: {type: Boolean, required: true, default: false}, 
  location: {type: Boolean, required: true, default: false}
});
module.exports = mongoose.model("module1SummarySchem", module1SummarySchem);