import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,
} from "@fluentui/react-components";
import {
  CalendarMonthFilled,
  CalendarMonthRegular,
  bundleIcon,
} from "@fluentui/react-icons";
import TagCounters from "../components/gridapprove";
import ApproveTable from "../components/approvetable";
import Search from "../components/Search";

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const path = "/approve";
const path1 = "http://localhost:3000/";

const UserApprove = () => {
  return (
    <div>
      <div className="Approvebreadcrump">
        <Breadcrumb aria-label="Breadcrumb default example">
          <BreadcrumbItem>
            <BreadcrumbButton href={path1}>Home</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton href={path}>Approve</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
        </Breadcrumb>
      </div>
      <div
        style={{ display: "flex", justifyContent: "flexStart", padding: "1px" }}
      >
        <h3 style={{ fontSize: "1.5em", marginLeft: "5px" }}>Approve</h3>
      </div>

      <div>
        <TagCounters />
      </div>
      <div>
        <ApproveTable />
      </div>
    </div>
  );
};

export default UserApprove;
