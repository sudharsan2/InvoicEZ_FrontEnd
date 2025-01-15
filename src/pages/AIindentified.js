import React ,{ useState }from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,
  Divider
} from "@fluentui/react-components";

import AITable from "../components/aitable";


// improve AITable

const path = "/dashboard";
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
  
  
  const [tableLength, setTableLength] = useState(0);
  
  const counters = [
    { label: "To do", value: tableLength, color: "#00bfbf" }, // Cyan
  ];

  return (
    <div style={{ maxHeight: "91vh", overflowY: "auto" }}>
      <div className="Approvebreadcrump" >
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

      <div >
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
       <div style={{ display: 'flex', justifyContent: 'center' ,width: '90%',alignItems:"center",}}>
      <Divider style={{ marginTop:"2em"}} />
    </div>
      <div style={{marginTop:"-2em"}}>
        <AITable setTableLength={setTableLength} />
      </div>
    </div>
  );
};

export default AIPage;
