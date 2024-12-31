import React, { useEffect, useRef, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,
  Divider
} from "@fluentui/react-components";


import IssuefixTable from "../components/issuefixtable";



const path1 = "/dashboard";
const path2 = "/issuefix";

const containerStyle = {
  width: "100%",
  display: "flex",
  
  
  padding: "8px",
 
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
  marginBottom:"10px"
};

const valueStyle = {
  fontSize: "28px", 
  fontWeight: "bold",
  color: "#333", 
  marginLeft: "0px", 
};

const divstyle ={
  display:"flex",
  flexDirection:"column",
  marginLeft:"20px",
  paddingTop:"6em",
  fontWeight:"bold",

  
}
const IssuefixPage = () => {
  const [height, setHeight] = useState(0);
  const divRef1 = useRef(null);
  const [tableLength, setTableLength] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (divRef1.current) {
        const newHeight = divRef1.current.offsetHeight;
        console.log("Measured height:", newHeight);
        setHeight(newHeight);
      }
    };

    updateHeight(); // Set the height initially

    // Optional: listen for window resize
    window.addEventListener("resize", updateHeight);

    // Cleanup event listener
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

   console.log("tablelength",tableLength);
  const counters = [
    { label: "To Do", value: tableLength, color: "#00bfbf" }, // Cyan
    
  ];
  return (
    <div style={{maxHeight:"88vh",overflowY:"auto"}}>
      <div ref={divRef1}>
        <div className="Approvebreadcrump">
          <Breadcrumb aria-label="Breadcrumb default example">
            <BreadcrumbItem>
              <BreadcrumbButton href={path1}>Home</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            {/* <BreadcrumbItem>
              <BreadcrumbButton href={path}>Issue</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider /> */}
            <BreadcrumbItem>
              <BreadcrumbButton href={path2}>No Match Found</BreadcrumbButton>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flexStart",
            padding: "1px",
           
          }}
        >
          <h3 style={{ fontSize: "1.5em"}}>No Match Found</h3>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            
            {/* <div style={{display:'flex', flexDirection:'column'}} */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                justifyContent: "flex-start",
              }}
            >
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
              {/* New Filter Button */}
              {/* <Button
            icon={<FilterRegular />}
            appearance="primary" // Gives it a highlighted primary style
          >
            New Filter
          </Button> */}

              {/* Clear Filter Button */}
              {/* <Button
            icon={<DismissCircleRegular />}
            appearance="outline" // Gives it an outlined style
          >
            Clear Filter
          </Button> */}


            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' ,width: '90%',alignItems:"center"}}>
      <Divider style={{ marginTop:"2em"}} />
    </div>
      <div style={{marginTop:"-2em"}}>
        {height > 0 ? <IssuefixTable height={height} setTableLength={setTableLength}/> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default IssuefixPage;
