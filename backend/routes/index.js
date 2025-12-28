const express = require("express");
const router = express.Router();

const serviceRoutes = require("./serviceRoutes");
const incidentRoutes = require("./incidentRoutes");

// Mount the sub-routes
router.use("/services", serviceRoutes);
router.use("/incidents", incidentRoutes);

module.exports = router;
