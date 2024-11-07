// import React from 'react';
// import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
// import { Button, makeStyles } from '@fluentui/react-components';

// // Styles
// const useStyles = makeStyles({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '50vh',
//     padding: '20px',
//     backgroundColor:"white",
//     borderRadius:"10px"
//   },
//   chartContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   buttonContainer: {
//     margin: '20px 0',
//   },
// });

// // Sample data
// const data = [
//   { poNumber: 'PO-13466', openPOs: 25 },
//   { poNumber: 'PO-13467', openPOs: 40 },
//   { poNumber: 'PO-13468', openPOs: 30 },
//   { poNumber: 'PO-13469', openPOs: 20 },
//   { poNumber: 'PO-13470', openPOs: 15 },
//   { poNumber: 'PO-13471', openPOs: 50 },
// ];

// // Function to generate random colors
// const getRandomColor = () => {
//   const letters = '0123456789ABCDEF';
//   let color = '#';
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// };

// // Create an array of random colors based on the data length
// const generateColors = (dataLength) => {
//   return Array.from({ length: dataLength }, () => getRandomColor());
// };

// const DonutChartPage = () => {
//   const styles = useStyles();

//   // Dynamically generate colors based on the number of POs
//   const colors = generateColors(data.length);

//   return (
//     <div className={styles.root}>

//       <div className={styles.chartContainer}>
//         <PieChart width={400} height={400}>
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             innerRadius={80}
//             outerRadius={150}
//             fill="#8884d8"
//             paddingAngle={5}
//             dataKey="openPOs"
//             nameKey="poNumber"
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={colors[index]} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </div>

//     </div>
//   );
// };

// export default DonutChartPage;

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { makeStyles } from "@fluentui/react-components";

// Styles
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "73vh",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
  },
  chartContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  noDataMessage: {
    fontSize: "18px",
    color: "#888",
    fontStyle: "italic",
  },
});

// Define the set of blue colors
const COLORS = ["#a3d2d9", "#83c1d9", "#60aada", "#2475be"];

const DonutChartPage = () => {
  const styles = useStyles();
  const [data, setData] = useState([]);

  // Fetch the data from the API
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://172.235.21.99:57/user/dashboard-supplier-morethanonepo",
      );
      const result = await response.json();

      if (!result || result.length === 0) {
        setData(null);
      } else {
        const transformedData = result.map((item) => ({
          poNumber: `${item.InvoiceId}: PO count `,
          openPOs: item.po_count,
        }));
        setData(transformedData);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.chartContainer}>
        <h2
          style={{ marginTop: "0.8em", fontWeight: "normal", fontSize: "15px" }}
        >
          Invoice Count
        </h2>

        {data === null || data.length === 0 ? (
          <div className={styles.noDataMessage}>No data available.</div>
        ) : (
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={150}
              paddingAngle={5}
              dataKey="openPOs"
              nameKey="poNumber"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </div>
    </div>
  );
};

export default DonutChartPage;
