import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,
  Divider
} from "@fluentui/react-components";
import {
  CalendarMonthFilled,
  CalendarMonthRegular,
  bundleIcon,
} from "@fluentui/react-icons";
import TagCounters from "../components/gridapprove";
import StoreTable from "../components/StoreTable";
import Search from "../components/Search";

// const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const path = "/storeuser";
const path1 = "/storedashboard";

const containerStyle = {
  width: "100%",
  display: "flex",
  
  // justifyContent: "space-around",
  padding: "8px",
  marginLeft:"0em"
};

const itemStyle = {
  display: "flex",
  alignItems: "flex-start",
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
  marginLeft: "0px", 
};

const divstyle ={
  display:"flex",
  flexDirection:"column",
  marginLeft:"20px",
  paddingTop:"6em",
  fontWeight:"bold",

  
}
const StoreUser = () => {
  const [tableLength, setTableLength] = useState(0);
  const counters = [
    { label: "To Do", value: tableLength, color: "#00bfbf" }, // Cyan
    // { label: "AI Identified", value: 2, color: "#d62727" }, // Red
    // { label: "User Resolved", value: 9, color: "#1f497d" }, // Dark Blue
    // { label: "Refix", value: 4, color: "#d21994" }, // Magenta
  ];
  return (
    <div style={{maxHeight:"91vh",overflowY:"auto"}}>
      <div style={{ height: "5vh" }}>
        <div className="Approvebreadcrump" >
          <Breadcrumb aria-label="Breadcrumb default example">
            <BreadcrumbItem>
              <BreadcrumbButton href={path1}>Home</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton href={path}>Generate Gate Entry</BreadcrumbButton>
            </BreadcrumbItem>
            {/* <BreadcrumbDivider /> */}
          </Breadcrumb>
        </div>
      </div>
      <div>
        <div style={{ maxHeight: "10vh"}}>
          <div
            style={{
              display: "flex",
              justifyContent: "flexStart",
              padding: "1px",
            }}
          >
            <h3 style={{ fontSize: "1.5em", marginLeft: "5px" }}>Generate Gate Entry</h3>
          </div>

          {/* <div>
           
            <TagCounters type="approve" />
          </div> */}

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
        <div style={{ width: "100%", height: "7vh" }} />
        <div style={{ display: 'flex', justifyContent: 'center' ,width: '90%',alignItems:"center",marginLeft:"1em"}}>
      <Divider style={{ marginTop:"4em"}} />
    </div>
        <div style={{marginTop:"-2em"}}>
          <StoreTable setTableLength={setTableLength}/>
        </div>
      </div>
    </div>
  );
};

export default StoreUser;
