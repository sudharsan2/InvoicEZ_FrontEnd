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
 
const path = "/aidetail";
const path1 = "http://localhost:3000/";
 
const useStyles = makeStyles({
  root: {
    width: "77vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
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
  const [selectedtab, setSelectedTab] = React.useState("tab1");
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
            <div style={{ right: "5%", display: "flex", gap: "10px" }}>
              <Button>Review</Button>
              <Button
                className=" buttoncolor"
                style={{ backgroundColor: "#3570c3", color: "white" }}
              >
                Approve
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
            <h2>1. Supplier Header Information</h2>
            <ul>
              <li>
                <strong>Supplier Name:</strong> The legal name of the supplier.
              </li>
              <li>
                <strong>Supplier Number:</strong> Unique identifier assigned to
                the supplier.
              </li>
              <li>
                <strong>Supplier Type:</strong> Classification of the supplier
                (e.g., Individual, Corporation, etc.).
              </li>
              <li>
                <strong>Taxpayer ID / VAT Number:</strong> Supplier’s tax
                identification or VAT registration number.
              </li>
              <li>
                <strong>DUNS Number:</strong> Data Universal Numbering System
                identifier for the supplier.
              </li>
              <li>
                <strong>Creation Date:</strong> Date the supplier was created in
                the system.
              </li>
              <li>
                <strong>Last Update Date:</strong> Last modification date of
                supplier information.
              </li>
              <li>
                <strong>Status:</strong> Active, Inactive, or Suspended.
              </li>
              <li>
                <strong>Parent Supplier:</strong> If the supplier is part of a
                larger organization, the parent supplier is mentioned.
              </li>
              <li>
                <strong>Business Classification:</strong> E.g., Small Business,
                Minority-Owned Business, Women-Owned Business.
              </li>
              <li>
                <strong>Procurement BU:</strong> Procurement Business Unit
                associated with the supplier.
              </li>
              <li>
                <strong>Approval Status:</strong> Whether the supplier is
                approved or pending approval.
              </li>
              <li>
                <strong>Supplier Risk Level:</strong> Risk category assigned to
                the supplier (based on risk management).
              </li>
              <li>
                <strong>Supplier Management Contacts:</strong> Internal buyers
                or contacts responsible for managing the supplier relationship.
              </li>
            </ul>
 
            <h2>2. Supplier Sites (Addresses)</h2>
            <ul>
              <li>
                <strong>Site Code:</strong> Unique code representing the
                supplier site.
              </li>
              <li>
                <strong>Site Name:</strong> Name of the specific supplier
                location.
              </li>
              <li>
                <strong>Address:</strong> Full address (street, city, state,
                country, zip code).
              </li>
              <li>
                <strong>Site Type:</strong> Specifies the site’s role:
                Purchasing, Payment, or RFQ (Request for Quotation).
              </li>
              <li>
                <strong>Payment Terms:</strong> Default payment terms applicable
                to this site.
              </li>
              <li>
                <strong>Ship-To Location:</strong> Default shipping location for
                orders associated with this site.
              </li>
              <li>
                <strong>Bill-To Location:</strong> Billing address for this
                site.
              </li>
              <li>
                <strong>Primary Contact Information:</strong> Main contact
                person for the site (name, phone, email).
              </li>
              <li>
                <strong>Payment Method:</strong> Default method of payment
                (e.g., Check, EFT, Wire Transfer).
              </li>
              <li>
                <strong>Invoice Currency:</strong> Default currency for invoices
                associated with this site.
              </li>
              <li>
                <strong>Bank Account:</strong> Supplier’s bank account
                information (for EFT payments).
              </li>
              <li>
                <strong>Tax Reporting Site:</strong> Indicates whether the site
                is used for tax reporting.
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
 
export default AIDetailPage;
 
 