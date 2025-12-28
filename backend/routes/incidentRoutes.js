const express = require("express");
const router = express.Router();
const {
  createIncident,
  getIncidents,
  updateIncidentStatus,
  checkEscalations,
} = require("../controllers/incidentController");

router.route("/").get(getIncidents).post(createIncident);

router.route("/:id").patch(updateIncidentStatus);

router.post("/escalate", checkEscalations);

module.exports = router;
