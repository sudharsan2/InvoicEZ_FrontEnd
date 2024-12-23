import React, { useEffect, useRef, useState } from "react";
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
import ApproveTable from "../components/approvetable";
import Search from "../components/Search";
import UserTable from "../components/UserTable";
import { Button, makeStyles } from "@fluentui/react-components";
import { FilterRegular, DismissCircleRegular } from "@fluentui/react-icons"; // Import icons
// import { User } from "lucide-react";

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
const path = "/approve";
const path1 = "http://localhost:3000/";
const path2 = "/user";

const containerStyle = {
  width: "100%",
  display: "flex",
  gap:"30px",
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
  marginLeft: "0px", 
};

const divstyle ={
  display:"flex",
  flexDirection:"column",
  marginLeft:"20px",
  paddingTop:"6em",
  fontWeight:"bold",

  
}
const UserPage = () => {
  const [height, setHeight] = useState(0);
  const divRef1 = useRef(null);
  const [tableLength, setTableLength] = useState(0);

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

  //  console.log("tablelength",tableLength);
  const[gateCount,setGateCount]=useState(0);
  const[storeCount,setStoreCount]=useState(0);
  const counters = [
    { label: "Gate User Count", value: gateCount, color: "#00bfbf" }, // Cyan
    { label: "Store User Count", value: storeCount, color: "#d62727" }, // Red
    // { label: "User Resolved", value: 9, color: "#1f497d" }, // Dark Blue
    // { label: "Refix", value: 4, color: "#d21994" }, // Magenta
  ];
  return (
    <div style={{maxHeight:"88vh",overflowY:"auto"}}>
      <div ref={divRef1}>
        <div className="Approvebreadcrump" style={{marginLeft:"3em"}}>
          <Breadcrumb aria-label="Breadcrumb default example">
            <BreadcrumbItem>
              <BreadcrumbButton>Control Center</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            {/* <BreadcrumbItem>
              <BreadcrumbButton href={path}>Issue</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider /> */}
            <BreadcrumbItem>
              <BreadcrumbButton href={path2}>User Management</BreadcrumbButton>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flexStart",
            padding: "1px",
            marginLeft:"3em"
          }}
        >
          <h3 style={{ fontSize: "1.5em", marginLeft: "5px" }}>User Management</h3>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            
            {/* <div style={{display:'flex', flexDirection:'column'}} */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                justifyContent: "flex-start",
                marginLeft:"3em"
              }}
            >
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
      <div style={{ display: 'flex', justifyContent: 'center' ,width: '90%',alignItems:"center",marginLeft:"3em"}}>
      <Divider style={{ marginTop:"2em"}} />
    </div>
      <div style={{marginLeft:"3em"}}>
        {height > 0 ? <UserTable height={height} setTableLength={setTableLength} setStoreCount={setStoreCount}  setGateCount={setGateCount}/> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default UserPage;
