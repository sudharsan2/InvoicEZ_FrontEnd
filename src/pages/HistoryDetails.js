import { useEffect, useState } from "react";
import React from "react";
import { ArrowSortUpFilled, ArrowSortDownRegular } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import {
  makeStyles,
  
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
  createTableColumn,
  useTableFeatures,
  useTableSort,
  Divider,
} from "@fluentui/react-components";

import { useLocation } from "react-router-dom";
import axios from "axios";

import { ArrowDownload28Regular } from "@fluentui/react-icons";


import { message } from "antd";
import { notification } from "antd";

const path = "/approve";
const path2 = "/approvepage";
const path1 = "/dashboard";

const useStyles = makeStyles({
  root: {
    // width: "77vw",
    // height: "88vh",
    // overflowY: "auto",
    // display: "flex",
    // flexDirection: "column",
  },

  header: {
    padding: "20px",
  },

  content1: {
    overflowX: "auto",
    paddingTop: "3vh",
    padding: "0 20px",
    maxHeight: "35vh",
    
  },

  content2: {
    width: "77vw",
    overflowY: "auto",
    
    padding: "0 20px",

   
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
    maxWidth:"500px"
  },
  content: {
    fontSize: "13px",
    marginLeft: "10px",
  },
});

const HistoryDetails = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  

  

  const styles = useStyles();
  const themestate = false;
  
  
  const [error, setError] = useState(null);
  const location = useLocation();
  const { poNumber, Id } = location.state || {};
  console.log("ID", Id);
  const [poDate, setPoDate] = useState();
  const [postatus, setPoStatus] = useState();
  
  const [total, setTotal] = useState();
 
  const [supplier, setSupplier] = useState();
  const [vendor, setVendor] = useState("");
  const [customer, setCustomer] = useState();
  const [invoiceid, setInvoiceId] = useState();
  const [invoicedate, setInvoiceDate] = useState();
  const [invoicetot, setInvoicetot] = useState();
  const [closedcode, setClosedCode] = useState();
 

  const [inv_id, setInv_id] = useState();

  console.log("Invoice Id", inv_id);
  console.log("Error",error)
  const approvePo = async () => {
    const url = `https://invoicezapi.focusrtech.com:57/user/update-storeuser/${inv_id}`;

    try {
      const response = await axios.post(url, {});

      if (response.status === 200) {
        message.success("PO successfully Updated");
        navigate(`/approve`);
      }
      console.log("Success:", response.data); // Handle the response data
    } catch (error) {
      notification.error({
        message: "Approved Failed",
        
      });
      console.error("Error:", error);
    }
  };

  

  

  const [selectedtab, setSelectedTab] = React.useState("tab1");
  const purchaseOrder = {
    poNumber: poNumber,
    
    poTotalAmount: "95090",
    poCurrency: "INR",
    poStatus: "Open",
    lineMatching: "FULL / Partial Line Items",
    
    customerAddress: "CustomerAddress",
   
    invoiceDate: "InvoiceDate",
    invoiceTotal: "InvoiceTotal",
    invoiceCurrency: "Invoice Currency",
    purchaseOrderNumberInInvoice: "PurchaseOrder Number in Invoice",
  };
  const [sortState, setSortState] = useState({
    sortDirection: "ascending",
    sortColumn: "empid",
  });
  

  const [data, setData] = useState("");
  

  const handleTabSelect2 = (event, data) => {
   
    setSelectedTab(data.value);
  };
  const [entrytime, setEntrytime] = useState();

  const columns = [
    createTableColumn({
      columnId: "id",
      compare: (a, b) => a.id - b.id,
    }),
    createTableColumn({
      columnId: "name",
      compare: (a, b) => a.name.localeCompare(b.name),
    }),
    createTableColumn({
      columnId: "description",
      compare: (a, b) => a.description.localeCompare(b.description),
    }),
    createTableColumn({
      columnId: "invoice_item_name",
      compare: (a, b) => a.invoice_item_name.localeCompare(b.invoice_item_name),
    }),
    createTableColumn({
      columnId: "unit_price",
      compare: (a, b) => a.unit_price - b.unit_price,
    }),
    createTableColumn({
      columnId: "quantity",
      compare: (a, b) => a.quantity - b.quantity,
    }),
    createTableColumn({
      columnId: "invoice_quantity",
      compare: (a, b) => a.invoice_quantity - b.invoice_quantity,
    }),
    createTableColumn({
      columnId: "final_po_quantity",
      compare: (a, b) => a.final_po_quantity - b.final_po_quantity,
    }),
  ];

  

  

  const handleViewInvoice = async () => {
    try {
     
      const token = localStorage.getItem("access_token"); 

        const response = await fetch(
          `https://invoicezapi.focusrtech.com:57/user/invoices-file/${inv_id}`,
          {
            method: "GET", 
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const fileURL = URL.createObjectURL(blob);

      window.open(fileURL, "_blank");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const token = localStorage.getItem("access_token"); 

    const response = await axios.get(
      `https://invoicezapi.focusrtech.com:57/user/po-details/${Id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
        const fetchedItems = response.data;

        setInv_id(fetchedItems.invoice_info.id);
       
        console.log("InvoiceId", fetchedItems.invoice_info.id);

        const invoice_items = fetchedItems.invoice_info.items.map((item, index) => {
          
        
          return {
            Igst: item.Igst,
            Cgst: item.Cgst,
            Sgst: item.Sgst,
            index: index, 
          };
        });
        

        const normalizedPoLineItems = fetchedItems.po_lineitems.map(
          (poItem, index) => {
            console.log("PO", poItem);

            const matchingInvoiceItems = fetchedItems.invoice_info.items;
            
            const matchingInvoiceItem = invoice_items[index];
            const matchingQuantity = matchingInvoiceItems[index]
              ? matchingInvoiceItems[index].Quantity
              : null;
            return {
              id: poItem.id,
              item_name: poItem.item_name,
              item_description: poItem.item_description,
              quantity: poItem.quantity,
              unit_price: poItem.unit_price,
              Quantity: matchingQuantity,
              Igst: matchingInvoiceItem ? matchingInvoiceItem.Igst : null,
              Cgst: matchingInvoiceItem ? matchingInvoiceItem.Cgst : null,
              Sgst: matchingInvoiceItem ? matchingInvoiceItem.Sgst : null,
              
            };
          },
        );


        
        console.log(normalizedPoLineItems);

        setData(normalizedPoLineItems);
        setTotal(fetchedItems.po_header.total_amount);
        setPoDate(fetchedItems.po_lineitems[0]?.promised_date || "N/A"); 
        setPoStatus(fetchedItems.po_header.po_status);
        setVendor(fetchedItems.invoice_info.VendorAddress);
        setCustomer(fetchedItems.invoice_info.ShippingAddress);
        setInvoiceId(fetchedItems.invoice_info.InvoiceId);
        setInvoiceDate(fetchedItems.invoice_info.InvoiceDate);
        setInvoicetot(fetchedItems.invoice_info.InvoiceTotal);
        setSupplier(fetchedItems.po_header.supplier_name);
        setEntrytime(fetchedItems.invoice_info.created_at);
        fetchedItems.po_lineitems.forEach((item) => {
          setClosedCode(item.closed_code);
        });
        // vendor address
        const vendorAddressObj = fetchedItems.invoice_info.VendorAddress;
        console.log("obj1", vendorAddressObj);

        if (vendorAddressObj) {
          const formattedVendorAddress = `
        ${vendorAddressObj.street_address || ""}
        ${vendorAddressObj.city || ""},
        ${vendorAddressObj.postal_code || ""},
        ${vendorAddressObj.country_region || ""}
    `
            .trim()
            .replace(/\s+/g, " ")
            .replace(/,$/, "");

          setVendor(formattedVendorAddress);
        } else {
          setVendor("NULL");
          console.error("VendorAddress is missing");
        }

        const vendorCustomerObj = fetchedItems.invoice_info.ShippingAddress;
        console.log("obj", vendorAddressObj);

        if (vendorCustomerObj) {
          const formattedCustomerAddress = `
        ${vendorCustomerObj.street_address || ""}
        ${vendorCustomerObj.city || ""},
        ${vendorCustomerObj.postal_code || ""},
        ${vendorCustomerObj.country_region || ""}
    `
            .trim()
            .replace(/\s+/g, " ")
            .replace(/,$/, "");

          setCustomer(formattedCustomerAddress);
        } else {
          setCustomer("NULL");
          console.error("CustomerAddress is missing");
        }
      } catch (error) {
        setError("Error fetching data. Please try again.");
        console.error(
          "Error fetching data:",
          error.response ? error.response.data : error.message,
        );
      } 
    };

    if (poNumber) {
      fetchData();
    }
  }, [poNumber]);

  


   
   const handleSort = (column) => {
    if (sortedColumn === column) {
      
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      
      setSortedColumn(column);
      setSortDirection("asc");
    }
  };

  
  const headerSortProps = (column) => ({
    onClick: () => handleSort(column),
    style: {
      fontWeight: "bold",
      cursor: "pointer",
      maxWidth: column === "Description" ? "150px" : "200px", 
    },
  });

  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const sortedData = [...data].sort((a, b) => {
    if (!sortedColumn) return 0;

    const aValue = a[sortedColumn] || "";  
    const bValue = b[sortedColumn] || "";

   
    const isANumeric = !isNaN(parseFloat(aValue)) && isFinite(aValue);
    const isBNumeric = !isNaN(parseFloat(bValue)) && isFinite(bValue);

    
    if (isANumeric && isBNumeric) {
      const aNumeric = parseFloat(aValue);
      const bNumeric = parseFloat(bValue);
      return sortDirection === "asc" ? aNumeric - bNumeric : bNumeric - aNumeric;
    }

    
    if (!isANumeric && !isBNumeric) {
      const aString = String(aValue).toLowerCase(); 
      const bString = String(bValue).toLowerCase();
      return sortDirection === "asc" ? aString.localeCompare(bString) : bString.localeCompare(aString);
    }

    
    if (isANumeric && !isBNumeric) return sortDirection === "asc" ? -1 : 1;
    if (!isANumeric && isBNumeric) return sortDirection === "asc" ? 1 : -1;

    return 0; 
  });


  return (
    <div style={{ height: "88vh", overflowY: "auto" }}>
      <div>
        <div className="Approvebreadcrump">
          <Breadcrumb aria-label="Breadcrumb default example">
            <BreadcrumbItem>
              <BreadcrumbButton href={path1}>Home</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton href={path}>History</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton href={path2}>PO:{poNumber}</BreadcrumbButton>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div style={{ maxHeight: "20vh" }}>
          <div className={styles.root}>
            <div className={styles.header}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  width: "100%",
                  marginTop: "0px",
                }}
              >
                <div style={{ right: "5%", display: "flex", gap: "10px" }}>
                  
                </div>
              </div>

              

              <h2 style={{ margin: "20px 0 20px 0" }}>
                PO:{purchaseOrder.poNumber}
              </h2>

              <div style={{ display: "flex", marginBottom: "20px" }}>
                <div
                  style={{
                    borderLeft: "5px solid #342d7c",
                    paddingLeft: "10px",
                  }}
                >
                  <p>Supplier</p>
                  <h2>{supplier}</h2>
                  {/* <h2>Levin</h2> */}
                </div>
                <div
                  style={{
                    marginLeft: "3vw",
                    borderLeft: "5px solid #9a3ca9",
                    paddingLeft: "10px",
                  }}
                >
                  <p>Invoice Matching</p>
                  <h2>PO</h2>
                </div>
                <div
                  style={{
                    marginLeft: "3vw",
                    borderLeft: "5px solid black",
                    paddingLeft: "10px",
                  }}
                >
                  <p>Line Matching</p>
                  <h2>FULL</h2>
                </div>
                <div
                  style={{
                    marginLeft: "3vw",
                    borderLeft: "5px solid #FF7F7F",
                    paddingLeft: "10px",
                  }}
                >
                  <p>Entry Time</p>
                  <h2>{entrytime}</h2>
                </div>
              </div>
            </div>

            <TabList
              defaultSelectedValue="tab1"
              appearance="subtle"
              onTabSelect={handleTabSelect2}
              style={{
                marginLeft: "0vw",
                marginTop: "0vh",
                paddingBottom: "2vh",
                borderBottom: "1px solid rgb(200,200,200)",
              }}
            >
              <Tab
                value="tab1"
                className={themestate ? "tab dark drawer" : "tab"}
                style={{ border: "1px solid transparent" }}
              >
                Header
              </Tab>
              <Tab
                value="tab2"
                className={themestate ? "tab dark drawer" : "tab"}
                style={{ border: "1px solid transparent" }}
              >
                Line Item
              </Tab>
              
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  fontSize: "17px",
                  marginLeft: "auto",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <ArrowDownload28Regular
                  style={{ color: "#1281d7" }}
                  onClick={handleViewInvoice}
                />{" "}
                <span onClick={handleViewInvoice}> View Invoice</span>
              </div>
            </TabList>
          </div>
          {selectedtab === "tab1" && (
            <div style={{ marginTop: "20px", }}>
              <div className={styles.content1}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 3fr)", gap: "15px"}}>
                  <div style={{display:"flex",flexDirection:"row"}}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: themestate ? "white" : "",
                      }}
                    >
                      PO Number:
                    </div>
                    <div
                      className={styles.content}
                      style={{ color: themestate ? "rgb(245,245,245)" : "" }}
                    >
                   
                      {poNumber}
                    </div>
                  </div>

                  <div style={{display:"flex",flexDirection:"row",}}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: themestate ? "white" : "",
                      }}
                    >
                      Vendor Address:
                    </div>
                    <div
                      className={styles.content}
                      style={{ color: themestate ? "rgb(245,245,245)" : "" }}
                    >
                      {vendor}
                    </div>
                  </div>

                  <div style={{display:"flex",flexDirection:"row"}}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: themestate ? "white" : "",
                      }}
                    >
                      PO Date:
                    </div>
                    <div
                      className={styles.content}
                      style={{ color: themestate ? "rgb(245,245,245)" : "" }}
                    >
                 
                      {poDate}
                    </div>
                  </div>

                  <div
                    style={{display:"flex",flexDirection:"row"}}
                  >
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: themestate ? "white" : "",
                      }}
                    >
                      Customer Address:
                    </div>
                    <div
                      className={styles.content}
                      style={{ color: themestate ? "rgb(245,245,245)" : "" }}
                    >
                
                      {customer}
                    </div>
                  </div>

                  <div style={{display:"flex",flexDirection:"row"}}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: themestate ? "white" : "",
                      }}
                    >
                      PO Total Amount:
                    </div>
                    <div
                      className={styles.content}
                      style={{ color: themestate ? "rgb(245,245,245)" : "" }}
                    >
                      {total}
                    </div>
                  </div>

                  <div style={{display:"flex",flexDirection:"row"}}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: themestate ? "white" : "",
                      }}
                    >
                      Invoice ID:
                    </div>
                    <div
                      className={styles.content}
                      style={{ color: themestate ? "rgb(245,245,245)" : "" }}
                    >
                   
                      {invoiceid}
                    </div>
                  </div>

                  <div style={{display:"flex",flexDirection:"row"}}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: themestate ? "white" : "",
                      }}
                    >
                      PO Currency:
                    </div>
                    <div
                      className={styles.content}
                      style={{ color: themestate ? "rgb(245,245,245)" : "" }}
                    >
                      {purchaseOrder.poCurrency}
                    </div>
                  </div>
                  <div style={{display:"flex",flexDirection:"row"}}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: themestate ? "white" : "",
                      }}
                    >
                      Invoice Date:
                    </div>
                    <div
                      className={styles.content}
                      style={{ color: themestate ? "rgb(245,245,245)" : "" }}
                    >
                 
                      {invoicedate}
                    </div>
                  </div>

                  <div style={{display:"flex",flexDirection:"row"}}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: themestate ? "white" : "",
                      }}
                    >
                      PO Status:
                    </div>
                    <div
                      className={styles.content}
                      style={{ color: themestate ? "rgb(245,245,245)" : "" }}
                    >
                      {postatus}
                    </div>
                  </div>

                  <div style={{display:"flex",flexDirection:"row"}}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: themestate ? "white" : "",
                      }}
                    >
                      Invoice Total:
                    </div>
                    <div
                      className={styles.content}
                      style={{ color: themestate ? "rgb(245,245,245)" : "" }}
                    >
                    
                      {invoicetot}
                    </div>
                  </div>

                  <div style={{display:"flex",flexDirection:"row"}}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: themestate ? "white" : "",
                      }}
                    >
                      Line Matching:
                    </div>
                    <div
                      className={styles.content}
                      style={{ color: themestate ? "rgb(245,245,245)" : "" }}
                    >
                      {closedcode || "NULL"}
                    </div>
                  </div>

                  

                  
                  
                </div>
              </div>
              <Divider style={{marginTop:"3em"}}/>
            </div>
           
          )}

          {selectedtab === "tab2" && (
            <div
              style={{
                width: "100%",
                display: "flex",
                overflowY: "auto",
                height: "40vh",
                marginTop: "10px",
              }}
            >
              <div style={{ flex: 1 }}>
                <Table>
                  <TableHeader
                    style={{
                      position: "sticky",
                      top: 0,
                      backgroundColor: themestate ? "#383838" : "white",
                      zIndex: 1,
                      color: themestate ? "white" : "black",
                    }}
                  >
                    <TableRow
                      style={
                        themestate ? { color: "white", borderBottomColor: "#383838" } : {}
                      }
                    >
                      <TableHeaderCell {...headerSortProps("id")}>
                      PO_line_id
                        {sortedColumn === "id" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular/> : <ArrowSortUpFilled/>
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("item_name")}>
                      Name
                        {sortedColumn === "item_name" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular/> : <ArrowSortUpFilled/>
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("item_description")}>
                      Description
                        {sortedColumn === "item_description" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular/> : <ArrowSortUpFilled/>
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("item_name")}>
                      Invc Item Name
                        {sortedColumn === "item_name" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular/> : <ArrowSortUpFilled/>
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("unit_price")}>
                      Unit Price
                        {sortedColumn === "unit_price" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular/> : <ArrowSortUpFilled/>
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("quantity")}>
                      Quantity
                        {sortedColumn === "quantity" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular/> : <ArrowSortUpFilled/>
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("Quantity")}>
                      Invoice Quantity
                        {sortedColumn === "Quantity" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular/> : <ArrowSortUpFilled/>
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("Igst")}>
                        Igst
                        {sortedColumn === "Igst" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular/> : <ArrowSortUpFilled/>
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("Cgst")}>
                        Cgst
                        {sortedColumn === "Cgst" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular/> : <ArrowSortUpFilled/>
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("Sgst")}>
                        Sgst
                        {sortedColumn === "Sgst" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular/> : <ArrowSortUpFilled/>
                        )}
                      </TableHeaderCell>
                    </TableRow>
                  </TableHeader>

                  <TableBody style={themestate ? { color: "white" } : {}}>
                    {sortedData.map((item) => (
                      <TableRow
                        key={item.id}
                        style={themestate ? { color: "white" } : {}}
                        className={
                          themestate ? "hovereffect dark" : "hovereffect"
                        }
                      >
                        <TableCell
                          style={{
                            maxWidth: "300px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.id}
                        </TableCell>
                        <TableCell
                          style={{
                            maxWidth: "300px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.item_name}
                        </TableCell>
                        <TableCell
                          style={{
                            maxWidth: "300px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.item_description}
                        </TableCell>
                        <TableCell
                          style={{
                            maxWidth: "300px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.item_name}
                        </TableCell>
                        <TableCell
                          style={{
                            maxWidth: "300px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.unit_price}
                        </TableCell>
                        <TableCell
                          style={{
                            maxWidth: "300px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.quantity}
                        </TableCell>
                        <TableCell
                          style={{
                            maxWidth: "300px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.Quantity}
                        </TableCell>
                        <TableCell
                          style={{
                            maxWidth: "300px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.Igst}
                        </TableCell>
                        <TableCell
                          style={{
                            maxWidth: "300px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.Cgst}
                        </TableCell>
                        <TableCell
                          style={{
                            maxWidth: "300px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.Sgst}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryDetails;
