import React, { useState, useEffect } from "react";
import CalendarComponent from "../components/calendar";
import BarChartComponent from "../components/barchart";
import HorizontalBarChart from "../components/horizontalchart";
import AreaChartComponent from "../components/areachart";
import DonutChartPage from "../components/donutchart";
import InvoiceStatusPieChart from "../components/piechart";
import LineChartPage from "../components/Linechart";
import FunnelChartPage from "../components/FunnelChart";
import ApexChart from "../components/ApexChart";
import { LineChart } from "recharts";
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
    <div style={{ maxHeight: "86vh", overflowY: "auto", padding: "20px",backgroundColor:"#f5f5f5" }}>
      <div style={{ marginBottom: "130px" }}>
        <CalendarComponent />
      </div>
      <div
        style={{ marginBottom: "3em", display: "flex", alignItems: "center",justifyContent:"space-between",gap:"10px" }}
      >
        
        <InvoiceStatusPieChart />
        {/* <FunnelChartPage/> */}
        <ApexChart/>
        <DonutChartPage />
      </div>
      <div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            gap:"10px"
          }}
        >
          <BarChartComponent
        />
          <LineChartPage/>
        </div>
      </div>
    </div>
  );
};

export default StoreTagCounters;
