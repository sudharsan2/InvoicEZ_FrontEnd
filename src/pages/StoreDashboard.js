import React, { useState, useEffect } from "react";
import CalendarComponent from "../components/calendar";
import BarChartComponent from "../components/barchart";
import HorizontalBarChart from "../components/horizontalchart";
import AreaChartComponent from "../components/areachart";
import DonutChartPage from "../components/donutchart";
import InvoiceStatusPieChart from "../components/piechart";
import LineChartPage from "../components/Linechart";
// import SankeyChart from "../components/SankeyChart";
import ApexChart from "../components/ApexChart";
import { LineChart } from "recharts";
import SankeyChart from "../components/SankeyChart";
import {Divider} from "@fluentui/react-components"
const StoreTagCounters = () => {
  const counters = [
    { label: "Crossed PO Date", value: 2, color: "#FF4D4D" },
    { label: "PO Number Matching", value: 9, color: "#1A73E8" },
    { label: "Supplier Matching", value: 4, color: "#C2185B" },
    { label: "Supplier Line Matching", value: 2, color: "#000" },
  ];

  // State to hold supplier names, invoice counts, and total amounts
  const [supplierNames, setSupplierNames] = useState([]);
  const [supplierInvoiceCounts, setSupplierInvoiceCounts] = useState([]);
  const [supplierTotalAmounts, setSupplierTotalAmounts] = useState([]);

  const poNumbers = ["PO123", "PO124", "PO125", "PO126", "PO127"];
  const invoiceCounts = [10, 20, 15, 25, 18];

  const openPOCounts = [5, 8, 12, 7, 9];

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

  {/* <SankeyChart/> */}
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

export default StoreTagCounters;
