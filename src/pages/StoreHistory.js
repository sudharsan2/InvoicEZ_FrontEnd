import React, { useState ,useEffect} from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,
  Divider
} from "@fluentui/react-components";

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { YearCalendar } from '@mui/x-date-pickers/YearCalendar';
import StoreHistoryTable from "../components/StoreHistoryTable";

import Example from "./ExampleLineChart";

const path = "/storehistory";
const path1 = "/storedashboard";


const containerStyle = {
    width: "100%",
    display: "flex",
    marginTop:"3em",
    
    
    padding: "8px",
    gap:"4em",
    

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
  
  

const StoreHistory = () => {
    const[rows,setRows]=useState("");
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); 

    const handleYearChange = (year) => {
      setSelectedYear(year.year()); 
    };
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
        
        
      ];
  return (
    <div style={{overflowY:"auto",height:"90vh"}}>
      <div style={{ height: "5vh",display:"flex",justifyContent:"space-between"}}>
        <div className="Approvebreadcrump">
          <Breadcrumb aria-label="Breadcrumb default example">
            <BreadcrumbItem>
              <BreadcrumbButton href={path1}>Home</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton href={path}>History</BreadcrumbButton>
            </BreadcrumbItem>
            
          </Breadcrumb>
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['YearCalendar']}>
                    <DemoItem label="YearCalendar">
                      <YearCalendar onChange={handleYearChange} />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
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
            
          <Example selectedYear={selectedYear} />
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
