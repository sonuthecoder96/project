const { Incident } = require("../models");
const { getOnCallUser } = require("../utils/rotationLogic");

const createIncident = async (req, res) => {
  const { serviceId, title } = req.body;
  try {
    const onCallUser = await getOnCallUser(serviceId);
    if (!onCallUser)
      return res.status(400).json({ error: "No on-call defined" });

    const incident = await Incident.create({
      title,
      service: serviceId,
      assignedTo: onCallUser._id,
      status: "TRIGGERED",
      history: [{ action: "TRIGGERED", message: `Paging ${onCallUser.name}` }],
    });

    console.log(`[ALERT] SMS sent to ${onCallUser.name}`);
    res.status(201).json(incident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getIncidents = async (req, res) => {
  const incidents = await Incident.find({ status: { $ne: "RESOLVED" } })
    .populate("service")
    .populate("assignedTo")
    .sort({ createdAt: -1 });
  res.json(incidents);
};

const updateIncidentStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const incident = await Incident.findById(req.params.id);
    incident.status = status;
    incident.history.push({ action: status, message: `Status: ${status}` });
    await incident.save();
    res.json(incident);
    console.log("[DEBUG] Save Successful!");
  } catch (error) {
     console.error("SAVE FAILED:", error);
    res.status(500).json({ message: error.message });
  }
};

const checkEscalations = async (req, res) => {
  // Logic: Find incidents > 5 mins old
  const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000);
  const staleIncidents = await Incident.find({
    status: "TRIGGERED",
    createdAt: { $lt: fiveMinsAgo },
  });

  for (let inc of staleIncidents) {
    console.log(`[ESCALATE] Incident ${inc._id} is stale.`);
    inc.history.push({ action: "ESCALATED", message: "Manager notified" });
    cpnso;e.log("Manager Notified");
    await inc.save();
  }
  res.json({ count: staleIncidents.length });
};

module.exports = {
  createIncident,
  getIncidents,
  updateIncidentStatus,
  checkEscalations,
};
