// import React, { useState, useEffect } from "react";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
// import { Button, makeStyles } from "@fluentui/react-components";

// // Styles
// const useStyles = makeStyles({
//   root: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     height: "50vh",
//     padding: "20px",
//     backgroundColor:"white",
//     borderRadius:"10px"
//   },
//   chartContainer: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   buttonContainer: {
//     margin: "20px 0",
//   },
// });

// // Define colors for the statuses
// const COLORS = ["#00C49F", "#FF8042"]; // Approved - Green, Pending - Orange

// const InvoiceStatusPieChart = () => {
//   const styles = useStyles();
//   const [invoiceData, setInvoiceData] = useState([]);

//   useEffect(() => {
//     // Fetch the invoice status counts from the API
//     const fetchInvoiceData = async () => {
//       try {
//         const response = await fetch(
//           "http://127.0.0.1:8000/user/invoice-status-counts",
//         );
//         const data = await response.json();

//         // Update the state with the fetched data
//         setInvoiceData([
//           { status: "InApprove", count: data.approved_count },
//           { status: "Pending", count: data.pending_count },
//         ]);
//       } catch (error) {
//         console.error("Error fetching invoice status counts:", error);
//       }
//     };

//     fetchInvoiceData();
//   }, []); // Empty dependency array ensures this runs only once after the component mounts

//   return (
//     <div className={styles.root}>
//       <div className={styles.chartContainer}>
//         {invoiceData.length > 0 ? (
//           <PieChart width={400} height={350}>
//             <Pie
//               data={invoiceData}
//               cx="50%"
//               cy="50%"
//               innerRadius={0}
//               outerRadius={120}
//               fill="#8884d8"
//               paddingAngle={5}
//               dataKey="count"
//               nameKey="status"
//             >
//               {invoiceData.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         ) : (
//           <p>Loading data...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InvoiceStatusPieChart;



import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Button, makeStyles } from "@fluentui/react-components";

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
  buttonContainer: {
    margin: "20px 0",
  },
});


const COLORS = ["#bbc3f2", "#5476d8"]; 

const InvoiceStatusPieChart = () => {
  const styles = useStyles();
  const [invoiceData, setInvoiceData] = useState([]);

  useEffect(() => {
   
    const fetchInvoiceData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/user/invoice-status-counts"
        );
        const data = await response.json();

       
        setInvoiceData([
          { status: "InApprove", count: data.approved_count },
          { status: "Pending", count: data.pending_count },
        ]);
      } catch (error) {
        console.error("Error fetching invoice status counts:", error);
      }
    };

    fetchInvoiceData();
  }, []);  

  return (
    <div className={styles.root}>
      <div className={styles.chartContainer}>
        <h2 style={{fontWeight:"normal",fontSize:"15px"}}>Invoice Status</h2>
        {invoiceData.length > 0 ? (
          <PieChart width={400} height={400}>
            <Pie
              data={invoiceData}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={135}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="count"
              nameKey="status"
            >
              {invoiceData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default InvoiceStatusPieChart;
