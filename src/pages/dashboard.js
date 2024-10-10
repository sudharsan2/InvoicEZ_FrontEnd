import React from "react";

const TagCounters = () => {
  const counters = [
    { label: "Crossed PO Date", value: 2, color: "#FF4D4D" }, // Red
    { label: "PO Number Matching", value: 9, color: "#1A73E8" }, // Blue
    { label: "Supplier Matching", value: 4, color: "#C2185B" }, // Purple
    { label: "Supplier Line Matching", value: 2, color: "#000" }, // Black
  ];

  const containerStyle = {
    width: "90%",
    display: "flex",
    justifyContent: "space-around",
    padding: "10px",
  };

  const itemStyle = {
    display: "flex",
    alignItems: "center",
  };

  const lineStyle = (color) => ({
    width: "2px",
    height: "40px",
    backgroundColor: color,
    marginRight: "8px",
  });

  const labelStyle = {
    marginRight: "8px",
    fontSize: "14px",
    fontWeight: "bold",
  };

  const valueStyle = {
    fontSize: "24px",
    fontWeight: "bold",
  };

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div style={containerStyle}>DASHBOARD</div>
    </div>
  );
};

export default TagCounters;
