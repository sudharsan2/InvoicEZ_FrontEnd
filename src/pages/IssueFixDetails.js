import { useState, useEffect, useRef } from "react";
import React from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { notification } from "antd";
import { ArrowSortUpFilled, ArrowSortDownRegular } from "@fluentui/react-icons";
import { Add24Regular, Delete24Regular } from "@fluentui/react-icons";
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
  Checkbox,
  createTableColumn,
  useTableFeatures,
  useTableSort,
} from "@fluentui/react-components";
import { refreshActions } from "../Store/Store";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@fluentui/react/lib/TextField";
import line_data from "./data_approve";
import "./dashboard.css";
import { message } from "antd";
import { ArrowDownload28Regular } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
// import { refreshActions } from "../Store/Store";
const path = "/issuefix";
const path1 = "/dashboard";

const useStyles = makeStyles({
  root: {
    // width: "80vw",
    height: "88vh",
    overflowY: "auto",
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
  const navigate = useNavigate();
  const [height, setHeight] = useState(0);
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      setHeight(divRef.current.offsetHeight); // Calculate the height of the div based on its content
    }
  }, []);
  // const dispatch = useDispatch();
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
    entrytime: ""
  });

  const location = useLocation();
  const { invoiceNo } = location.state || {};

  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        // const response = await axios.get(
        //   `https://invoicezapi.focusrtech.com:57/user/invoices-update/${invoiceNo}/`,
        // );
        const token = localStorage.getItem("access_token"); // Retrieve the token securely

        const response = await axios.get(
          `https://invoicezapi.focusrtech.com:57/user/invoices-update/${invoiceNo}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the authorization header
            },
          }
        );
        const data = response.data.invoice_info;
        console.log("New ", data);
        // Assuming 'items' is the correct property from your API response
        // const items = data || [];
        console.log("ITEMS", data.id);
        setRows(
          data.map((item, index) => ({
            id: item.id,
            inv_id: item.id,
            Description: item.items.Description || "",
            Quantity: item.items.Quantity || "",
            Unit: item.items.Unit || "",
            UnitPrice: item.items.UnitPrice || "",
            // ProductCode: item.ProductCode || "",
            Amount: item.items.Amount || "",
            SubTotal: item.items.SubTotal || "",
            // TotalTax: item.TotalTax || "",
            // Date: item.Date || "",
            // Tax: item.Tax || "",
            PreviousUnpaidBalance: item.items.PreviousUnpaidBalance || "",
            Igst: item.items.Igst || "",
            Cgst: item.items.Cgst || "",
            Sgst: item.items.Sgst || "",
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
  // 2
  // const handleInputChange = (index, key, value) => {
  //   setRows((prevRows) =>
  //     prevRows.map((row, i) => (i === index ? { ...row, [key]: value } : row)),
  //   );
  // };

  const [poNumber, setPoNumber] = useState("");

  const handleSubmit = async () => {

    const apiUrl = "https://invoicezapi.focusrtech.com:57/user/po-number";

    try {

      const token = localStorage.getItem("access_token");

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          po_number: poNumber,
          invoice_id: invoiceNo,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit PO");
      }

      if (response.status === 201) {
        message.success("PO successfully Updated");
        navigate(`/approve`);
      }

      const data = await response.json();
      console.log("API response:", data);
    } catch (error) {
      message.error(error);
      console.error("Error submitting PO:", error);
    }
  };

  const [fulldata, setFulldata] = useState({}); // Add state for full data
  const [completedata, setCompletedata] = useState({});
  const [oldrow, setOldrow] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  // Fetch data from the API when the component mounts
  const fetchData = async () => {
    try {
      // const response = await axios.get(
      //   `https://invoicezapi.focusrtech.com:57/user/invoices-update/${invoiceNo}/`,
      // );
      const token = localStorage.getItem("access_token"); // Retrieve the token securely

      const response = await axios.get(
        `https://invoicezapi.focusrtech.com:57/user/invoices-update/${invoiceNo}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
        entrytime: data.created_at,
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
          Igst: item.Igst,
          Cgst: item.Cgst,
          Sgst: item.Sgst,
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
        data.items.map((item, index) => ({
          // id: index+1,
          // inv_id:data.id,
          id: item.id,
          Description: item.Description,
          Quantity: item.Quantity,
          Unit: item.Unit,
          UnitPrice: item.UnitPrice,
          Amount: item.Amount,
          SubTotal: item.SubTotal,
          PreviousUnpaidBalance: item.PreviousUnpaidBalance,
          Igst: item.Igst,
          Cgst: item.Cgst,
          Sgst: item.Sgst


        })),
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {

    fetchData();
  }, []);



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
      created_at: formData.entrytime,
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
          Igst: item.Igst,
          Cgst: item.Cgst,
          Sgst: item.Cgst,
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
    console.log("ITEMS", updatedFulldata);
    try {

      const token = localStorage.getItem("access_token");


      const response = await fetch(
        `https://invoicezapi.focusrtech.com:57/user/invoices-update/${invoiceNo}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            invoice_info: updatedFulldata,
            po_headers: [],
          }),
        },
      );

      if (response.ok) {
        console.log("Form data updated successfully");
        message.success("Updated Successfully!!!");
        dispatch(refreshActions.toggleInvoiceUploadRefresh());

      } else {
        console.error("Error updating form data");
      }
    } catch (error) {
      console.error("Network error:", error);
      message.error("Update failed");
    }
  };

  // const handleInputChange = (index, field, value) => {
  //   const newRows = [...rows];
  //   newRows[index][field] = value;
  //   setRows(newRows);
  // };

  // const addLine = () => {
  //   setRows([
  //     ...rows,
  //     {
  //       no: rows.length + 1,
  //       type: "",
  //       amount: "",
  //       description: "",
  //       poLine: "",
  //       unitPrice: "",
  //       quantity: "",
  //       unitOfMeasurement: "",
  //       taxAmount: "",
  //       hsnCode: "",
  //     },
  //   ]);
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();
  const InvoiceUploadRefresh = useSelector((state) => state.refresh.InvoiceUploadRefresh);
  const isInvoiceUploadRefreshed = useSelector(
    (state) => state.refresh.InvoiceUploadRefresh,
  );

  useEffect(() => {
    console.log("InvoiceUploadRefresh has changed:", InvoiceUploadRefresh);
    fetchData();
  }, [isInvoiceUploadRefreshed]);


  // const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState(new Set());


  const [tableData, setTableData] = useState(rows);
  // Toggle selection of a single row
  // const toggleRowSelection = (rowId) => {
  //   console.log("Row ID",rowId);
  //   setSelectedRows((prevSelectedRows) =>
  //     prevSelectedRows.includes(rowId)
  //       ? prevSelectedRows.filter((id) => id !== rowId) // Deselect row
  //       : [...prevSelectedRows, rowId] // Select row
  //   );
  //   console.log("Selected Rows",selectedRows);
  // };
  console.log("ROWS", rows)


  // const handleDeleteSelectedRows = async () => {

  //   if (selectedRows.length === 0) {
  //     notification.warning({
  //       message: "No PO Selected",
  //       description: "Please select at least one PO to delete.",
  //     });
  //     return;
  //   }

  //   try {


  //     const deletePromises = selectedRows.map((inv_id) =>
  //       axios.delete(
  //         `https://invoicezapi.focusrtech.com:57/user/delete-invoice-item/${inv_id}/`,
  //       ),
  //     );

  //     await Promise.all(deletePromises);




  //     notification.success({
  //       message: "Successfully deleted",

  //     });

  //     // dispatch(refreshActions.toggleInvoiceUploadRefresh());
  //   } catch (error) {

  //     notification.error({
  //       message: "Deletion Failed",

  //     });
  //   }
  // };


  const handleDeleteSelectedRows = async () => {
    const selectedItemsArray = Array.from(selectedRows); // Convert Set to Array
    if (selectedItemsArray.length === 0) {
      notification.warning({
        message: "No PO Selected",
        description: "Please select at least one PO to delete.",
      });
      return;
    }

    try {
      const token = localStorage.getItem("access_token"); // Retrieve the token securely

      const deletePromises = selectedItemsArray.map((inv_id) =>
        axios.delete(
          `https://invoicezapi.focusrtech.com:57/user/delete-invoice-item/${inv_id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the authorization header
            },
          }
        )
      );

      await Promise.all(deletePromises);

      const updatedRows = rows.filter(
        (item) => !selectedItemsArray.includes(item.inv_id),
      );

      setRows(updatedRows);
      setSelectedRows(new Set());

      notification.success({
        message: "Successfully deleted",
        description: `Deleted items: ${selectedItemsArray.join(", ")}`,
      });

      dispatch(refreshActions.toggleInvoiceUploadRefresh()); // Trigger refresh action if necessary
    } catch (error) {
      notification.error({
        message: "Deletion Failed",
        description: `Deletion failed. ${error.response?.data?.message || "An error occurred."
          }`,
      });
    }
  };




  const handleViewInvoice = async () => {
    try {
      const token = localStorage.getItem("access_token"); // Retrieve the token securely

      const response = await fetch(
        `https://invoicezapi.focusrtech.com:57/user/invoices-file/${invoiceNo}`,
        {
          method: "GET", // Specify the HTTP method explicitly
          headers: {
            Authorization: `Bearer ${token}`, // Add the authorization header
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

  const handlePOChange = (event) => { };

  // Adding new row

  const [rows1, setRows1] = useState([
    {
      id: 1,
      description: "",
      quantity: "",
      unit: "",
      unitPrice: "",
      amount: "",
      subtotal: "",
      previousUnpaidBalance: "",
      Igst: "",
      Cgst: "",
      Sgst: "",
    },
  ]);

  // const handleInputChange = (index, key, value) => {
  //   setRows1((prevRows) =>
  //     prevRows.map((row, i) =>
  //       i === index ? { ...row, [key]: value } : row
  //     )
  //   );
  // };


  const handleInputChange = (index, key, value) => {
    const updatedRows = [...rows];
    updatedRows[index][key] = value;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    const newRow = {
      // id: rows.length + 1, // increment the id based on the current rows
      Description: "",
      Quantity: "",
      Unit: "",
      UnitPrice: "",
      Amount: "",
      Subtotal: "",
      PreviousUnpaidBalance: "",
      Igst: "",
      Cgst: "",
      Sgst: "",
    };
    setRows((prevRows) => [...prevRows, newRow]);
  };

  console.log("Update Row", rows)



  // checkbox




  // const toggleRowSelection = (rowid) => {
  //   console.log("Invoice ID:", rowid);

  //   setSelectedRows((prevSelectedRows) =>
  //     prevSelectedRows.includes(rowid)
  //       ? prevSelectedRows.filter((id) => id !== rowid) // Deselect row
  //       : [...prevSelectedRows, rowid] // Select row
  //   );

  //   console.log("Selected Rows:", selectedRows);
  // };

  const toggleRowSelection = (rowid) => {
    console.log("Invoice ID:", rowid);

    setSelectedRows((prevSelectedRows) => {
      const newSet = new Set(prevSelectedRows);
      if (newSet.has(rowid)) {
        newSet.delete(rowid); // Deselect row
      } else {
        newSet.add(rowid); // Select row
      }
      return newSet;
    });

    console.log("Selected Rows:", Array.from(selectedRows));
  };
  // const toggleSelectAll = () => {
  //   if (selectedRows.length === rows.length) {
  //     setSelectedRows([]); // Deselect all
  //     console.log("Deselect All");
  //   } else {
  //     const allSelectedRows = rows.map((row) => row.id);
  //     setSelectedRows(allSelectedRows); // Select all rows by their `id`
  //     console.log("Selected Rows:", allSelectedRows); // Log selected rows
  //   }
  // };

  const toggleSelectAll = () => {
    if (selectedRows.size === rows.length) {
      setSelectedRows(new Set()); // Deselect all rows
      console.log("Deselect All");
    } else {
      const allSelectedRows = new Set(rows.map((row) => row.id)); // Map `row.id` for consistency
      setSelectedRows(allSelectedRows); // Select all rows
      console.log("Selected Rows:", Array.from(allSelectedRows)); // Log selected rows
    }
  };

  // sorting
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
  const [sortDirection, setSortDirection] = useState('asc');

  const sortedData = [...rows].sort((a, b) => {
    if (!sortedColumn) return 0;

    const aValue = a[sortedColumn] || "";
    const bValue = b[sortedColumn] || "";


    const isANumeric = !isNaN(parseFloat(aValue)) && isFinite(aValue);
    const isBNumeric = !isNaN(parseFloat(bValue)) && isFinite(bValue);


    if (isANumeric && isBNumeric) {
      const aNumeric = parseFloat(aValue);
      const bNumeric = parseFloat(bValue);
      return sortDirection === "asc" ? aNumeric - bNumeric : bNumeric - aNumeric;
    }


    if (!isANumeric && !isBNumeric) {
      const aString = String(aValue).toLowerCase();
      const bString = String(bValue).toLowerCase();
      return sortDirection === "asc" ? aString.localeCompare(bString) : bString.localeCompare(aString);
    }


    if (isANumeric && !isBNumeric) return sortDirection === "asc" ? -1 : 1;
    if (!isANumeric && isBNumeric) return sortDirection === "asc" ? 1 : -1;

    return 0;
  });



  const areAllSelected = selectedRows.length === rows.length;
  return (
    <div>
      <div>
        <div ref={divRef}>
          <div className="Approvebreadcrump">
            <Breadcrumb aria-label="Breadcrumb default example">
              <BreadcrumbItem>
                <BreadcrumbButton href={path1}>Home</BreadcrumbButton>
              </BreadcrumbItem>
              <BreadcrumbDivider />
              {/* <BreadcrumbItem>
                <BreadcrumbButton href={path}>Issues</BreadcrumbButton>
              </BreadcrumbItem>
              <BreadcrumbDivider /> */}
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
                      marginLeft: "1vw",
                      borderLeft: "5px solid #9a3ca9",
                      paddingLeft: "10px",
                    }}
                  >
                    <p>Status</p>
                    <h2>Revoked</h2>
                  </div>
                  <div
                    style={{
                      marginLeft: "2vw",
                      borderLeft: "5px solid black",
                      paddingLeft: "10px",
                    }}
                  >
                    <p>Potential PO</p>
                    <h2>0</h2>
                  </div>
                  <div
                    style={{
                      marginLeft: "2vw",
                      borderLeft: "5px solid #FF7F7F",
                      paddingLeft: "10px",
                    }}
                  >
                    <p>Entry Time</p>
                    <h2>{formData.entrytime}</h2>
                  </div>
                </div>

                <div style={{ marginTop: "120px", display: "flex" }}>

                  <ArrowDownload28Regular
                    style={{
                      color: "#1281d7",
                      marginTop: "10px",
                      // marginRight: "00px"
                    }}
                    onClick={handleViewInvoice}
                  />{" "}
                  <span style={{
                    marginTop: "10px",
                    marginRight: "20px"

                  }} onClick={handleViewInvoice}> View Invoice</span>
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
                    <label style={{ marginBottom: "5px" }}>
                      Purchase Order
                    </label>
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

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", marginTop: "1.5em", marginBottom: "2em" }}>
                  <h2 >Lines</h2>

                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.5em", marginBottom: "2em", gap: "20px" }}>
                <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "4px", 
    backgroundColor: isHovered2 ? "#e1e1e2" : "transparent",
    padding: "6px 12px", 
    borderRadius: "4px", 
    cursor: "pointer",
  }}
  onMouseEnter={() => setIsHovered2(true)}
  onMouseLeave={() => setIsHovered2(false)}
  onClick={handleAddRow}
>
  <Add24Regular
    style={{
      color: "#1281d7", 
      fontSize: "20px",
      marginRight:"5px"
    }}
  />
  <span
    style={{
      fontSize: "14px",
      color: "#000",
      
    }}
  >
    Add
  </span>
</div>



<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "4px", 
    backgroundColor: isHovered ? "#e1e1e2" : "transparent",
    padding: "6px 12px", 
    borderRadius: "4px", 
    cursor: "pointer",
  }}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  onClick={handleDeleteSelectedRows}
>
  <Delete24Regular
    style={{
      color: "#1281d7", 
      fontSize: "20px",
      marginRight:"5px"
    }}
  />
  <span
    style={{
      fontSize: "14px",
      color: "#000",
      
    }}
  >
    Delete
  </span>
</div>

                  
                  {/* <Button style={{backgroundColor:"#3570c3",color:"white",cursor:"pointer",padding:"2px",height:"35px"}} onClick={handleDeleteSelectedRows}>Delete</Button> */}
                  {/* <Delete24Regular style={{ cursor: "pointer", padding: "2px", height: "35px", color: "#1281d7" }} onClick={handleDeleteSelectedRows}></Delete24Regular><span style={{ fontSize: "14px", color: "#000", marginTop: "6px", marginLeft: "-6px",cursor:"pointer" }}>Delete</span> */}
                </div>

              </div>


              <div
                style={{
                  marginTop: "-20px",
                }}
              >
                <Table style={{tableLayout:"auto"}}>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderCell>
                        <Checkbox
                          checked={areAllSelected}
                          onChange={toggleSelectAll}
                          title="Select All"
                        />
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("id")}>No
                        {sortedColumn === "id" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular /> : <ArrowSortUpFilled />
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("Description")}>Description
                        {sortedColumn === "Description" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular /> : <ArrowSortUpFilled />
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("Quantity")}>Quantity
                        {sortedColumn === "Quantity" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular /> : <ArrowSortUpFilled />
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("Unit")}>Unit
                        {sortedColumn === "Unit" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular /> : <ArrowSortUpFilled />
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("UnitPrice")}>Unit Price
                        {sortedColumn === "UnitPrice" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular /> : <ArrowSortUpFilled />
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("Amount")}>Amount
                        {sortedColumn === "Amount" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular /> : <ArrowSortUpFilled />
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("SubTotal")}>Subtotal
                        {sortedColumn === "SubTotal" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular /> : <ArrowSortUpFilled />
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("PreviousUnpaidBalance")}>Previous Unpaid Balance
                        {sortedColumn === "PreviousUnpaidBalance" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular /> : <ArrowSortUpFilled />
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("Igst")}>Igst
                        {sortedColumn === "Igst" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular /> : <ArrowSortUpFilled />
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("Cgst")}>Cgst
                        {sortedColumn === "Cgst" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular /> : <ArrowSortUpFilled />
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("Sgst")}>Sgst
                        {sortedColumn === "Sgst" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular /> : <ArrowSortUpFilled />
                        )}
                      </TableHeaderCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedData.map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.has(row.id)}
                            onChange={() => toggleRowSelection(row.id)}
                          />
                        </TableCell>
                        <TableCell>{index + 1}</TableCell> {/* Dynamic numbering */}
                        {Object.keys(row)
                          .filter((key) => key !== "id")
                          .map((key) => (
                            <TableCell key={key}>
                              <input
                                value={row[key] || ""} // Fallback to empty string for null values
                                onChange={(e) => handleInputChange(index, key, e.target.value)}
                                style={{ width: "100%", border: "none", marginLeft: "-15px" }}
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
          </div>
        </div>

        {/* Editable Table */}
      </div>
    </div>
  );
};

export default IssuefixDetails;