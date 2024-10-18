// AreaChartComponent.js
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AreaChartComponent = ({ supplierNames, openPOCounts }) => {
  // Create data format for Recharts
  const data = supplierNames.map((supplier, index) => ({
    supplierName: supplier,
    openPOCount: openPOCounts[index],
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="supplierName" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="openPOCount" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
