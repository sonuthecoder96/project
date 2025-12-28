const { Service } = require("../models");

const getOnCallUser = async (serviceId) => {
  const service = await Service.findById(serviceId).populate("rotationOrders");
  if (!service || service.rotationOrders.length === 0) return null;

  const now = new Date().getTime();
  const start = new Date(service.rotationStartTime).getTime();
  const intervalMs = service.rotationIntervalHours * 60 * 60 * 1000;

  const elapsedIntervals = Math.floor(Math.abs(now - start) / intervalMs);
  const index = elapsedIntervals % service.rotationOrders.length;

  return service.rotationOrders[index];
};

module.exports = { getOnCallUser };
