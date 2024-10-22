// import { useState } from "react";
// import React from "react";
import { message } from "antd";
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

import axios from "axios";
const path = "/aidetail";
const path1 = "http://localhost:3000/";
const Checkbox = ({ children, ...props }) => (
  <label style={{ marginRight: "1em" }}>
    <input type="checkbox" {...props} />
    {children}
  </label>
);

const useStyles = makeStyles({
  root: {
    // width: "77vw",
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

const AIDetailPage = () => {
  const navigate = useNavigate();
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
      const response = await fetch(
        `http://127.0.0.1:8000/user/invoices-file/${invoiceNumber}`,
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

  const handlePoNumberClick = async (poNumber) => {
    console.log("test function called");
    setSelectedInvoiceNumber(poNumber);
    try {
      // const response = await axios.get(`http://127.0.0.1:8000/user/invoices-details/${invoiceNumber}/`);
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
  const { invoiceNumber } = location2.state || {};
  console.log("inn", invoiceNumber);

  const fetchInvoiceDetails = async () => {
    if (invoiceNumber) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/user/invoices-details/${invoiceNumber}/`,
        );
        const fetchedItem = response.data;
        console.log("R", fetchedItem);

        setInvoiceData(fetchedItem);
        setPoHeader(fetchedItem.po_headers);

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
    { label: "Invoice Number", value: invoiceNumber },
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
  console.log("---", inv_id);

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

  const lineItems = invoiceData.invoice_info.items.map((item) => ({
    Description: item.Description || "N/A",
    Quantity: item.Quantity || "N/A",
    Amount: item.Amount || "N/A",
    Discount: item.Discount || "N/A",
    ProductCode: item.ProductCode || "N/A",
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
      const response = await fetch('http://127.0.0.1:8000/user/po-number', {
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
      const response = await axios.post(
        "http://127.0.0.1:8000/user/po-number",
        payload,
      );

      if (response.status === 201) {
        message.success("PO successfully Updated");
        navigate(`/approve`);
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
                }}
                className={styles.wrapper}
                onClick={handlePostApi}
              >
                Submit
              </Button>
            </div>
          </div>

          <h2 style={{ margin: "20px 0 20px 0" }}>Invoice:</h2>

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

              {/* Line Items */}
              <h2>Line Items</h2>
              <ol>
                {lineItems.map((info, index) => (
                  <li key={index} style={{ marginBottom: "15px" }}>
                    <strong>Description: {info.Description}</strong>
                    <ul style={{ marginLeft: "20px", listStyleType: "disc" }}>
                      <li>
                        <strong>Quantity:</strong> {info.Quantity}
                      </li>
                      <li>
                        <strong>Amount:</strong> {info.Amount}
                      </li>
                      <li>
                        <strong>Discount:</strong> {info.Discount}
                      </li>
                      <li>
                        <strong>ProductCode:</strong> {info.ProductCode}
                      </li>
                    </ul>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {selectedtab === "tab4" && (
          <div style={{ width: "100%", display: "flex", overflowY: "auto" }}>
            {/* Left Div (1/4 of the total width) */}
            <div style={{ flex: 1, borderRight: "2px solid rgb(240,240,240)" }}>
              <AiNav onPoNumberClick={handlePoNumberClick} />
            </div>

            {/* Right Div (3/4 of the total width) */}
            <div
              style={{
                flex: 3, // Three times the width of the left div
                display: "flex",
                justifyContent: "center", // Aligns content to the left
                paddingLeft: "2em", // Padding for spacing
              }}
            >
              <div
                style={{
                  width: "90%",
                  display: "flex",
                  justifyContent: "space-between", // Aligns content to the left
                  paddingLeft: "2em", // Padding for spacing
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
                      {/* <li>InvoiceDate: {invoiceData.InvoiceDate}</li>
                  <li>Invoice Date: {items.invoice_info.InvoiceDate }</li>  */}
                      <li>Shipping Address: {dataitem.ship_to}</li>
                      <li>Billing Address: {dataitem.ship_to}</li>
                    </>
                  )}
                </ul>

                <div>
                  {dataitem.po_items.map((item, index) => (
                    <ul key={item.id}>
                      <h3>Item {index + 1}</h3>
                      <ul>
                        <li>Item Name: {item.item_name}</li>
                        <li>Line Number: {item.line_num}</li>
                        <li>Quantity: {item.quantity}</li>
                        <li>Unit Price: {item.unit_price}</li>
                        <li>Amount Billed: {item.amount_billed || "N/A"}</li>
                        <li>Order Type: {item.order_type_lookup_code}</li>
                        <li>Purchase Basis: {item.purchase_basis}</li>
                        <li>Category: {item.category_name}</li>
                        <li>Status: {item.closed_code}</li>
                        <li>Description: {item.item_description}</li>
                        <li>Need By Date: {item.need_by_date || "N/A"}</li>
                        <li>Promised Date: {item.promised_date}</li>
                      </ul>
                    </ul>
                  ))}
                </div>
              </div>

              {/* Displaying items in a separate list */}
              {/* {items.length > 0 && (
              <div>
                <h3>Items:</h3>
                <ul>
                  {items.map((item) => (
                    <li key={item.id}>
                      <div>
                        <strong>{item.item_description}</strong> - Quantity: {item.quantity}, Unit Price: {item.unit_price}, Total Amount: {item.amount}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}  */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIDetailPage;
