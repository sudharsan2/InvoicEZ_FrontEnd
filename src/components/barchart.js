import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({ poNumbers, invoiceCounts }) => {
  const data = poNumbers.map((po, index) => ({
    poNumber: po,
    invoiceCount: invoiceCounts[index],
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="poNumber" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="invoiceCount" fill="#8884d8" barSize={30}/>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;