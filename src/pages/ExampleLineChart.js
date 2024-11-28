import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Example = () => {
  const [data, setData] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://invoicezapi.focusrtech.com:57/user/dashboard-monthwise-invoice');
        const result = await response.json();

        // Transform the API response into an array of objects
        const formattedData = Object.keys(result).map(month => ({
          name: month,  // This will be used for the X-Axis
          invoices: result[month],  // This will be used for the Y-Axis
        }));

        setData(formattedData); // Update the state with formatted data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 30, left: 40, bottom: 20 }} // Adjust margins
      >
        {/* Add Grid Lines */}
        <CartesianGrid strokeDasharray="3 3" />

        {/* X-Axis */}
        <XAxis
          dataKey="name"
          label={{
            value: 'Month',
            position: 'insideBottom',
            offset: 1, // Add space below the axis
            fontSize: 12,
          }}
        />

        {/* Y-Axis */}
        <YAxis
          label={{
            value: 'Invoices Processed',
            angle: -90,
            position: 'insideLeft', // Keep label within the chart area
            offset: -25,
            fontSize: 14,
          }}
        />

        {/* Tooltip */}
        <Tooltip />

        {/* Line */}
        <Line
          type="monotone"
          dataKey="invoices"
          stroke="#8884d8"
          strokeWidth={2}
        />

        {/* Legend */}
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Example;
