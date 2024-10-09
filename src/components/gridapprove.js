import React from "react";

const TagCounters = () => {
  const counters = [
    { label: "To Do", value: 15, color: "#00bfbf" }, // Cyan
    { label: "Crossed PO Date", value: 2, color: "#d62727" }, // Red
    { label: "PO Number Matching", value: 9, color: "#1f497d" }, // Dark Blue
    { label: "Supplier Matching", value: 4, color: "#d21994" }, // Magenta
    { label: "Supplier Line Matching", value: 2, color: "#000000" }, // Black
  ];

  const containerStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    padding: "8px",
    marginLeft:"-8em"
  };

  const itemStyle = {
    display: "flex",
    alignItems: "center",
  };

  const lineStyle = (color) => ({
    width: "3px",
    height: "50px", 
    backgroundColor: color,
    marginRight: "12px",
  });

  const labelStyle = {
    fontSize: "14px",
    fontWeight: "normal", 
    marginBottom:"10px"
  };

  const valueStyle = {
    fontSize: "28px", 
    fontWeight: "bold",
    color: "#333", 
    marginLeft: "6px", 
  };

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div style={containerStyle}>
        {counters.map((item, index) => (
          <div style={itemStyle} key={index}>
            <div style={lineStyle(item.color)} />
            <div>
              <div style={labelStyle}>{item.label}</div>
              <div style={valueStyle}>{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagCounters;
