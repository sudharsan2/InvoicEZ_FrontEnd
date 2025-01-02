import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,
  Divider
} from "@fluentui/react-components";

import TagCounters from "../components/gridapprove";
import TableApprove from "../components/TableApprove";



const path = "/approve";
const path1 = "/dashboard";

const UserApprove = () => {
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
              <BreadcrumbButton href={path}>Match Found</BreadcrumbButton>
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
            <h3 style={{ fontSize: "1.5em" }}>Match Found</h3>
          </div>

          <div >
            <TagCounters type="approve" />
          </div>
        </div>
        <div style={{ width: "100%", height: "5vh" }} />
        <div style={{ display: 'flex', justifyContent: 'center' ,width: '90%',alignItems:"center"}}>
      <Divider style={{ marginTop:"4em"}} />
    </div>
        <div style={{marginTop:"-2em"}}>
          <TableApprove />
        </div>
      </div>
    </div>
  );
};

export default UserApprove;
