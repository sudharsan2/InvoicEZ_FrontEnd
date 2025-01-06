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
import axios from "axios";
const Example = ({selectedYear}) => {
  const [data, setData] = useState([]);

  

  // const handlePostApi = async () => {
  //   console.log("Button clicked!");
  
   
    
  
  //   const payload = {
  //     connection_string: connection,
  //     container_name: container,
  //   };
  
  //   console.log("payload", payload);
  
  //   try {
     
  
  
  //     const token = localStorage.getItem("access_token");
  
  //     const response = await axios.post(
  //       "https://invoicezapi.focusrtech.com:57/user/azure-usage",
  //       payload,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  
  //     if (response.status === 201) {
  //       message.success("Updated the LLM");
        
        
  //     } else {
  //       message.error("Operation Unsuccessfull. Please try again.");
  //     }
  //   } catch (error) {
  //     message.error("Unknown error Occured");
  //   }
  // };


  useEffect(() => {
    console.log("HI..");
  
    const payload = {
      year: selectedYear, // Ensure `selectedYear` is defined and valid
    };
  
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token"); // Retrieve the token securely
  
        // Make the API request
        const response = await axios.post(
          "https://invoicezapi.focusrtech.com:57/user/dashboard-monthwise-invoice",
          payload,
          {
            headers: {
              "Content-Type": "application/json", // Explicitly set content type
              Authorization: `Bearer ${token}`,  // Include Bearer token
            },
          }
        );
  
        
        console.log("Response data:", response.data);
  
        
        const formattedData = Object.keys(response.data).map((month) => ({
          name: month,
          invoices: response.data[month],
        }));
  
        setData(formattedData); 
      } catch (error) {
        
        if (error.response) {
         
          console.error(
            `Error Response: Status ${error.response.status}, Data:`,
            error.response.data
          );
        } else if (error.request) {
         
          console.error("No response received:", error.request);
        } else {
         
          console.error("Error setting up request:", error.message);
        }
      }
    };
  
    fetchData();
  }, [selectedYear]); 
  

  console.log("Data",data);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 30, left: 40, bottom: 20 }} // Adjust margins
      >
        
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
