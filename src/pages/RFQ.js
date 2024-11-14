import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,
} from "@fluentui/react-components";
import TagCounters from "../components/gridapprove";
import Search from "../components/Search";
import RFQTable from "../components/RFQTable";

const path = "/inloop";
const path1 = "http://localhost:3000/";

const containerStyle = {
  width: "100%",
  display: "flex",
  gap: "3em",
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
  marginLeft: "0px",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "flex-start",
  padding: "16px 0",
};

const RFQPage = ({data}) => {
  const counters = [
    { label: "Todo", value: <span style={{ color: "#d62727" }}>2</span>, color: "#d62727" },
    { label: "Requestor", value: <span style={{ color: "#004378" }}>Sudharsan</span>, color: "#004378" },
    { label: "PR Number", value: <span style={{ color: "#00a2ad" }}>5</span>, color: "#00a2ad" },
  ];

  return (
    <div style={{ maxHeight: "91vh", overflowY: "auto" }}>
      <div style={{ height: "5vh" }}>
        <div className="Approvebreadcrump">
          <Breadcrumb aria-label="Breadcrumb default example">
            <BreadcrumbItem>
              <BreadcrumbButton href={path1}>Home</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton href={path}>PR</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton href={path}>Supplier Selection</BreadcrumbButton>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
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

        <div style={{ height: "5vh",marginTop:"4em" }} />
        <RFQTable data={data} />
      </div>

      
    </div>
  );
};

export default RFQPage;
