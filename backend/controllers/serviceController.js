const { Service, User, Incident } = require("../models"); // Imports from models/index.js
const { getOnCallUser } = require("../utils/rotationLogic");

const seedDatabase = async (req, res) => {
  await User.deleteMany({});
  await Service.deleteMany({});
  await Incident.deleteMany({});

  const u1 = await User.create({
    name: "Alice Engineer",
    email: "alice@test.com",
  });
  const u2 = await User.create({ name: "Bob DevOps", email: "bob@test.com" });

  await Service.create({
    name: "Payments API",
    rotationOrders: [u1._id, u2._id],
    rotationIntervalHours: 24,
  });

  res.status(201).json({ message: "Database seeded successfully" });
};

const getDashboard = async (req, res) => {
  try {
    const services = await Service.find().populate("rotationOrders");
    const servicesWithOnCall = await Promise.all(
      services.map(async (s) => {
        const onCall = await getOnCallUser(s._id);
        return { ...s.toObject(), currentOnCall: onCall };
      })
    );
    res.json(servicesWithOnCall);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { seedDatabase, getDashboard };
