import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const FunnelChartPage = () => {
  const [data, setData] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://172.235.21.99:5729/user/statusForApprove",
        );
        const apiData = response.data;

        // Convert the API response to a format suitable for the bar chart
        const chartData = [
          {
            name: "PO Number Matching Count",
            value: apiData.PONumberMatchingCount,
          },
          {
            name: "Supplier Matching Count",
            value: apiData.SupplierMatchingCount,
          },
          {
            name: "Line Items Matching Count",
            value: apiData.LineItemsMatchingCount,
          },
        ];

        setData(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "20px",
        width: "500px",
        height: "380px",
      }}
    >
      <h2
        style={{ textAlign: "center", fontWeight: "normal", fontSize: "15px" }}
      >
        Status for Approval
      </h2>
      {data.length > 0 ? (
        <BarChart
          data={data}
          layout="vertical" // This makes the chart horizontal
          margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
          width={500} // Fixed width
          height={380} // Fixed height
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FunnelChartPage;
