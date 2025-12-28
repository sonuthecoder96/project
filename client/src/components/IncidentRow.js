import React from "react";

const IncidentRow = ({ incident, onUpdate }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "TRIGGERED":
        return "#d9534f"; // Red
      case "ACKNOWLEDGED":
        return "#f0ad4e"; // Orange
      case "RESOLVED":
        return "#5cb85c"; // Green
      default:
        return "gray";
    }
  };

  return (
    <tr style={{ borderBottom: "1px solid #eee" }}>
      <td>
        <span
          style={{
            padding: "5px 10px",
            borderRadius: "4px",
            color: "white",
            fontWeight: "bold",
            backgroundColor: getStatusColor(incident.status),
          }}
        >
          {incident.status}
        </span>
      </td>
      <td>{incident.service?.name || "Unknown"}</td>
      <td>{incident.assignedTo?.name || "Unassigned"}</td>
      <td>{incident.title}</td>
      <td>
        {incident.status === "TRIGGERED" && (
          <button onClick={() => onUpdate(incident._id, "ACKNOWLEDGED")}>
            Acknowledge
          </button>
        )}
        {incident.status === "ACKNOWLEDGED" && (
          <button onClick={() => onUpdate(incident._id, "RESOLVED")}>
            Resolve
          </button>
        )}
        {incident.status === "RESOLVED" && <span>Done</span>}
      </td>
    </tr>
  );
};

export default IncidentRow;
