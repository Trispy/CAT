const mongoose = require("mongoose");
const module1SummarySchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  chill_station_score: { type: Number, default: 0 },
  clean_station_score: { type: Number, default: 0 },
  separate_station_score: { type: Number, default: 0 },
  average_score: { type: Number, default: 0 },
  cook_station_score: { type: Number, default: 0 },
  strikes: { type: Number, default: 0 },
  completed: { type: Boolean, default: false }
});
module.exports = mongoose.model("module1SummarySchema", module1SummarySchema);