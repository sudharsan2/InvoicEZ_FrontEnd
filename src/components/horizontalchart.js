
// HorizontalBarChart.js
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const HorizontalBarChart = ({ supplierNames, invoiceCounts }) => {
  // Ensure that the data is in the correct format
  const data = supplierNames.map((supplier, index) => ({
    supplierName: supplier,
    invoiceCount: invoiceCounts[index],
  }));

  const barHeight = 100; // Height for each bar
  const chartHeight = supplierNames.length * barHeight + 100; // Add extra height for padding, labels, etc.

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <BarChart
        data={data}
        layout="vertical" // This is important to ensure the chart is horizontal
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {/* XAxis is now the invoiceCount and must be of type number */}
        <XAxis type="number" />
        {/* YAxis is now the supplierName and must be of type category */}
        <YAxis dataKey="supplierName" type="category" />
        <Tooltip />
        <Legend />
        {/* Bar now uses the invoiceCount as the dataKey */}
        <Bar dataKey="invoiceCount" fill="#82ca9d" barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HorizontalBarChart;
