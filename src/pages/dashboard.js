import React, { useState, useEffect } from "react";
import CalendarComponent from "../components/calendar";
import InvoiceStatusPieChart from "../components/piechart";
import LineChartPage from "../components/Linechart";
import SankeyChart from "../components/SankeyChart";
import {Divider} from "@fluentui/react-components"
const TagCounters = () => {
  

  return (
    <div style={{ maxHeight: "86vh", overflowY: "auto", padding: "20px",backgroundColor:"#c9c9c9" }}>
      <div style={{ marginBottom: "20px" ,backgroundColor:"white",height:"100vh",padding:"2em",borderRadius:"10px"}}>
        <CalendarComponent />
      </div>
      <div
  style={{
    backgroundColor: "white",
    maxHeight: "90vh", 
    padding: "2em",
    borderRadius: "10px",
    marginBottom: "20px",
    marginTop:"1em",
    width:"96%",
    marginRight:"50px"

    
  }}
>

  <div style={{display:"flex"}}><h2>Invoice</h2></div>
  <Divider/>
  <div style={{display:"flex"}}><h2>Invoice Processed</h2></div>

  <SankeyChart/>
</div>


      <div
  style={{
    display: "flex",
    gridTemplateColumns: "repeat(2, 1fr)", 
    gap: "20px", 
  }}
>
  <LineChartPage/>
  
 
  <InvoiceStatusPieChart />
</div>

     

    </div>
  );
};

export default TagCounters;
