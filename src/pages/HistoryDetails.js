import React, { useEffect, useState } from "react";

import {
  ArrowSortUpFilled,
  ArrowSortDownRegular,
  ArrowDownload28Regular,
} from "@fluentui/react-icons";
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
  Divider,
} from "@fluentui/react-components";
import { useLocation } from "react-router-dom";
import axios from "axios";

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

const HistoryDetails = () => {
  const styles = useStyles();
  const themestate = false;
  const location = useLocation();
  // const { poNumber, Id } = location.state || {};
  const query = new URLSearchParams(useLocation().search);
  const poNumber = query.get("poNumber");
  const Id = query.get("Id");
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
  const [selectedtab, setSelectedTab] = React.useState("tab1");
  const [inv_id, setInv_id] = useState();
  const [data, setData] = useState("");

  // ---Styles---
  const classStyle = themestate ? "tab dark drawer" : "tab";
  const divStyle = themestate ? "white" : "";
  const divStyles = themestate ? "hovereffect dark" : "hovereffect";
  const bodyStyle = themestate ? { color: "white" } : {};
  const outerStyle = { color: themestate ? "rgb(245,245,245)" : "" };
  const backStyle = themestate ? "#383838" : "white";
  const colorStyle = themestate ? "white" : "black";
  const newStyle = themestate
    ? { color: "white", borderBottomColor: "#383838" }
    : {};

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
  const [entrytime, setEntrytime] = useState();

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
        },
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
          },
        );

        const fetchedItems = response.data;

        setDataAndAddress(fetchedItems);
        setInvoiceDetails(fetchedItems);
        setPoLineItems(fetchedItems);
      } catch (error) {
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

  const setDataAndAddress = (fetchedItems) => {
    setVendor(formatAddress(fetchedItems.invoice_info.VendorAddress));
    setCustomer(formatAddress(fetchedItems.invoice_info.ShippingAddress));
  };

  const formatAddress = (address) => {
    if (!address) return "NULL";

    const formattedAddress = `
      ${address.street_address || ""}
      ${address.city || ""},
      ${address.postal_code || ""},
      ${address.country_region || ""}
    `
      .trim()
      .replace(/\s+/g, " ")
      .replace(/,$/, "");

    return formattedAddress;
  };

  const setInvoiceDetails = (fetchedItems) => {
    setInvoiceId(fetchedItems.invoice_info.InvoiceId);
    setInvoiceDate(fetchedItems.invoice_info.InvoiceDate);
    setInvoicetot(fetchedItems.invoice_info.InvoiceTotal);
    setSupplier(fetchedItems.po_header.supplier_name);
    setEntrytime(fetchedItems.invoice_info.created_at);
    setTotal(fetchedItems.po_header.total_amount);
    setPoDate(fetchedItems.po_lineitems[0]?.promised_date || "N/A");
    setPoStatus(fetchedItems.po_header.po_status);
    setInv_id(fetchedItems.invoice_info.id);
    fetchedItems.po_lineitems.forEach((item) =>
      setClosedCode(item.closed_code),
    );
  };

  const setPoLineItems = (fetchedItems) => {
    const invoice_items = mapInvoiceItems(fetchedItems.invoice_info.items);
    const normalizedPoLineItems = fetchedItems.po_lineitems.map(
      (poItem, index) => {
        return normalizePoLineItem(poItem, invoice_items, index);
      },
    );

    setData(normalizedPoLineItems);
  };

  const mapInvoiceItems = (items) => {
    return items.map((item, index) => {
      return {
        Igst: item.Igst,
        Cgst: item.Cgst,
        Sgst: item.Sgst,
        index: index,
      };
    });
  };

  // Helper function to normalize PO line items
  const normalizePoLineItem = (poItem, invoiceItems, index) => {
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
      Igst: matchingInvoiceItem ? matchingInvoiceItem.Igst : null,
      Cgst: matchingInvoiceItem ? matchingInvoiceItem.Cgst : null,
      Sgst: matchingInvoiceItem ? matchingInvoiceItem.Sgst : null,
    };
  };

  const TableHeaderCellWithSort = ({
    column,
    label,
    sortedColumn,
    sortDirection,
    headerSortProps,
  }) => (
    <TableHeaderCell {...headerSortProps(column)}>
      {label}
      {sortedColumn === column &&
        (sortDirection === "asc" ? (
          <ArrowSortDownRegular />
        ) : (
          <ArrowSortUpFilled />
        ))}
    </TableHeaderCell>
  );

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
  const [sortDirection, setSortDirection] = useState("asc");

  const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);
  const compareNumeric = (aValue, bValue) => {
    const aNumeric = parseFloat(aValue);
    const bNumeric = parseFloat(bValue);
    return sortDirection === "asc" ? aNumeric - bNumeric : bNumeric - aNumeric;
  };

  const compareStrings = (aValue, bValue) => {
    const aString = String(aValue).toLowerCase();
    const bString = String(bValue).toLowerCase();
    return sortDirection === "asc"
      ? aString.localeCompare(bString)
      : bString.localeCompare(aString);
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
                <div
                  style={{ right: "5%", display: "flex", gap: "10px" }}
                ></div>
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
                        color: { divStyle },
                      }}
                    >
                      PO Number:
                    </div>
                    <div className={styles.content} style={outerStyle}>
                      {poNumber}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: { divStyle },
                      }}
                    >
                      Vendor Address:
                    </div>
                    <div className={styles.content} style={outerStyle}>
                      {vendor}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: { divStyle },
                      }}
                    >
                      PO Date:
                    </div>
                    <div className={styles.content} style={outerStyle}>
                      {poDate}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: { divStyle },
                      }}
                    >
                      Customer Address:
                    </div>
                    <div className={styles.content} style={outerStyle}>
                      {customer}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: { divStyle },
                      }}
                    >
                      PO Total Amount:
                    </div>
                    <div className={styles.content} style={outerStyle}>
                      {total}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: { divStyle },
                      }}
                    >
                      Invoice ID:
                    </div>
                    <div className={styles.content} style={outerStyle}>
                      {invoiceid}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: { divStyle },
                      }}
                    >
                      PO Currency:
                    </div>
                    <div className={styles.content} style={outerStyle}>
                      {purchaseOrder.poCurrency}
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: { divStyle },
                      }}
                    >
                      Invoice Date:
                    </div>
                    <div className={styles.content} style={outerStyle}>
                      {invoicedate}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: { divStyle },
                      }}
                    >
                      PO Status:
                    </div>
                    <div className={styles.content} style={outerStyle}>
                      {postatus}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: { divStyle },
                      }}
                    >
                      Invoice Total:
                    </div>
                    <div className={styles.content} style={outerStyle}>
                      {invoicetot}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: { divStyle },
                      }}
                    >
                      Line Matching:
                    </div>
                    <div className={styles.content} style={outerStyle}>
                      {closedcode || "NULL"}
                    </div>
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
                      color: colorStyle || "black",
                    }}
                  >
                    <TableRow style={newStyle}>
                      <TableHeaderCellWithSort
                        column="id"
                        label="PO_line_id"
                        sortedColumn={sortedColumn}
                        sortDirection={sortDirection}
                        headerSortProps={headerSortProps}
                      />
                      <TableHeaderCellWithSort
                        column="item_name"
                        label="Name"
                        sortedColumn={sortedColumn}
                        sortDirection={sortDirection}
                        headerSortProps={headerSortProps}
                      />
                      <TableHeaderCellWithSort
                        column="item_description"
                        label="Description"
                        sortedColumn={sortedColumn}
                        sortDirection={sortDirection}
                        headerSortProps={headerSortProps}
                      />
                      <TableHeaderCellWithSort
                        column="item_name"
                        label="Invc Item Name"
                        sortedColumn={sortedColumn}
                        sortDirection={sortDirection}
                        headerSortProps={headerSortProps}
                      />
                      <TableHeaderCellWithSort
                        column="unit_price"
                        label="Unit Price"
                        sortedColumn={sortedColumn}
                        sortDirection={sortDirection}
                        headerSortProps={headerSortProps}
                      />
                      <TableHeaderCellWithSort
                        column="quantity"
                        label="Quantity"
                        sortedColumn={sortedColumn}
                        sortDirection={sortDirection}
                        headerSortProps={headerSortProps}
                      />
                      <TableHeaderCellWithSort
                        column="Quantity"
                        label="Invoice Quantity"
                        sortedColumn={sortedColumn}
                        sortDirection={sortDirection}
                        headerSortProps={headerSortProps}
                      />
                      <TableHeaderCellWithSort
                        column="Igst"
                        label="Igst"
                        sortedColumn={sortedColumn}
                        sortDirection={sortDirection}
                        headerSortProps={headerSortProps}
                      />
                      <TableHeaderCellWithSort
                        column="Cgst"
                        label="Cgst"
                        sortedColumn={sortedColumn}
                        sortDirection={sortDirection}
                        headerSortProps={headerSortProps}
                      />
                      <TableHeaderCellWithSort
                        column="Sgst"
                        label="Sgst"
                        sortedColumn={sortedColumn}
                        sortDirection={sortDirection}
                        headerSortProps={headerSortProps}
                      />
                    </TableRow>
                  </TableHeader>

                  <TableBody style={bodyStyle}>
                    {sortedData.map((item) => (
                      <TableRow
                        key={item.id}
                        style={bodyStyle}
                        className={divStyles}
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
