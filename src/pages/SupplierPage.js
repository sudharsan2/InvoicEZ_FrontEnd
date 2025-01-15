


import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Button,
  makeStyles,
} from "@fluentui/react-components";


import { Add28Regular } from "@fluentui/react-icons";

import QuotationTable from "../components/QuotationTable";
import DatePickerComponent from "../components/DatePicker";
import { MdOutlineFilterAltOff } from "react-icons/md";



import DropdownComponent from "../components/DropDown";

const useStyles = makeStyles({
  contentHeader: {
    marginTop: "0",
  },

  
});

// Popover content component
const ExampleContent = () => {
  const styles = useStyles();
  return (
    <div className={styles.popoverContent}> {/* Adjust popover z-index if necessary */}
      <h2>Custom Filter</h2>
      <p>Choose the conditions for your custom Filter</p>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <span>From Date</span>
        <DatePickerComponent style={{ gap: "5%" }} />

        <span style={{ gap: "5%", marginLeft: "2em" }}>To Date</span>
        <DatePickerComponent />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "200px", flexDirection: "column" }}>
        <h3 style={{ fontWeight: "Normal" }}>Buyer Name</h3>
        <DropdownComponent />
        <h3 style={{ fontWeight: "Normal" }}>UOM</h3>
        <DropdownComponent />
      </div>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <span>Need By Date</span>
        <DatePickerComponent style={{ gap: "5%" }} />

        <span style={{ gap: "5%", marginLeft: "2em" }}>Received Date</span>
        <DatePickerComponent />
      </div>
      
      <div style={{display:"flex",justifyContent:"flex-end",padding:"1.5em"}}>
      <Button style={{backgroundColor:"#0078d4",color:"white"}}>Apply</Button>
      </div>
    </div>
  );
};

// Path values
const path = "/supplier";
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

const SupplierPage = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [statusCounts, setStatusCounts] = useState({
    quotationCount: 0,
    ackCount: 0,
    
  });
  
  const togglePopover = () => setPopoverOpen(!popoverOpen);

  const counters = [
    { label: "New Request", value: <span style={{ color: "#d62727" }}>{statusCounts.quotationCount}</span>, color: "#d62727" },
    { label: " Yet To Respond", value: <span style={{ color: "#004378" }}>{statusCounts.ackCount}</span>, color: "#004378" },
    
  ];

  return (
    <div style={{ maxHeight: "91vh", overflowY: "auto", }}>
      <div style={{ height: "5vh" }}>
        <div className="Approvebreadcrump">
          <Breadcrumb aria-label="Breadcrumb default example">
            <BreadcrumbItem>
              <BreadcrumbButton href={path1}>Home</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton href={path}>Quotation</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
          </Breadcrumb>
        </div>
      </div>
      <div>
        <div style={{ maxHeight: "10vh", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
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

          <div style={{ display: "flex", flexDirection: "column", paddingRight: "2em" }}>
            {/* New Filter with Popover */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer", 
              }}
              onClick={togglePopover}
            >
              <Add28Regular style={{ color: "#3d98de" }} />
              <span style={{ marginLeft: "8px" }}>New Filter</span>
            </div>

            {/* Popover */}
            {popoverOpen && (
  <Popover
    open={popoverOpen}
    onOpenChange={togglePopover}
    positioning={{ position: "right", align: "top" }}
  >
                  <PopoverTrigger disableButtonEnhancement>
                    <Button style={{ border: "none" }}></Button>
                  </PopoverTrigger>

                  <PopoverSurface
                    tabIndex={-1}
                    style={{
                      width: "50%",     
                      maxWidth: "300px",  
                      padding: "1.5em",  
                      
                    }}
                  >
                    <div>
                    <ExampleContent />
                    </div>
                    
                  </PopoverSurface>
                </Popover>
              )}

            {/* Clear Filter */}
            <div style={{ display: "flex", alignItems: "center", marginTop: "1em" }}>
              <MdOutlineFilterAltOff style={{ color: "#3d98de", fontSize: "25px" }} />
              <span style={{ marginLeft: "8px" }}>Clear Filter</span>
            </div>
          </div>
        </div>

        <div style={{ width: "100%", height: "5vh" }} />
        <div>
          <QuotationTable setStatusCounts={setStatusCounts}/>
        </div>
      </div>
    </div>
  );
};

export default SupplierPage;
