import React, { useState, useEffect } from "react";
import { fetchDashboard, triggerIncident, updateIncident } from "../api/api";
import IncidentRow from "./IncidentRow";

const Dashboard = () => {
  const [data, setData] = useState({ services: [], incidents: [] }); // Adjusted state structure
  // Note: Depending on your backend response structure, you might need to adjust.
  // My backend controller sends `services` on one route and `incidents` on another.
  // Let's fix the fetch logic inside useEffect below.

  // State for services and incidents separately
  const [services, setServices] = useState([]);
  const [incidents, setIncidents] = useState([]);

  // Fetch Data Function
  const loadData = async () => {
    try {
      // We need two calls based on our new backend routes
      // 1. Get Services (which includes current on-call)
      const serviceRes = await fetchDashboard();
      setServices(serviceRes.data);

      // 2. Get Incidents (we need to fetch incidents from the incident route)
      // *Note: We need to import axios directly or add a method in api.js*
      // Let's assume we added `fetchIncidents` in api.js, or we use the existing one.
      // Wait, let's fix api.js to include getIncidents
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  // Revised Load Data using raw axios or updated API helper
  // Let's just keep it simple and do it here for clarity or update api.js

  return (
    <div>
      {/* We will write the full clean version in Step 5 below to avoid confusion */}
    </div>
  );
};
