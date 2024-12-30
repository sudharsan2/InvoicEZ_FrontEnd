
import React, { useEffect, useState } from "react";

const TagCounters = ({ type }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
   console.log(loading)
  const containerStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    padding: "8px",
    // marginLeft: "-10em",
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
      // const response = await fetch(
      //   "https://invoicezapi.focusrtech.com:57/user/statusForApprove",
      // );

      const authToken = localStorage.getItem("access_token"); 

  const response = await fetch(
    "https://invoicezapi.focusrtech.com:57/user/statusForApprove",
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    }
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
              item.label === "Total number to Process" ||
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
