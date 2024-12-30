import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,
  
} from "@fluentui/react-components";

import OpenPoTable from "../components/OpenPoTable";
import { makeStyles } from "@fluentui/react-components";

const path = "/openpo";
const path1 = "/dashboard";


const useStyles = makeStyles({
    root: {
      
      display: "flex",
      flexDirection: "column",
      gap: "2px",
      maxWidth: "400px",
    },
  });

const OpenPO = () => {
    
    
  return (
    <div style={{maxHeight:"91vh",overflowY:"auto"}}>
      <div style={{ height: "5vh" }}>
        <div className="Approvebreadcrump" >
          <Breadcrumb aria-label="Breadcrumb default example">
            <BreadcrumbItem>
              <BreadcrumbButton href={path1}>Home</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton href={path}>Open PO</BreadcrumbButton>
            </BreadcrumbItem>
            {/* <BreadcrumbDivider /> */}
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
        <div style={{ display: 'flex', justifyContent: 'center' ,width: '90%',alignItems:"center",marginLeft:"3em"}}>
      
    </div>
        <div style={{marginTop:"-2em"}}>
          <OpenPoTable />
        </div>
      </div>
    </div>
  );
};

export default OpenPO;
