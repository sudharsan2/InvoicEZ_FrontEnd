import { useState } from "react";
import React from "react";
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
import { useLocation } from "react-router-dom";
import AiNav from "../components/ainavbar";
import { SettingOutlined } from '@ant-design/icons';
import { Cascader, Input, Select, Space } from 'antd';
import {tokens, Divider } from "@fluentui/react-components";
const { Option } = Select;
const path = "/aidetail";
const path1 = "http://localhost:3000/";
const selectAfter = (
  <Select defaultValue="">
    <Option value="PO1822">PO1822</Option>
    <Option value="PO1823">PO1823</Option>
    <Option value="PO1824">PO1824</Option>
    <Option value="PO1825">PO1825</Option>
  </Select>
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
  const styles = useStyles();
  const themestate = false;
  const [selectedtab, setSelectedTab] = React.useState("tab3");
  const location = useLocation();
  const { poNumber } = location.state || {}
  console.log("765", poNumber)
  const purchaseOrder = {
    poNumber: "13466",
    poDate: "09 May 2023",
    poTotalAmount: "95090",
    poCurrency: "INR",
    poStatus: "Open",
    lineMatching: "FULL / Partial Line Items",
    vendorAddress: "VendorAddress",
    customerAddress: "CustomerAddress",
    invoiceId: "InvoiceId",
    invoiceDate: "InvoiceDate",
    invoiceTotal: "InvoiceTotal",
    invoiceCurrency: "Invoice Currency",
    purchaseOrderNumberInInvoice: "PurchaseOrder Number in Invoice",
  };
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
          <BreadcrumbItem>
            <BreadcrumbButton href={path}>{ poNumber }</BreadcrumbButton>
          </BreadcrumbItem>
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
            }}
          >
            <div style={{ right: "5%", display: "flex", gap: "10px" ,flexDirection:"column"}}>
             
              <Input  addonAfter={selectAfter} defaultValue="Select or Enter PO" />
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
            PO:{poNumber}
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
          </TabList>
        </div>
 
        {selectedtab === "tab3" && (
          <div className={styles.content1}>
           
            <div>
            <h2>Invoice Information</h2>
            <ul>
              <li>
                <strong>Invoice Number:</strong> 
              </li>
              <li>
                <strong>Invoice Date</strong> 
              </li>
              <li>
                <strong>Invoice Due Date</strong> 
                
              </li>
              <li>
                <strong>Invoice Total Amount</strong> 
              </li>
              <li>
                <strong>Tax Amount</strong>
              </li>
              <li>
                <strong>Currency</strong> 
              </li>
             
            </ul>
            </div>
            <div>
            <h2>Vendor/Supplier information</h2>
            <ul>
              <li>
                <strong>Vendor Name:</strong> 
              </li>
              <li>
                <strong>Vendor Address:</strong> 
              </li>
              <li>
                <strong>Vendor Contact Information:</strong> 
              </li>
              <li>
                <strong>Vendor Tax ID</strong> 
              </li>
              <h2>Line Items</h2>
              <li>
                <strong>Item Service Description:</strong>
              </li>
              <li>
                <strong>Quantity:</strong> 
              </li>
              <li>
                <strong>Unit Price</strong> 
              </li>
              <li>
                <strong>Line Item Total:</strong> 
              </li>
              <li>
                <strong>Discounts</strong> 
              </li>
              <li>
                <strong>Items/Service</strong> 
              </li>
              
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
 
 