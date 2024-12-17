// import { useState } from "react";
// import React from "react";
import { message } from "antd";
import { OverlayTrigger } from "react-bootstrap";
import { TableContainer, TableHead, TableSortLabel, Paper } from '@mui/material';
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
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortedColumn2, setSortedColumn2] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  

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
    createTableColumn({
      columnId: "Igst",
      compare: (a, b) => a.Igst - b.Igst,
    }),
    createTableColumn({
      columnId: "Cgst",
      compare: (a, b) => a.Cgst - b.Cgst,
    }),
    createTableColumn({
      columnId: "Sgst",
      compare: (a, b) => a.Sgst - b.Sgst,
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

  // const headerSortProps = (columnId) => ({
  //   onClick: (e) => toggleColumnSort(e, columnId),
  //   sortDirection: getSortDirection(columnId),
  // });

  // const sortedData = [...data].sort((a, b) => {
  //   const aValue = a[sortState.sortColumn];
  //   const bValue = b[sortState.sortColumn];

  //   if (typeof aValue === "string" && typeof bValue === "string") {
  //     return sortState.sortDirection === "ascending"
  //       ? aValue.localeCompare(bValue)
  //       : bValue.localeCompare(aValue);
  //   }

  //   return sortState.sortDirection === "ascending"
  //     ? aValue - bValue
  //     : bValue - aValue;
  // });

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
      // const response = await axios.get(`https://invoicezapi.focusrtech.com:57/user/invoices-details/${invoiceNumber}/`);
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
        // const response = await axios.get(
        //   `https://invoicezapi.focusrtech.com:57/user/invoices-details/${invoiceNumber}/`,
        // );
        const token = localStorage.getItem("access_token"); // Retrieve the token securely

        const response = await axios.get(
          `https://invoicezapi.focusrtech.com:57/user/invoices-details/${invoiceNumber}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the authorization header
            },
          }
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
      value: invoiceData.VendorContact || "",
    },
    { label: "Vendor Tax ID", value: invoiceData.VendorTaxId || "" },
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
    Igst: item.Igst || "Null",
    Sgst: item.Sgst || "Null",
    Cgst: item.Cgst || "Null",

  }));

  console.log("Line Items", lineItems)

  const handleCreate = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };

    // Add the new option to the list of existing options
    setPONumberOPtions((prevOptions) => [...prevOptions, newOption]);
    setSelectedOption(newOption); // Set the newly created option as the selected one

    // Optionally, you can call your API to save the new PO number here
    // Uncomment the following block if you want to save the PO number immediately when created.
    /*
    try {
      const response = await fetch('https://invoicezapi.focusrtech.com:57/user/po-number', {
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
        // navigate(`/approve`); 
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
    // console.log("Selected PO Number:", option ? option.value : null);
  };

  // Function to handle sorting
  const handleSort = (column) => {
    if (sortedColumn === column) {
      // Toggle sorting direction if the same column is clicked
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set sorting direction to ascending if a new column is clicked
      setSortedColumn(column);
      setSortDirection("asc");
    }
  };
  const handleSort2 = (column) => {
    if (sortedColumn2=== column) {
      // Toggle sorting direction if the same column is clicked
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set sorting direction to ascending if a new column is clicked
      setSortedColumn2(column);
      setSortDirection("asc");
    }
  };
  // Sorting function for header props
  const headerSortProps = (column) => ({
    onClick: () => handleSort(column),
    style: {
      fontWeight: "bold",
      cursor: "pointer",
      maxWidth: column === "Description" ? "150px" : "200px", // Adjust width as needed
    },
  });
  const headerSortProps2 = (column) => ({
    onClick: () => handleSort2(column),
    style: {
      fontWeight: "bold",
      cursor: "pointer",
      maxWidth: column === "Description" ? "150px" : "200px", // Adjust width as needed
    },
  });

  // Sort lineItems based on the current sorting column and direction
  // const sortedLineItems = [...invoiceData.invoice_info.items].sort((a, b) => {
  //   if (!sortedColumn) return 0;

  //   const aValue = a[sortedColumn] || "";
  //   const bValue = b[sortedColumn] || "";

  //   if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
  //   if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
  //   return 0;
  // });
  const sortedLineItems = [...invoiceData.invoice_info.items].sort((a, b) => {
    if (!sortedColumn) return 0;

    // Get the values for comparison
    const aValue = a[sortedColumn] || ""; // Use empty string for undefined or null
    const bValue = b[sortedColumn] || "";

    // Convert to numbers if they are numeric values (e.g., Quantity, UnitPrice, etc.)
    const aNumericValue = isNaN(aValue) ? aValue : parseFloat(aValue);
    const bNumericValue = isNaN(bValue) ? bValue : parseFloat(bValue);

    if (aNumericValue < bNumericValue) return sortDirection === "asc" ? -1 : 1;
    if (aNumericValue > bNumericValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });


 // Mapping object: Display names to data keys
const columnKeyMap = {
  "Line Number": "line_num",
  "Item Name": "item_name",
  "Quantity": "quantity",
  "Unit Price": "unit_price",
  "Amount Billed": "amount_billed",
};

// Sorting function
const sortedPoItems = [...dataitem.po_items].sort((a, b) => {
  if (!sortedColumn) return 0; // No sorting if no column is selected

  // Map the sorted column name to the actual data key
  const dataKey = columnKeyMap[sortedColumn];
  if (!dataKey) return 0; // Skip sorting if no mapping exists for the column

  // Get the values for comparison, default to empty string for null/undefined
  const aValue = a[dataKey] || "";
  const bValue = b[dataKey] || "";

  // Convert numeric values for proper comparison
  const aNumericValue = isNaN(aValue) ? aValue : parseFloat(aValue);
  const bNumericValue = isNaN(bValue) ? bValue : parseFloat(bValue);

  // Sort logic: Compare based on the current direction
  if (aNumericValue < bNumericValue) return sortDirection === "asc" ? -1 : 1;
  if (aNumericValue > bNumericValue) return sortDirection === "asc" ? 1 : -1;
  return 0; // Equal values
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
          <div>
            {/* Invoice Info Section */}
            <div
              className={styles.content}
              style={{
                color: themestate ? "rgb(245,245,245)" : "",
                display: "grid",
                gridTemplateColumns: "repeat(6, 3fr)",
                gap: "20px",
                fontSize: "16px"
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

                color: themestate ? "rgb(245,245,245)" : "",
                display: "grid",
                gridTemplateColumns: "repeat(6, 3fr)",
                gap: "20px",
                fontSize: "15px"

              }}
            >

              {vendorInfo.map((info, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: "3em"

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

            {/* Line Information Section */}
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
               {/*  <Table>
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
                      <TableHeaderCell
                        style={{
                          fontWeight: "bold",
                          cursor: "pointer",
                          maxWidth: "150px",
                        }}
                        {...headerSortProps("Igst")}
                      >
                        Igst
                      </TableHeaderCell>
                      <TableHeaderCell
                        style={{
                          fontWeight: "bold",
                          cursor: "pointer",
                          maxWidth: "150px",
                        }}
                        {...headerSortProps("Cgst")}
                      >
                        Cgst
                      </TableHeaderCell>
                      <TableHeaderCell
                        style={{
                          fontWeight: "bold",
                          cursor: "pointer",
                          maxWidth: "150px",
                        }}
                        {...headerSortProps("Sgst")}
                      >
                        Sgst
                      </TableHeaderCell>
                    </TableRow>
                  </TableHeader> */}

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
            themestate ? { color: "white", borderBottomColor: "#383838" } : {}
          }
        >
          <TableHeaderCell {...headerSortProps("Description")}>
            Description
            {sortedColumn === "Description" && (
              sortDirection === "asc" ? "▲" : "▼"
            )}
          </TableHeaderCell>
          <TableHeaderCell {...headerSortProps("Quantity")}>
            Quantity
            {sortedColumn === "Quantity" && (
              sortDirection === "asc" ? "▲" : "▼"
            )}
          </TableHeaderCell>
          <TableHeaderCell {...headerSortProps("UnitPrice")}>
            Unit Price
            {sortedColumn === "UnitPrice" && (
              sortDirection === "asc" ? "▲" : "▼"
            )}
          </TableHeaderCell>
          <TableHeaderCell {...headerSortProps("Discount")}>
            Discount
            {sortedColumn === "Discount" && (
              sortDirection === "asc" ? "▲" : "▼"
            )}
          </TableHeaderCell>
          <TableHeaderCell {...headerSortProps("ProductCode")}>
            Product Code
            {sortedColumn === "ProductCode" && (
              sortDirection === "asc" ? "▲" : "▼"
            )}
          </TableHeaderCell>
          <TableHeaderCell {...headerSortProps("Igst")}>
            Igst
            {sortedColumn === "Igst" && (
              sortDirection === "asc" ? "▲" : "▼"
            )}
          </TableHeaderCell>
          <TableHeaderCell {...headerSortProps("Cgst")}>
            Cgst
            {sortedColumn === "Cgst" && (
              sortDirection === "asc" ? "▲" : "▼"
            )}
          </TableHeaderCell>
          <TableHeaderCell {...headerSortProps("Sgst")}>
            Sgst
            {sortedColumn === "Sgst" && (
              sortDirection === "asc" ? "" : "▼"
            )}
          </TableHeaderCell>
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
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 2fr)", // 5 equal columns
                    gridTemplateRows: "auto auto", // 2 rows with auto height based on content
                    gap: "1rem", // Adds spacing between grid items
                    paddingLeft: "2em",
                  }}
                >
                  {invoiceData && (
                    <>
                      <div><b>PO Number:</b> {selectedInvoiceNumber}</div>
                      <div><b>PO Type:</b> {dataitem.po_type}</div>
                      <div><b>Supplier Name:</b> {invoiceData.invoice_info.VendorName}</div>
                      <div><b>Site:</b> {dataitem.location}</div>
                      <div><b>Status: </b>{dataitem.po_status}</div>

                      <div><b>Total Amount:</b> {dataitem.total_amount}</div>
                      <div><b>Buyer Name:</b> {dataitem.buyer_name}</div>
                      <div><b>Invoice Detail:</b> {dataitem.invoice_detail}</div>
                      <div><b>Shipping Address:</b> {dataitem.ship_to}</div>
                      <div><b>Billing Address:</b> {dataitem.ship_to}</div>
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
      <TableHeaderCell {...headerSortProps2("Line Number")}>
        Line Number
        {sortedColumn2 === "Line Number" && (
          sortDirection === "asc" ? "▲" : "▼"
        )}
      </TableHeaderCell>
      <TableHeaderCell {...headerSortProps2("Item Name")}>
        Item Name
        {sortedColumn2 === "Item Name" && (
          sortDirection === "asc" ? "▲" : "▼"
        )}
      </TableHeaderCell>
      <TableHeaderCell {...headerSortProps2("Quantity")}>
        Quantity
        {sortedColumn2 === "Quantity" && (
          sortDirection === "asc" ? "▲" : "▼"
        )}
      </TableHeaderCell>
      <TableHeaderCell {...headerSortProps2("Unit Price")}>
        Unit Price
        {sortedColumn2 === "Unit Price" && (
          sortDirection === "asc" ? "▲" : "▼"
        )}
      </TableHeaderCell>
      <TableHeaderCell {...headerSortProps2("Amount Billed")}>
        Amount Billed
        {sortedColumn2 === "Amount Billed" && (
          sortDirection === "asc" ? "▲" : "▼"
        )}
      </TableHeaderCell>
      <TableHeaderCell style={{ fontWeight: "bold" }}>
        Actions
      </TableHeaderCell>
    </TableRow>
  </TableHeader>


  <TableBody style={themestate ? { color: "white" } : {}}>
  {sortedPoItems.map((item) => (
    <TableRow
      key={item.id}
      style={themestate ? { color: "white" } : {}}
      className={themestate ? "hovereffect dark" : "hovereffect"}
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
