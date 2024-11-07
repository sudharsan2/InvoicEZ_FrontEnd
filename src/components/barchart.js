import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const BarChartComponent = () => {
  const [data, setData] = useState([]);

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.10.15.15:5719/user/dashboard-supplier-counts'); 
        const apiData = response.data;

        
        const chartData = Object.keys(apiData).map((supplier) => ({
          supplier: supplier,
          openPOs: apiData[supplier],
        }));

        setData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="50%" height={400} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '5em' }}>
      <h2 style={{textAlign:"center",fontWeight:"normal",fontSize:"15px"}}>Open PO Status</h2>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 85,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="supplier" 
          interval={0} 
          angle={-45} 
          textAnchor="end" 
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="openPOs" fill="#4B9CD3" barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
