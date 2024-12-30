import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowSortUpFilled, ArrowSortDownRegular } from "@fluentui/react-icons";
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
  Input,
  Divider
} from "@fluentui/react-components";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ArrowDownload28Regular } from "@fluentui/react-icons";
import { message } from "antd";
import { notification } from "antd";

const path = "/storedetails";
const path2 = "/approvepage";
const path1 = "/storedashboard";

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
    overflowY: "auto",
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
  },
  content: {
    fontSize: "13px",
    marginLeft: "10px",
  },
});

const StoreUserPage = () => {
  
  const navigate = useNavigate();
  const styles = useStyles();
  const location = useLocation();
  
   // Destructure state from location
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
  const [po_id, set_Po_id] = useState("");
  const [inv_id, setInv_id] = useState();

// Theme State
   const themestate = false;


  const tabClassName = themestate ? "tab dark drawer" : "tab";
  const tabStyle = { border: "1px solid transparent" };

  const headerStyles = {
    position: "sticky",
    top: 0,
    zIndex: 1,
    backgroundColor: themestate ? "#383838" : "white",
    color: themestate ? "white" : "black",
  };

  
  const approvePo = async () => {
    const url = `http://172.235.21.99:5729/user/GRNGeneration/${po_id}`;

    try {
      const token = localStorage.getItem("access_token");

    const response = await axios.post(url, {}, {
      headers: {
        "Authorization": `Bearer ${token}`, 
      }

    });
   

      

      if (response.status === 200) {
        message.success("GRN successfully Updated");
        navigate(`/storeuser`);
      }
      console.log("Success:", response.data); 
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
  
 
  const [input,setInput] = useState("");
  
  const [data, setData] = useState([]);
  const [entrytime, setEntrytime] = useState();
  
  const handleTabSelect2 = (event, data) => {
   
    setSelectedTab(data.value);
  };
  

  const handleInputChange = (e, fieldName) => {
    const value = e.target.value;
    setInput(value);
    console.log(`Changed`,input);
   
  };
  
  
  
 

  const handleViewInvoice = async () => {
    try {
      
      const token = localStorage.getItem("access_token"); 

        const response = await fetch(
          `http://172.235.21.99:5729/user/invoices-file/${inv_id}`,
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
          `http://172.235.21.99:5729/user/po-details/${Id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const fetchedItems = response.data;
        console.log("FETCHED ITEMS", fetchedItems);
  
        setBasicDetails(fetchedItems); 
        const invoiceItems = mapInvoiceItems(fetchedItems.invoice_info.items); 
        const normalizedPoLineItems = mapPoLineItems(
          fetchedItems.po_lineitems,
          fetchedItems.po_header.po_number,
          invoiceItems
        );
  
        setData(normalizedPoLineItems);
        console.log("Normalized PO Line Items:", normalizedPoLineItems);
  
        setAdditionalDetails(fetchedItems); 
        setFormattedAddresses(
          fetchedItems.invoice_info.VendorAddress,
          fetchedItems.invoice_info.ShippingAddress
        );
      } catch (error) {
       
        console.error(
          "Error fetching data:",
          error.response ? error.response.data : error.message
        );
      } 
    };
  
    if (poNumber) {
      fetchData();
    }
  }, [poNumber]);
  
 
  
  const setBasicDetails = (fetchedItems) => {
    setInv_id(fetchedItems.invoice_info.id);
    set_Po_id(fetchedItems.po_header.id);
    setTotal(fetchedItems.po_header.total_amount);
    setPoDate(fetchedItems.po_lineitems[0]?.promised_date || "N/A");
    setPoStatus(fetchedItems.po_header.po_status);
    setInvoiceId(fetchedItems.invoice_info.InvoiceId);
    setInvoiceDate(fetchedItems.invoice_info.InvoiceDate);
    setInvoicetot(fetchedItems.invoice_info.InvoiceTotal);
    setSupplier(fetchedItems.po_header.supplier_name);
    setEntrytime(fetchedItems.invoice_info.created_at);
  
    fetchedItems.po_lineitems.forEach((item) => {
      setClosedCode(item.closed_code);
    });
  };
  
  const mapInvoiceItems = (invoiceItems) => {
    return invoiceItems.map((item, index) => ({
      Igst: item.Igst,
      Cgst: item.Cgst,
      Sgst: item.Sgst,
      index: index, 
    }));
  };
  
  const mapPoLineItems = (poLineItems, poNumber, invoiceItems) => {
    return poLineItems.map((poItem, index) => {
      const matchingInvoiceItem = invoiceItems[index];
      const matchingQuantity = matchingInvoiceItem
        ? matchingInvoiceItem.Quantity
        : null;
  
      return {
        id: poItem.id,
        item_name: poItem.item_name,
        item_description: poItem.item_description,
        quantity: poItem.quantity,
        unit_price: poItem.unit_price,
        Quantity: matchingQuantity,
        po_number: poNumber,
        line_value: poItem.line_num,
        note: input,
        Igst: matchingInvoiceItem ? matchingInvoiceItem.Igst : null,
        Cgst: matchingInvoiceItem ? matchingInvoiceItem.Cgst : null,
        Sgst: matchingInvoiceItem ? matchingInvoiceItem.Sgst : null,
      };
    });
  };
  
  const setFormattedAddresses = (vendorAddressObj, vendorCustomerObj) => {
    const formatAddress = (addressObj) => {
      if (!addressObj) return "NULL";
  
      return `
        ${addressObj.street_address || ""}
        ${addressObj.city || ""}
        ${addressObj.postal_code || ""}
        ${addressObj.country_region || ""}
      `
        .trim()
        .replace(/\s+/g, " ")
        .replace(/,$/, "");
    };
  
    setVendor(formatAddress(vendorAddressObj));
    setCustomer(formatAddress(vendorCustomerObj));
  };
  
  const setAdditionalDetails = (fetchedItems) => {
    setVendor(fetchedItems.invoice_info.VendorAddress);
    setCustomer(fetchedItems.invoice_info.ShippingAddress);
  };
  

  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');


   
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
      maxWidth: column === "PO Number in Supplier Invoice" ? "200px" : "250px", 
    },
  });

  

  const getValue = (row, column) => row[column] || "";

const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);

const compareNumeric = (aValue, bValue, direction) => {
  const aNumeric = parseFloat(aValue);
  const bNumeric = parseFloat(bValue);
  return direction === "asc" ? aNumeric - bNumeric : bNumeric - aNumeric;
};

const compareStrings = (aValue, bValue, direction) => {
  const aString = String(aValue).toLowerCase();
  const bString = String(bValue).toLowerCase();
  return direction === "asc"
    ? aString.localeCompare(bString)
    : bString.localeCompare(aString);
};

const compareMixed = (isANumeric, isBNumeric, direction) => {
  if (isANumeric && !isBNumeric) return direction === "asc" ? -1 : 1;
  if (!isANumeric && isBNumeric) return direction === "asc" ? 1 : -1;
  return 0;
};

const sortedData = [...data].sort((a, b) => {
  if (!sortedColumn) return 0;

  const aValue = getValue(a, sortedColumn);
  const bValue = getValue(b, sortedColumn);

  const isANumeric = isNumeric(aValue);
  const isBNumeric = isNumeric(bValue);

  if (isANumeric && isBNumeric) {
    return compareNumeric(aValue, bValue, sortDirection);
  }

  if (!isANumeric && !isBNumeric) {
    return compareStrings(aValue, bValue, sortDirection);
  }

  return compareMixed(isANumeric, isBNumeric, sortDirection);
});


const renderHeaderCell = (headerName, fieldKey) => (
  <TableHeaderCell
    style={{
      fontWeight: "bold",
      cursor: "pointer",
      maxWidth: "200px",
    }}
    {...headerSortProps(fieldKey)}
  >
    {headerName}
    {sortedColumn === fieldKey &&
      (sortDirection === "asc" ? <ArrowSortDownRegular /> : <ArrowSortUpFilled />)}
  </TableHeaderCell>
);

const renderCell = (content) => (
  <TableCell
    style={{
      maxWidth: "300px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }}
  >
    {content}
  </TableCell>
);

const renderInputCell = (onChangeHandler) => (
  <TableCell
    style={{
      fontWeight: "bold",
      cursor: "pointer",
      maxWidth: "150px",
    }}
  >
    <Input
      onChange={onChangeHandler}
      type="text"
      size="small"
      style={{ width: "100%" }}
    />
  </TableCell>
);


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
              <BreadcrumbButton href={path}>Generate Gate Entry</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton href={path2}>PO:{purchaseOrder.poNumber}</BreadcrumbButton>
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
                  
                  <Button
                    className=" buttoncolor"
                    style={{ backgroundColor: "#3570c3", color: "white" }}
                    onClick={() => approvePo()}
                  >
                    Generate GRN
                  </Button>
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
                className={tabClassName}
                style={tabStyle}
              >
                Header
              </Tab>
              <Tab
                value="tab2"
                className={tabClassName}
                style={tabStyle}
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
        {[
          { label: "PO Number:", value: poNumber },
          { label: "Vendor Address:", value: vendor },
          { label: "PO Date:", value: poDate },
          { label: "Customer Address:", value: customer },
          { label: "PO Total Amount:", value: total },
          { label: "Invoice ID:", value: invoiceid },
          { label: "PO Currency:", value: purchaseOrder.poCurrency },
          { label: "Invoice Date:", value: invoicedate },
          { label: "PO Status:", value: postatus },
          { label: "Invoice Total:", value: invoicetot },
          { label: "Line Matching:", value: closedcode || "NULL" },
        ].map(({ label, value }, index) => (
          <div
            key={index}
            style={{ display: "flex", flexDirection: "row" }}
          >
            <div
              className={styles.heading}
              style={{
                fontWeight: "bold",
                color: themestate ? "white" : "",
              }}
            >
              {label}
            </div>
            <div
              className={styles.content}
              style={{
                color: themestate ? "rgb(245,245,245)" : "",
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>
      <Divider style={{ marginTop: "3em", width: "100%" }} />
    </div>
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
          style={headerStyles}
        >
          <TableRow
            style={
              themestate
                ? { color: "white", borderBottomColor: "#383838" }
                : {}
            }
          >
            {renderHeaderCell("Line Number", "id")}
            {renderHeaderCell("PO Number", "po_number")}
            {renderHeaderCell("Description", "item_description")}
            {renderHeaderCell("Item", "item_name")}
            {renderHeaderCell("Unit Price", "unit_price")}
            {renderHeaderCell("Quantity", "quantity")}
            {renderHeaderCell("Line Value", "line_value")}
            {renderHeaderCell("IGST", "Igst")}
            {renderHeaderCell("CGST", "Cgst")}
            {renderHeaderCell("SGST", "Sgst")}
            {renderHeaderCell("Note", "invoice_quantity")}
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
              {renderCell(item.id)}
              {renderCell(item.po_number)}
              {renderCell(item.item_description)}
              {renderCell(item.item_name)}
              {renderCell(item.unit_price)}
              {renderCell(item.quantity)}
              {renderCell(item.line_value)}
              {renderCell(item.Igst)}
              {renderCell(item.Cgst)}
              {renderCell(item.Sgst)}
              {item.id && renderInputCell((e) => handleInputChange(e, "invoice_quantity"))}
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

export default StoreUserPage;
