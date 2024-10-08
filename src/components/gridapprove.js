import { Flex } from "antd";
import Column from "antd/es/table/Column";
import React from "react";
 
const TagCounters = () => {
  const counters = [
    { label: "To Do", value: 15, color: "#FF4D4D" }, // Red
    { label: "Crossed PO Date", value: 2, color: "#1A73E8" }, // Blue
    { label: "PO Number Matching", value: 9, color: "#C2185B" }, // Purple
    { label: "Supplier Matching", value: 2, color: "#b4009e" },
    { label: "Supplier Line Matching", value: 12, color: "#000" }, // Black
  ];
 
  
  const containerStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    padding: "8px",
  };
 
  const itemStyle = {
    display: "flex",
    alignItems: "center",
    
  };
 
  const lineStyle = (color) => ({
    width: "5px",
    height: "60px",
    backgroundColor: color,
    marginRight: "12px",
    marginLeft: "12px"
    
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