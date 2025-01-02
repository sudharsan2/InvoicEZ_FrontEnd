






import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sankey, Tooltip } from "recharts";
const SankeyChart = () => {
  const [chartData, setChartData] = useState({
    nodes: [
      { name: "Invoice Processed", value: 0 }, 
      { name: "Match Found", value: 0 },
      { name: "Multiple Match Found", value: 0 },
      { name: "No Match Found", value: 0 },
      
    ],
    links: [
      { source: 0, target: 1, value: 10 },
      { source: 0, target: 2, value: 15 },
      { source: 0, target: 3, value: 20 },
      
    ],
  });

  const fetchData = async () => {
    try {
      const authToken = localStorage.getItem("access_token");
  
      const invoiceData = await fetchInvoices(authToken);
      const statusData = await fetchStatus(authToken);
  
      updateChartData(invoiceData, statusData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const fetchInvoices = async (authToken) => {
    const response = await axios.get(
      "https://invoicezapi.focusrtech.com:57/user/invoices",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  };
  
  const fetchStatus = async (authToken) => {
    const response = await axios.get(
      "https://invoicezapi.focusrtech.com:57/user/statusForApprove",
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data || {};
  };
  
  const calculateInvoiceCounts = (invoices) => {
    let fixCount = 0;
    let matchCount = 0;
    let multipleMatchCount = 0;
  
    invoices.forEach((item) => {
      if (item.po_headers.length === 0) fixCount++;
      else if (item.po_headers.length === 1) matchCount++;
      else if (item.po_headers.length > 1) multipleMatchCount++;
    });
  
    return { fixCount, matchCount, multipleMatchCount };
  };
  
  // const updateChartData = (invoiceData, statusData) => {
  //   const { fixCount, matchCount, multipleMatchCount } =
  //     calculateInvoiceCounts(invoiceData);
  
  //   setChartData((prevState) => ({
  //     ...prevState,
  //     nodes: prevState.nodes.map((node, index) => {
  //       if (index === 0)
  //         return {
  //           ...node,
  //           value: fixCount + matchCount + multipleMatchCount,
  //         };
  //       if (index === 1) return { ...node, value: matchCount };
  //       if (index === 2) return { ...node, value: multipleMatchCount };
  //       if (index === 3) return { ...node, value: fixCount };
  //       if (index === 4)
  //         return { ...node, value: statusData.LineItemsMatchingCount || 0.1 };
  //       if (index === 5)
  //         return { ...node, value: statusData.SupplierMatchingCount || 0.1 };
  //       if (index === 6)
  //         return { ...node, value: statusData.PONumberMatchingCount || 0.1 };
  //       return node;
  //     }),
  //     links: prevState.links.map((link) => {
  //       if (link.target === 1) return { ...link, value: matchCount };
  //       if (link.target === 2) return { ...link, value: multipleMatchCount };
  //       if (link.target === 3) return { ...link, value: fixCount };
  //       if (link.target === 4)
  //         return { ...link, value: statusData.LineItemsMatchingCount || 0.1 };
  //       if (link.target === 5)
  //         return { ...link, value: statusData.SupplierMatchingCount || 0.1 };
  //       if (link.target === 6)
  //         return { ...link, value: statusData.PONumberMatchingCount || 0.1 };
  //       return link;
  //     }),
  //   }));
  // };
  

  const updateChartData = (invoiceData, statusData) => {
    const { fixCount, matchCount, multipleMatchCount } =
      calculateInvoiceCounts(invoiceData);
  
    // Mapping for node values
    const nodeValueMap = [
      fixCount + matchCount + multipleMatchCount,
      matchCount,
      multipleMatchCount,
      fixCount,
      statusData.LineItemsMatchingCount || 0.1,
      statusData.SupplierMatchingCount || 0.1,
      statusData.PONumberMatchingCount || 0.1,
    ];
  
    // Mapping for link values
    const linkValueMap = {
      1: matchCount,
      2: multipleMatchCount,
      3: fixCount,
      4: statusData.LineItemsMatchingCount || 0.1,
      5: statusData.SupplierMatchingCount || 0.1,
      6: statusData.PONumberMatchingCount || 0.1,
    };
  
    // Update chart data
    setChartData((prevState) => ({
      ...prevState,
      nodes: prevState.nodes.map((node, index) => ({
        ...node,
        value: nodeValueMap[index] ?? node.value, // Default to the existing value if not mapped
      })),
      links: prevState.links.map((link) => ({
        ...link,
        value: linkValueMap[link.target] ?? link.value, // Default to the existing value if not mapped
      })),
    }));
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



