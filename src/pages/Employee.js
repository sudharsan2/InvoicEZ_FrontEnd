import React,{ useState } from "react";

import {
  makeStyles,
  Button,
  Link,
  Breadcrumb,
  BreadcrumbItem,
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
} from "@fluentui/react-components";
import line_data from './data_approve'
 
const useStyles = makeStyles({
  root: {
    width: '77vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: '20px',
  },
  content1: {
    flex: 1,
    overflowY: 'auto',
    paddingTop:'3vh',
    padding: '0 20px',
    maxHeight:'48vh',
    
  },
  content2: {
    width:'77vw',
    overflowY: 'auto',
    paddingTop:'3vh',
    padding: '0 20px',
    maxHeight:'48vh',
    
  },
  controls: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
  },
  container: {
    display: 'grid',
    gap: '15px',
    fontFamily: 'Arial, sans-serif',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginLeft: '0vw',
  },
  section2: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginLeft: '7vw',
  },
  gridTemplate1: {
    gridTemplateColumns: '1fr 1fr',
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
    fontWeight: 'bold',
  },
  content: {
    fontSize: '13px',
    marginLeft: '10px'
  },
});

const PurchaseOrderPage = () => {
  const styles = useStyles();
  const themestate = false;
  const [selectedtab, setSelectedTab] = React.useState('tab1');
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
    sortDirection: 'ascending',
    sortColumn: 'empid',
  });



  const handleTabSelect2 = (event,data) => {
    
    setSelectedTab(data.value);
  };


  const [data] = useState(line_data);

  const tabclassName=themestate ? "tab dark drawer" : "tab";
  const tabStyle = { border: '1px solid transparent' };
  const tabStyle1 = { fontWeight: 'bold', color: themestate ? "white" : "" };
  const tabStyle2 = { color: themestate ? "rgb(245,245,245)" : "" };
  const tabstyle3 =   {
    position: 'sticky',
    top: 0,
    backgroundColor: themestate ? '#383838' : 'white', // background to ensure it's visible
    zIndex: 1, // to ensure it stays above the content
    color: themestate ? 'white' : 'black',
  };
  const tabstyle4 = themestate ? { color: 'white' } : {};
  const tabstyle5 = themestate ? "hovereffect dark" : "hovereffect"
  
  
  const columns = [
    createTableColumn({
      columnId: 'PO_line_id',
      compare: (a, b) => a.PO_line_id - b.PO_line_id,
    }),
    createTableColumn({
      columnId: 'name',
      compare: (a, b) => a.name.localeCompare(b.name),
    }),
    createTableColumn({
      columnId: 'description',
      compare: (a, b) => a.description.localeCompare(b.description),
    }),
    createTableColumn({
      columnId: 'invoice_item_name',
      compare: (a, b) => a.invoice_item_name.localeCompare(b.invoice_item_name),
    }),
    createTableColumn({
      columnId: 'unit_price',
      compare: (a, b) => a.unit_price - b.unit_price,
    }),
    createTableColumn({
      columnId: 'quantity',
      compare: (a, b) => a.quantity - b.quantity,
    }),
    createTableColumn({
      columnId: 'invoice_quantity',
      compare: (a, b) => a.invoice_quantity - b.invoice_quantity,
    }),
    createTableColumn({
      columnId: 'final_po_quantity',
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
    ]
  );
  
  const headerSortProps = (columnId) => ({
    onClick: (e) => toggleColumnSort(e, columnId),
    sortDirection: getSortDirection(columnId),
  });
  
  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortState.sortColumn];
    const bValue = b[sortState.sortColumn];
  
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortState.sortDirection === 'ascending'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
  
    return sortState.sortDirection === 'ascending' ? aValue - bValue : bValue - aValue;
  });
  



  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: '0px' }}>
          <Breadcrumb aria-label="breadcrumb">
            <BreadcrumbItem>
              <Link href="" className="custom-link">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <Link href="" className="custom-link">Approve</Link>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <Link href="" className="custom-link">PO: {purchaseOrder.poNumber}</Link>
            </BreadcrumbItem>
          </Breadcrumb>

          <div style={{ right: '5%', display: 'flex', gap: '10px' }}>
            <Button>Review</Button>
            <Button  className= ' buttoncolor' style={{backgroundColor:'#3570c3', color:'white'}}>Approve</Button>
          </div>
        </div>

        <h2 style={{ margin: '20px 0 20px 0' }}>PO:{purchaseOrder.poNumber}</h2>

        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <div style={{ borderLeft: '5px solid #342d7c', paddingLeft: '10px' }}>
            <p>Supplier</p>
            <h2>Levin Technologies</h2>
          </div>
          <div style={{ marginLeft: '3vw', borderLeft: '5px solid #9a3ca9', paddingLeft: '10px' }}>
            <p>Invoice Matching</p>
            <h2>PO</h2>
          </div>
          <div style={{ marginLeft: '3vw', borderLeft: '5px solid black', paddingLeft: '10px' }}>
            <p>Line Matching</p>
            <h2>Full</h2>
          </div>
        </div>

        <TabList
          defaultSelectedValue='tab1'
          appearance="subtle"
          onTabSelect={handleTabSelect2}
          style={{ marginLeft: "0vw", marginTop: "0vh", paddingBottom:'2vh',borderBottom: "1px solid rgb(200,200,200)"}}
        >
          <Tab value="tab1" className={tabclassName} style={tabStyle}>Header</Tab>
          <Tab value="tab2" className={tabclassName} style={tabStyle}>Line Item</Tab>
          <Tab value="tab3" className={tabclassName} style={tabStyle}>PO</Tab>
          <Tab value="tab4" className={tabclassName} style={tabStyle}>Supplier</Tab>
        </TabList>
      </div>

      { selectedtab=== 'tab1' && <div className={styles.content1} >
        <div className={`${styles.container} ${styles.gridTemplate1}`}>
          <div className={`${styles.section} ${styles.poNumber}`}>
            <div className={styles.heading} style={tabStyle1}>PO Number:</div>
            <div className={styles.content} style={tabStyle2}>{purchaseOrder.poNumber}</div>
          </div>

          <div className={`${styles.section} ${styles.vendorAddress}`}>
            <div className={styles.heading} style={tabStyle1}>Vendor Address:</div>
            <div className={styles.content} style={tabStyle2}>{purchaseOrder.vendorAddress}</div>
          </div>

          <div className={`${styles.section} ${styles.poDate}`}>
            <div className={styles.heading} style={tabStyle1}>PO Date:</div>
            <div className={styles.content} style={tabStyle2}>{purchaseOrder.poDate}</div>
          </div>

          <div className={`${styles.section} ${styles.customerAddress}`}>
            <div className={styles.heading} style={tabStyle1}>Customer Address:</div>
            <div className={styles.content} style={tabStyle2}>{purchaseOrder.customerAddress}</div>
          </div>

          <div className={`${styles.section} ${styles.poTotalAmount}`}>
            <div className={styles.heading} style={tabStyle1}>PO Total Amount:</div>
            <div className={styles.content} style={tabStyle2}>{purchaseOrder.poTotalAmount}</div>
          </div>

          <div className={`${styles.section} ${styles.invoiceId}`}>
            <div className={styles.heading} style={tabStyle1}>Invoice ID:</div>
            <div className={styles.content} style={tabStyle2}>{purchaseOrder.invoiceId}</div>
          </div>

          <div className={`${styles.section} ${styles.poCurrency}`}>
            <div className={styles.heading} style={tabStyle1}>PO Currency:</div>
            <div className={styles.content} style={tabStyle2}>{purchaseOrder.poCurrency}</div>
          </div>
          <div className={`${styles.section} ${styles.invoiceDate}`}>
            <div className={styles.heading} style={tabStyle1}>Invoice Date:</div>
            <div className={styles.content} style={tabStyle2}>{purchaseOrder.invoiceDate}</div>
          </div>

          <div className={`${styles.section} ${styles.poStatus}`}>
            <div className={styles.heading} style={tabStyle1}>PO Status:</div>
            <div className={styles.content} style={tabStyle2}>{purchaseOrder.poStatus}</div>
          </div>

          <div className={`${styles.section} ${styles.invoiceTotal}`}>
            <div className={styles.heading} style={tabStyle1}>Invoice Total:</div>
            <div className={styles.content} style={tabStyle2}>{purchaseOrder.invoiceTotal}</div>
          </div>

          <div className={`${styles.section} ${styles.lineMatching}`}>
            <div className={styles.heading} style={tabStyle1}>Line Matching:</div>
            <div className={styles.content} style={tabStyle2}>{purchaseOrder.lineMatching}</div>
          </div>


          <div className={`${styles.section} ${styles.invoiceCurrency}`}>
            <div className={styles.heading} style={tabStyle1}>Invoice Currency:</div>
            <div className={styles.content} style={tabStyle2}>{purchaseOrder.invoiceCurrency}</div>
          </div>

          <div className={`${styles.section} ${styles.purchaseOrderNumber}`}>
            <div className={styles.heading} style={tabStyle1}>Purchase Order Number in Invoice:</div>
            <div className={styles.content} style={tabStyle2}>{purchaseOrder.purchaseOrderNumberInInvoice}</div>
          </div>
        </div>
      </div>}

      {selectedtab === 'tab2' && (
        <div className={styles.content2}>
        <Table>
  <TableHeader
    style={tabstyle3}
  >
    <TableRow style={themestate ? { color: 'white', borderBottomColor: '#383838' } : {}}>
      {/* Update the header labels */}
      <TableHeaderCell style={{ fontWeight: 'bold', cursor: 'pointer' }} {...headerSortProps('PO_line_id')}>
        PO Line ID
      </TableHeaderCell>
      <TableHeaderCell style={{ fontWeight: 'bold', cursor: 'pointer' }} {...headerSortProps('name')}>
        Name
      </TableHeaderCell>
      <TableHeaderCell style={{ fontWeight: 'bold', cursor: 'pointer' }} {...headerSortProps('description')}>
        Description
      </TableHeaderCell>
      <TableHeaderCell style={{ fontWeight: 'bold', cursor: 'pointer' }} {...headerSortProps('invoice_item_name')}>
        Invc Item Name
      </TableHeaderCell>
      <TableHeaderCell style={{ fontWeight: 'bold', cursor: 'pointer' }} {...headerSortProps('unit_price')}>
        Unit Price
      </TableHeaderCell>
      <TableHeaderCell style={{ fontWeight: 'bold', cursor: 'pointer' }} {...headerSortProps('quantity')}>
        Quantity
      </TableHeaderCell>
      <TableHeaderCell style={{ fontWeight: 'bold', cursor: 'pointer' }} {...headerSortProps('invoice_quantity')}>
        Invoice Quantity
      </TableHeaderCell>
      <TableHeaderCell style={{ fontWeight: 'bold', cursor: 'pointer' }} {...headerSortProps('final_po_quantity')}>
        Final PO Quantity
      </TableHeaderCell>
    </TableRow>
  </TableHeader>

  <TableBody>
    {sortedData.map((item) => (
      <TableRow
        key={item.PO_line_id}
        style={tabstyle4}
        className={tabstyle5}
      >
        {/* Map the updated fields to the corresponding cells */}
        <TableCell>{item.PO_line_id}</TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.description}</TableCell>
        <TableCell>{item.invoice_item_name}</TableCell>
        <TableCell>{item.unit_price}</TableCell>
        <TableCell>{item.quantity}</TableCell>
        <TableCell>{item.invoice_quantity}</TableCell>
        <TableCell>{item.final_po_quantity}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

        </div>
      )}

      {selectedtab === 'tab3' &&

<div className={styles.content1}>
<h2>Purchase Order Details</h2>
<ul>
  <li><strong>PO Number:</strong> Unique identifier for the purchase order.</li>
  <li><strong>PO Type:</strong> Type of PO (Standard, Blanket, Contract, Planned).</li>
  <li><strong>Supplier Name and Number:</strong> Information on the supplier.</li>
  <li><strong>Supplier Site:</strong> Specific supplier site linked to the PO.</li>
  <li><strong>Buyer:</strong> Person responsible for the PO.</li>
  <li><strong>Document Status:</strong> (Approved, In Process, Closed, Cancelled, etc.).</li>
  <li><strong>Creation Date and Last Updated Date:</strong> Important timestamps.</li>
  <li><strong>Currency:</strong> Currency in which the PO is made.</li>
  <li><strong>Terms and Conditions:</strong> Standard terms like payment terms, freight, etc.</li>
  <li><strong>Approval Information:</strong> Approver details and approval date.</li>
  <li><strong>Total Amount:</strong> Total value of the PO (sum of all lines).</li>
  <li><strong>Description:</strong> Description or comments about the purchase order.</li>
</ul>

<h2>Line Item Details</h2>
<ul>
  <li><strong>Line Number:</strong> Sequential line number within the PO.</li>
  <li><strong>Item:</strong> Item being purchased, with description and item code.</li>
  <li><strong>Category:</strong> Category of the item, used for classification.</li>
  <li><strong>Quantity Ordered:</strong> Quantity of the item requested.</li>
  <li><strong>Unit Price:</strong> Price per unit of the item.</li>
  <li><strong>Amount:</strong> Line total (Quantity × Unit Price).</li>
  <li><strong>Need-By Date:</strong> Date by which the goods/services are required.</li>
  <li><strong>Promised Date:</strong> Supplier's promised delivery date.</li>
  <li><strong>Tax Codes:</strong> Taxes associated with the item line.</li>
  <li><strong>Price Breaks:</strong> If there are quantity-based price discounts.</li>
  <li><strong>Destination Type:</strong> Whether the item is for Inventory, Expense, or a Shop Floor.</li>
  <li><strong>Location:</strong> Delivery location or site for the item.</li>
</ul>
</div>

      }

{selectedtab === 'tab4'  &&  


    <div className={styles.content1}>
      <h2>1. Supplier Header Information</h2>
      <ul>
        <li><strong>Supplier Name:</strong> The legal name of the supplier.</li>
        <li><strong>Supplier Number:</strong> Unique identifier assigned to the supplier.</li>
        <li><strong>Supplier Type:</strong> Classification of the supplier (e.g., Individual, Corporation, etc.).</li>
        <li><strong>Taxpayer ID / VAT Number:</strong> Supplier’s tax identification or VAT registration number.</li>
        <li><strong>DUNS Number:</strong> Data Universal Numbering System identifier for the supplier.</li>
        <li><strong>Creation Date:</strong> Date the supplier was created in the system.</li>
        <li><strong>Last Update Date:</strong> Last modification date of supplier information.</li>
        <li><strong>Status:</strong> Active, Inactive, or Suspended.</li>
        <li><strong>Parent Supplier:</strong> If the supplier is part of a larger organization, the parent supplier is mentioned.</li>
        <li><strong>Business Classification:</strong> E.g., Small Business, Minority-Owned Business, Women-Owned Business.</li>
        <li><strong>Procurement BU:</strong> Procurement Business Unit associated with the supplier.</li>
        <li><strong>Approval Status:</strong> Whether the supplier is approved or pending approval.</li>
        <li><strong>Supplier Risk Level:</strong> Risk category assigned to the supplier (based on risk management).</li>
        <li><strong>Supplier Management Contacts:</strong> Internal buyers or contacts responsible for managing the supplier relationship.</li>
      </ul>

      <h2>2. Supplier Sites (Addresses)</h2>
      <ul>
        <li><strong>Site Code:</strong> Unique code representing the supplier site.</li>
        <li><strong>Site Name:</strong> Name of the specific supplier location.</li>
        <li><strong>Address:</strong> Full address (street, city, state, country, zip code).</li>
        <li><strong>Site Type:</strong> Specifies the site’s role: Purchasing, Payment, or RFQ (Request for Quotation).</li>
        <li><strong>Payment Terms:</strong> Default payment terms applicable to this site.</li>
        <li><strong>Ship-To Location:</strong> Default shipping location for orders associated with this site.</li>
        <li><strong>Bill-To Location:</strong> Billing address for this site.</li>
        <li><strong>Primary Contact Information:</strong> Main contact person for the site (name, phone, email).</li>
        <li><strong>Payment Method:</strong> Default method of payment (e.g., Check, EFT, Wire Transfer).</li>
        <li><strong>Invoice Currency:</strong> Default currency for invoices associated with this site.</li>
        <li><strong>Bank Account:</strong> Supplier’s bank account information (for EFT payments).</li>
        <li><strong>Tax Reporting Site:</strong> Indicates whether the site is used for tax reporting.</li>
      </ul>
    </div>

}

    </div>
  );
};

export default PurchaseOrderPage;