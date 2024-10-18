import { useEffect, useState } from "react";
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
import axios from "axios";
import { CgLayoutGrid } from "react-icons/cg";
import { ArrowDownload28Regular } from '@fluentui/react-icons';
/*eslint-disabled*/

const path = "/approve";
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
    flex: 1,
    overflowY: "auto",
    paddingTop: "3vh",
    padding: "0 20px",
    maxHeight: "48vh",
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

const ApprovePage = () => {
  const styles = useStyles();
  const themestate = false;
  const [fetchedItems, setFetchedItems] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { poNumber } = location.state || {}
  console.log("765", poNumber)
  const [poDate, setPoDate] = useState();
  const [postatus, setPoStatus] = useState();
  const [buyer, setBuyer] = useState();
  const [total, setTotal] = useState();
  const [status, setStatus] = useState();
  const[supplier,setSupplier]=useState();
  const [vendor, setVendor] = useState();
  const [customer, setCustomer] = useState();
  const [invoiceid, setInvoiceId] = useState();
  const [invoicedate, setInvoiceDate] = useState();
  const [invoicetot, setInvoicetot] = useState();
  const [closedcode,setClosedCode] = useState();

  // console.log("vendor", setVendor);


  const [selectedtab, setSelectedTab] = React.useState("tab1");
  const purchaseOrder = {
    poNumber: poNumber,
    // poDate: "09 May 2023",
    poTotalAmount: "95090",
    poCurrency: "INR",
    poStatus: "Open",
    lineMatching: "FULL / Partial Line Items",
    // vendorAddress: "VendorAddress",
    customerAddress: "CustomerAddress",
    // invoiceId: "InvoiceId",
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
  // console.log("data", data);

  


  const handleTabSelect2 = (event, data) => {
    // console.log({"currentmonth":currentMonthEmployees})
    setSelectedTab(data.value);
  };


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



  const handleViewInvoice = async () => {
    try {
      const response = await fetch(`http://10.10.15.15:5719/user/invoices-file/${invoiceid}`);
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
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://10.10.15.15:5719/user/po-details/${poNumber}/`
        );
        const fetchedItems = response.data;

       

        
        const normalizedPoLineItems = fetchedItems.po_lineitems.map(poItem => {
          const matchingInvoiceItem = fetchedItems.invoice_info.items.find(
            invoiceItem => invoiceItem.Quantity
          );

          // console.log("cc", matchingInvoiceItem)

          return {
            id: poItem.id,
            item_name: poItem.item_name,
            item_description: poItem.item_description,
            quantity: poItem.quantity,
            // Quantity: poItem.Quantity,
            unit_price: poItem.unit_price,
            Quantity: matchingInvoiceItem ? matchingInvoiceItem.Quantity : null, // Set final_po_quantity if match found
          };
        });

        // Log or process the combined data as needed
        console.log(normalizedPoLineItems);

        setData(normalizedPoLineItems);
        setTotal(fetchedItems.po_header.total_amount);
        setPoDate(fetchedItems.po_lineitems[0]?.promised_date || "N/A"); // Assuming the first date is used
        setPoStatus(fetchedItems.po_header.po_status);
        setVendor(fetchedItems.invoice_info.VendorAddress);
        setCustomer(fetchedItems.invoice_info.CustomerAddress);
        setInvoiceId(fetchedItems.invoice_info.InvoiceId);
        setInvoiceDate(fetchedItems.invoice_info.InvoiceDate);
        setInvoicetot(fetchedItems.invoice_info.InvoiceTotal);
        setSupplier(fetchedItems.po_header.supplier_name);
        fetchedItems.po_lineitems.forEach((item) => {
          
          setClosedCode(item.closed_code);
          
        });
        // vendor address
        const vendorAddressObj = fetchedItems.invoice_info.VendorAddress;
        console.log("obj1",vendorAddressObj)

if (vendorAddressObj) {
   
    const formattedVendorAddress = `
        ${vendorAddressObj.street_address || ''} 
        ${vendorAddressObj.city || ''}, 
        ${vendorAddressObj.postal_code || ''}, 
        ${vendorAddressObj.country_region || ''}
    `
    .trim() 
    .replace(/\s+/g, ' ') 
    .replace(/,$/, ''); 

   
    setVendor(formattedVendorAddress);
   
} else {
  setVendor();
    console.error('VendorAddress is missing');
}
     
const vendorCustomerObj = fetchedItems.invoice_info.CustomerAddress;
        console.log("obj",vendorAddressObj)

if (vendorCustomerObj) {
   
    const formattedCustomerAddress = `
        ${vendorAddressObj.street_address || ''} 
        ${vendorAddressObj.city || ''}, 
        ${vendorAddressObj.postal_code || ''}, 
        ${vendorAddressObj.country_region || ''}
    `
    .trim()
    .replace(/\s+/g, ' ') 
    .replace(/,$/, ''); 

   
    setVendor(formattedCustomerAddress);
    console.log(formattedCustomerAddress); 
} else {
  setVendor();
    console.error('CustomerAddress is missing');
}
     



      } catch (error) {
        setError("Error fetching data. Please try again.");
        console.error("Error fetching data:", error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    if (poNumber) {
      fetchData();
    }
  }, [poNumber]);

  // Sorting function for the table
  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortState.sortColumn];
    const bValue = b[sortState.sortColumn];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortState.sortDirection === "ascending"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortState.sortDirection === "ascending" ? aValue - bValue : bValue - aValue;
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
            <BreadcrumbButton href={path}>Approve</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton href={path}>PO:13466</BreadcrumbButton>
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
            PO:{purchaseOrder.poNumber}
          </h2>

          <div style={{ display: "flex", marginBottom: "20px" }}>
            <div
              style={{ borderLeft: "5px solid #342d7c", paddingLeft: "10px" }}
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
              <h2>{closedcode}</h2>
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
            {/* <Tab
              value="tab3"
              className={themestate ? "tab dark drawer" : "tab"}
              style={{ border: "1px solid transparent" }}
            >
              PO
            </Tab>
            <Tab
              value="tab4"
              className={themestate ? "tab dark drawer" : "tab"}
              style={{ border: "1px solid transparent" }}
            >
              Supplier
            </Tab> */}
            <div style={{
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    fontSize: "17px",
    marginLeft: "auto", 
    alignItems: "center",
    cursor:"pointer" 
  }}>
          
          <ArrowDownload28Regular style={{ color: "#1281d7" }} onClick={handleViewInvoice}/> <span onClick={handleViewInvoice} > View Invoice</span>
          </div>
          </TabList>
        </div>
        {selectedtab === "tab1" && (
          <div className={styles.content1}>
            <div className={`${styles.container} ${styles.gridTemplate1}`}>
              <div className={`${styles.section} ${styles.poNumber}`}>
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
                  {/* {purchaseOrder.poNumber} */}
                  {poNumber}
                </div>
              </div>

              <div className={`${styles.section} ${styles.vendorAddress}`}>
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
                  {/* {purchaseOrder.vendorAddress} */}
                  {vendor}
                  
                  {/* {formattedVendorAddress} */}

                </div>
              </div>

              <div className={`${styles.section} ${styles.poDate}`}>
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
                  {/* {purchaseOrder.poDate} */}
                  {poDate}
                </div>
              </div>

              <div className={`${styles.section} ${styles.customerAddress}`}>
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
                  {/* {purchaseOrder.customerAddress} */}
                  {customer}
                </div>
              </div>

              <div className={`${styles.section} ${styles.poTotalAmount}`}>
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

              <div className={`${styles.section} ${styles.invoiceId}`}>
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
                  {/* {purchaseOrder.invoiceId} */}
                  {invoiceid}
                </div>
              </div>

              <div className={`${styles.section} ${styles.poCurrency}`}>
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
              <div className={`${styles.section} ${styles.invoiceDate}`}>
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
                  {/* {purchaseOrder.invoiceDate} */}
                  {invoicedate}
                </div>
              </div>

              <div className={`${styles.section} ${styles.poStatus}`}>
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

              <div className={`${styles.section} ${styles.invoiceTotal}`}>
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
                  {/* {purchaseOrder.invoiceTotal} */}
                  {invoicetot}
                </div>
              </div>

              <div className={`${styles.section} ${styles.lineMatching}`}>
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
                  {closedcode}
                </div>
              </div>

              <div className={`${styles.section} ${styles.invoiceCurrency}`}>
                <div
                  className={styles.heading}
                  style={{
                    fontWeight: "bold",
                    color: themestate ? "white" : "",
                  }}
                >
                  Invoice Currency:
                </div>
                <div
                  className={styles.content}
                  style={{ color: themestate ? "rgb(245,245,245)" : "" }}
                >
                  {purchaseOrder.invoiceCurrency}
                </div>
              </div>

              <div
                className={`${styles.section} ${styles.purchaseOrderNumber}`}
              >
                <div
                  className={styles.heading}
                  style={{
                    fontWeight: "bold",
                    color: themestate ? "white" : "",
                  }}
                >
                  Purchase Order Number in Invoice:
                </div>
                <div
                  className={styles.content}
                  style={{ color: themestate ? "rgb(245,245,245)" : "" }}
                >
                  {purchaseOrder.purchaseOrderNumberInInvoice}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedtab === "tab2" && (
          <div className={styles.content2}>
            <Table>
              <TableHeader
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: themestate ? "#383838" : "white", // background to ensure it's visible
                  zIndex: 1, // to ensure it stays above the content
                  color: themestate ? "white" : "black",
                }}
              >
                <TableRow
                  style={
                    themestate
                      ? { color: "white", borderBottomColor: "#383838" }
                      : {}
                  }
                >
                  {/* Update the header labels */}
                  <TableHeaderCell
                    style={{ fontWeight: "bold", cursor: "pointer" }}
                    {...headerSortProps("PO_line_id")}
                  >
                    PO Line ID
                  </TableHeaderCell>
                  <TableHeaderCell
                    style={{ fontWeight: "bold", cursor: "pointer" }}
                    {...headerSortProps("name")}
                  >
                    Name
                  </TableHeaderCell>
                  <TableHeaderCell
                    style={{ fontWeight: "bold", cursor: "pointer" }}
                    {...headerSortProps("description")}
                  >
                    Description
                  </TableHeaderCell>
                  <TableHeaderCell
                    style={{ fontWeight: "bold", cursor: "pointer" }}
                    {...headerSortProps("invoice_item_name")}
                  >
                    Invc Item Name
                  </TableHeaderCell>
                  <TableHeaderCell
                    style={{ fontWeight: "bold", cursor: "pointer" }}
                    {...headerSortProps("unit_price")}
                  >
                    Unit Price
                  </TableHeaderCell>
                  <TableHeaderCell
                    style={{ fontWeight: "bold", cursor: "pointer" }}
                    {...headerSortProps("quantity")}
                  >
                    Quantity
                  </TableHeaderCell>
                  <TableHeaderCell
                    style={{ fontWeight: "bold", cursor: "pointer" }}
                    {...headerSortProps("invoice_quantity")}
                  >
                    Invoice Quantity
                  </TableHeaderCell>
                  {/* <TableHeaderCell
                    style={{ fontWeight: "bold", cursor: "pointer" }}
                    {...headerSortProps("final_po_quantity")}
                  >
                    Final PO Quantity
                  </TableHeaderCell> */}
                </TableRow>
              </TableHeader>

              <TableBody style={themestate ? { color: "white" } : {}}>
                {sortedData.map((item) => (

                  <TableRow
                    key={item.id}
                    style={themestate ? { color: "white" } : {}}
                    className={themestate ? "hovereffect dark" : "hovereffect"}


                  >
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.item_name}</TableCell>
                    <TableCell>{item.item_description}</TableCell>
                    <TableCell>{item.item_name}</TableCell>
                    <TableCell>{item.unit_price}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.Quantity}</TableCell>
                    <TableCell>{item.final_po_quantity}</TableCell>
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </div>
        )}


      </div>
    </div>
  );
};

export default ApprovePage;

