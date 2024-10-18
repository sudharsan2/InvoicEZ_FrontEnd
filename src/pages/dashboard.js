import React from "react";
import CalendarComponent from "../components/calendar";
import BarChartComponent from "../components/barchart";
import HorizontalBarChart from "../components/horizontalchart";
import AreaChartComponent from "../components/areachart";
import DonutChartPage from "../components/donutchart";
import InvoiceStatusPieChart from "../components/piechart";

const TagCounters = () => {
  const counters = [
    { label: "Crossed PO Date", value: 2, color: "#FF4D4D" },
    { label: "PO Number Matching", value: 9, color: "#1A73E8" },
    { label: "Supplier Matching", value: 4, color: "#C2185B" },
    { label: "Supplier Line Matching", value: 2, color: "#000" },
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

  const poNumbers = ['PO123', 'PO124', 'PO125', 'PO126', 'PO127'];
  const invoiceCounts = [10, 20, 15, 25, 18];

  const supplierNames = ['Supplier A', 'Supplier B', 'Supplier C', 'Supplier D', 'Supplier E'];
  const supplierInvoiceCounts = [12, 30, 25, 15, 20];

  const openPOCounts = [5, 8, 12, 7, 9];

  return (
    <div style={{ maxHeight: '86vh', overflowY: 'auto', padding: '20px' }}>
      <div style={{ marginBottom: '130px' }}>
        <CalendarComponent />
      </div>
      <div style={{ marginBottom: '30px', display: 'flex',  alignItems:'center' }}>
        <BarChartComponent poNumbers={poNumbers} invoiceCounts={invoiceCounts} />
        <InvoiceStatusPieChart/>
       
      </div>
      <div>
        {/* Set the height of AreaChartComponent to 20vh */}
        <div>
          <AreaChartComponent supplierNames={supplierNames} openPOCounts={openPOCounts} />
        </div>

        <div style={{display:'flex', justifyContent:'space-around', alignItems:'center'}}>
          < DonutChartPage/>
          <HorizontalBarChart supplierNames={supplierNames} invoiceCounts={supplierInvoiceCounts} />
        </div>
      </div>
    </div>
  );
};

export default TagCounters;
