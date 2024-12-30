import React, { useEffect, useState } from "react";
import axios from "axios";
import CanvasJSReact from "@canvasjs/react-charts";
import "./ApexChart.css";

let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ApexChart = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://172.235.21.99:5729/user/statusForApprove",
        );
        const apiData = response.data;

        const chartData = [
          {
            y: apiData.PONumberMatchingCount,
            label: "PO Number Matching Count",
            color: "#f44879",
          },
          {
            y: apiData.SupplierMatchingCount,
            label: "Supplier Matching Count",
            color: "#32c1a4",
          },
          {
            y: apiData.LineItemsMatchingCount,
            label: "Line Items Matching Count",
            color: "#fabc1c",
          },
        ];

        setData(chartData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = {
    animationEnabled: false,
    exportEnabled: false,
    credits: {
      enabled: false,
    },
    data: [
      {
        type: "funnel",
        toolTipContent: "<b>{label}</b>: {y}",
        indexLabelPlacement: "inside",
        indexLabel: "{label} ({y})",
        dataPoints: data,
      },
    ],
  };

  let dataPoint = options.data[0].dataPoints;
  let total = dataPoint.reduce((acc, point) => acc + point.y, 0);
  for (const point of dataPoint) {
    if (total > 0) {
      point.percentage = ((point.y / total) * 100).toFixed(2);
    } else {
      point.percentage = 0;
    }
  }
  

  const renderLegend = () => {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "20px",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: item.color,
                marginRight: "8px",
              }}
            ></div>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "40px",
          width: "100%",
          maxWidth: "1200px",
          height: "auto",
          maxHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontWeight: "normal",
            fontSize: "15px",
          }}
        >
          Status for Approval
        </h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <CanvasJSChart options={options} width="120%" height="400px" />
        )}

        {renderLegend()}
      </div>
    </div>
  );
};

export default ApexChart;
