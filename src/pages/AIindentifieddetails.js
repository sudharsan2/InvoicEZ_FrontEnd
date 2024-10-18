// import { useState } from "react";
// import React from "react";
import {
  makeStyles,
  Button,
  Link,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  TabList,
  Tab,
  Table,
  TableCell,
  TableHeader,
  TableSelectionCell,
  TableRow,
  TableBody,
  TableHeaderCell,
  createTableColumn,
  useTableFeatures,
  useTableSort,
} from "@fluentui/react-components";
import line_data from "./data_approve";
 
import AiNav from "../components/ainavbar";
import { SettingOutlined } from '@ant-design/icons';
import { ArrowDownload28Regular } from '@fluentui/react-icons';
import { useLocation } from "react-router-dom";
import {tokens, Divider } from "@fluentui/react-components";
import CreatableSelect from 'react-select/creatable';
import React, { useState } from 'react';
import  { useEffect} from 'react';

import axios from 'axios';
const path = "/aidetail";
const path1 = "http://localhost:3000/";
const Checkbox = ({ children, ...props }) => (
  <label style={{ marginRight: '1em' }}>
    <input type="checkbox" {...props} />
    {children}
  </label>
);
 
 
const useStyles = makeStyles({
  root: {
    width: "77vw",
    height: "100vh",
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
    marginLeft: "-26em"
   
  },
  header: {
    padding: "20px",
  },
  content1: {
    display: 'flex', // Arrange items in a row
    flexWrap: 'wrap', // Allow items to wrap to the next line if necessary
    overflowY: 'auto',
    paddingTop: '3vh',
    padding: '0 20px',
    maxHeight: '48vh',
    columnGap:'30%',
    rowGap:'30%'
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
 
 
 
 
const AIDetailPage = () => {
 
  const [colourOptions, setColourOptions] = useState([
    { value: '1009', label: '1009' },
    { value: '1010', label: '1010' },
    { value: '1011', label: '1011' },
    { value: '1012', label: '1012' },
    { value: '1013', label: '1013' },
  ]);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleCreate = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    setColourOptions((prevOptions) => [...prevOptions, newOption]);
    setSelectedOption(newOption);
  };
 
  const styles = useStyles();
  const themestate = false;
  const [selectedtab, setSelectedTab] = React.useState("tab3");
 
  
 

  const [sortState, setSortState] = useState({
    sortDirection: "ascending",
    sortColumn: "empid",
  });
  //  const [data, setData] = useState([])
 
  const handleTabSelect2 = (event, data) => {
    // console.log({"currentmonth":currentMonthEmployees})
    setSelectedTab(data.value);
  };
 
  const [data, setData] = useState(line_data);
 
  const columns = [
    createTableColumn({
      columnId: "PO_line_id",
      compare: (a, b) => a.PO_line_id - b.PO_line_id,
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
 
  const {
    sort: { getSortDirection, toggleColumnSort },
  } = useTableFeatures(
    {
      columns,
      items: data,
    },
    [
      useTableSort({
        sortState,
        onSortChange: (e, nextSortState) => setSortState(nextSortState),
      }),
    ],
  );
 
  const headerSortProps = (columnId) => ({
    onClick: (e) => toggleColumnSort(e, columnId),
    sortDirection: getSortDirection(columnId),
  });
 
  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortState.sortColumn];
    const bValue = b[sortState.sortColumn];
 
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortState.sortDirection === "ascending"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
 
    return sortState.sortDirection === "ascending"
      ? aValue - bValue
      : bValue - aValue;
  });

  const handleViewInvoice = async () => {
    try {
      const response = await fetch(`http://10.10.15.15:5719/user/invoices-file/${invoiceNumber}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
 
      const blob = await response.blob();
      const fileURL = URL.createObjectURL(blob);
     
     
      window.open(fileURL, '_blank');
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };
 

  // Invoice Details
  const [invoiceData, setInvoiceData] = useState(null);
  const location2 = useLocation();
  const [items, setItems] = useState([]);
  // Extract the invoiceId from the URL
  const { invoiceNumber }   =  location2.state || {}
  console.log("inn",invoiceNumber)
  const fetchInvoiceDetails = async () => {
    if (invoiceNumber) {
      try {
        const response = await axios.get(`http://10.10.15.15:5719/user/invoices-details/${invoiceNumber}/`);
        const fetchedItem = response.data;
        console.log("R", fetchedItem);

        setInvoiceData(fetchedItem); // Store the full invoice data
        setItems(fetchedItem.items || []); // Store only the items from the response
      } catch (error) {
        console.error("Error fetching invoice data", error);
      }
    }
  };
  console.log("Data",invoiceData);
  useEffect(() => {
    fetchInvoiceDetails();
  }, [invoiceNumber]);

  
  if (!invoiceData) {
    return <div>Loading...</div>;
  }
  
  const invoiceInfo = [
    { label: "Invoice Number", value: invoiceNumber },
    { label: "Invoice Date", value: invoiceData.invoice_info.InvoiceDate },
    { label: "Invoice Due Date", value: invoiceData.invoice_info.DueDate || "Null" },
    { label: "Invoice Total Amount", value: invoiceData.invoice_info.InvoiceTotal },
    { label: "Tax Amount", value: invoiceData.Tax || "N/A" },
    { label: "Currency", value: invoiceData.Currency || "N/A" },
  ];

 
  const vendorInfo = [
    { label: "Vendor Name", value: invoiceData.invoice_info.VendorName },
    { label: "Vendor Address", value: invoiceData.invoice_info.VendorAddress?.city || "N/A" },
    { label: "Vendor Contact Information", value: invoiceData.VendorContact || "N/A" },
    { label: "Vendor Tax ID", value: invoiceData.VendorTaxId || "N/A" },
  ];

  const lineInfo = [
    { label: "Description", value: invoiceData.invoice_info.VendorName },
    { label: "Quantity", value: invoiceData.invoice_info.VendorAddress?.city || "N/A" },
    { label: "Amount", value: invoiceData.VendorContact || "N/A" },
    { label: "Discount", value: invoiceData.VendorTaxId || "N/A" },
    { label: "ProductCode", value: invoiceData.VendorTaxId || "N/A" },
  ];

  

  
 
  return (
    <div>
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
          {/* <BreadcrumbItem>
            <BreadcrumbButton href={path}>{ poNumber }</BreadcrumbButton>
          </BreadcrumbItem> */}
        </Breadcrumb>
      </div>
 
      <div className={styles.root}>
        <div className={styles.header}>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              width: "100%",
              marginTop: "0px",
              gap: "10px",
              marginLeft: "auto", // Pushes the content to the right corner
   
            }}
          >
            <div style={{ right: "5%", display: "flex", gap: "10px" ,flexDirection:"column"}}>
           
 
            <CreatableSelect
      className="basic-single"
      classNamePrefix="select"
      value={selectedOption}
      onChange={setSelectedOption}
      name="color"
      options={colourOptions}
      styles={{ container: (provided) => ({ ...provided, width: 200 }) }}
      onCreateOption={handleCreate}
      placeholder="Select or Enter PO..."
      isClearable
    />
 
              <Button appearance="subtle" style={{
      color: "#0078d4",
      backgroundColor: "#fff",
      alignSelf: "flex-end",
      width: "auto",
     
    }} className={styles.wrapper}>
       Submit
      </Button>
            </div>
          </div>
 
          <h2 style={{ margin: "20px 0 20px 0" }}>
            Invoice:
          </h2>
 
          <div style={{ display: "flex", marginBottom: "20px" }}>
            <div
              style={{ borderLeft: "5px solid #342d7c", paddingLeft: "10px" }}
            >
              <p>Supplier</p>
              <h2>Levin Technologies</h2>
            </div>
            <div
              style={{
                marginLeft: "3vw",
                borderLeft: "5px solid #9a3ca9",
                paddingLeft: "10px",
              }}
            >
              <p>Status</p>
              <h2>Multiple PO</h2>
            </div>
            <div
              style={{
                marginLeft: "3vw",
                borderLeft: "5px solid black",
                paddingLeft: "10px",
              }}
            >
              <p>Potential PO</p>
              <h2>3</h2>
            </div>
          </div>
 
          <TabList
            defaultSelectedValue="tab3"
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
              value="tab3"
              className={themestate ? "tab dark drawer" : "tab"}
              style={{ border: "1px solid transparent" }}
            >
              Invoice
            </Tab>
            <Tab
              value="tab4"
              className={themestate ? "tab dark drawer" : "tab"}
              style={{ border: "1px solid transparent" }}
            >
              PO
            </Tab>
          <div style={{
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    fontSize: "17px",
    marginLeft: "auto",
    alignItems: "center",
    cursor:"pointer"
  }}>
         
          <ArrowDownload28Regular style={{ color: "#1281d7" }} onClick={handleViewInvoice} /> <span onClick={handleViewInvoice} > View Invoice</span>
          </div>
          </TabList>
         
        </div>
 
        {selectedtab === "tab3" && (
          <div className={styles.content1}>
           
           <div>
        <h2>Invoice Information</h2>
        <ul>
          {invoiceInfo.map((info, index) => (
            <li key={index}>
              <strong>{info.label}:</strong> {info.value}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Vendor/Supplier Information</h2>
        <ul>
          {vendorInfo.map((info, index) => (
            <li key={index}>
              <strong>{info.label}:</strong> {info.value}
            </li>
          ))}
        </ul>

        

        {/* Line Items */}
        <h2>Line Items</h2>
        
        <ul>
          {lineInfo.map((info, index) => (
            <li key={index}>
              <strong>{info.label}:</strong> {info.value}
            </li>
          ))}
        </ul>
        
      </div>
        </div>
          
          )}
 
        {selectedtab === "tab4" && (
          <div className={styles.content1}>
             <div><AiNav/></div>
             
             <div className={styles.example}>
        <Divider vertical style={{ height: "100%" }} />
      </div>
      <div style={{display:"flex",justifyContent:"flex-start",marginLeft:"-10em"}}>
  <ul>
    <li>PO Number: Unique identifier for the purchase order.</li>
    <li>PO Type: Type of PO (Standard, Blanket, Contract, Planned).</li>
    <li>Supplier Name and Number: Information on the supplier.</li>
    <li>Supplier Site: Specific supplier site linked to the PO.</li>
    <li>Buyer: Person responsible for the PO.</li>
    <li>Document Status: (Approved, In Process, Closed, Cancelled, etc.).</li>
    <li>Creation Date and Last Updated Date: Important timestamps.</li>
    <li>Currency: Currency in which the PO is made.</li>
    <li>Terms and Conditions: Standard terms like payment terms, freight, etc.</li>
    <li>Approval Information: Approver details and approval date.</li>
    <li>Total Amount: Total value of the PO (sum of all lines).</li>
    <li>Description: Description or comments about the purchase order.</li>
    <li>Line Number: Sequential line number within the PO.</li>
    <li>Item: Item being purchased, with description and item code.</li>
    <li>Category: Category of the item, used for classification.</li>
    <li>Quantity Ordered: Quantity of the item requested.</li>
    <li>Unit Price: Price per unit of the item.</li>
    <li>Amount: Line total (Quantity × Unit Price).</li>
    <li>Need-By Date: Date by which the goods/services are required.</li>
    <li>Promised Date: Supplier's promised delivery date.</li>
    <li>Tax Codes: Taxes associated with the item line.</li>
    <li>Price Breaks: If there are quantity-based price discounts.</li>
    <li>Destination Type: Whether the item is for Inventory, Expense, or a Shop Floor.</li>
    <li>Location: Delivery location or site for the item.</li>
  </ul>
</div>
 
              </div>
           
           
        )}
      </div>
    </div>
  );
};
 
export default AIDetailPage;