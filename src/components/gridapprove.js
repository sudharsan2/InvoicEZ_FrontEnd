// import React, { useEffect, useState } from "react";

// const TagCounters = () => {
//   const [data, setData] = useState([
//     { label: "To Do", value: 0, color: "#00bfbf" }, // Cyan
//     { label: "Crossed PO Date", value: 0, color: "#d62727" }, // Red
//     { label: "PO Number Matching", value: 0, color: "#1f497d" }, // Dark Blue
//     { label: "Supplier Matching", value: 0, color: "#d21994" }, // Magenta
//     { label: "Supplier Line Matching", value: 0, color: "#000000" }, // Black
//   ]);
//   const [loading, setLoading] = useState(true); // State to handle loading

//   const containerStyle = {
//     width: "100%",
//     display: "flex",
//     justifyContent: "space-around",
//     padding: "8px",
//     marginLeft: "-8em",
//   };

//   const itemStyle = {
//     display: "flex",
//     alignItems: "center",
//   };

//   const lineStyle = (color) => ({
//     width: "3px",
//     height: "50px",
//     backgroundColor: color,
//     marginRight: "12px",
//   });

//   const labelStyle = {
//     fontSize: "14px",
//     fontWeight: "normal",
//     marginBottom: "10px",
//   };

//   const valueStyle = {
//     fontSize: "28px",
//     fontWeight: "bold",
//     color: "#333",
//     marginLeft: "6px",
//   };

//   const fetchData = async () => {
//     try {
//       const response = await fetch(
//         "http://172.235.21.99:57/user/statusForApprove",
//       ); // Replace with your API URL
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const jsonData = await response.json();
//       setData([
//         { label: "To Do", value: jsonData["TodoCount"], color: "#00bfbf" }, // Cyan
//         {
//           label: "Crossed PO Date",
//           value: jsonData["PONumberMatchingCount"],
//           color: "#d62727",
//         }, // Red
//         {
//           label: "PO Number Matching",
//           value: jsonData["SupplierMatchingCount"],
//           color: "#1f497d",
//         }, // Dark Blue
//         {
//           label: "Supplier Matching",
//           value: jsonData["LineItemsMatchingCount"],
//           color: "#d21994",
//         }, // Magenta
//         {
//           label: "Supplier Line Matching",
//           value: jsonData["CrossedPODate"],
//           color: "#000000",
//         },
//       ]);
//     } catch (error) {
//       console.error(error.message); // Set the error message if there's an error
//     } finally {
//       setLoading(false); // Set loading to false after the fetch completes
//     }
//   };

//   useEffect(() => {
//     // Define the async function to fetch the data

//     fetchData();
//   }, []);

//   return (
//     <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
//       <div style={containerStyle}>
//         {data.map((item, index) => (
//           <div style={itemStyle} key={index}>
//             <div style={lineStyle(item.color)} />
//             <div>
//               <div style={labelStyle}>{item.label}</div>
//               <div style={valueStyle}>{item.value}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TagCounters;

import React, { useEffect, useState } from "react";

const TagCounters = ({ type }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const containerStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    padding: "8px",
    marginLeft: "-8em",
  };

  const itemStyle = {
    display: "flex",
    alignItems: "center",
  };

  const lineStyle = (color) => ({
    width: "3px",
    height: "50px",
    backgroundColor: color,
    marginRight: "12px",
  });

  const labelStyle = {
    fontSize: "14px",
    fontWeight: "normal",
    marginBottom: "10px",
  };

  const valueStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
    marginLeft: "6px",
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://172.235.21.99:57/user/statusForApprove",
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      const allData = [
        { label: "To Do", value: jsonData["TodoCount"], color: "#00bfbf" },
        {
          label: "Crossed PO Date",
          value: jsonData["PONumberMatchingCount"],
          color: "#d62727",
        },
        {
          label: "PO Number Matching",
          value: jsonData["SupplierMatchingCount"],
          color: "#1f497d",
        },
        {
          label: "Supplier Matching",
          value: jsonData["LineItemsMatchingCount"],
          color: "#d21994",
        },
        {
          label: "Supplier Line Matching",
          value: jsonData["CrossedPODate"],
          color: "#000000",
        },
      ];

      // Filter based on the type
      if (type === "approve") {
        setData(
          allData.filter(
            (item) =>
              item.label === "To Do" ||
              item.label === "Crossed PO Date" ||
              item.label === "PO Number Matching" ||
              item.label === "Supplier Matching" ||
              item.label === "Supplier Line Matching",
          ),
        );
      } else if (type === "fix") {
        setData(
          allData.filter(
            (item) =>
              item.label === "To Do" ||
              item.label === "AI Identified" ||
              item.label === "User Revoked" ||
              item.label === "Refix",
          ),
        );
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [type]);

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div style={containerStyle}>
        {data.map((item, index) => (
          <div style={itemStyle} key={index}>
            <div style={lineStyle(item.color)} />
            <div>
              <div style={labelStyle}>{item.label}</div>
              <div style={valueStyle}>{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagCounters;
