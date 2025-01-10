import React, { useEffect, useState } from "react";

import { useNavigate,useLocation } from "react-router-dom";
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
  Divider,
} from "@fluentui/react-components";
import axios from "axios";
import CreatableSelect from "react-select/creatable";
import { message,notification } from "antd";

import { ArrowSortUpFilled, ArrowSortDownRegular,ArrowDownload28Regular } from "@fluentui/react-icons";

const path = "/approve";
const path2 = "/approvepage";
const path1 = "/dashboard";

const useStyles = makeStyles({
  

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
    maxWidth: "500px",
  },
  content: {
    fontSize: "13px",
    marginLeft: "10px",
  },
});

const ApprovePage = () => {
 
  const navigate = useNavigate();

  const [PONumberOPtions, setPONumberOPtions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  

  const styles = useStyles();
  const themestate = false;
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
  const [entrytime, setentrytime] =useState();
  const [po_id, set_Po_id] = useState("");
  const [inv_id, setInv_id] = useState();
  const [loading, setLoading] = useState(true);
 
  const [load, setLoad] = useState(false);
  const [data, setData] = useState("");

  console.log(po_id)
  // ----Styles--- 
  const cursorStyle = loading ? "not-allowed" : "pointer";
  const opacityStyle = loading ? 0.6 : 1;
  const classStyle = themestate ? "tab dark drawer" : "tab";
  const divStyle = themestate ? "white" : "";
  const bodyStyle = themestate ? "hovereffect dark" : "hovereffect";
  const colorStyle = themestate ? { color: "white" } : {};
  const newStyle = themestate ? { color: "white", borderBottomColor: "#383838" } : {};
  const colorStlyes = themestate ? "white" : "black";
  const backStyle = themestate ? "#383838" : "white";
  const innerStyle = {color: themestate ? "rgb(245,245,245)" : ""};

  const handleCreate = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };

    setPONumberOPtions((prevOptions) => [...prevOptions, newOption]);
    setSelectedOption(newOption); // Set the newly created option as the selected one
  };

  const handleChange = (option) => {
    setSelectedOption(option);
  
  };


  const TableHeaderCellWithSort = ({ column, label, sortedColumn, sortDirection, headerSortProps }) => (
    <TableHeaderCell {...headerSortProps(column)}>
      {label}
      {sortedColumn === column && (
        sortDirection === "asc" ? <ArrowSortDownRegular /> : <ArrowSortUpFilled />
      )}
    </TableHeaderCell>
  );

  const approvePo = async () => {
    const url = `https://invoicezapi.focusrtech.com:57/user/update-storeuser/${inv_id}`;
  
    try {
     
      const token = localStorage.getItem("access_token");
  
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
  
      if (response.status === 200) {
        message.success("Gate Entry successfully Updated");
        navigate(`/approve`);
      }
      console.log("Success:", response.data); // Handle the response data
    } catch (error) {
      notification.error({
        message: "Gate Entry Failed",
        description: error.response?.data?.message || "An error occurred.",
      });
      console.error("Error:", error);
    }
  };
  
  const deleteInvoice = async () => {
    const url = `https://invoicezapi.focusrtech.com:57/user/delete-pos/${inv_id}`;
  
    try {
      
      const token = localStorage.getItem("access_token");
  
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
  
      if (response.status === 204) {
        message.success("Revoked successfully");
        navigate(`/approve`);
      }
    } catch (error) {
      message.error(`Operation Unsuccessful. Please try again`);
      console.error("Error:", error);
    }
  };
  

  const handlePostApi = async () => {
    console.log("Button clicked!");

    if (!selectedOption || !selectedOption.value) {
      message.warning("PO number not selected or entered.");
      return;
    }

    if (!inv_id) {
      message.error("Invoice ID is required.");
      return;
    }

    const payload = {
      po_number: selectedOption.value,
      invoice_id: inv_id,
    };

    console.log("payload ", payload);

    try {
      setLoad(true);
      
      
      const token = localStorage.getItem("access_token");
    
      const response = await axios.post(
        "https://invoicezapi.focusrtech.com:57/user/po-number",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
    
      if (response.status === 201) {
        message.success("PO successfully Updated");
        setLoad(false);
        navigate(`/approve`);
      } else {
        message.error(`Operation Unsuccessfully Please try again`);
      }
    } catch (error) {
      message.error(error);
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
 
  
  

  const handleTabSelect2 = (event, data) => {
    
    setSelectedTab(data.value);
  };



  

 


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
      maxWidth: column === "Description" ? "150px" : "200px", // Adjust width as needed
    },
  });

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
        setHeaderData(fetchedItems);
        const invoiceItems = normalizeInvoiceItems(fetchedItems.invoice_info.items);
        const poLineItems = normalizePoLineItems(fetchedItems, invoiceItems);
  
        setData(poLineItems);
        setAddressData(fetchedItems.invoice_info);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };
  
    if (poNumber) {
      fetchData();
    }
  }, [poNumber]);
  
  // Helper function to set header data
  const setHeaderData = (fetchedItems) => {
    setInv_id(fetchedItems.invoice_info.id);
    set_Po_id(fetchedItems.po_header.id);
    setTotal(fetchedItems.po_header.total_amount);
    setPoDate(fetchedItems.po_lineitems[0]?.promised_date || "N/A");
    setPoStatus(fetchedItems.po_header.po_status);
    setInvoiceId(fetchedItems.invoice_info.InvoiceId);
    setInvoiceDate(fetchedItems.invoice_info.InvoiceDate);
    setInvoicetot(fetchedItems.invoice_info.InvoiceTotal);
    setSupplier(fetchedItems.po_header.supplier_name);
    setentrytime(fetchedItems.invoice_info.created_at);
    fetchedItems.po_lineitems.forEach((item) => setClosedCode(item.closed_code));
  };
  
  // Helper function to normalize invoice items
  const normalizeInvoiceItems = (items) =>
    items.map((item, index) => ({
      Igst: item.Igst,
      Cgst: item.Cgst,
      Sgst: item.Sgst,
      index,
    }));
  
  // Helper function to normalize PO line items
  const normalizePoLineItems = (fetchedItems, invoiceItems) =>
    fetchedItems.po_lineitems.map((poItem, index) => {
      const matchingInvoiceItem = invoiceItems[index] || {};
      const matchingQuantity = fetchedItems.invoice_info.items[index]?.Quantity || null;
  
      return {
        id: poItem.id,
        item_name: poItem.item_name,
        item_description: poItem.item_description,
        quantity: poItem.quantity,
        unit_price: poItem.unit_price,
        Quantity: matchingQuantity,
        Igst: matchingInvoiceItem.Igst || null,
        Cgst: matchingInvoiceItem.Cgst || null,
        Sgst: matchingInvoiceItem.Sgst || null,
      };
    });
  
  
  const setAddressData = (invoiceInfo) => {
    const vendorAddress = formatAddress(invoiceInfo.VendorAddress);
    const customerAddress = formatAddress(invoiceInfo.ShippingAddress);
  
    setVendor(vendorAddress || "NULL");
    setCustomer(customerAddress || "NULL");
  };
  
  const formatAddress = (addressObj) => {
    if (!addressObj) {
      console.error("Address is missing");
      return null;
    }
  
    return `
      ${addressObj.street_address || ""}
      ${addressObj.city || ""},
      ${addressObj.postal_code || ""},
      ${addressObj.country_region || ""}
    `
      .trim()
      .replace(/\s+/g, " ")
      .replace(/,$/, "");
  };
  
  
  const handleError = (error) => {
   
    console.error(
      "Error fetching data:",
      error.response ? error.response.data : error.message
    );
  };
  
  

  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);

  const compareNumeric = (aValue, bValue) => {
    const aNumeric = parseFloat(aValue);
    const bNumeric = parseFloat(bValue);
    return sortDirection === "asc" ? aNumeric - bNumeric : bNumeric - aNumeric;
  };
  
  
  const compareStrings = (aValue, bValue) => {
    const aString = String(aValue).toLowerCase();
    const bString = String(bValue).toLowerCase();
    return sortDirection === "asc" ? aString.localeCompare(bString) : bString.localeCompare(aString);
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortedColumn) return 0;
  
    const aValue = a[sortedColumn] || "";
    const bValue = b[sortedColumn] || "";
  
    const isANumeric = isNumeric(aValue);
    const isBNumeric = isNumeric(bValue);
  
    if (isANumeric && isBNumeric) {
      return compareNumeric(aValue, bValue);
    }
  
    if (!isANumeric && !isBNumeric) {
      return compareStrings(aValue, bValue);
    }
  
    return isANumeric ? -1 : 1;
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
              <BreadcrumbButton href={path}>Match Found</BreadcrumbButton>
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
                  <Button onClick={() => deleteInvoice()}>Revoke</Button>
                  <Button
                    className=" buttoncolor"
                    style={{ backgroundColor: "#3570c3", color: "white" }}
                    onClick={() => approvePo()}
                  >
                    Create Gate Entry
                  </Button>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  width: "100%",
                  marginTop: "20px",
                }}
              >
                <CreatableSelect
                  className="basic-single"
                  classNamePrefix="select"
                  value={selectedOption}
                  onChange={handleChange}
                  name="po_number"
                  options={PONumberOPtions}
                  styles={{
                    container: (provided) => ({ ...provided, width: 200 }),
                    marginTop: "20px",
                  }}
                  onCreateOption={handleCreate}
                  placeholder="Select or Enter PO..."
                  isClearable
                />

                <Button
                  appearance="subtle"
                  style={{
                    color: "#0078d4",
                    backgroundColor: "#fff",
                    alignSelf: "flex-end",
                    width: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: {cursorStyle}, 
                    opacity: {opacityStyle}, 
                  }}
                  className={styles.wrapper}
                  onClick={handlePostApi}
                  disabled={load} // Disable button while loading
                >
                  {load ? (
                    <div
                      style={{
                        border: "4px solid rgba(255, 255, 255, 0.3)", // Light background
                        borderRadius: "50%",
                        borderTop: "4px solid #0078d4", // Main color
                        width: "20px",
                        height: "20px",
                        animation: "spin 1s linear infinite",
                        marginRight: "8px", // Space between spinner and text
                      }}
                    />
                  ) : (
                    "Submit"
                  )}
                  <style>
                    {`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                `}
                  </style>
                </Button>
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
                className={classStyle}
                style={{ border: "1px solid transparent" }}
              >
                Header
              </Tab>
              <Tab
                value="tab2"
                className={classStyle}
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
            <div style={{ marginTop: "20px" }}>
              <div className={styles.content1}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(6, 3fr)",
                    gap: "15px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: {divStyle},
                      }}
                    >
                      PO Number:
                    </div>
                    <div
                      className={styles.content}
                      style={innerStyle}
                    >
                  
                      {poNumber}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: {divStyle},
                      }}
                    >
                      Vendor Address:
                    </div>
                    <div
                      className={styles.content}
                      style={innerStyle}
                    >
                      {vendor}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: {divStyle},
                      }}
                    >
                      PO Date:
                    </div>
                    <div
                      className={styles.content}
                      style={innerStyle}
                    >
                 
                      {poDate}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: {divStyle},
                      }}
                    >
                      Customer Address:
                    </div>
                    <div
                      className={styles.content}
                      style={innerStyle}
                    >
                  
                      {customer}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: {divStyle},
                      }}
                    >
                      PO Total Amount:
                    </div>
                    <div
                      className={styles.content}
                      style={innerStyle}
                    >
                      {total}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: {divStyle},
                      }}
                    >
                      Invoice ID:
                    </div>
                    <div
                      className={styles.content}
                      style={innerStyle}
                    >
                 
                      {invoiceid}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: {divStyle},
                      }}
                    >
                      PO Currency:
                    </div>
                    <div
                      className={styles.content}
                      style={innerStyle}
                    >
                      {purchaseOrder.poCurrency}
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: {divStyle},
                      }}
                    >
                      Invoice Date:
                    </div>
                    <div
                      className={styles.content}
                      style={innerStyle}
                    >
                 
                      {invoicedate}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: {divStyle},
                      }}
                    >
                      PO Status:
                    </div>
                    <div
                      className={styles.content}
                      style={innerStyle}
                    >
                      {postatus}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: {divStyle},
                      }}
                    >
                      Invoice Total:
                    </div>
                    <div
                      className={styles.content}
                      style={innerStyle}
                    >
                    
                      {invoicetot}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: {divStyle},
                      }}
                    >
                      Line Matching:
                    </div>
                   
                    <div
                      className={styles.content}
                      style={innerStyle}
                    >
                      {closedcode || "NULL"}
                    </div>
                  </div>

                  <div
                    className={`${styles.section} ${styles.invoiceCurrency}`}
                  >
                    
                  </div>

                  
                </div>
              </div>
              <Divider style={{ marginTop: "3em" }} />
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
                      backgroundColor: backStyle || "white", // Ensure backStyle is defined correctly
                      zIndex: 1,
                      color: innerStyle || "black",
                    }}
                  >
                    <TableRow
                      style={
                        newStyle
                      }
                    >
                      <TableHeaderCellWithSort column="id" label="PO_line_id" sortedColumn={sortedColumn} sortDirection={sortDirection} headerSortProps={headerSortProps} />
                      <TableHeaderCellWithSort column="item_name" label="Name" sortedColumn={sortedColumn} sortDirection={sortDirection} headerSortProps={headerSortProps} />
                      <TableHeaderCellWithSort column="item_description" label="Description" sortedColumn={sortedColumn} sortDirection={sortDirection} headerSortProps={headerSortProps} />
                      <TableHeaderCellWithSort column="item_name" label="Invc Item Name" sortedColumn={sortedColumn} sortDirection={sortDirection} headerSortProps={headerSortProps} />
                      <TableHeaderCellWithSort column="unit_price" label="Unit Price" sortedColumn={sortedColumn} sortDirection={sortDirection} headerSortProps={headerSortProps} />
                      <TableHeaderCellWithSort column="quantity" label="Quantity" sortedColumn={sortedColumn} sortDirection={sortDirection} headerSortProps={headerSortProps} />
                      <TableHeaderCellWithSort column="Quantity" label="Invoice Quantity" sortedColumn={sortedColumn} sortDirection={sortDirection} headerSortProps={headerSortProps} />
                      <TableHeaderCellWithSort column="Igst" label="Igst" sortedColumn={sortedColumn} sortDirection={sortDirection} headerSortProps={headerSortProps} />
                      <TableHeaderCellWithSort column="Cgst" label="Cgst" sortedColumn={sortedColumn} sortDirection={sortDirection} headerSortProps={headerSortProps} />
                      <TableHeaderCellWithSort column="Sgst" label="Sgst" sortedColumn={sortedColumn} sortDirection={sortDirection} headerSortProps={headerSortProps} />
                    </TableRow>
                  </TableHeader>


                  <TableBody style={colorStyle}>
                    {sortedData.map((item) => (
                      <TableRow
                        key={item.id}
                        style={colorStyle}
                        className={
                          bodyStyle
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

export default ApprovePage;
