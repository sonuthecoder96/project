const mongoose = require("mongoose");
const IncidentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["TRIGGERED", "ACKNOWLEDGED", "RESOLVED"],
    default: "TRIGGERED",
  },
  createdAt: { type: Date, default: Date.now },
  history: [
    {
      action: String,
      timestamp: { type: Date, default: Date.now },
      message: String,
    },
  ],
});
module.exports = mongoose.model("Incident", IncidentSchema);
