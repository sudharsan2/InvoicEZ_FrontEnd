import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AreaChartComponent = ({ supplierNames, supplierTotalAmounts }) => {
  // Create data format for Recharts
  const data = supplierNames.map((supplier, index) => ({
    supplierName: supplier,
    supplierTotalAmounts: supplierTotalAmounts[index],
  }));

  return (
    <ResponsiveContainer width="100%" height={200} style={{backgroundColor:"white",borderRadius:"10px",padding:"15px"}}>
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
        {/* Updated dataKey to supplierTotalAmounts */}
        <Area
          type="monotone"
          dataKey="supplierTotalAmounts"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
