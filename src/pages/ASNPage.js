import React ,{useState} from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,
} from "@fluentui/react-components";
import TagCounters from "../components/gridapprove";
import Search from "../components/Search";
import ASNTable from "../components/ASNTable";
import DropDownComponent from "../components/DropDown";
import { ArrowClockwise28Regular } from "@fluentui/react-icons";
import {  TabList, Tab } from "@fluentui/react-components";
import { tokens, Divider } from "@fluentui/react-components";
import { Add28Regular } from "@fluentui/react-icons";
import DatePickerComponent from "../components/DatePicker";
import { MdOutlineFilterAltOff } from "react-icons/md";
import {
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Button,
  makeStyles,
} from "@fluentui/react-components";
// import DropDown from "../components/DropDown";
import { DatePicker } from "antd";

const path = "/asn";
const path1 = "http://localhost:3000/";


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
          <h3 style={{ fontWeight: "Normal" }}>Requestor Name</h3>
          <DropDownComponent />
          <h3 style={{ fontWeight: "Normal" }}>Status</h3>
          <DropDownComponent />
        </div>
      </div>
    );
  };

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

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "flex-start",
  padding: "16px 0",
};

const useStyles = makeStyles({
    statusBullet: {
      display: "inline-block",
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      marginRight: "8px",
    },
    statusRFQ: { backgroundColor: "yellow" },
    statusTodo: { backgroundColor: "red" },
    statusCompare: { backgroundColor: "green" },
    iconButtonContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent:"flex-end",
      gap: "8px",
      marginTop: "2em",
      marginLeft: "65%",
    },
    iconButton: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "transparent",
      border: "1px solid #fff",
      padding: "6px 12px",
      cursor: "pointer",
      gap: "8px",
    },
    icon: {
      color: "#1281d7",
      fontSize: "24px", 
    },
    popoverContent: {
      zIndex: 1500,
    },
  });
  

  
const ASNPage = () => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const togglePopover = () => setPopoverOpen(!popoverOpen);
 const styles = useStyles();
  const counters = [
    { label: "Currently In Shipment", value: <span style={{ color: "#d62727" }}>2</span>, color: "#d62727" },
    
  ];

  return (
    <div style={{ maxHeight: "91vh", overflowY: "auto" }}>
      <div style={{ height: "5vh",display:"flex",flexDirection:"row",justifyContent:"space-between",}}>
        <div className="Approvebreadcrump">
          <Breadcrumb aria-label="Breadcrumb default example">
            <BreadcrumbItem>
              <BreadcrumbButton href={path1}>Home</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton href={path}>Advance Shipment Notice</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            
          </Breadcrumb>
        </div>
      </div>

      <div>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
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
       {/* New filter */}
        <div style={{ display: "flex", flexDirection: "column", paddingRight: "2em" }}>
            {/* New Filter with Popover */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer", 
                marginRight:"2em",
                width:"100%",
                // marginBottom:"1em"
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
                    position: "relative", // Ensure the popover has a relative position
                    zIndex: 999, // Lower z-index than DatePickerComponent
                  }}
                >
                  <ExampleContent />
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
        

        <TabList
        defaultSelectedValue="tab1"
        appearance="subtle"
        style={{ marginLeft: "0vw", marginTop: "2vh" }}
      >
        <Tab
          value="tab1"
          style={{ border: "1px solid transparent", marginTop: "4em" }}
        >
         
        </Tab>

        <div className={styles.iconButtonContainer}>
          <button className={styles.iconButton}>
            <ArrowClockwise28Regular className={styles.icon} />
            <span>Refresh</span>
          </button>
          {/* <CiFilter className={styles.icon} /> <span>Filter</span> */}
        </div>

        <Search placeholder="Search PO or Supplier" />
       
      </TabList>

      <Divider/>
        <div style={{ height: "5vh" }} />
        <ASNTable />
      </div>

      <div style={buttonContainerStyle}>
        <button style={{color:"#0078d5",border:"none",backgroundColor:"white"}}>Submit</button>
      </div>
    </div>
  );
};

export default ASNPage;
