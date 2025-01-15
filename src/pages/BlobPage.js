import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,
  makeStyles, Button
} from "@fluentui/react-components";



const path = "/blob";
const path1 = "http://localhost:3000/";
// Grid
const counters = [
    { label: "Total Price from storage", value: 155, color: "red" }, // Cyan
   
   
  ];

  const containerStyle = {
    width: "100%",
    display: "flex",
    
       padding: "8px",
    marginLeft:"0em"
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
    marginLeft: "6px", 
  };

  const divstyle ={
    display:"flex",
    flexDirection:"column",
    marginLeft:"20px",
    paddingTop:"6em",
    fontWeight:"bold",

    
  }

//   button for save fluentUI 

const useStyles = makeStyles({
    wrapper: {
      display: "flex",
      flexDirection:"column",
      width:"8%",
     
      
    },
  });

const BlobPage = () => {
    const styles = useStyles();
  return (
    <div>
      <div className="Approvebreadcrump">
        <Breadcrumb aria-label="Breadcrumb default example">
          <BreadcrumbItem>
            <BreadcrumbButton href={path1}>Home</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton href={path}>Blob Storage</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
        </Breadcrumb>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "1px" }}>
        <div><h3 style={{ fontSize: "1.5em", marginLeft: "5px" }}>Blob Storage</h3></div>
        <div ><Button appearance="primary" style={{color:"fff",marginLeft:"-2.5em"}} className={styles.wrapper}>
        Save
      </Button></div>
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
  );
};

export default BlobPage;
