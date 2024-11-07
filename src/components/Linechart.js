import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { makeStyles } from '@fluentui/react-components';

// Styles
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '54vh',
    padding: '4.5em',
    width:"50%",
    backgroundColor: "white",
    borderRadius: "10px",
  },
  chartContainer: {
    width: '90%', 
    height: '400px', 
  },
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
});

const LineChartPage = () => {
  const styles = useStyles();
  const [data, setData] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/user/dashboard-supplier-totalamount');
        const apiData = response.data;

        // Transform the API data into a format suitable for the chart
        const chartData = Object.keys(apiData).map((supplier) => ({
          supplier,
          amountToPay: apiData[supplier],
        }));

        console.log('Transformed Chart Data:', chartData); // Check the transformed data
        setData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  console.log('Data to Render in Chart:', data); // Check the data before rendering

  return (
    <div className={styles.root}>
      {/* <h2 className={styles.heading}>Line Chart of Supplier Amounts</h2> */}
      {data.length > 0 ? (
        <div className={styles.chartContainer}>
          <h2 style={{textAlign:"center",fontWeight:"normal",fontSize:"15px"}}>Supplier Total Amount</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 40, bottom: 105 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="supplier" 
                interval={0} 
                angle={-45} 
                textAnchor="end" />
              <YAxis />
              <Tooltip />
              <Legend />
              {/* Line representing the amount to pay with updated color */}
              <Line type="monotone" dataKey="amountToPay" stroke="#bbc3f2" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default LineChartPage;
