import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { makeStyles } from "@fluentui/react-components";

// Styles
const useStyles = makeStyles({
  root: {
    borderTop: "1px solid #FFFFFF",
    backgroundColor: "white",
    borderRadius: "5px",
    padding: "10px",
    width: "98%",
    maxWidth: "1100px",
    height: "85vh",
    maxHeight: "100vh",
    overflow: "hidden",
  },
  chartContainer: {
    width: "100%",
    height: "400px",
  },
  heading: {
    marginBottom: "10px",
    fontSize: "24px",
    fontWeight: "bold",
  },
});

const LineChartPage = () => {
  const styles = useStyles();
  const [data, setData] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        

        const token = localStorage.getItem("access_token");
      const response = await axios.get("https://invoicezapi.focusrtech.com:57/user/dashboard-supplier-totalamount", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
        const apiData = response.data;

        // Transform the API data into a format suitable for the chart
        const chartData = Object.keys(apiData).map((supplier) => ({
          supplier,
          amountToPay: apiData[supplier],
        }));

        console.log("Transformed Chart Data:", chartData); // Check the transformed data
        setData(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("Data to Render in Chart:", data); // Check the data before rendering

  return (
    <div className={styles.root}>
      {/* <h2 className={styles.heading}>Line Chart of Supplier Amounts</h2> */}
      {data.length > 0 ? (
        <div className={styles.chartContainer}>
          
          <h3
            style={{
              margintop: "0px",
              padding: "0px",
              marginLeft: "10px"
            }}>

            Supplier
          </h3>
          <hr
            style={{
              border: "none",
              borderTop: "1px solid #ccc",
              marginBottom: "20px",
              width:"100%"
            }}
          />
          <h2
            style={{
              textAlign: "left",
              marginLeft: "10px",
              fontWeight: "bold",
              fontSize: "20px",
              marginTop:'2px',
              marginBottom:"3em"
            }}
          >
             Amount Processed
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 40, bottom: 105 }}
              height="10"
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
              {/* Line representing the amount to pay with updated color */}
              <Line
                type="monotone"
                dataKey="amountToPay"
                stroke="#0b4678"
                strokeWidth={2}
              />
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
