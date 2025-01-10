import { message } from "antd";
import { ArrowSortUpFilled, ArrowSortDownRegular ,ArrowDownload28Regular} from "@fluentui/react-icons";
import {
  makeStyles,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  TabList,
  Tab,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TableBody,
  TableHeaderCell,
 
  tokens,
} from "@fluentui/react-components";
import{useLocation } from "react-router-dom";
import {ArrowClockwise24Regular} from "@fluentui/react-icons";
import DashboardNav from "../components/DashboardNav";
import CreatableSelect from "react-select/creatable";
import React, { useState ,useEffect} from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import axios from "axios";
import { Popover } from "@mui/material";
import { toggleDrawerPosition } from "../Store/refreshSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const path = "/aidetail";
const path1 = "/Dashboard";
const Checkbox = ({ children, ...props }) => (
  <label style={{ marginRight: "1em" }}>
    <input type="checkbox" {...props} />
    {children}
  </label>
);
 
const useStyles = makeStyles({
  contentHeader: {
    marginTop: "0",
  },
  tableCell: {
    maxWidth: "300px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  root: {
 
    height: "88vh",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
  example: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyItems: "flex-start",
    minHeight: "96px",
    backgroundColor: tokens.colorNeutralBackground1,
    marginLeft: "-26em",
  },
  header: {
    padding: "20px",
  },
  content1: {
    display: "flex",
    flexWrap: "wrap",
    overflowY: "auto",
    paddingTop: "3vh",
    padding: "0 20px",
    maxHeight: "48vh",
    columnGap: "30%",
    rowGap: "30%",
  },
  content2: {
    width: "77vw",
    overflowY: "auto",
    paddingTop: "3vh",
    padding: "0 20px",
    maxHeight: "48vh",
  },
  controls: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  container: {
    display: "grid",
    gap: "15px",
    fontFamily: "Arial, sans-serif",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginLeft: "0vw",
  },
  section2: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginLeft: "7vw",
  },
  gridTemplate1: {
    gridTemplateColumns: "1fr 1fr",
    gridTemplateAreas: `
      "nameAndId managerInfo"
      "name empid"
      "email doj"
      "status dos"
      "role appraisal"
      "dept totalExperience"
      "editDetails focusRExperience"
    `,
  },
  heading: {
    fontWeight: "bold",
  },
  content: {
    fontSize: "13px",
    marginLeft: "10px",
  },
});
 
// pop up message for table cell see more
 
const DashboardDetails = () => {
 
  const dispatch = useDispatch();
  const styles = useStyles();
  const themestate = false;
 
 
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortedColumn2, setSortedColumn2] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [PONumberOPtions, setPONumberOPtions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedtab, setSelectedTab] = React.useState("tab3");
  const [selectedItem, setSelectedItem] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [invoiceData, setInvoiceData] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);

  const location2 = useLocation();
  const [items, setItems] = useState([]);
  const [selectedInvoiceNumber, setSelectedInvoiceNumber] = useState(null);
  const [dataitem, setDataItem] = useState();
  const [poheader, setPoHeader] = useState();
  const [invoiceId, setInvoiceId] = useState(null);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  console.log(invoiceId);
  // Styles
 
const getThemeStyle = (themeState, lightStyle, darkStyle) => (themeState ? darkStyle : lightStyle);
 
 
const cursorStyle = load ? "not-allowed" : "pointer";
const loadStyle = load ? 0.6 : 1;
const classStyle = getThemeStyle(themestate, "tab", "tab dark drawer");
const tabStyle = getThemeStyle(themestate, "", "rgb(245,245,245)");
const backStyle = getThemeStyle(themestate, "white", "#383838");
const innerStyle = getThemeStyle(themestate, "black", "white");
const bodyStyle = getThemeStyle(themestate, {}, { color: "white", borderBottomColor: "#383838" });
const tableBodyStyle = getThemeStyle(themestate, {}, { color: "white" });
 
 
 
 
 
 const fetchData = async (showMessage = false) => {
    if (showMessage) {
      message.success("Refreshing...");
    }
}
 
const handleRefreshClick = () => {
    fetchData(true); // Pass `true` to show the message when button is clicked
  };
 
 
const renderDetail = (label, value) => (
  <div>
    <b>{label}:</b> {value}
  </div>
);
 
 const [username, setUsername] = useState("");
useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    console.log(storedUsername);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
 
 
  return (
    <div style={{height:"100%",overflowY:"auto"}}>
      {/* <div className="Approvebreadcrump">
        <Breadcrumb aria-label="Breadcrumb default example">
          <BreadcrumbItem>
            <BreadcrumbButton href={path1}>Home</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton href={path1}>Multiple Match Found</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
         
        </Breadcrumb>
      </div> */}
 
      <div className={styles.root}>
        <div className={styles.header}>
        <div
              style={{
                // marginLeft: "3vw",
                // borderLeft: "5px solid #9a3ca9",
                // paddingLeft: "10px",
                marginTop:"-10px",
                fontWeight: "bold",
                fontSize:"20px"
              }}
            >
              <p>Hi {username} !</p>
            </div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              width: "100%",
              marginTop: "0px",
              gap: "10px",
              marginLeft: "auto",
            }}
          >
            <div
              style={{
                right: "5%",
                display: "flex",
                gap: "10px",
                flexDirection: "column",
              }}
            >
               
              {/* <CreatableSelect
                className="basic-single"
                classNamePrefix="select"
                value={selectedOption}
                // onChange={handleChange}
                name="po_number"
                options={PONumberOPtions}
                styles={{
                  container: (provided) => ({ ...provided, width: 200 }),
                }}
                // onCreateOption={handleCreate}
                placeholder="Select or Enter PO..."
                isClearable
              /> */}
 
             
 
             
 
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: isHovered ? "#e1e1e2" : "transparent",
                          border: "1px solid #fff",
                          padding: "6px 12px",
                          cursor: "pointer",
                          gap: "5px",
                          marginTop:"5px",
                          marginLeft: "2em",
                          transition: "background-color 0.2s ease",
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        // onClick={fetchData}
                        onClick={handleRefreshClick}
                      >
                        <ArrowClockwise24Regular style={{ color: "#1281d7" }} />
                        <span>Refresh</span>
                      </button>
            </div>
            <div
              style={{
                right: "5%",
                display: "flex",
                gap: "10px",
                // flexDirection: "column",
              }}
            >
              {/* <CreatableSelect
                className="basic-single"
                classNamePrefix="select"
                value={selectedOption}
                // onChange={handleChange}
                name="po_number"
                options={PONumberOPtions}
                styles={{
                  container: (provided) => ({ ...provided, width: 200 }),
                }}
                // onCreateOption={handleCreate}
                placeholder="Select or Enter PO..."
                isClearable
              /> */}
 
             
 
                        <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: isHovered1? "#e1e1e2" : "transparent",
                          border: "1px solid #fff",
                          padding: "6px 12px",
                          cursor: "pointer",
                          gap: "8px",
                          marginLeft: "2em",
                          marginTop:"5px",
                          transition: "background-color 0.2s ease",
                        }}
                        onClick={()=>{navigate('/summary')}}
                        onMouseEnter={() => setIsHovered1(true)}
                        onMouseLeave={() => setIsHovered1(false)}
                       
                      >
                        <FaArrowUpRightFromSquare style={{ color: "#1281d7" }} />
                        <span>Summary</span>
                      </button>
            </div>
          </div>
 
          {/* <h2 style={{ margin: "20px 0 20px 0" }}> */}
            {/* Invoice No : {invoiceData.invoice_info.InvoiceId} */}
          {/* </h2> */}
 
          <div style={{ display: "flex", marginBottom: "20px" }}>
            <div
            style={{ fontWeight: "bold",marginTop:"-30px" }}
            >
              <p>Dashboard</p>
              {/* <h2>{invoiceData.invoice_info.VendorName}</h2> */}
            </div>
 
            {/* <div
              style={{
                marginLeft: "3vw",
                borderLeft: "5px solid black",
                paddingLeft: "10px",
              }}
            >
              <p>Potential PO</p>
              <h2>{poheader?.length}</h2>
            </div> */}
            {/* <div
              style={{
                marginLeft: "3vw",
                borderLeft: "5px solid #FF7F7F",
                paddingLeft: "10px",
              }}
            >
              <p>Entry Time</p>
              {/* <h2>{invoiceData.invoice_info.created_at}</h2> */}
            {/* </div>  */}
          </div>
 
          <TabList
            defaultSelectedValue="tab3"
            appearance="subtle"
            // onTabSelect={handleTabSelect2}
            style={{
              marginLeft: "0vw",
              marginTop: "-20px",
              paddingBottom: "0vh",
             borderTop: "1px solid rgb(200,200,200)",
            //  display: "flex",
            //  justifyContent: "flex-end"
            }}
          >
            {/* <Tab
              value="tab3"
              className={classStyle}
              style={{ border: "1px solid transparent",
                textAlign:"right"
               }}
            >
              Invoice
            </Tab> */}
            {/* <Tab
              value="tab4"
              className={classStyle}
              style={{ border: "1px solid transparent",
                textAlign:"right"
               }}
            >
              PO
            </Tab> */}
           
          </TabList>
        </div>
        {selectedtab === "tab3" && (
          <div style={{display:"flex",flexDirection:"row"}}>
            <div>
            <DashboardNav/>
            </div>
            
            

          </div>
                     )}
 
        {selectedtab === "tab4" && (
          <div>
          </div>
        )}
      </div>
     </div>
  );
};
 
export default DashboardDetails;