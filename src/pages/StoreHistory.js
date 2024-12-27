import React, { useState ,useEffect} from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,
  Divider
} from "@fluentui/react-components";
import {
  CalendarMonthFilled,
  CalendarMonthRegular,
  bundleIcon,
} from "@fluentui/react-icons";
import TagCounters from "../components/gridapprove";
import StoreHistoryTable from "../components/StoreHistoryTable";
import Search from "../components/Search";
import Example from "./ExampleLineChart";
// const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const path = "/storehistory";
const path1 = "/storedashboard";


const containerStyle = {
    width: "100%",
    display: "flex",
    marginTop:"3em",
    
    // justifyContent: "space-around",
    padding: "8px",
    gap:"4em",
    // justifyContent:"center",
    // alignItems:"Center"

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

const StoreHistory = () => {
    const[rows,setRows]=useState("");
    useEffect(() => {
      
      const fetchData = async () => {
        try {
          
          const token = localStorage.getItem("access_token");
    
          const response = await fetch("https://invoicezapi.focusrtech.com:57/user/dashboard-count-of-this-month", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`, 
            },
          });
    
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
    
          const data = await response.json();
          console.log("Data", data.invoices_processed_this_month);
          setRows(data.invoices_processed_this_month);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      fetchData();
    }, []);
    
    
    const counters = [
        { label: "Total Invoice Processed", value: rows, color: "#00bfbf" }, // Cyan
        // { label: "Number of Invoice Processed", value: 2, color: "#d62727" }, // Red
        
      ];
  return (
    <div style={{overflowY:"auto",height:"90vh"}}>
      <div style={{ height: "5vh" }}>
        <div className="Approvebreadcrump">
          <Breadcrumb aria-label="Breadcrumb default example">
            <BreadcrumbItem>
              <BreadcrumbButton href={path1}>Home</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton href={path}>History</BreadcrumbButton>
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
            <h3 style={{ fontSize: "1.5em", marginLeft: "5px" ,marginBottom:"2em"}}>History</h3>
          </div>

          <div style={{display:"flex",justifyContent:"space-between",gap:"30px",width:"100%",marginTop:"2em",}}>
          
          <div style={{marginTop:"-2em",marginLeft:"0em",width:"50%",display:"flex",flexDirection:"column",justifyContent:"center",}}>
            
           <Example/>
           <span style={{fontWeight:"bold",marginLeft:"2em",textAlign:"center"}}>Number of Invoice Processed</span>
      </div>
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
        <div style={{ width: "100%", height: "5vh" ,marginTop:"4em"}} />
        
        <div style={{marginTop:"16em",}}>
        <div style={{ display: 'flex', justifyContent: 'center' ,width: '90%',alignItems:"center",marginLeft:"1em"}}>
      <Divider style={{ marginTop:"4em"}} />
    </div>
    <div style={{marginTop:"-2em",}}>
    <StoreHistoryTable />
    </div>
          
        </div>
      </div>
    </div>
  );
};

export default StoreHistory;
