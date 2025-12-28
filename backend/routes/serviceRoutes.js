const express = require("express");
const router = express.Router();
const {
  seedDatabase,
  getDashboard,
} = require("../controllers/serviceController");

router.post("/seed", seedDatabase);
router.get("/dashboard", getDashboard);

module.exports = router;
