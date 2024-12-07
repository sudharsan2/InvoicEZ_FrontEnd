import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,
} from "@fluentui/react-components";
import {
  CalendarMonthFilled,
  CalendarMonthRegular,
  bundleIcon,
} from "@fluentui/react-icons";
import TagCounters from "../components/gridapprove";
import ApproveTable from "../components/approvetable";
import Search from "../components/Search";
import AITable from "../components/aitable";
import { useState } from "react";
import { useLocation } from "react-router-dom";
// improve AITable
const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const path = "/dashboard";
const path1 = "http://localhost:3000/";
const path2 = "/ai";

const containerStyle = {
  width: "100%",
  display: "flex",

  // justifyContent: "space-around",
  padding: "8px",
  marginLeft: "0em",
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
  marginBottom: "10px",
};

const valueStyle = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#333",
  marginLeft: "6px",
};

const divstyle = {
  display: "flex",
  flexDirection: "column",
  marginLeft: "20px",
  paddingTop: "6em",
  fontWeight: "bold",
};

const AIPage = () => {
  const location = useLocation();
  const { poNumber } = location.state || {};
  const [tableLength, setTableLength] = useState(0);

  const counters = [
    { label: "To do", value: tableLength, color: "#00bfbf" }, // Cyan
  ];

  return (
    <div style={{ maxHeight: "91vh", overflowY: "auto" }}>
      <div className="Approvebreadcrump">
        <Breadcrumb aria-label="Breadcrumb default example">
          <BreadcrumbItem>
            <BreadcrumbButton href={path}>Home</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          {/* <BreadcrumbItem>
            <BreadcrumbButton href={path}>Issue</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider /> */}
          <BreadcrumbItem>
            <BreadcrumbButton href={path2}>Multiple Match Found</BreadcrumbButton>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div
        style={{ display: "flex", justifyContent: "flexStart", padding: "1px" }}
      >
        <h3 style={{ fontSize: "1.5em", marginLeft: "5px" }}>Multiple Match Found</h3>
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

      {/* <div>

      </div> max value */}
      <div>
        <AITable setTableLength={setTableLength} />
      </div>
    </div>
  );
};

export default AIPage;
