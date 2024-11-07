import React, { useState, useEffect } from "react";
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

  // State to hold supplier names, invoice counts, and total amounts
  const [supplierNames, setSupplierNames] = useState([]);
  const [supplierInvoiceCounts, setSupplierInvoiceCounts] = useState([]);
  const [supplierTotalAmounts, setSupplierTotalAmounts] = useState([]);

  useEffect(() => {
    // Fetch the supplier counts from the API
    const fetchSupplierData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/user/supplier-counts",
        );
        const data = await response.json();

        // Transform API data into arrays for supplier names and invoice counts
        const names = Object.keys(data);
        const counts = Object.values(data);

        // Update state with supplier names and counts
        setSupplierNames(names);
        setSupplierInvoiceCounts(counts);
      } catch (error) {
        console.error("Error fetching supplier counts:", error);
      }
    };

    // Fetch the supplier total amounts from the API
    const fetchSupplierTotalAmounts = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/user/supplier-totalamount",
        );
        const data = await response.json();

        // Extract total amounts corresponding to supplier names
        const totalAmounts = Object.values(data);

        // Update state with total amounts
        setSupplierTotalAmounts(totalAmounts);
      } catch (error) {
        console.error("Error fetching supplier total amounts:", error);
      }
    };

    // Fetch both supplier data and total amounts on component mount
    fetchSupplierData();
    fetchSupplierTotalAmounts();
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  const poNumbers = ["PO123", "PO124", "PO125", "PO126", "PO127"];
  const invoiceCounts = [10, 20, 15, 25, 18];

  const openPOCounts = [5, 8, 12, 7, 9];

  return (
    <div style={{ maxHeight: "86vh", overflowY: "auto", padding: "20px" }}>
      <div style={{ marginBottom: "130px" }}>
        <CalendarComponent />
      </div>
      <div
        style={{ marginBottom: "30px", display: "flex", alignItems: "center" }}
      >
        <BarChartComponent
          poNumbers={poNumbers}
          invoiceCounts={invoiceCounts}
        />
        <InvoiceStatusPieChart />
      </div>
      <div>
        {/* Conditional rendering to ensure supplier data is available before rendering charts */}
        {supplierNames.length > 0 && supplierTotalAmounts.length > 0 ? (
          <AreaChartComponent
            supplierNames={supplierNames}
            supplierTotalAmounts={supplierTotalAmounts}
          />
        ) : (
          <div>Loading Area Chart...</div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <DonutChartPage />
          {/* Ensure the HorizontalBarChart renders only when data is available */}
          {supplierNames.length > 0 && supplierInvoiceCounts.length > 0 ? (
            <HorizontalBarChart
              supplierNames={supplierNames}
              invoiceCounts={supplierInvoiceCounts}
            />
          ) : (
            <div>Loading Horizontal Chart...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagCounters;
