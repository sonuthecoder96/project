import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const getServices = () => API.get("/services/dashboard");
export const getIncidents = () => API.get("/incidents");
export const createIncident = (serviceId, title) =>
  API.post("/incidents", { serviceId, title });
export const updateIncidentStatus = (id, status) =>
  API.patch(`/incidents/${id}`, { status });
