import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,
} from "@fluentui/react-components";
import {
  CalendarMonthFilled,
  CalendarMonthRegular,
  bundleIcon,
} from "@fluentui/react-icons";


const path = "/admin";
const path1 = "http://localhost:3000/";
// Grid
const counters = [
    { label: "Page Processed", value: 1556, color: "#00bfbf" }, // Cyan
    { label: "Tokens Spent", value: 2, color: "#d62727" }, // Red
    { label: "Current Storage", value: 9, color: "#1f497d" }, // Dark Blue
    { label: "Document Sucess", value: 4, color: "#d21994" }, // Magenta
   
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

const Admin = () => {
  return (
    <div>
      <div className="Approvebreadcrump">
        <Breadcrumb aria-label="Breadcrumb default example">
          <BreadcrumbItem>
            <BreadcrumbButton>Control Center</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton href={path}>Usage</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
        </Breadcrumb>
      </div>
      <div style={{ display: "flex", justifyContent: "flexStart", padding: "1px" }}>
        <h3 style={{ fontSize: "1.5em", marginLeft: "5px" }}>Usage</h3>
      </div>
      <div>
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
      

      
     <div>
        

     </div>
    </div>
  );
};

export default Admin;
