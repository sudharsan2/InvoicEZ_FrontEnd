import React ,{useState}from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbDivider,
  BreadcrumbButton,
} from "@fluentui/react-components";
import TagCounters from "../components/gridapprove";
import Search from "../components/Search";
import POTable from "../components/POTable";
import DropDownComponent from "../components/DropDown";
import { ArrowClockwise28Regular } from "@fluentui/react-icons";
import {  TabList, Tab } from "@fluentui/react-components";
import DatePickerComponent from "../components/DatePicker";
import { MdOutlineFilterAltOff } from "react-icons/md";
import { Add28Regular } from "@fluentui/react-icons";
import {
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Button,
  makeStyles,
} from "@fluentui/react-components";
// import DropDown from "../components/DropDown";
import { DatePicker } from "antd";
import DropdownComponent from "../components/DropDown";

const path = "/po";
const path1 = "http://localhost:3000/";



  
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
          <h3 style={{ fontWeight: "Normal" }}>Requestor Name</h3>
          <DropdownComponent />
          <h3 style={{ fontWeight: "Normal" }}>Status</h3>
          <DropdownComponent />
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
      gap: "8px",
      marginTop: "4em",
      marginLeft: "2em",
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
      fontSize: "24px", // Adjust font size to match the ArrowClockwise icon
    },
    contentHeader: {
        marginTop: "0",
      },
    
      popoverContent: {
        // zIndex: 1000, 
        // position: "fixed", 
      },

  });
  

const PurchaseOrderPage = () => {
const [popoverOpen, setPopoverOpen] = useState(false);

  
const togglePopover = () => setPopoverOpen(!popoverOpen);
 const styles = useStyles();
  const counters = [
    { label: "To be Acknowledged", value: <span style={{ color: "#d62727" }}>2</span>, color: "#d62727" },
    { label: "Acknowledged", value: <span style={{ color: "#004378" }}>10</span>, color: "#004378" },
    { label: "Rejected", value: <span style={{ color: "#00a2ad" }}>5</span>, color: "#00a2ad" },
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
              <BreadcrumbButton href={path}>Purchase Order</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            
          </Breadcrumb>
        </div>
        <div style={{padding:"2.5em"}}>
         
        </div>
      </div>

      <div>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between",}}>
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
        {/* Filter Part */}
        <div style={{ display: "flex", flexDirection: "column",paddingRight:"2em" }}>
            
            <div
              style={{
                display: "flex",
                justifyContent:"flex-end",
                cursor: "pointer", 
                marginRight:"2em",
                width:"100%",
                marginBottom:"1em"
              }}
              onClick={togglePopover}
            >
              <Add28Regular style={{ color: "#3d98de" }} />
              <span>New Filter</span>
            </div>

            
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
                    <ExampleContent />
                  </PopoverSurface>
                </Popover>
              )}

            {/* Clear Filter */}
            <div style={{ display: "flex", justifyContent:"flex-end", width:"100%" }}>
              <MdOutlineFilterAltOff style={{ color: "#3d98de", fontSize: "25px" }} />
              <span>Clear Filter</span>
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
          PO
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


        <div style={{ height: "5vh" }} />
        <POTable />
      </div>

      <div style={buttonContainerStyle}>
        <button style={{color:"#0078d5",border:"none",backgroundColor:"white"}}>Submit</button>
      </div>
    </div>
  );
};

export default PurchaseOrderPage;
