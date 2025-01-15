

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
    height: "71vh",
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
const COLORS = ["#e81123","#ffb900"];

const DonutChartPage = () => {
  const styles = useStyles();
  const [data, setData] = useState([]);

  // Fetch the data from the API
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://invoicezapi.focusrtech.com:57/user/dashboard-supplier-morethanonepo",
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
