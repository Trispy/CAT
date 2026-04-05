const mongoose = require("mongoose");
const module3SummarySchema = new mongoose.Schema({

  username: {type: String, required: true, unique: true},
  cansort: { type: Boolean, required: true, default: false},
  expiration: {type: Boolean, required: true, default: false},
  allergenIdentification: {type: Boolean, required: true, default: false}, 
});
module.exports = mongoose.model("module3SummarySchema", module3SummarySchema);