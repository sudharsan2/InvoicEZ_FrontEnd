import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,
  
} from "@fluentui/react-components";


import StoreOpenPoTable from "../components/StoreOpenPoTable";


const path = "/storeopenpo";
const path1 = "/storedashboard";




const StoreOpenPO = () => {
    
    
    
  return (
    <div style={{maxHeight:"91vh",overflowY:"auto"}}>
      <div style={{ height: "5vh" }}>
        <div className="Approvebreadcrump">
          <Breadcrumb aria-label="Breadcrumb default example">
            <BreadcrumbItem>
              <BreadcrumbButton href={path1}>Home</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton href={path}>Open PO</BreadcrumbButton>
            </BreadcrumbItem>
           
          </Breadcrumb>
        </div>
      </div>
      <div>
        <div style={{ maxHeight: "10vh",}}>
          <div
            style={{
              display: "flex",
              justifyContent: "flexStart",
              padding: "1px",
              
              
            }}
          >
            <h3 style={{ fontSize: "1.5em" }}>Open PO</h3>
          </div>
         
                </div>
        <div style={{ width: "100%", height: "5vh" }} />
        
        <div style={{marginTop:"-2em"}}>
        <StoreOpenPoTable />
        </div>
      </div>
    </div>
  );
};

export default StoreOpenPO;
