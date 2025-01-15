import { message } from "antd";
import {
  ArrowSortUpFilled,
  ArrowSortDownRegular,
  ArrowDownload28Regular,
} from "@fluentui/react-icons";
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
import { useLocation } from "react-router-dom";
import AiNav from "../components/ainavbar";
import CreatableSelect from "react-select/creatable";
import React, { useState, useEffect } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import axios from "axios";
import { Popover } from "@mui/material";
import { toggleDrawerPosition } from "../Store/refreshSlice";
import { useDispatch } from "react-redux";

const path = "/aidetail";
const path1 = "/Dashboard";
const Checkbox = ({ children, ...props }) => (
  <label style={{ marginRight: "1em" }}>
    <input type="checkbox" {...props} />
    {children}
  </label>
);

const useStyles = makeStyles({
  contentHeader: {
    marginTop: "0",
  },
  tableCell: {
    maxWidth: "300px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  root: {
    height: "88vh",
    overflowY: "auto",
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
    marginLeft: "-26em",
  },
  header: {
    padding: "20px",
  },
  content1: {
    display: "flex",
    flexWrap: "wrap",
    overflowY: "auto",
    paddingTop: "3vh",
    padding: "0 20px",
    maxHeight: "48vh",
    columnGap: "30%",
    rowGap: "30%",
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

// pop up message for table cell see more

const AIDetailPage = () => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const themestate = false;

  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortedColumn2, setSortedColumn2] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [PONumberOPtions, setPONumberOPtions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedtab, setSelectedTab] = React.useState("tab3");
  const [selectedItem, setSelectedItem] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [invoiceData, setInvoiceData] = useState(null);
  const location2 = useLocation();
  const [items, setItems] = useState([]);
  const [selectedInvoiceNumber, setSelectedInvoiceNumber] = useState(null);
  const [dataitem, setDataItem] = useState();
  const [poheader, setPoHeader] = useState();
  const [invoiceId, setInvoiceId] = useState(null);
  const [load, setLoad] = useState(false);

  console.log(invoiceId);
  // Styles

  const getThemeStyle = (themeState, lightStyle, darkStyle) =>
    themeState ? darkStyle : lightStyle;

  const cursorStyle = load ? "not-allowed" : "pointer";
  const loadStyle = load ? 0.6 : 1;
  const classStyle = getThemeStyle(themestate, "tab", "tab dark drawer");
  const tabStyle = getThemeStyle(themestate, "", "rgb(245,245,245)");
  const backStyle = getThemeStyle(themestate, "white", "#383838");
  const innerStyle = getThemeStyle(themestate, "black", "white");
  const bodyStyle = getThemeStyle(
    themestate,
    {},
    { color: "white", borderBottomColor: "#383838" },
  );
  const tableBodyStyle = getThemeStyle(themestate, {}, { color: "white" });

  const handleTabSelect2 = (event, data) => {
    setSelectedTab(data.value);
  };

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

  const handlePoNumberClick = async (poNumber) => {
    console.log("Test function called");
    setSelectedInvoiceNumber(poNumber);

    try {
      if (poheader && Array.isArray(poheader)) {
        const selectedPoDetails = poheader.find(
          (po) => po.po_number === poNumber,
        );
        console.log("SELECTED PO", selectedPoDetails);

        setDataItem(selectedPoDetails || {});
        setItems(selectedPoDetails?.po_items || []);

        console.log("Selected PO Details:", selectedPoDetails);
        console.log("Po Items:", items);
      } else {
        console.warn("poheader is not a valid array");
        setDataItem({});
        setItems([]);
      }
    } catch (error) {
      console.error("Error handling PO number click:", error);
    }
  };

  // pop over
  const handleClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item); // Set the clicked item as the selected item
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // const location2 = useLocation();
  const query = new URLSearchParams(useLocation().search);
  const invoiceNumber = query.get("invoiceNumber");
  // const { invoiceNumber } = location2.state || {};
  console.log("inn", invoiceNumber);

  const fetchInvoiceDetails = async () => {
    if (invoiceNumber) {
      try {
        const token = localStorage.getItem("access_token");

        const response = await axios.get(
          `https://invoicezapi.focusrtech.com:57/user/invoices-details/${invoiceNumber}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const fetchedItem = response.data;
        setInvoiceId(fetchedItem.invoice_info.id);
        setInvoiceData(fetchedItem);

        setPoHeader(fetchedItem.po_headers);

        const poOptions = fetchedItem.po_headers.map((header) => ({
          value: header.po_number,
          label: header.po_number,
        }));

        setPONumberOPtions(poOptions);

        setDataItem(fetchedItem.po_headers[0]);
      } catch (error) {
        console.error("Error fetching invoice data", error);
      }
    }
  };

  useEffect(() => {
    fetchInvoiceDetails();
  }, [invoiceNumber]);

  if (!invoiceData) {
    return <div>Loading...</div>;
  }

  const invoiceInfo = [
    {
      label: "Invoice Number",
      value: invoiceData?.invoice_info?.InvoiceId || "N/A",
    },
    {
      label: "Invoice Date",
      value: invoiceData?.invoice_info?.InvoiceDate || "N/A",
    },
    {
      label: "Invoice Due Date",
      value: invoiceData?.invoice_info?.DueDate || "Null",
    },
    {
      label: "Invoice Total Amount",
      value: invoiceData?.invoice_info?.InvoiceTotal || "N/A",
    },
    { label: "Tax Amount", value: invoiceData?.Tax || "N/A" },
    { label: "Currency", value: invoiceData?.Currency || "N/A" },
  ];

  const inv_id = invoiceData.invoice_info.id;

  const formatAddress = (address) => {
    if (!address) return "N/A";

    const {
      house_number,
      street_address,
      city,
      state,
      postal_code,
      country_region,
    } = address;

    const addressParts = [
      house_number,
      street_address,
      city,
      state,
      postal_code,
      country_region,
    ].filter((part) => part);

    return addressParts.length > 0 ? addressParts.join(", ") : "N/A";
  };

  const vendorInfo = [
    { label: "Vendor Name", value: invoiceData?.invoice_info?.VendorName },
    {
      label: "Vendor Address",
      value: formatAddress(invoiceData?.invoice_info?.VendorAddress),
    },
    { label: "Vendor Contact Information", value: invoiceData?.VendorContact },
    { label: "Vendor Tax ID", value: invoiceData?.VendorTaxId },
  ];

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

  const TableHeaderCellWithSort2 = ({
    column,
    label,
    sortedColumn2,
    sortDirection,
    headerSortProps2,
  }) => (
    <TableHeaderCell {...headerSortProps2(column)}>
      {label}
      {sortedColumn2 === column &&
        (sortDirection === "asc" ? (
          <ArrowSortDownRegular />
        ) : (
          <ArrowSortUpFilled />
        ))}
    </TableHeaderCell>
  );

  const lineItems = invoiceData.invoice_info.items.map((item) => ({
    Description: item.Description || "Null",
    Quantity: item.Quantity || "Null",
    UnitPrice: item.UnitPrice || "Null",
    Amount: item.Amount || "Null",
    Discount: item.Discount || "Null",
    ProductCode: item.ProductCode || "Null",
    Igst: item.Igst || "Null",
    Sgst: item.Sgst || "Null",
    Cgst: item.Cgst || "Null",
  }));

  console.log("Line Items", lineItems);

  const handleCreate = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };

    setPONumberOPtions((prevOptions) => [...prevOptions, newOption]);
    setSelectedOption(newOption);
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

    console.log("payload", payload);

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
        },
      );

      if (response.status === 201) {
        message.success("PO successfully Updated");
        setLoad(false);

        dispatch(toggleDrawerPosition("2"));
      } else {
        message.error("Operation Unsuccessfully. Please try again.");
      }
    } catch (error) {
      message.error("Unknown error Occured");
    }
  };

  const handleChange = (option) => {
    setSelectedOption(option);
  };

  const handleSort = (column) => {
    if (sortedColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(column);
      setSortDirection("asc");
    }
  };
  const handleSort2 = (column) => {
    if (sortedColumn2 === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn2(column);
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
  const headerSortProps2 = (column) => ({
    onClick: () => handleSort2(column),
    style: {
      fontWeight: "bold",
      cursor: "pointer",
      maxWidth: column === "Description" ? "150px" : "200px",
    },
  });

  const sortedLineItems = [...invoiceData.invoice_info.items].sort((a, b) => {
    if (!sortedColumn) return 0;

    const aValue = a[sortedColumn] || "";
    const bValue = b[sortedColumn] || "";

    const aNumericValue = isNaN(aValue) ? aValue : parseFloat(aValue);
    const bNumericValue = isNaN(bValue) ? bValue : parseFloat(bValue);

    if (aNumericValue < bNumericValue) return sortDirection === "asc" ? -1 : 1;
    if (aNumericValue > bNumericValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const columnKeyMap = {
    "Line Number": "line_num",
    "Item Name": "item_name",
    Quantity: "quantity",
    "Unit Price": "unit_price",
    "Amount Billed": "amount_billed",
  };

  const sortedPoItems = (() => {
    if (!dataitem || !Array.isArray(dataitem.po_items) || !sortedColumn2)
      return [...(dataitem?.po_items || [])];

    const dataKey = columnKeyMap[sortedColumn2];
    if (!dataKey) return [...dataitem.po_items];

    const getComparableValue = (item) => {
      const value = item[dataKey] || "";
      return !isNaN(parseFloat(value)) && isFinite(value)
        ? parseFloat(value)
        : value.toString();
    };

    return [...dataitem.po_items].sort((a, b) => {
      const aComparable = getComparableValue(a);
      const bComparable = getComparableValue(b);
      const direction = sortDirection === "asc" ? 1 : -1;

      if (aComparable < bComparable) return -direction;
      if (aComparable > bComparable) return direction;
      return 0;
    });
  })();

  const renderDetail = (label, value) => (
    <div>
      <b>{label}:</b> {value}
    </div>
  );

  return (
    <div>
      <div className="Approvebreadcrump">
        <Breadcrumb aria-label="Breadcrumb default example">
          <BreadcrumbItem>
            <BreadcrumbButton href={path1}>Home</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton href={path1}>
              Multiple Match Found
            </BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton href={path}>
              {invoiceData.invoice_info.InvoiceId}
            </BreadcrumbButton>
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
              gap: "10px",
              marginLeft: "auto",
            }}
          >
            <div
              style={{
                right: "5%",
                display: "flex",
                gap: "10px",
                flexDirection: "column",
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
                  cursor: { cursorStyle },
                  opacity: { loadStyle },
                }}
                className={styles.wrapper}
                onClick={handlePostApi}
                disabled={load}
              >
                {load ? (
                  <div
                    style={{
                      border: "4px solid rgba(255, 255, 255, 0.3)",
                      borderRadius: "50%",
                      borderTop: "4px solid #0078d4",
                      width: "20px",
                      height: "20px",
                      animation: "spin 1s linear infinite",
                      marginRight: "8px",
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
          </div>

          <h2 style={{ margin: "20px 0 20px 0" }}>
            Invoice No : {invoiceData.invoice_info.InvoiceId}
          </h2>

          <div style={{ display: "flex", marginBottom: "20px" }}>
            <div
              style={{ borderLeft: "5px solid #342d7c", paddingLeft: "10px" }}
            >
              <p>Supplier</p>
              <h2>{invoiceData.invoice_info.VendorName}</h2>
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
              <h2>{poheader?.length}</h2>
            </div>
            <div
              style={{
                marginLeft: "3vw",
                borderLeft: "5px solid #FF7F7F",
                paddingLeft: "10px",
              }}
            >
              <p>Entry Time</p>
              <h2>{invoiceData.invoice_info.created_at}</h2>
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
              className={classStyle}
              style={{ border: "1px solid transparent" }}
            >
              Invoice
            </Tab>
            <Tab
              value="tab4"
              className={classStyle}
              style={{ border: "1px solid transparent" }}
            >
              PO
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
        {selectedtab === "tab3" && (
          <div>
            {/* Invoice Info Section */}
            <div
              className={styles.content}
              style={{
                color: { tabStyle },
                display: "grid",
                gridTemplateColumns: "repeat(6, 3fr)",
                gap: "20px",
                fontSize: "16px",
              }}
            >
              {invoiceInfo.map((info, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div
                    className={styles.heading}
                    style={{
                      fontWeight: "bold",
                      color: themestate ? "white" : "",
                      marginRight: "5px",
                    }}
                  >
                    {info.label}:
                  </div>
                  <div>{info.value}</div>
                </div>
              ))}
            </div>

            {/* Vendor Info Section */}
            <div
              className={styles.content}
              style={{
                color: { tabStyle },
                display: "grid",
                gridTemplateColumns: "repeat(6, 3fr)",
                gap: "20px",
                fontSize: "15px",
              }}
            >
              {vendorInfo.map((info, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: "3em",
                  }}
                >
                  <div
                    className={styles.heading}
                    style={{
                      fontWeight: "bold",
                      color: themestate ? "white" : "",
                      marginRight: "5px",
                    }}
                  >
                    {info.label}:
                  </div>
                  <div>{info.value}</div>
                </div>
              ))}
              {/* </div> */}
            </div>

            <h2 style={{ marginTop: "3em" }}>Line Information</h2>
            <div
              style={{
                width: "100%",
                display: "flex",
                overflowY: "auto",
                height: "40vh",
                marginTop: "2em",
              }}
            >
              <div style={{ flex: 2 }}>
                <Table>
                  <TableHeader
                    style={{
                      position: "sticky",
                      top: 0,
                      backgroundColor: backStyle || "white",
                      zIndex: 1,
                      color: innerStyle || "black",
                    }}
                  >
                    <TableRow style={bodyStyle}>
                      <TableHeaderCellWithSort
                        column="Description"
                        label="Description"
                        sortedColumn={sortedColumn}
                        sortDirection={sortDirection}
                        headerSortProps={headerSortProps}
                      />
                      <TableHeaderCellWithSort
                        column="Quantity"
                        label="Quantity"
                        sortedColumn={sortedColumn}
                        sortDirection={sortDirection}
                        headerSortProps={headerSortProps}
                      />
                      <TableHeaderCellWithSort
                        column="UnitPrice"
                        label="Unit Price"
                        sortedColumn={sortedColumn}
                        sortDirection={sortDirection}
                        headerSortProps={headerSortProps}
                      />
                      <TableHeaderCellWithSort
                        column="Discount"
                        label="Discount"
                        sortedColumn={sortedColumn}
                        sortDirection={sortDirection}
                        headerSortProps={headerSortProps}
                      />
                      <TableHeaderCellWithSort
                        column="ProductCode"
                        label="Product Code"
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

                  <TableBody>
                    {sortedLineItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.Description || "Null"}</TableCell>
                        <TableCell>{item.Quantity || "Null"}</TableCell>
                        <TableCell>{item.UnitPrice || "Null"}</TableCell>
                        <TableCell>{item.Discount || "Null"}</TableCell>
                        <TableCell>{item.ProductCode || "Null"}</TableCell>
                        <TableCell>{item.Igst || "Null"}</TableCell>
                        <TableCell>{item.Cgst || "Null"}</TableCell>
                        <TableCell>{item.Sgst || "Null"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}

        {selectedtab === "tab4" && (
          <div style={{ width: "100%", display: "flex" }}>
            <div style={{ flex: 1, borderRight: "2px solid rgb(240,240,240)" }}>
              <AiNav onPoNumberClick={handlePoNumberClick} />
            </div>
            <div
              style={{
                flex: 3,
                display: "flex",
                paddingLeft: "2em",
                flexDirection: "column",
              }}
            >
              <div>
                <div
                  style={{
                    width: "90%",
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 2fr)",
                    gridTemplateRows: "auto auto",
                    gap: "1rem",
                    paddingLeft: "2em",
                  }}
                >
                  {invoiceData && (
                    <>
                      {renderDetail("PO Number", selectedInvoiceNumber)}
                      {renderDetail("PO Type", dataitem?.po_type)}
                      {renderDetail(
                        "Supplier Name",
                        invoiceData.invoice_info.VendorName,
                      )}
                      {renderDetail("Site", dataitem?.location)}
                      {renderDetail("Status", dataitem?.po_status)}
                      {renderDetail("Total Amount", dataitem?.total_amount)}
                      {renderDetail("Buyer Name", dataitem?.buyer_name)}
                      {renderDetail("Invoice Detail", dataitem?.invoice_detail)}
                      {renderDetail("Shipping Address", dataitem?.ship_to)}
                      {renderDetail("Billing Address", dataitem?.ship_to)}
                    </>
                  )}
                </div>

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    overflowY: "auto",
                    height: "40vh",
                    marginTop: "30px",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <Table>
                      <TableHeader
                        style={{
                          position: "sticky",
                          top: 0,
                          backgroundColor: backStyle || "white",
                          zIndex: 1,
                          color: innerStyle || "black",
                        }}
                      >
                        <TableRow style={bodyStyle}>
                          <TableHeaderCellWithSort2
                            column="Line Number"
                            label="Line Number"
                            sortedColumn2={sortedColumn2}
                            sortDirection={sortDirection}
                            headerSortProps2={headerSortProps2}
                          />
                          <TableHeaderCellWithSort2
                            column="Item Name"
                            label="Item Name"
                            sortedColumn2={sortedColumn2}
                            sortDirection={sortDirection}
                            headerSortProps2={headerSortProps2}
                          />
                          <TableHeaderCellWithSort2
                            column="Quantity"
                            label="Quantity"
                            sortedColumn2={sortedColumn2}
                            sortDirection={sortDirection}
                            headerSortProps2={headerSortProps2}
                          />
                          <TableHeaderCellWithSort2
                            column="Unit Price"
                            label="Unit Price"
                            sortedColumn2={sortedColumn2}
                            sortDirection={sortDirection}
                            headerSortProps2={headerSortProps2}
                          />
                          <TableHeaderCellWithSort2
                            column="Amount Billed"
                            label="Amount Billed"
                            sortedColumn2={sortedColumn2}
                            sortDirection={sortDirection}
                            headerSortProps2={headerSortProps2}
                          />
                          <TableHeaderCell style={{ fontWeight: "bold" }}>
                            Actions
                          </TableHeaderCell>
                        </TableRow>
                      </TableHeader>

                      <TableBody style={tableBodyStyle}>
                        {sortedPoItems.map((item) => (
                          <TableRow
                            key={item.id}
                            style={tableBodyStyle}
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
                              {item.line_num || "Null"}
                            </TableCell>
                            <TableCell
                              style={{
                                maxWidth: "300px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {item.item_name || "Null"}
                            </TableCell>
                            <TableCell
                              style={{
                                maxWidth: "300px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {item.quantity || "Null"}
                            </TableCell>
                            <TableCell
                              style={{
                                maxWidth: "300px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {item.unit_price || "Null"}
                            </TableCell>
                            <TableCell
                              style={{
                                maxWidth: "300px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {item.amount_billed || "Null"}
                            </TableCell>
                            <TableCell
                              style={{
                                maxWidth: "300px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              <FaArrowUpRightFromSquare
                                style={{ cursor: "pointer" }}
                                onClick={(event) => handleClick(event, item)}
                              />

                              {/* Popover component */}
                              <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "center",
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "center",
                                }}
                              >
                                <div
                                  style={{
                                    padding: "30px",
                                    maxWidth: "300px",
                                    marginLeft: "-1em",
                                    fontFamily: "Segoe UI",
                                    backgroundColor: "#fff",
                                    borderRadius: "8px",
                                    // boxShadow: "0px 4px 8px rgba(225, 225, 226, 0.8)",
                                  }}
                                >
                                  {selectedItem ? (
                                    <ul key={selectedItem.id}>
                                      <h3>Item Details</h3>
                                      <ul>
                                        <li>
                                          <b>Line Number:</b>{" "}
                                          {selectedItem.line_num}
                                        </li>
                                        <li>
                                          <b>Order Type:</b>{" "}
                                          {selectedItem.order_type_lookup_code}
                                        </li>
                                        <li>
                                          <b>Purchase Basis:</b>{" "}
                                          {selectedItem.purchase_basis}
                                        </li>
                                        <li>
                                          <b>Category:</b>{" "}
                                          {selectedItem.category_name}
                                        </li>
                                        <li>
                                          <b>Status:</b>{" "}
                                          {selectedItem.closed_code}
                                        </li>
                                        <li>
                                          <b>Description:</b>{" "}
                                          {selectedItem.item_description}
                                        </li>
                                        <li>
                                          <b>Need By Date:</b>{" "}
                                          {selectedItem.need_by_date || "N/A"}
                                        </li>
                                        <li>
                                          <b>Promised Date:</b>{" "}
                                          {selectedItem.promised_date || "N/A"}
                                        </li>
                                      </ul>
                                    </ul>
                                  ) : (
                                    <p>No item selected.</p>
                                  )}
                                </div>
                              </Popover>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIDetailPage;
