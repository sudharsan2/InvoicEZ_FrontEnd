import { useState, useEffect, useRef } from "react";
import React from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  makeStyles,
  Button,
  Link,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  Textarea,
  Input,
  Dropdown,
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
import { TextField } from "@fluentui/react/lib/TextField";
import line_data from "./data_approve";
import "./dashboard.css";

import { ArrowDownload28Regular } from "@fluentui/react-icons";

const path = "/issuefix";
const path1 = "http://localhost:3000/";

const useStyles = makeStyles({
  root: {
    // width: "80vw",
    // height: "100vh",
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
    // maxHeight: "48vh",
  },
  content2: {
    // width: "77vw",
    overflowY: "auto",
    paddingTop: "3vh",
    padding: "0 20px",
    // maxHeight: "48vh",
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
  formField: {
    display: "flex",
    flexDirection: "column",
    marginRight: "15px",
    marginBottom: "10px",
  },
  formField1: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "6vw",
    marginBottom: "10px",
  },
});

const IssuefixDetails = () => {
  const [height, setHeight] = useState(0);
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      setHeight(divRef.current.offsetHeight); // Calculate the height of the div based on its content
    }
  }, []);

  const styles = useStyles();
  const themestate = false;
  const [selectedtab, setSelectedTab] = React.useState("tab1");
  const [selectedOption, setSelectedOption] = React.useState("");
  const [vendorName, setVendorName] = useState("super");
  // const [rows, setRows] = useState([
  //   { no: 1, type: '', amount: '', description: '', poLine: '', unitPrice: '', quantity: '', unitOfMeasurement: '', taxAmount: '', hsnCode: '' }
  // ]);

  const [formData, setFormData] = useState({
    vendorName: "",
    customerName: "",
    invoiceDate: "",
    invoiceTotal: "",
    vendorAddressRecipient: "",
    customerAddressRecipient: "",
    invoiceId: "",
    customerId: "",
    billingAddressRecipient: "",
    shippingAddressRecipient: "",
    dueDate: "",
    purchaseOrder: "",
  });

  const location = useLocation();
  const { invoiceNo } = location.state || {};

  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/user/invoices-update/${invoiceNo}/`,
        );
        const data = response.data.invoice_info;

        // Assuming 'items' is the correct property from your API response
        const items = data.items || [];
        setRows(
          items.map((item) => ({
            id: item.id,
            Description: item.Description || "",
            Quantity: item.Quantity || "",
            Unit: item.Unit || "",
            UnitPrice: item.UnitPrice || "",
            // ProductCode: item.ProductCode || "",
            Amount: item.Amount || "",
            SubTotal: item.SubTotal || "",
            // TotalTax: item.TotalTax || "",
            // Date: item.Date || "",
            // Tax: item.Tax || "",
            PreviousUnpaidBalance: item.PreviousUnpaidBalance || "",
            // AmountDue: item.AmountDue || "",
            // Add any other fields here as needed
          })),
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (index, key, value) => {
    setRows((prevRows) =>
      prevRows.map((row, i) => (i === index ? { ...row, [key]: value } : row)),
    );
  };

  const [poNumber, setPoNumber] = useState("");

  const handleSubmit = async () => {
    // Replace with your API endpoint
    const apiUrl = "http://127.0.0.1:8000/user/po-number";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          po_number: poNumber,
          invoice_id: invoiceNo,
        }), // send PO number as a JSON payload
      });

      if (!response.ok) {
        throw new Error("Failed to submit PO");
      }

      const data = await response.json();
      console.log("API response:", data);
    } catch (error) {
      console.error("Error submitting PO:", error);
    }
  };

  const [fulldata, setFulldata] = useState({}); // Add state for full data
  const [completedata, setCompletedata] = useState({});
  const [oldrow, setOldrow] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/user/invoices-update/${invoiceNo}/`,
        );
        const data = response.data.invoice_info;
        setFormData({
          vendorName: data.VendorName,
          customerName: data.CustomerName,
          invoiceDate: data.InvoiceDate,
          invoiceTotal: data.InvoiceTotal,
          vendorAddressRecipient: data.VendorAddressRecipient,
          customerAddressRecipient: data.CustomerAddressRecipient,
          invoiceId: data.InvoiceId,
          customerId: data.CustomerId,
          billingAddressRecipient: data.BillingAddressRecipient,
          shippingAddressRecipient: data.ShippingAddressRecipient,
          dueDate: data.DueDate,
          purchaseOrder: data.PurchaseOrder,
        });
        setCompletedata(data);
        // Update the full data in state
        setFulldata(response.data.invoice_info);

        setOldrow(
          data.items.map((item) => ({
            id: item.id,
            Description: item.Description,
            Quantity: item.Quantity,
            Unit: item.Unit,
            UnitPrice: item.UnitPrice,
            Amount: item.Amount,
            SubTotal: item.SubTotal,
            PreviousUnpaidBalance: item.PreviousUnpaidBalance,
            Date: item.Date,
            TotalTax: item.TotalTax,
            Tax: item.Tax,
            AmountDue: item.AmountDue,
            ServiceStartDate: item.ServiceStartDate,
            ServiceEndDate: item.ServiceEndDate,
            ServiceAddressRecipient: item.ServiceAddressRecipient,
            RemittanceAddressRecipient: item.RemittanceAddressRecipient,
            ServiceAddress: item.ServiceAddress,
            RemittanceAddress: item.RemittanceAddress,
          })),
        );

        setRows(
          data.items.map((item) => ({
            id: item.id,
            Description: item.Description,
            Quantity: item.Quantity,
            Unit: item.Unit,
            UnitPrice: item.UnitPrice,
            Amount: item.Amount,
            SubTotal: item.SubTotal,
            PreviousUnpaidBalance: item.PreviousUnpaidBalance,
          })),
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once when the component mounts

  const handleformSubmit = async () => {
    // Update the full data state based on formData and rows
    const updatedFulldata = {
      ...fulldata, // Spread fulldata to retain existing properties
      VendorName: formData.vendorName,
      CustomerName: formData.customerName,
      InvoiceDate: formData.invoiceDate,
      InvoiceTotal: formData.invoiceTotal,
      VendorAddressRecipient: formData.vendorAddressRecipient,
      CustomerAddressRecipient: formData.customerAddressRecipient,
      InvoiceId: formData.invoiceId,
      CustomerId: formData.customerId,
      BillingAddressRecipient: formData.billingAddressRecipient,
      ShippingAddressRecipient: formData.shippingAddressRecipient,
      DueDate: formData.dueDate,
      PurchaseOrder: formData.purchaseOrder,
      items: rows.map((item, index) => {
        const oldItem = oldrow[index]; // Match the index of rows with oldrow

        return {
          id: item.id,
          Description: item.Description,
          Quantity: item.Quantity,
          Unit: item.Unit,
          UnitPrice: item.UnitPrice,
          Amount: item.Amount,
          SubTotal: item.SubTotal,
          PreviousUnpaidBalance: item.PreviousUnpaidBalance,
          // Assign values from oldrow for fields not updated in rows
          Date: oldItem ? oldItem.Date : null,
          TotalTax: oldItem ? oldItem.TotalTax : null,
          Tax: oldItem ? oldItem.Tax : null,
          AmountDue: oldItem ? oldItem.AmountDue : null,
          ServiceStartDate: oldItem ? oldItem.ServiceStartDate : null,
          ServiceEndDate: oldItem ? oldItem.ServiceEndDate : null,
          ServiceAddressRecipient: oldItem
            ? oldItem.ServiceAddressRecipient
            : null,
          RemittanceAddressRecipient: oldItem
            ? oldItem.RemittanceAddressRecipient
            : null,
          ServiceAddress: oldItem ? oldItem.ServiceAddress : null,
          RemittanceAddress: oldItem ? oldItem.RemittanceAddress : null,
          // Add any other fields as needed
        };
      }),
      // Add any other properties like po_headers, if needed
    };

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/user/invoices-update/${formData.invoiceId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            invoice_info: updatedFulldata,
            po_headers: [],
          }), // Send the updated full data
        },
      );

      if (response.ok) {
        console.log("Form data updated successfully");
      } else {
        console.error("Error updating form data");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  // const handleInputChange = (index, field, value) => {
  //   const newRows = [...rows];
  //   newRows[index][field] = value;
  //   setRows(newRows);
  // };

  const addLine = () => {
    setRows([
      ...rows,
      {
        no: rows.length + 1,
        type: "",
        amount: "",
        description: "",
        poLine: "",
        unitPrice: "",
        quantity: "",
        unitOfMeasurement: "",
        taxAmount: "",
        hsnCode: "",
      },
    ]);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleViewInvoice = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/user/invoices-file/${invoiceNo}`,
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

  const handlePOChange = (event) => {};

  return (
    <div>
      <div ref={divRef}>
        <div className="Approvebreadcrump">
          <Breadcrumb aria-label="Breadcrumb default example">
            <BreadcrumbItem>
              <BreadcrumbButton href={path1}>Home</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton href={path}>Issues</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton href={path}>
                {formData.vendorName}
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
              }}
            >
              <div style={{ right: "5%", display: "flex", gap: "10px" }}>
                <Input
                  type="text"
                  placeholder="Enter PO number"
                  value={poNumber}
                  onChange={(e) => setPoNumber(e.target.value)}
                />
                <Button
                  className="buttoncolor"
                  style={{ backgroundColor: "#3570c3", color: "white" }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>

            <h2 style={{ margin: "20px 0 20px 0" }}>
              Invoice No:{formData.invoiceId}
            </h2>
            <div
              style={{
                display: "flex",
                marginBottom: "20px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", marginBottom: "20px" }}>
                <div
                  style={{
                    borderLeft: "5px solid #342d7c",
                    paddingLeft: "10px",
                  }}
                >
                  <p>Supplier</p>
                  <h2>{formData.vendorName}</h2>
                </div>
                <div
                  style={{
                    marginLeft: "3vw",
                    borderLeft: "5px solid #9a3ca9",
                    paddingLeft: "10px",
                  }}
                >
                  <p>Status</p>
                  <h2>Revoked</h2>
                </div>
                <div
                  style={{
                    marginLeft: "3vw",
                    borderLeft: "5px solid black",
                    paddingLeft: "10px",
                  }}
                >
                  <p>Potential PO</p>
                  <h2>0</h2>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "25%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ArrowDownload28Regular
                    style={{ color: "#1281d7" }}
                    onClick={handleViewInvoice}
                  />{" "}
                  <span onClick={handleViewInvoice}> View Invoice</span>
                </div>
                <Button
                  className="buttoncolor"
                  style={{ backgroundColor: "#3570c3", color: "white" }}
                  onClick={handleformSubmit}
                >
                  Update form
                </Button>
              </div>
            </div>

            <div>
              <h2>Header</h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <div className={styles.formField}>
                  <label style={{ marginBottom: "5px" }}>Vendor Name</label>
                  <Input
                    name="vendorName"
                    value={formData.vendorName}
                    onChange={handleChange}
                    resize="none"
                  />
                </div>
                <div className={styles.formField}>
                  <label style={{ marginBottom: "5px" }}>Customer Name</label>
                  <Input
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="Type here..."
                    resize="none"
                  />
                </div>
                <div className={styles.formField}>
                  <label style={{ marginBottom: "5px" }}>Invoice Date</label>
                  <Input
                    name="invoiceDate"
                    value={formData.invoiceDate}
                    onChange={handleChange}
                    placeholder="Type here..."
                    resize="none"
                  />
                </div>
                <div className={styles.formField}>
                  <label style={{ marginBottom: "5px" }}>Invoice Total</label>
                  <Input
                    name="invoiceTotal"
                    value={formData.invoiceTotal}
                    onChange={handleChange}
                    placeholder="Type here..."
                    resize="none"
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <div className={styles.formField}>
                  <label style={{ marginBottom: "5px" }}>
                    Vendor Address Recipient
                  </label>
                  <Input
                    name="vendorAddressRecipient"
                    value={formData.vendorAddressRecipient}
                    onChange={handleChange}
                    placeholder="Type here..."
                    resize="none"
                  />
                </div>
                <div className={styles.formField}>
                  <label style={{ marginBottom: "5px" }}>
                    Customer Address Recipient
                  </label>
                  <Input
                    name="customerAddressRecipient"
                    value={formData.customerAddressRecipient}
                    onChange={handleChange}
                    placeholder="Type here..."
                    resize="none"
                  />
                </div>
                <div className={styles.formField}>
                  <label style={{ marginBottom: "5px" }}>Invoice ID</label>
                  <Input
                    name="invoiceId"
                    value={formData.invoiceId}
                    onChange={handleChange}
                    placeholder="Type here..."
                    resize="none"
                  />
                </div>
                <div className={styles.formField}>
                  <label style={{ marginBottom: "5px" }}>Customer ID</label>
                  <Input
                    name="customerId"
                    value={formData.customerId}
                    onChange={handleChange}
                    placeholder="Type here..."
                    resize="none"
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <div className={styles.formField}>
                  <label style={{ marginBottom: "5px" }}>
                    Billing Address Recipient
                  </label>
                  <Input
                    name="billingAddressRecipient"
                    value={formData.billingAddressRecipient}
                    onChange={handleChange}
                    placeholder="Type here..."
                    resize="none"
                  />
                </div>
                <div className={styles.formField}>
                  <label style={{ marginBottom: "5px" }}>
                    Shipping Address Recipient
                  </label>
                  <Input
                    name="shippingAddressRecipient"
                    value={formData.shippingAddressRecipient}
                    onChange={handleChange}
                    placeholder="Type here..."
                    resize="none"
                  />
                </div>
                <div className={styles.formField}>
                  <label style={{ marginBottom: "5px" }}>Due Date</label>
                  <Input
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    placeholder="Type here..."
                    resize="none"
                  />
                </div>
                <div className={styles.formField}>
                  <label style={{ marginBottom: "5px" }}>Purchase Order</label>
                  <Input
                    name="purchaseOrder"
                    value={formData.purchaseOrder}
                    onChange={handleChange}
                    placeholder="Type here..."
                    resize="none"
                  />
                </div>
              </div>
            </div>
            <h2 style={{ marginTop: "40px" }}>Lines</h2>
          </div>
        </div>
      </div>

      {/* Editable Table */}
      <div
        style={{
          marginTop: "-20px",
          height: `calc(95vh - ${height}px)`,
          overflowY: "auto",
        }}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>No</TableHeaderCell>
              <TableHeaderCell>Description</TableHeaderCell>
              <TableHeaderCell>Quantity</TableHeaderCell>
              <TableHeaderCell>Unit</TableHeaderCell>
              <TableHeaderCell>Unit Price</TableHeaderCell>

              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Subtotal</TableHeaderCell>
              <TableHeaderCell>Previous Unpaid Balance</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                {" "}
                {/* Use row.id for a unique key */}
                <TableCell>{row.id}</TableCell>
                {Object.keys(row)
                  .filter((key) => key !== "id")
                  .map((key) => (
                    <TableCell key={key}>
                      <Input
                        // appearance="underline"
                        value={row[key] || ""} // Fallback to empty string for null values
                        onChange={(e) =>
                          handleInputChange(index, key, e.target.value)
                        }
                        style={{ width: "100%" }}
                      />
                    </TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* <Button onClick={addLine} style={{ marginTop: "10px" }}>+ Add Line</Button> */}
      </div>
    </div>
  );
};

export default IssuefixDetails;
