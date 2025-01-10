import React, { useEffect, useState } from "react";
import {
  Hamburger,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
  
} from "@fluentui/react-nav-preview";

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
import {
  Tooltip,

} from "@fluentui/react-components";
import SankeyChart from "./SankeyChart";
import CalendarComponent from "./calendar";
import { useNavigate } from "react-router-dom";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import LineChartPage from "./Linechart";
import InvoiceStatusPieChart from "./piechart";
import axios from "axios";
import {message} from "antd";
import { useSelector } from "react-redux";
const useStyles = makeStyles({
  root: {
    overflow: "hidden",
    display: "flex",
    height: "600px",
  },
  content: {
    flex: "1",
    padding: "16px",
    display: "grid",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  field: {
    display: "flex",
    marginTop: "4px",
    marginLeft: "8px",
    flexDirection: "column",
    gridRowGap: tokens.spacingVerticalS,
  },
});


const containerStyle = {
    width: "98%",
    display: "flex",
    padding: "8px",
    marginLeft: "8px",
    // marginTop:"-5em",
    justifyContent:"space-between",

  };

  const containerStyle1 = {
    width: "100%",
    display: "flex",
    padding: "8px",
    marginLeft: "8px",
    marginTop:"-5em",
    justifyContent:"space-between",

  };


  const OtherContainer = {
    width: "100%",
    display: "flex",
    padding: "8px",
    marginLeft: "8px",
    marginTop:"-2em",
    justifyContent:"space-between",

  };


  const containerStyle3 = {
    width: "50vw",
    display: "flex",
    padding: "5px",
    // marginLeft: "8px",
    marginTop:"0em",
    justifyContent:"space-between",
    marginBottom:"20px"

  };



const containerStyle2 = {
    display: "grid",          
    gridTemplateColumns: "repeat(4, 1fr)", 
    gridTemplateRows: "repeat(3, 1fr)",    
    gap: "4em",               
    width: "60vw",            
    padding: "1em",
    marginLeft: "0em",
    marginTop:"2em",
    marginBottom:"20px"
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
    marginLeft: "6px",
  };
  
  
const DashboardNav = () => {
  const styles = useStyles();
  const themestate = false;
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState("Live Count");
  const [selectedtab, setSelectedTab] = React.useState("tab3");
  const [gatelength,setGateLength] = useState("");
  const [MatchCount,setMatchedCount] = useState("");
  const [multiple_MatchCount,setmultiple_MatchedCount] = useState("");
  const [nomatch,setNoMatchCount] = useState("");
  const [linematch,setLineMatch] = useState("");
  const [suppliermatch,setSupplierMatch] = useState("");
  const [po_match,setPo_Match] = useState("");
   const [page, setPage] = useState("");
    const [invoice, setInvoice] = useState("");
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);  // State to handle loading state
  const [isCleared, setIsCleared] = useState(false); 
  const [tableLength,setTableLength] = useState("");
  const [datalength,setDataLength] = useState("");
  const [HistoryTable,setHistoryLength] = useState("");
// Styles
  const getThemeStyle = (themeState, lightStyle, darkStyle) => (themeState ? darkStyle : lightStyle);
  const classStyle = getThemeStyle(themestate, "tab", "tab dark drawer");
 
  const navItems = ["Live Count", "To-Do Count", "PO Calendar", "Others"];


  const counters = [
    { label: "Dashboard", value: <span style={{ color: "#004378" }}>PO Calender</span>, color: "#004378" },
    { label: "Open PO's", value: datalength, color: "#b4009e" } // Cyan
  ];

  const counter2 = [
    { label: "Dashboard",  value: <span style={{ color: "#004378" }}>Live Count</span>, color: "#004378" }, // Cyan
  ];

  const others = [
    { label: "Dashboard",  value: <span style={{ color: "#004378" }}>Others</span>, color: "#004378" }, // Cyan
  ];

  const TodoCount = [
    { label: "Dashboard",  value: <span style={{ color: "#004378" }}>To Do</span>, color: "#004392" },
    { label: "Yet To Process",  value: <span style={{ color: "#004378" }}>{gatelength}</span>, color: "#ff0000" },
    { label: "Waiting For GRN",  value: <span style={{ color: "#004378" }}>{tableLength}</span>, color: "#b80da3" }, // Cyan

  ];



  
  const fetchDashboard = async (showMessage = false) => {
    if (showMessage) {
      message.success("Refreshing...");
    }
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get("https://invoicezapi.focusrtech.com:57/user/invoices", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const fetchedItems = response.data; // Assuming data is in response.data
      console.log("fetchedItems Summary", fetchedItems);
      const tablelength = fetchedItems.length;
      console.log("Table length", tablelength);
     
      
      let MatchCount = 0;
      let multiple_MatchCount = 0;
      let fixCount = 0;
      let gatelength = 0;
      const mappedItems = fetchedItems.map((item) => {
        let Status = "";
        

        if (item.po_headers.length === 0) {
          Status = "No Match Found";
          fixCount += 1;
        } 
        else if (item.po_headers.length === 1) {
          console.log("wertyuio");
          if (item.storeuser === true) {
            console.log("wertyuio123");
            Status = "Gate Entry";
            gatelength+=1;
          } else if (item.storeuser === false) {
            MatchCount += 1;
            Status = "Match Found";
            
          }
        }

         else if (item.po_headers.length > 1) {
          Status = "Multiple Match Found";
          multiple_MatchCount += 1;
        }
        

       

        return {
          id: item.id,
          supplier: item.VendorName,
          amount: item.InvoiceTotal,
          lines: item.items.length,
          buyer: item.CustomerName,
          Status: Status, 
          
        };
      });
      setGateLength(tablelength);
      setNoMatchCount(fixCount);
      setmultiple_MatchedCount(multiple_MatchCount);
      setMatchedCount(MatchCount);
     

      console.log("MAP IN SUMMARY",mappedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  
  console.log("GateLength",gatelength);



   // Line Count 

const fetchDataLine = async () => {
    try {
     
      const authToken = localStorage.getItem("access_token"); 

  const response = await fetch(
    "https://invoicezapi.focusrtech.com:57/user/statusForApprove",
    {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    }
  );

      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      console.log("JSON",jsonData);
      setLineMatch(jsonData.line_items_matching_count);
      setSupplierMatch(jsonData.supplier_matching_count);
      setPo_Match(jsonData.po_number_matching_count);
    }
    catch(error)
    {
        console.log("Error",error);
    }
  };


  const fetchAzureDetails = async () => {
    try {
      
      const response = await fetch("https://invoicezapi.focusrtech.com:57/user/azure-detail", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`, 
        },
      });
      const data = await response.json();
      if (data) {
        
        setPage(data.pages_processed);
        setInvoice(data.invoice_processed);
        
      }
     
    } catch (error) {
      console.error("Error fetching LLM details:", error);
      
    } 
  };

  const GateEntryData = async (showMessage = false) => {
    if (showMessage) {
      message.success("Refreshing...");
    }
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get("https://invoicezapi.focusrtech.com:57/user/storetrue-invoice", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      const fetchedItems = response.data; // Assuming data is in response.data
      console.log("fetchedItems", fetchedItems);
      
      const mappedItems = fetchedItems.map((item, index) => {
        
        if (!item.po_headers || item.po_headers.length === 0) {
          console.warn(`No po_headers found for index ${index}`);
          return null; // Skip if no po_headers
        }
        const val = item.items.map((item)=>({
              Igst:item.Igst
        }));
       
        console.log("IGST",val);
      
        return item.po_headers.map((po_header) => ({
          
          
          Id:po_header.id,
          po_number: po_header.po_number,
          po_type: po_header.po_type,
          po_status: po_header.po_status,
          supplier_name: po_header.supplier_name,
          location: po_header.location,
          ship_to: po_header.ship_to,
          bill_to: po_header.bill_to,
          buyer_name: po_header.buyer_name,
          total_amount: po_header.total_amount,
          status: po_header.status,
          customer:item.CustomerName,
          invoice:item.InvoiceFile,
          Gate:item.gate_entry_no,
          Igst_val:val.Igst
          
          

        }));
      });
      
      const flattenedMappedItems = mappedItems
  .flat() 
  .filter(Boolean) 
  .sort((a, b) => a.po_number.localeCompare(b.po_number));

      setTableLength(flattenedMappedItems.length);
      console.log("Mapped Items",flattenedMappedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const OpenPo = async (showMessage = false) => {
    if (showMessage) {
      message.success("Refreshing...");
    }
    try {
     
      const token = localStorage.getItem("access_token");
      const response = await axios.get("https://invoicezapi.focusrtech.com:57/user/allOpenPos/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const fetchedItems = response.data || []; 
      console.log("fetchedItemsOPen", fetchedItems);
      setDataLength(fetchedItems.length);
      
      const mappedItems = fetchedItems.map((item) => ({
        // Id: item.po_headers[0].id,
        InvoiceId: item.id,
        InvoiceNumber: item.InvoiceId,
        po_number: item.po_number,
        po_type: item.po_type,
        po_status: item.po_status,
        supplier_name: item.supplier_name,
        location: item.location,
        total_amount:item.total_amount,
        Buyer:item.buyer_name,
        need_by:item.need_by_date,
        vendor:item.vendor_site_id,
        poheader:item.po_header_id,
        totamount:item.total_amount,
        vendor_num:item.vendor_number,
      
      }));

      const getUniqueOptions = (array, key) => {
        return Array.from(new Set(array.map((item) => item[key]))).map((value) => ({
            value,
            label: value,
        }));
    };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const HistoryData = async (showMessage = false) => {
    if (showMessage) {
      message.success("Refreshing...");
    }
    try {
      
      const token = localStorage.getItem("access_token");
      const response = await axios.get("https://invoicezapi.focusrtech.com:57/user/grn-history", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const fetchedItems = response.data; 
      console.log("fetchedItems", fetchedItems);
      setHistoryLength(fetchedItems.length);
      console.log("DATA",fetchedItems.length);

      const mappedItems = fetchedItems.map((item, index) => {
        

        return {
          Id: item.po_headers && item.po_headers.length > 0 ? item.po_headers[0].id : null,
          grn_num: item.gate_entry_no,
          location: item.po_headers && item.po_headers.length > 0 ? item.po_headers[0].ship_to : null,
          po_number: item.po_headers && item.po_headers.length > 0 ? item.po_headers[0].po_number : null,
          received_date: item.receivedDate,
          supplier_name: item.VendorName,
          total_amount: item.InvoiceTotal,
          receipt: item.receipt_number,
        };
      });

      console.log("MAP",mappedItems);

      setItems(mappedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  const counter3 = [
    { label: "Yet to Process", value: gatelength, color: "#004378" },
    { label: "Waiting For GRN", value: tableLength, color: "#e60000" }, 
    { label: "Open PO's", value: datalength, color: "#e60000" },
    { label: "Invoice Processed", value: invoice, color: "#982fad" },
    { label: "Matched", value: MatchCount, color: "#b4009e" },
    { label: "Direct PO", value: po_match, color: "#00bfbf" },
    { label: "Line Level Matching", value: linematch, color: "#087822" },
    { label: "Supplier Matching", value: suppliermatch, color: "#f5b016" },
    { label: "Multiple Matching", value: multiple_MatchCount, color: "#f5b016" },
    { label: "No Match", value: nomatch, color: "#1f6eb7" },
    { label: "In History", value: HistoryTable, color: "#982fad" },
    { label: "Pages Processed", value: page, color: "#087822" },
  ];
  

  const handleTabSelect2 = (event, data) => {
    
    setSelectedTab(data.value);
  };


  
  
  const fetchData = async (showMessage = false) => {
    if (showMessage) {
      message.success("Refreshing...");
    }
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get("https://invoicezapi.focusrtech.com:57/user/grn-history", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchedItems = response.data;

      const mappedItems = fetchedItems.map((item) => {
        return {
          Id: item.InvoiceId,
          grn_num: item.gate_entry_no,
          location: item.po_headers && item.po_headers.length > 0 ? item.po_headers[0].ship_to : null,
          supplier_name: item.VendorName,
        };
      });

      setData(mappedItems);  // Update the table data
      console.log("FETCHED", mappedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const clearNotifications = async () => {
    try {
      const response = await axios.post('https://invoicezapi.focusrtech.com:57/user/mark-all-documents-as-read/', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer`, 
        },
      });
 
      if (response.ok) {
        setData([]); 
        setIsCleared(true); 
        alert('All notifications cleared successfully!');
      } else {
        const errorData = await response.json();
        console.error('Error clearing notifications:', errorData);
        alert('Failed to clear notifications. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
     
    } finally {
      setIsLoading(false); // Reset the loading state
    }
  };

  // Function to fetch the unread documents for the notifications
  const GetData = async (showMessage = false) => {
    if (showMessage) {
      message.success("Refreshing...");
    }
    try {
   
      const response = await axios.get("https://invoicezapi.focusrtech.com:57/user/unread-documents", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const fetchedItems = response.data;
      console.log("API",fetchedItems);
      const mappedItems = fetchedItems.map((item) => {
        let Status = "";

        if (item.invoiceInfo.po_headers.length === 0) {
          Status = "No Match Found";
        } else if (item.invoiceInfo.po_headers.length === 1) {
          Status = "Match Found";
        } else if (item.invoiceInfo.po_headers.length > 1) {
          Status = "Multiple Match Found";
        }

        return {
          Id: item.invoiceInfo.InvoiceId,
          supplier_name: item.invoiceInfo.VendorName,
          Status: Status,
        };
      });

      setItems(mappedItems);  // Update the notifications data
      console.log("FETCHED NEW ENTRY", mappedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


 
  
useEffect(()=>{
    GetData();
    fetchData();
    fetchDataLine();
    fetchDashboard();
    fetchAzureDetails();
    GateEntryData();
    OpenPo();
    HistoryData();
},[])


  const handleClearButtonClick = async(e) => {
    e.stopPropagation();
    setIsLoading(true);
    setData([]);
    setIsCleared(true);
    setIsLoading(false);
     clearNotifications(); // Call the clearNotifications API
 
  };




  const renderContent = () => {
    switch (selectedItem) {
        case "Live Count":
            return (
              <div style={{ display: "flex", alignItems: "flex-start" }}>
                {/* Vertical Line */}
                <div
                  style={{
                    width: "10px", // Thickness of the vertical line
                    height: "100%", // Adjust to match the height of the content
                    backgroundColor: "black", // Line color
                  }}
                />
                
                {/* Content */}
                <div>
                  <TabList
                    defaultSelectedValue="tab3"
                    appearance="subtle"
                    onTabSelect={handleTabSelect2}
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginRight:"1em",
                      marginLeft: "0vw",
                      marginTop: "0vh",
                      paddingBottom: "2vh",
                      borderBottom: "1px solid rgb(200,200,200)",
                    }}
                  >
                    <Tab
                      value="tab3"
                      className={classStyle}
                      style={{ border: "1px solid transparent" }}
                    >
                      Numbers
                    </Tab>
                    <Tab
                      value="tab4"
                      className={classStyle}
                      style={{ border: "1px solid transparent" }}
                    >
                      Sankey
                    </Tab>
                  </TabList>
                  {selectedtab === "tab3" && (
                    <div>
                      <div style={containerStyle1}>
                        {counter2.map((item, index) => (
                          <div style={itemStyle} key={index}>
                            <div style={lineStyle(item.color)} />
                            <div>
                              <div style={labelStyle}>{item.label}</div>
                              <div style={valueStyle}>{item.value}</div>
                            </div>
                          </div>
                        ))}
                      </div>
          
                      <div style={containerStyle2}>
                        {counter3.map((item, index) => (
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
                  )}
                  {selectedtab === "tab4" && (
                    <div>
                      <div style={containerStyle1}>
                        {counter2.map((item, index) => (
                          <div style={itemStyle} key={index}>
                            <div style={lineStyle(item.color)} />
                            <div>
                              <div style={labelStyle}>{item.label}</div>
                              <div style={valueStyle}>{item.value}</div>
                            </div>
                          </div>
                        ))}
                      </div>
          
                      <SankeyChart />
                    </div>
                  )}
                </div>
              </div>
            );
          
      case "To-Do Count":
        return <div style={{display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",}}>
           
           <div style={containerStyle3}>
          {TodoCount.map((item, index) => (
            <div style={itemStyle} key={index}>
              <div style={lineStyle(item.color)} />
              <div>
                <div style={labelStyle}>{item.label}</div>
                <div style={valueStyle}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>
            <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center", // Ensures vertical alignment
                                  borderBottom: "1px solid #ddd",
                                  paddingBottom: "10px",
                                  marginBottom: "20px",
                                  gap: "20px",
                                  
                                  
                                }}
                              >
                                {/* Left Header */}
                                <h3
                                  style={{
                                    fontSize: "1.3em",
                                    marginLeft: "5px",
                                    marginBottom: "10px",
                                    textAlign: "left",
                                    paddingBottom: "5px",
                                  }}
                                >
                                  New Upload
                                </h3>
            
                                {/* Right Header */}
            
                                <h3
                                  style={{
                                    fontSize: "1.3em",
                                    textAlign: "center",
                                    marginBottom: "10px",
                                    // borderBottom: "1px solid #ddd",
                                    paddingBottom: "5px",
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    width: "49%"
                                  }}
                                >
                                  GRN Created
                                </h3>
                              </div>
            
                              {/* Tables Section */}
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between", // Space between tables
                                  alignItems: "flex-start", // Ensures tables align to the top
                                  gap: "20px", // Adds consistent spacing between tables
                                  width:"55vw"
                                }}
                              >
                                {/* Left Table */}
                                <table
                                  style={{
                                    width: "100%", // Adjust table width for proper alignment
                                    borderCollapse: "collapse",
                                  }}
                                >
                                  <thead>
                                    <tr>
                                      <th
                                        style={{
                                          textAlign: "left",
                                          padding: "5px",
                                          borderBottom: "1px solid #ddd",
                                          color: "#555",
                                        }}
                                      >
                                        Invoice No
                                      </th>
                                      <th
                                        style={{
                                          textAlign: "left",
                                          padding: "5px",
                                          borderBottom: "1px solid #ddd",
                                          color: "#555",
                                        }}
                                      >
                                        Supplier Name
                                      </th>
                                      <th
                                        style={{
                                          textAlign: "left",
                                          padding: "5px",
                                          borderBottom: "1px solid #ddd",
                                          color: "#555",
                                        }}
                                      >
                                        Status
                                      </th>
                                      <th
                                        style={{
                                          textAlign: "left",
                                          padding: "5px",
                                          borderBottom: "1px solid #ddd",
                                          color: "#555",
                                        }}
                                      >
                                        View
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {items.map((row, index) => (
                                      <tr key={index}>
                                        <td
                                          style={{
                                            padding: "5px",
                                            borderBottom: "1px solid #ddd",
                                            color: "#333",
                                          }}
                                        >
                                          {row.Id}
                                        </td>
                                        <td
                                          style={{
                                            padding: "5px",
                                            borderBottom: "1px solid #ddd",
                                            color: "#333",
                                          }}
                                        >
                                          {row.supplier_name}
                                        </td>
                                        
                                        <td
                                                        style={{
                                                          padding: "2px 2px",
                                                          borderBottom: "1px solid #ddd",
                                                          color: "#fff",
                                                          fontSize: "12px",
                                                          textAlign: "left",
                                                          backgroundColor: (() => {
                                                            if (row.Status === "Match Found" || row.Status === "Multiple Match Found") {
                                                              return "#107c10";
                                                            } else if (row.Status === "No Match Found") {
                                                              return "#c50f1f";
                                                            } else {
                                                              return "transparent";
                                                            }
                                                          })(),  
                                                        }}
                                                      >
                                                        {row.Status}
                                                      </td>
            
            
                                        <td
                                          style={{
                                            padding: "5px",
                                            borderBottom: "1px solid #ddd",
                                            color: "#333",
                                          }}
                                        >
                                          <FaArrowUpRightFromSquare
                                            style={{ cursor: "pointer", marginLeft: "1rem" }}
                                            onClick={() => {
                                              const status = row.Status?.trim().toLowerCase(); // Normalize the status
                                              if (status === "match found") {
                                                navigate("/approve");
                                              } else if (status === "multiple match found") {
                                                navigate("/ai");
                                              } else if (status === "no match found") {
                                                navigate("/issuefix");
                                              } else {
                                                console.error("Unknown status:", row.Status);
                                              }
                                            }}
                                          />
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                  {/* Bottom Button Section */}
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center", // Centers the button horizontally
                                      marginTop: "20px", // Adds spacing between table and button
                                      marginBottom: "20px", // Ensures some spacing at the bottom
                                    }}
                                  >
                                    
                                  </div>
            
                                </table>
            
                                {/* Right Table */}
                                <table
                                  style={{
                                    width: "100%", 
                                    
                                  }}
                                >
                                  <thead>
                                    <tr>
                                      <th
                                        style={{
                                          textAlign: "left",
                                          padding: "5px",
                                          borderBottom: "1px solid #ddd",
                                          color: "#555",
                                        }}
                                      >
                                        Invoice No
                                      </th>
                                      <th
                                        style={{
                                          textAlign: "left",
                                          padding: "5px",
                                          borderBottom: "1px solid #ddd",
                                          color: "#555",
                                        }}
                                      >
                                        Supplier Name
                                      </th>
                                      <th
                                        style={{
                                          textAlign: "left",
                                          padding: "5px",
                                          borderBottom: "1px solid #ddd",
                                          color: "#555",
                                        }}
                                      >
                                        GRN Number
                                      </th>
                                      <th
                                        style={{
                                          textAlign: "left",
                                          padding: "5px",
                                          borderBottom: "1px solid #ddd",
                                          color: "#555",
                                        }}
                                      >
                                        View
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {data.map((row, index) => (
                                      <tr key={index}>
                                        <td
                                          style={{
                                            padding: "5px",
                                            borderBottom: "1px solid #ddd",
                                            color: "#333",
                                          }}
                                        >
                                          {row.Id}
                                        </td>
                                        <td
                                          style={{
                                            padding: "5px",
                                            borderBottom: "1px solid #ddd",
                                            color: "#333",
                                          }}
                                        >
                                          {row.supplier_name}
                                        </td>
                                        <td
                                          style={{
                                            padding: "5px",
                                            borderBottom: "1px solid #ddd",
                                            color: "#333",
                                          }}
                                        >
                                          {row.grn_num}
                                        </td>
                                        <td
                                          style={{
                                            padding: "5px",
                                            borderBottom: "1px solid #ddd",
                                            color: "#333",
                                          }}
                                        >
                                          <FaArrowUpRightFromSquare
                                            style={{ cursor: "pointer", marginLeft: "1rem" }}
                                            onClick={() => {
                                              navigate('/history')
                                            }}
                                          />
            
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "left", // Centers the button horizontally
                                      marginTop: "20px", // Adds spacing between table and button
                                      marginBottom: "20px", // Ensures some spacing at the bottom
                                    }}
                                  >
                                   
                                  </div>
                                </table>
                              </div>

        {/* </div> */}
                              
                            {/* </div>
                          </div> */}
        </div>;
        case "PO Calendar":
            return <div>
                <div style={containerStyle}>
                    {counters.map((item, index) => (
                        <div style={itemStyle} key={index}>
                            <div style={lineStyle(item.color)} />
                            <div>
                                <div style={labelStyle}>{item.label}</div>
                                <div
                                    style={{
                                        ...valueStyle,
                                        color: "#1f497d",
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        textAlign: "left"
                                    }}
                                >
                                    {item.value}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

<div><CalendarComponent /></div>
                
            </div>;
      case "Others":
         return <div style={{
          display: "flex",
          flexDirection:"row",
          flexWrap:"wrap",
          alignContent:"space-between",
          width:"100%"
         
          }}>
           
           <div style={OtherContainer}>
          {others.map((item, index) => (
            <div style={itemStyle} key={index}>
              <div style={lineStyle(item.color)} />
              <div>
                <div style={labelStyle}>{item.label}</div>
                <div style={valueStyle}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>
       
       
       <div style={{width:"50%",marginTop:"-5px"}}>
       <InvoiceStatusPieChart />
       </div>
       
       <div style={{width:"50%"}}>
       <LineChartPage/>
       </div>
        
         
     
      </div>;
      default:
        return <div>Select an item from the navigation</div>;
    }
  };

  const renderHamburgerWithToolTip = () => {
    return (
      <Tooltip content="Navigation" relationship="label">
        <Hamburger onClick={() => setIsOpen(!isOpen)} />
      </Tooltip>
    );
  };

  return (
    <div className={styles.root}>
      <NavDrawer
        defaultSelectedValue={0}
        open={isOpen}
        style={{ backgroundColor: "#fff" }}
      >
        <NavDrawerHeader>{renderHamburgerWithToolTip()}</NavDrawerHeader>

        <NavDrawerBody>
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              value={index}
              style={{
                backgroundColor: selectedItem === item ? "#e0e0e0" : "#fff",
                cursor: "pointer",
                maxWidth: "200px",
              }}
              onClick={() => setSelectedItem(item)} // Update selected item
            >
              {item}
            </NavItem>
          ))}
        </NavDrawerBody>
      </NavDrawer>

      <div 
    style={{
      width: '1px', // Thickness of the line
      height: '100%', // Adjust height to your preference
      backgroundColor: '#ccc', // Color of the line
      margin: '0 10px', // Space around the line
    }} 
  />
      <div className={styles.content}>
        {renderContent()} 
      </div>
    </div>
  );
};

export default DashboardNav;
