import React, { useEffect, useRef, useState } from "react";
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
import IssuefixTable from "../components/issuefixtable";
import { Button, makeStyles } from "@fluentui/react-components";
import { FilterRegular, DismissCircleRegular } from "@fluentui/react-icons"; // Import icons

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const path = "/approve";
const path1 = "http://localhost:3000/";
const path2 = "/issuefix";

const IssuefixPage = () => {
  const [height, setHeight] = useState(0);
  const divRef1 = useRef(null);

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
  // const counters = [
  //   { label: "To Do", value: 15, color: "#00bfbf" }, // Cyan
  //   { label: "AI Identified", value: 2, color: "#d62727" }, // Red
  //   { label: "User Resolved", value: 9, color: "#1f497d" }, // Dark Blue
  //   { label: "Refix", value: 4, color: "#d21994" }, // Magenta
  // ];
  return (
    <div>
      <div ref={divRef1}>
        <div className="Approvebreadcrump">
          <Breadcrumb aria-label="Breadcrumb default example">
            <BreadcrumbItem>
              <BreadcrumbButton href={path1}>Home</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton href={path}>Issue</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton href={path}>Fix</BreadcrumbButton>
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
          <h3 style={{ fontSize: "1.5em", marginLeft: "5px" }}>Fix</h3>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "65vw" }}>
              <TagCounters type="approve" />
            </div>
            {/* <div style={{display:'flex', flexDirection:'column'}} */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                justifyContent: "space-around",
              }}
            >
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
      <div>
        {height > 0 ? <IssuefixTable height={height} /> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default IssuefixPage;
