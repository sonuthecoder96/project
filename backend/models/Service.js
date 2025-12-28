const mongoose = require("mongoose");
const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rotationOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  rotationStartTime: { type: Date, default: Date.now },
  rotationIntervalHours: { type: Number, default: 24 },
});
module.exports = mongoose.model("Service", ServiceSchema);
