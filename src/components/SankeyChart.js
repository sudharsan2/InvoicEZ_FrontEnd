



// import React from "react";
// import { Sankey, Tooltip } from "recharts";

// const SankeyChart = () => {
//   const data = {
//     nodes: [
//       { name: "Invoice Processed", value: 357898.3 },
//       { name: "Match Found", value: 354 },
//       { name: "Multiple Match Found", value: 291741 },
//       { name: "No Match Found", value: 62429 },
//       { name: "Supplier Line Matching", value: 10 },
//       { name: "Supplier Matching", value: 15 },
//       { name: "PO Number Matching", value: 20 },
//     ],
//     links: [
//       { source: 0, target: 1, value: 10 }, // Invoice Processed -> Match Found
//       { source: 0, target: 2, value: 15 }, // Invoice Processed -> Multiple Match Found
//       { source: 0, target: 3, value: 20 }, // Invoice Processed -> No Match Found
//       { source: 1, target: 4, value: 5 }, // Match Found -> Supplier Line Matching
//       { source: 1, target: 5, value: 3 }, // Match Found -> Supplier Matching
//       { source: 1, target: 6, value: 2 }, // Match Found -> PO Number Matching
//     ],
//   };

//   // Custom node rendering with names and counts
//   const renderNode = (nodeProps) => {
//     const { x, y, width, height, index } = nodeProps;
//     const node = data.nodes[index];

//     return (
//       <g>
//         {/* Node rectangle */}
//         <rect
//           x={x}
//           y={y}
//           width={width}
//           height={height}
//           fill="#0078D4"
//         //   stroke="#333"
//           strokeWidth={1}
//         />
//         {/* Node text (name and value) */}
//         <text
//           x={x + width + 5} // Move the text slightly to the right of the node
//           y={y + height / 2}
//           textAnchor="start" // Align text to the left
//           dominantBaseline="middle"
//           fill="black"
//           fontSize={14}
//         >
//           {node.name} - {node.value}
//         </text>
//       </g>
//     );
//   };

//   return (
//     <Sankey
//       width={1200}
//       height={500}
//       data={data}
//       nodePadding={30}
//       margin={{
//         left: 100,
//         right: 200,
//         top: 50,
//         bottom: 50,
//       }}
//       node={renderNode} // Pass custom node renderer
//       link={{ stroke: "#77c878" }}
//     >
//       <Tooltip />
//     </Sankey>
//   );
// };

// export default SankeyChart;






import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sankey, Tooltip } from "recharts";
const SankeyChart = () => {
  const [chartData, setChartData] = useState({
    nodes: [
      { name: "Invoice Processed", value: 0 }, // Total invoices
      { name: "Match Found", value: 0 },
      { name: "Multiple Match Found", value: 0 },
      { name: "No Match Found", value: 0 },
      // { name: "Line Items Matching", value: 0 },
      // { name: "Supplier Matching", value: 0 },
      // { name: "PO Number Matching", value: 0 },
    ],
    links: [
      { source: 0, target: 1, value: 10 },
      { source: 0, target: 2, value: 15 },
      { source: 0, target: 3, value: 20 },
      // { source: 1, target: 4, value: 0 },
      // { source: 1, target: 5, value: 0 },
      // { source: 1, target: 6, value: 0 },
    ],
  });

  const fetchData = async () => {
    try {
      const authToken = localStorage.getItem("access_token"); // Replace with your token retrieval method
  
      // Fetch invoices data
      const response = await axios.get("https://invoicezapi.focusrtech.com:57/user/invoices", {
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
  
      const fetchedItems = response.data;
  
      let fixCount = 0;
      let MatchCount = 0;
      let multiple_MatchCount = 0;
  
      fetchedItems.forEach((item) => {
        if (item.po_headers.length === 0) {
          fixCount += 1; // No Match Found
        } else if (item.po_headers.length === 1) {
          MatchCount += 1; // Match Found
        } else if (item.po_headers.length > 1) {
          multiple_MatchCount += 1; // Multiple Match Found
        }
      });
  
      // Fetch status data
      const statusResponse = await axios.get("https://invoicezapi.focusrtech.com:57/user/statusForApprove", {
        headers: {
          "Authorization": `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });
      const statusData = statusResponse.data || {};
  
      setChartData((prevState) => ({
        ...prevState,
        nodes: prevState.nodes.map((node, index) => {
          if (index === 0) return { ...node, value: fixCount + MatchCount + multiple_MatchCount };
          if (index === 1) return { ...node, value: MatchCount };
          if (index === 2) return { ...node, value: multiple_MatchCount };
          if (index === 3) return { ...node, value: fixCount };
          if (index === 4) return { ...node, value: statusData.LineItemsMatchingCount || 0 };
          if (index === 5) return { ...node, value: statusData.SupplierMatchingCount || 0 };
          if (index === 6) return { ...node, value: statusData.PONumberMatchingCount || 0 };
          return node;
        }),
        links: prevState.links.map((link) => {
          if (link.target === 1) return { ...link, value: MatchCount };
          if (link.target === 2) return { ...link, value: multiple_MatchCount };
          if (link.target === 3) return { ...link, value: fixCount };
          if (link.target === 4) return { ...link, value: statusData.LineItemsMatchingCount || 0 };
          if (link.target === 5) return { ...link, value: statusData.SupplierMatchingCount || 0 };
          if (link.target === 6) return { ...link, value: statusData.PONumberMatchingCount || 0 };
          return link;
        }),
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  const renderNode = (nodeProps) => {
    const { x, y, width, height, index } = nodeProps;
    const node = chartData.nodes[index];

    return (
      <g>
        <rect x={x} y={y} width={width} height={height} fill="#0078D4" strokeWidth={1} />
        <text
          x={x + width + 5}
          y={y + height / 2}
          textAnchor="start"
          dominantBaseline="middle"
          fill="#333"
          fontSize={14}
          fontWeight="bold"
        >
          {node.name} - {node.value}
        </text>
      </g>
    );
  };

  const calculateLinkWidth = (link) => {
    const maxNodeValue = Math.max(...chartData.nodes.map((node) => node.value));
    const linkWidth = Math.max((link.value / maxNodeValue) * 100, 1); // Minimum width of 1
    return linkWidth;
  };

  return (
    <div>
      <Sankey
        width={1000}
        height={500}
        data={chartData}
        nodePadding={40}
        margin={{
          left: 200,
          right: 200,
          top: 50,
          bottom: 50,
        }}
        node={renderNode}
        link={{
          stroke: "#77c878",
          strokeWidth: (link) => calculateLinkWidth(link),
          opacity: 0.7,
        }}
      >
        <Tooltip />
      </Sankey>
    </div>
  );
};

export default SankeyChart;
