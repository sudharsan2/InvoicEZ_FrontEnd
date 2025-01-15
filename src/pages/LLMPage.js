import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,makeStyles, Button
} from "@fluentui/react-components";





const path = "/llm";
const path1 = "http://localhost:3000/";
// Grid
const counters = [
    { label: "Tokens Spent", value: 1556, color: "#00bfbf" }, // Cyan
   
   
  ];

  const containerStyle = {
    width: "100%",
    display: "flex",
    
    // justifyContent: "space-around",
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

const LLMPage = () => {
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
            <BreadcrumbButton href={path}>LLM</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
        </Breadcrumb>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "1px" }}>
        <div><h3 style={{ fontSize: "1.5em", marginLeft: "5px" }}>LLM</h3></div>
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
      

      
     <div style={divstyle} >
        <div >
            <p>Model Used</p>
            <p>gpt-4o-mini</p>
            <Button appearance="subtle" style={{color:"#0078d4", marginLeft:"-2.5em"}} className={styles.wrapper}>
        Edit
      </Button>


        </div>
        <div >
            <p>API key</p>
            <p>spkjsqwertyuisdfghjxcvbnm</p>
           
            <Button appearance="subtle" style={{color:"#0078d4",marginLeft:"-2.5em"}} className={styles.wrapper}>
        Edit
      </Button>
        </div>
        

     </div>
    </div>
  );
};

export default LLMPage;
