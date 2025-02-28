import React, { useEffect} from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,
} from "@fluentui/react-components";

import CompareDrawerTable from "../components/CompareDrawerTable";
import SupplierTable from "../components/SupplierTable";


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

const ComparePage = ({data,onSubmit}) => {
  const counters = [
    {
      label: "Requestor",
      value: (
        <span style={{ color: "#d62727" }}>{data.lines[0].requestor}</span>
      ),
      color: "#d62727",
    },
    {
      label: "PR Number",
      value: <span style={{ color: "#004378" }}>{data.document_number}</span>,
      color: "#004378",
    },
  ];
  
  useEffect(() => {
    console.log("compare Data", data);
  }, [data]);

  

  


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
              <BreadcrumbButton href={path}>
                Quotation Comparison
              </BreadcrumbButton>
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
        <div style={{ marginTop: "5em" }}>
          <h2>Line Information</h2>
        </div>

        <div style={{ height: "5vh", marginTop: "-2em" }} />
        <CompareDrawerTable data={data} />
      </div>
      <div style={{ marginTop: "2em" }}>
        <h2>Supplier Response</h2>
      </div>
      <SupplierTable style={{ marginTop: "2em" }} data={data} />

      <div style={buttonContainerStyle}>
        <button style={{color:"#0078d5",border:"none",backgroundColor:"white",cursor:"pointer"}} onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default ComparePage;
