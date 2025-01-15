import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton, Divider

} from "@fluentui/react-components";
import { useDispatch } from "react-redux";
import { updateTableMetrics } from "../Store/refreshSlice";

import SummaryTable from "../components/approvetable";



const path = "/summary";
const path1 = "/dashboard";

const containerStyle = {
  width: "100%",
  display: "flex",

  justifyContent: "space-between",
  padding: "5px",
  marginRight: "3em"

};

const itemStyle = {
  display: "flex",
  alignItems: "flex-start",
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
  marginBottom: "10px"
};
const valueStyle = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#333",
  marginLeft: "0px",
};

const SummaryPage = () => {



  const [tableLength, setTableLength] = useState('');
  const [fixCount, setFixCount] = useState('');
  const [MatchCount, setMatchCount] = useState('');
  const [multiple_MatchCount, setMultiple_MatchCount] = useState('');


  const counters = [
    { label: "Total number to Process", value: tableLength, color: "#00bfbf" }, // Cyan
    { label: "Match Found", value: MatchCount, color: "#d62727" }, // Red
    { label: "Multiple Match Found", value: multiple_MatchCount, color: "#1f497d" }, // Dark Blue
    { label: "No Match Found", value: fixCount, color: "#d21994" }, // Magenta

  ];


  const dispatch = useDispatch();

  const updateMetrics = () => {
    const metrics = {
      tableLength: tableLength,
      MatchCount: MatchCount,
      multiple_MatchCount: multiple_MatchCount,
      fixCount: fixCount,
    };
    dispatch(updateTableMetrics(metrics));
    // Log state after dispatch
    console.log("Metrics updated:", metrics);
  };


  useEffect(() => {
    console.log("useEffect called");
    updateMetrics();
  }, [tableLength, MatchCount, multiple_MatchCount, fixCount]);

  return (
    <div style={{ maxHeight: "91vh", overflowY: "auto" }}>
      <div style={{ height: "5vh" }}>
        <div className="Approvebreadcrump" >
          <Breadcrumb aria-label="Breadcrumb default example">
            <BreadcrumbItem>
              <BreadcrumbButton href={path1}>Home</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton href={path}>Summary</BreadcrumbButton>
            </BreadcrumbItem>
            {/* <BreadcrumbDivider /> */}
          </Breadcrumb>
        </div>
      </div>
      <div>
        <div style={{ maxHeight: "10vh" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flexStart",
              padding: "1px",
            }}
          >
            <h3 style={{ fontSize: "1.5em", marginLeft: "5px" }}>Summary</h3>
          </div>

          <div>

            <div style={containerStyle}>
              {counters.map((item, index) => (
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
        </div>
        <div style={{ width: "100%", height: "5vh", }} />
        <div style={{ display: 'flex', justifyContent: 'center', width: '90%', alignItems: "center", }}>
          <Divider style={{ marginTop: "4em" }} />
        </div>
        <div style={{ marginTop: "-2em" }}>
          <SummaryTable setFixCount={setFixCount} setMatchCount={setMatchCount} setTableLength={setTableLength} setMultiple_MatchCount={setMultiple_MatchCount} />
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
