// import { useState } from "react";
// import React from "react";
import { message } from "antd";
import { OverlayTrigger } from "react-bootstrap";

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
import { useNavigate } from "react-router-dom";

import AiNav from "../components/ainavbar";
import { SettingOutlined } from "@ant-design/icons";
import { ArrowDownload28Regular } from "@fluentui/react-icons";
import { useLocation } from "react-router-dom";
import { tokens, Divider } from "@fluentui/react-components";
import CreatableSelect from "react-select/creatable";
import React, { useState } from "react";
import { useEffect } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { PopoverSurface, PopoverTrigger } from "@fluentui/react-components";
import axios from "axios";
import { Popover } from "@mui/material";
import { toggleDrawerPosition } from "../Store/refreshSlice";
import { useDispatch } from "react-redux";

const path = "/aidetail";
const path1 = "http://localhost:3000/";
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
    // width: "77vw",
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
    display: "flex", // Arrange items in a row
    flexWrap: "wrap", // Allow items to wrap to the next line if necessary
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [colourOptions, setColourOptions] = useState([
    { value: "1009", label: "1009" },
    { value: "1010", label: "1010" },
    { value: "1011", label: "1011" },
    { value: "1012", label: "1012" },
    { value: "1013", label: "1013" },
  ]);

  const [PONumberOPtions, setPONumberOPtions] = useState([
    { value: "1009", label: "1009" },
    { value: "1010", label: "1010" },
    { value: "1011", label: "1011" },
    { value: "1012", label: "1012" },
    { value: "1013", label: "1013" },
  ]);

  const [selectedOption, setSelectedOption] = useState(null);
  // const handleCreate = (inputValue) => {
  //   const newOption = { value: inputValue, label: inputValue };
  //   setColourOptions((prevOptions) => [...prevOptions, newOption]);
  //   setSelectedOption(newOption);
  // };

  const styles = useStyles();
  const themestate = false;
  const [selectedtab, setSelectedTab] = React.useState("tab3");

  const [selectedItem, setSelectedItem] = useState(null);

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
      columnId: "Description",
      compare: (a, b) => a.Description - b.Description,
    }),
    createTableColumn({
      columnId: "Quantity",
      compare: (a, b) => a.Quantity.localeCompare(b.Quantity),
    }),
    createTableColumn({
      columnId: "UnitPrice",
      compare: (a, b) => a.UnitPrice.localeCompare(b.UnitPrice),
    }),
    createTableColumn({
      columnId: "Discount",
      compare: (a, b) => a.Discount.localeCompare(b.Discount),
    }),
    createTableColumn({
      columnId: "ProductCode",
      compare: (a, b) => a.ProductCode - b.ProductCode,
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
      const response = await fetch(
        `http://10.10.15.15:5719/user/invoices-file/${invoiceId}`,
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

  // Invoice Details
  const [invoiceData, setInvoiceData] = useState(null);

  // const [items, setItems] = useState([]);
  const location2 = useLocation();
  const [items, setItems] = useState([]);
  const [selectedInvoiceNumber, setSelectedInvoiceNumber] = useState(null);
  const [dataitem, setDataItem] = useState();
  const [poheader, setPoHeader] = useState();
  // const [selectedOption, setSelectedOption] = useState(null);
  const [invoiceId, setInvoiceId] = useState(null); // Placeholder for dynamically fetched invoice ID
  const [vendor, setVendor] = useState("");
  const [load, setLoad] = useState(false);
  const [showPopover, setShowPopover] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  //  PopOver

  const handlePoNumberClick = async (poNumber) => {
    console.log("test function called");
    setSelectedInvoiceNumber(poNumber);
    try {
      // const response = await axios.get(`http://10.10.15.15:5719/user/invoices-details/${invoiceNumber}/`);
      // const fetchedData = response.data;

      const selectedPoDetails = poheader.find(
        (po) => po.po_number === poNumber,
      );
      console.log("SELECTED PO", selectedPoDetails);
      // console.log("selectedPO",selectedPoDetails);
      setDataItem(selectedPoDetails || {});
      setItems(selectedPoDetails?.po_items || []);
      // console.log("Fetched Invoice Details:", fetchedData);
      console.log("Selected PO Details:", selectedPoDetails);
      console.log("Po", items);
    } catch (error) {
      console.error("Error fetching invoice details:", error);
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

  const { invoiceNumber } = location2.state || {};
  console.log("inn", invoiceNumber);

  const fetchInvoiceDetails = async () => {
    if (invoiceNumber) {
      try {
        const response = await axios.get(
          `http://10.10.15.15:5719/user/invoices-details/${invoiceNumber}/`,
        );
        const fetchedItem = response.data;
        console.log("R", fetchedItem);
        setInvoiceId(fetchedItem.invoice_info.id);
        setInvoiceData(fetchedItem);

        setPoHeader(fetchedItem.po_headers);
        // setVendor(fetchedItem.po_headers.id)
        // console.log("SETVENDOR",vendor)
        const poOptions = fetchedItem.po_headers.map((header) => ({
          value: header.po_number,
          label: header.po_number,
        }));
        // console.log("poHEADERS", poOptions);
        setPONumberOPtions(poOptions);

        setDataItem(fetchedItem.po_headers[0]);

        setColourOptions();
      } catch (error) {
        console.error("Error fetching invoice data", error);
      }
    }
  };
  console.log("Data", invoiceData);
  useEffect(() => {
    fetchInvoiceDetails();
  }, [invoiceNumber]);

  if (!invoiceData) {
    return <div>Loading...</div>;
  }

  const invoiceInfo = [
    { label: "Invoice Number", value: invoiceData.invoice_info.InvoiceId },
    { label: "Invoice Date", value: invoiceData.invoice_info.InvoiceDate },
    {
      label: "Invoice Due Date",

      value: invoiceData.invoice_info.DueDate || "Null",
    },
    {
      label: "Invoice Total Amount",
      value: invoiceData.invoice_info.InvoiceTotal,
    },
    { label: "Tax Amount", value: invoiceData.Tax || "N/A" },
    { label: "Currency", value: invoiceData.Currency || "N/A" },
  ];

  const inv_id = invoiceData.invoice_info.id;
  // const inv_id = invoiceData.InvoiceId;

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
    {
      label: "Vendor Name",
      value: invoiceData.invoice_info.VendorName || "N/A",
    },
    {
      label: "Vendor Address",
      value: formatAddress(invoiceData.invoice_info.VendorAddress),
    },
    {
      label: "Vendor Contact Information",
      value: invoiceData.VendorContact || "N/A",
    },
    { label: "Vendor Tax ID", value: invoiceData.VendorTaxId || "N/A" },
  ];

  // const renderPopover = (props) => (
  //   <Popover {...props}>
  //     <Popover.Body>
  //       Hi
  //     </Popover.Body>
  //   </Popover>
  // );

  const lineItems = invoiceData.invoice_info.items.map((item) => ({
    Description: item.Description || "Null",
    Quantity: item.Quantity || "Null",
    UnitPrice: item.UnitPrice || "Null",
    Amount: item.Amount || "Null",
    Discount: item.Discount || "Null",
    ProductCode: item.ProductCode || "Null",
  }));

  const handleCreate = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };

    // Add the new option to the list of existing options
    setPONumberOPtions((prevOptions) => [...prevOptions, newOption]);
    setSelectedOption(newOption); // Set the newly created option as the selected one

    // Optionally, you can call your API to save the new PO number here
    // Uncomment the following block if you want to save the PO number immediately when created.
    /*
    try {
      const response = await fetch('http://10.10.15.15:5719/user/po-number', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ po_number: inputValue }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('PO number added successfully:', data);
      } else {
        console.error('Error adding PO number:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    */
  };

  const handlePostApi = async () => {
    console.log("Button clicked!");

    // Check if PO number and invoice ID are provided
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
      const response = await axios.post(
        "http://10.10.15.15:5719/user/po-number",
        payload,
      );

      if (response.status === 201) {
        message.success("PO successfully Updated");
        setLoad(false);
        navigate(`/approve`);
        dispatch(toggleDrawerPosition("2"));
      } else {
        message.error(`Operation Unsuccessfully Please try again`);
      }
    } catch (error) {
      message.error("Unknown error Occured");
    }
  };

  const handleChange = (option) => {
    setSelectedOption(option);
    // console.log("Selected PO Number:", option ? option.value : null);
  };

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
                  cursor: load ? "not-allowed" : "pointer",
                  opacity: load ? 0.6 : 1,
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
              <h2>{poheader.length}</h2>
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
            </div>

            <h2>Line Information</h2>

            <Divider />

            <div
              style={{
                width: "100%",
                display: "flex",
                overflowY: "auto",
                height: "40vh",
                marginTop: "10px",
              }}
            >
              <div style={{ flex: 2 }}>
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
                        themestate
                          ? { color: "white", borderBottomColor: "#383838" }
                          : {}
                      }
                    >
                      <TableHeaderCell
                        style={{
                          fontWeight: "bold",
                          cursor: "pointer",
                          maxWidth: "150px",
                        }}
                        {...headerSortProps("Description")}
                      >
                        Description
                      </TableHeaderCell>
                      <TableHeaderCell
                        style={{
                          fontWeight: "bold",
                          cursor: "pointer",
                          maxWidth: "200px",
                        }}
                        {...headerSortProps("Quantity")}
                      >
                        Quantity
                      </TableHeaderCell>
                      <TableHeaderCell
                        style={{
                          fontWeight: "bold",
                          cursor: "pointer",
                          maxWidth: "300px",
                        }}
                        {...headerSortProps("Unit Price")}
                      >
                        Unit Price
                      </TableHeaderCell>
                      <TableHeaderCell
                        style={{
                          fontWeight: "bold",
                          cursor: "pointer",
                          maxWidth: "250px",
                        }}
                        {...headerSortProps("Discount")}
                      >
                        Discount
                      </TableHeaderCell>
                      <TableHeaderCell
                        style={{
                          fontWeight: "bold",
                          cursor: "pointer",
                          maxWidth: "150px",
                        }}
                        {...headerSortProps("Product Code")}
                      >
                        Product Code
                      </TableHeaderCell>
                    </TableRow>
                  </TableHeader>

                  <TableBody style={themestate ? { color: "white" } : {}}>
                    {lineItems.map((item) => (
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
                          {item.Description}
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
                          {item.UnitPrice}
                        </TableCell>
                        <TableCell
                          style={{
                            maxWidth: "300px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.Discount}
                        </TableCell>
                        <TableCell
                          style={{
                            maxWidth: "300px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.ProductCode}
                        </TableCell>
                        {/* <TableCell
                    style={{
                      maxWidth: "300px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >

                      <FaArrowUpRightFromSquare
                        style={{ cursor: "pointer" }}
                      />

                  </TableCell> */}
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
                // justifyContent: "center",
                paddingLeft: "2em",
                flexDirection: "column",
              }}
            >
              <div>
                <div
                  style={{
                    width: "90%",
                    display: "flex",
                    justifyContent: "space-between",
                    paddingLeft: "2em",
                  }}
                >
                  <ul>
                    {invoiceData && (
                      <>
                        <li>PO Number: {selectedInvoiceNumber}</li>
                        <li>PO Type: {dataitem.po_type}</li>
                        <li>Supplier Name: {dataitem.supplier_name}</li>
                        <li>Site: {dataitem.location}</li>
                        <li>Status: {dataitem.po_status}</li>
                        <li>Total Amount: {dataitem.total_amount}</li>
                        <li>Buyer Name: {dataitem.buyer_name}</li>
                        <li>Invoice Detail: {dataitem.invoice_detail}</li>
                        <li>Shipping Address: {dataitem.ship_to}</li>
                        <li>Billing Address: {dataitem.ship_to}</li>
                      </>
                    )}
                  </ul>
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
                          backgroundColor: themestate ? "#383838" : "white",
                          zIndex: 1,
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
                          <TableHeaderCell
                            style={{
                              fontWeight: "bold",
                              cursor: "pointer",
                              maxWidth: "200px",
                            }}
                            {...headerSortProps("Line Number")}
                          >
                            Line Number
                          </TableHeaderCell>
                          <TableHeaderCell
                            style={{
                              fontWeight: "bold",
                              cursor: "pointer",
                              maxWidth: "150px",
                            }}
                            {...headerSortProps("Item Name")}
                          >
                            Item Name
                          </TableHeaderCell>
                          <TableHeaderCell
                            style={{
                              fontWeight: "bold",
                              cursor: "pointer",
                              maxWidth: "300px",
                            }}
                            {...headerSortProps("Quantity")}
                          >
                            Quantity
                          </TableHeaderCell>
                          <TableHeaderCell
                            style={{
                              fontWeight: "bold",
                              cursor: "pointer",
                              maxWidth: "250px",
                            }}
                            {...headerSortProps("Unit Price")}
                          >
                            Unit Price
                          </TableHeaderCell>
                          <TableHeaderCell
                            style={{
                              fontWeight: "bold",
                              cursor: "pointer",
                              maxWidth: "150px",
                            }}
                            {...headerSortProps("Amount Billed")}
                          >
                            Amount Billed
                          </TableHeaderCell>
                          <TableHeaderCell
                            style={{
                              fontWeight: "bold",
                              cursor: "pointer",
                              maxWidth: "150px",
                            }}
                          >
                            See more
                          </TableHeaderCell>
                        </TableRow>
                      </TableHeader>

                      <TableBody style={themestate ? { color: "white" } : {}}>
                        {dataitem.po_items &&
                          dataitem.po_items.map((item) => (
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
                                    }}
                                  >
                                    {selectedItem ? (
                                      <ul key={selectedItem.id}>
                                        <h3>Item Details</h3>
                                        <ul>
                                          <li>
                                            <b>Order Type:</b>{" "}
                                            {
                                              selectedItem.order_type_lookup_code
                                            }
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
                                            {selectedItem.promised_date ||
                                              "N/A"}
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
