import React, { useState, useEffect } from "react";
import {
  getServices,
  getIncidents,
  createIncident,
  updateIncidentStatus,
} from "./api/api";
import "./App.css";

function App() {
  const [services, setServices] = useState([]);
  const [incidents, setIncidents] = useState([]);

  const loadData = async () => {
    try {
      const sReq = await getServices();
      const iReq = await getIncidents();
      setServices(sReq.data);
      setIncidents(iReq.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, []);

  const handleTrigger = async (serviceId) => {
    await createIncident(
      serviceId,
      `Critical Failure - ${new Date().toLocaleTimeString()}`
    );
    loadData();
  };

  const handleStatusUpdate = async (id, newStatus) => {
   console.log(`Sending update for ${id} -> ${newStatus}`); // Debug Log 1

   try {
     const res = await updateIncidentStatus(id, newStatus);
     console.log("Backend response:", res.data);
   } catch (error) {
     console.error("Update failed:", error);
     alert("Failed to update status. Check console.");
   }
  };

  return (
    <div className="container">
      <header>
        <h1>🚨 PagerLite System</h1>
      </header>

      {/* Services Section */}
      <section className="services-grid">
        {services.map((svc) => (
          <div key={svc._id} className="service-card">
            <h3>{svc.name}</h3>
            <div className="on-call-info">
              <span className="label">On-Call:</span>
              <span className="value">
                {svc.currentOnCall ? svc.currentOnCall.name : "No one"}
              </span>
            </div>
            <button
              className="btn-danger"
              onClick={() => handleTrigger(svc._id)}
            >
              🔥 Trigger Incident
            </button>
          </div>
        ))}
      </section>

      {/* Incidents Table */}
      <section className="incidents-section">
        <h2>Active Incidents</h2>
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Service</th>
              <th>Assigned To</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((inc) => (
              <tr key={inc._id}>
                <td>
                  <span className={`badge ${inc.status}`}>{inc.status}</span>
                </td>
                <td>{inc.service?.name}</td>
                <td>{inc.assignedTo?.name}</td>
                <td>{new Date(inc.createdAt).toLocaleTimeString()}</td>
                <td>
                  {inc.status === "TRIGGERED" && (
                    <button
                      onClick={() =>
                        handleStatusUpdate(inc._id, "ACKNOWLEDGED")
                      }
                    >
                      Acknowledge
                    </button>
                  )}
                  {inc.status === "ACKNOWLEDGED" && (
                    <button
                      onClick={() => handleStatusUpdate(inc._id, "RESOLVED")}
                    >
                      Resolve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

//

export default App;
