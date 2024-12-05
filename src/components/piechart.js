import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// Define colors for pie chart slices
const COLORS = ["#107c10", "#0078d4"];

const InvoiceStatusPieChart = () => {
  const [invoiceData, setInvoiceData] = useState([]);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const authToken = localStorage.getItem("access_token"); 
  
        const response = await fetch(
          "https://invoicezapi.focusrtech.com:57/user/dashboard-invoice-status",
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
  
        setInvoiceData([
          { status: "InApprove", count: data.approved_count },
          { status: "Pending", count: data.pending_count },
        ]);
      } catch (error) {
        console.error("Error fetching invoice status counts:", error);
      }
    };
  
    fetchInvoiceData();
  }, []);
  

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "83vh", padding: "20px", backgroundColor: "white", borderRadius: "10px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginBottom: "20px" }}>
        {/* Status and Invoice Status Headings */}
        <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>Status</h3>
        <hr style={{ border: "none", borderTop: "1px solid #ccc", marginBottom: "20px", width: "100%" }} />
        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>Invoice Status</h2>
      </div>
      
      

      {/* Pie Chart */}
      {invoiceData.length > 0 ? (
        <PieChart width={500} height={400}>
          <Pie
            data={invoiceData}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={135}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="count"
            nameKey="status"
          >
            {invoiceData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default InvoiceStatusPieChart;
