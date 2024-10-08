import React from "react";

const TagCounters = () => {
  // Data array (You can make this dynamic by passing props or fetching data)
  const counters = [
    { label: "Crossed PO Date", value: 2, color: "#FF4D4D" }, // Red
    { label: "PO Number Matching", value: 9, color: "#1A73E8" }, // Blue
    { label: "Supplier Matching", value: 4, color: "#C2185B" }, // Purple
    { label: "Supplier Line Matching", value: 2, color: "#000" }, // Black
  ];

  // Inline styles for the components
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
      <div style={containerStyle}>
        {counters.map((item, index) => (
          <div style={itemStyle} key={index}>
            <div style={lineStyle(item.color)} />
            <div style={labelStyle}>{item.label}</div>
            <div style={valueStyle}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagCounters;
