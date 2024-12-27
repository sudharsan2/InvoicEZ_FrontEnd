import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
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
  Divider,
} from "@fluentui/react-components";
import line_data from "./data_approve";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { CgLayoutGrid } from "react-icons/cg";
import { ArrowDownload28Regular } from "@fluentui/react-icons";
/*eslint-disabled*/
import CreatableSelect from "react-select/creatable";
import { message } from "antd";
import { notification } from "antd";
import { ArrowSortUpFilled, ArrowSortDownRegular } from "@fluentui/react-icons";

const path = "/storeopenpo";
const path2 = "/storeopenpodet";
const path1 = "/storedashboard";

const useStyles = makeStyles({
  root: {
    // width: "77vw",
    // height: "88vh",
    // overflowY: "auto",
    // display: "flex",
    // flexDirection: "column",
  },

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
    // paddingTop: "3vh",
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
    maxWidth: "500px",
  },
  content: {
    fontSize: "13px",
    marginLeft: "10px",
  },
});

const StoreOpenPODetails = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const [PONumberOPtions, setPONumberOPtions] = useState([]);

  const handleCreate = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };

    setPONumberOPtions((prevOptions) => [...prevOptions, newOption]);
    setSelectedOption(newOption); // Set the newly created option as the selected one
  };

  const handleChange = (option) => {
    setSelectedOption(option);
    // console.log("Selected PO Number:", option ? option.value : null);
  };

  const styles = useStyles();
  const themestate = false;
  const [fetchedItems, setFetchedItems] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { poNumber, Id, po_type, locations, totals, Status, po_items, Supplier, Buyer } = location.state || {};
  // console.log("need", need_by);
  const [poDate, setPoDate] = useState();
  const [postatus, setPoStatus] = useState();
  const [buyer, setBuyer] = useState();
  const [total, setTotal] = useState();
  const [status, setStatus] = useState();
  const [supplier, setSupplier] = useState();
  const [vendor, setVendor] = useState("");
  const [customer, setCustomer] = useState();
  const [invoiceid, setInvoiceId] = useState();
  const [invoicedate, setInvoiceDate] = useState();
  const [invoicetot, setInvoicetot] = useState();
  const [closedcode, setClosedCode] = useState();
  const [entrytime, setentrytime] = useState();
  const [po_id, set_Po_id] = useState("");

  const [inv_id, setInv_id] = useState();

  console.log("Invoice Id", inv_id);






  const approvePo = async () => {
    const url = `https://invoicezapi.focusrtech.com:57/user/update-storeuser/${inv_id}`;

    try {

      const token = localStorage.getItem("access_token");

      const response = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        message.success("Gate Entry successfully Updated");
        navigate(`/approve`);
      }
      console.log("Success:", response.data); // Handle the response data
    } catch (error) {
      notification.error({
        message: "Gate Entry Failed",
        description: error.response?.data?.message || "An error occurred.",
      });
      console.error("Error:", error);
    }
  };

  const deleteInvoice = async () => {
    const url = `https://invoicezapi.focusrtech.com:57/user/delete-pos/${inv_id}`;

    try {

      const token = localStorage.getItem("access_token");

      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        message.success("Revoked successfully");
        navigate(`/approve`);
      }
    } catch (error) {
      message.error(`Operation Unsuccessful. Please try again`);
      console.error("Error:", error);
    }
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

    console.log("payload ", payload);

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
        navigate(`/approve`);
      } else {
        message.error(`Operation Unsuccessfully Please try again`);
      }
    } catch (error) {
      message.error(error);
    }
  };

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
  const [load, setLoad] = useState(false);

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

  // const headerSortProps = (columnId) => ({
  //   onClick: (e) => toggleColumnSort(e, columnId),
  //   sortDirection: getSortDirection(columnId),
  // });


  const handleSort = (column) => {
    if (sortedColumn === column) {

      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set sorting direction to ascending if a new column is clicked
      setSortedColumn(column);
      setSortDirection("asc");
    }
  };

  const headerSortProps = (column) => ({
    onClick: () => handleSort(column),
    style: {
      fontWeight: "bold",
      cursor: "pointer",
      maxWidth: column === "Description" ? "150px" : "200px", // Adjust width as needed
    },
  });

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

   useEffect(()=>{
     setData(po_items);
   },[])
  
  console.log("DATA--->",data);
   
  const needByDate = data?.[0]?.need_by_date;
   console.log("needByDate",needByDate);


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
          }
        );
        const fetchedItems = response.data;

        setInv_id(fetchedItems.invoice_info.id);
        set_Po_id(fetchedItems.po_header.id);

        console.log("InvoiceId", fetchedItems.invoice_info.id);


        const invoice_items = fetchedItems.invoice_info.items.map((item, index) => {
          // console.log("IGST", item.Igst);
          // console.log("CGST", item.Cgst);
          // console.log("SGST", item.Sgst);

          return {
            Igst: item.Igst,
            Cgst: item.Cgst,
            Sgst: item.Sgst,
            index: index, // Include the index to match with po_lineitems
          };
        });


        const normalizedPoLineItems = fetchedItems.po_lineitems.map(
          (poItem, index) => {
            console.log("PO", poItem);

            const matchingInvoiceItems = fetchedItems.invoice_info.items;

            const matchingInvoiceItem = invoice_items[index];
            const matchingQuantity = matchingInvoiceItems[index]
              ? matchingInvoiceItems[index].Quantity
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
          },
        );

        // Log or process the combined data as needed
        console.log("NORMAL", normalizedPoLineItems);

        // setData(normalizedPoLineItems);
        setTotal(fetchedItems.po_header.total_amount);
        setPoDate(fetchedItems.po_lineitems[0]?.promised_date || "N/A"); // Assuming the first date is used
        setPoStatus(fetchedItems.po_header.po_status);
        setVendor(fetchedItems.invoice_info.VendorAddress);
        setCustomer(fetchedItems.invoice_info.ShippingAddress);
        setInvoiceId(fetchedItems.invoice_info.InvoiceId);
        setInvoiceDate(fetchedItems.invoice_info.InvoiceDate);
        setInvoicetot(fetchedItems.invoice_info.InvoiceTotal);
        setSupplier(fetchedItems.po_header.supplier_name);
        setentrytime(fetchedItems.invoice_info.created_at);
        fetchedItems.po_lineitems.forEach((item) => {
          setClosedCode(item.closed_code);
        });
        // vendor address
        const vendorAddressObj = fetchedItems.invoice_info.VendorAddress;
        console.log("obj1", vendorAddressObj);

        if (vendorAddressObj) {
          const formattedVendorAddress = `
        ${vendorAddressObj.street_address || ""}
        ${vendorAddressObj.city || ""},
        ${vendorAddressObj.postal_code || ""},
        ${vendorAddressObj.country_region || ""}
    `
            .trim()
            .replace(/\s+/g, " ")
            .replace(/,$/, "");

          setVendor(formattedVendorAddress);
        } else {
          setVendor("NULL");
          console.error("VendorAddress is missing");
        }

        const vendorCustomerObj = fetchedItems.invoice_info.ShippingAddress;
        console.log("obj", vendorAddressObj);

        if (vendorCustomerObj) {
          const formattedCustomerAddress = `
        ${vendorCustomerObj.street_address || ""}
        ${vendorCustomerObj.city || ""},
        ${vendorCustomerObj.postal_code || ""},
        ${vendorCustomerObj.country_region || ""}
    `
            .trim()
            .replace(/\s+/g, " ")
            .replace(/,$/, "");

          setCustomer(formattedCustomerAddress);
        } else {
          setCustomer("NULL");
          console.error("CustomerAddress is missing");
        }
      } catch (error) {
        setError("Error fetching data. Please try again.");
        console.error(
          "Error fetching data:",
          error.response ? error.response.data : error.message,
        );
      } finally {
        setLoading(false);
      }
    };

    if (poNumber) {
      fetchData();
    }
  }, [poNumber]);

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

  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const sortedData = Array.isArray(data) ? [...data].sort((a, b) => {
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
  }) : [];




  return (
    <div style={{ height: "88vh", overflowY: "auto", overflowX: "auto" }}>
      <div>
        <div className="Approvebreadcrump">
          <Breadcrumb aria-label="Breadcrumb default example">
            <BreadcrumbItem>
              <BreadcrumbButton href={path1}>Home</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton href={path}>Open PO</BreadcrumbButton>
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
              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  width: "100%",
                  marginTop: "0px",
                }}
              >
                <div style={{ right: "5%", display: "flex", gap: "10px" }}>
                  <Button onClick={() => deleteInvoice()}>Revoke</Button>
                  <Button
                    className=" buttoncolor"
                    style={{ backgroundColor: "#3570c3", color: "white" }}
                    onClick={() => approvePo()}
                  >
                    Create Gate Entry
                  </Button>
                </div>
              </div> */}

              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  width: "100%",
                  marginTop: "20px",
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
                    marginTop: "20px",
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
                    cursor: loading ? "not-allowed" : "pointer", // Change cursor to not-allowed when loading
                    opacity: loading ? 0.6 : 1, // Change opacity when loading
                  }}
                  className={styles.wrapper}
                  onClick={handlePostApi}
                  disabled={load} // Disable button while loading
                >
                  {load ? (
                    <div
                      style={{
                        border: "4px solid rgba(255, 255, 255, 0.3)", // Light background
                        borderRadius: "50%",
                        borderTop: "4px solid #0078d4", // Main color
                        width: "20px",
                        height: "20px",
                        animation: "spin 1s linear infinite",
                        marginRight: "8px", // Space between spinner and text
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
              </div> */}

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
                  <h2>{Supplier}</h2>
                  {/* <h2>Levin</h2> */}
                </div>
                <div
                  style={{
                    marginLeft: "3vw",
                    borderLeft: "5px solid #9a3ca9",
                    paddingLeft: "10px",
                  }}
                >
                  <p>Type</p>
                  <h2>PO</h2>
                </div>
                <div
                  style={{
                    marginLeft: "3vw",
                    borderLeft: "5px solid black",
                    paddingLeft: "10px",
                  }}
                >
                  <p>Buyer</p>
                  <h2>{Buyer}</h2>
                </div>
                <div
                  style={{
                    marginLeft: "3vw",
                    borderLeft: "5px solid #FF7F7F",
                    paddingLeft: "10px",
                  }}
                >
                  <p>Need By Date</p>
                  <h2>{needByDate}</h2>
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
              {/* <div
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
              </div> */}
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

                  <div style={{ display: "flex", flexDirection: "row" }}>
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
                      {vendor}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
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
                      {needByDate}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: themestate ? "white" : "",
                      }}
                    >
                      PO Type:
                    </div>
                    <div
                      className={styles.content}
                      style={{ color: themestate ? "rgb(245,245,245)" : "" }}
                    >
                      {/* {purchaseOrder.customerAddress} */}
                      {po_type}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
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
                      {totals}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: themestate ? "white" : "",
                      }}
                    >
                      Location:
                    </div>
                    <div
                      className={styles.content}
                      style={{ color: themestate ? "rgb(245,245,245)" : "" }}
                    >
                      {/* {purchaseOrder.invoiceId} */}
                      {locations}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
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

                  <div style={{ display: "flex", flexDirection: "row" }}>
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
                      {Status}
                    </div>
                  </div>



                  {/* <div style={{ display: "flex", flexDirection: "row" }}>
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
                      {closedcode || "NULL"}
                    </div>
                  </div> */}

                  <div
                    className={`${styles.section} ${styles.invoiceCurrency}`}
                  >
                    {/* <divs
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: themestate ? "white" : "",
                      }}
                    >
                      Invoice Currency:
                    </div> */}
                    {/* <div
                      className={styles.content}
                      style={{ color: themestate ? "rgb(245,245,245)" : "" }}
                    >
                      {purchaseOrder.invoiceCurrency}
                    </div> */}
                  </div>

                  {/* <div
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
                  </div> */}
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
                  {/* <TableHeader
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
                        {...headerSortProps("PO_line_id")}
                      >
                        PO Line ID
                      </TableHeaderCell>
                      <TableHeaderCell
                        style={{
                          fontWeight: "bold",
                          cursor: "pointer",
                          maxWidth: "200px",
                        }}
                        {...headerSortProps("name")}
                      >
                        Name
                      </TableHeaderCell>
                      <TableHeaderCell
                        style={{
                          fontWeight: "bold",
                          cursor: "pointer",
                          maxWidth: "300px",
                        }}
                        {...headerSortProps("description")}
                      >
                        Description
                      </TableHeaderCell>
                      <TableHeaderCell
                        style={{
                          fontWeight: "bold",
                          cursor: "pointer",
                          maxWidth: "250px",
                        }}
                        {...headerSortProps("invoice_item_name")}
                      >
                        Invc Item Name
                      </TableHeaderCell>
                      <TableHeaderCell
                        style={{
                          fontWeight: "bold",
                          cursor: "pointer",
                          maxWidth: "150px",
                        }}
                        {...headerSortProps("unit_price")}
                      >
                        Unit Price
                      </TableHeaderCell>
                      <TableHeaderCell
                        style={{
                          fontWeight: "bold",
                          cursor: "pointer",
                          maxWidth: "150px",
                        }}
                        {...headerSortProps("quantity")}
                      >
                        Quantity
                      </TableHeaderCell>
                      <TableHeaderCell
                        style={{
                          fontWeight: "bold",
                          cursor: "pointer",
                          maxWidth: "150px",
                        }}
                        {...headerSortProps("invoice_quantity")}
                      >
                        Invoice Quantity
                      </TableHeaderCell>
                      <TableHeaderCell
                        style={{
                          fontWeight: "bold",
                          cursor: "pointer",
                          maxWidth: "150px",
                        }}
                        {...headerSortProps("invoice_quantity")}
                      >
                        Igst
                      </TableHeaderCell>
                      <TableHeaderCell
                        style={{
                          fontWeight: "bold",
                          cursor: "pointer",
                          maxWidth: "150px",
                        }}
                        {...headerSortProps("invoice_quantity")}
                      >
                        Cgst
                      </TableHeaderCell>
                      <TableHeaderCell
                        style={{
                          fontWeight: "bold",
                          cursor: "pointer",
                          maxWidth: "150px",
                        }}
                        {...headerSortProps("invoice_quantity")}
                      >
                        Sgst
                      </TableHeaderCell>
                    </TableRow>
                  </TableHeader> */}
                  {/* <TableHeader
                    style={{
                      position: "sticky",
                      top: 0,
                      backgroundColor: themestate ? "#383838" : "white",
                      zIndex: 1,
                      color: themestate ? "white" : "black",
                      maxWidth:"1000px",
                      overflow:"hidden",
                      whiteSpace:"nowrap",
                      textOverflow:"ellipsis"
                    }}
                  ></TableHeader> */}


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
                      <TableHeaderCell {...headerSortProps("item_name")}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                      Item Name
                        {sortedColumn === "item_name" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular /> : <ArrowSortUpFilled />
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("line_num")}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                      Line Number
                        {sortedColumn === "line_num" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular /> : <ArrowSortUpFilled />
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("quantity")}style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                      Quantity
                        {sortedColumn === "quantity" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular /> : <ArrowSortUpFilled />
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("unit_price")}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                      Unit Price
                        {sortedColumn === "unit_price" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular/> : <ArrowSortUpFilled/>
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("amount_billed")}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                      Amount Billed
                        {sortedColumn === "amount_billed" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular/> : <ArrowSortUpFilled/>
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("order_type_lookup_code")}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                      Order Type
                        {sortedColumn === "order_type_lookup_code" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular/> : <ArrowSortUpFilled/>
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("purchase_basis")}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                      Purchase Basis
                        {sortedColumn === "purchase_basis" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular/> : <ArrowSortUpFilled/>
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("category_name")}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                        Category Name
                        {sortedColumn === "category_name" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular/> : <ArrowSortUpFilled/>
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("closed_code")}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                        Closed Code
                        {sortedColumn === "closed_code" && (
                          sortDirection === "asc" ?<ArrowSortDownRegular/> : <ArrowSortUpFilled/>
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("item_description")}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                        Item Description
                        {sortedColumn === "item_description" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular/> : <ArrowSortUpFilled/>
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("need_by_date")}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                        Need By Date
                        {sortedColumn === "need_by_date" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular/> : <ArrowSortUpFilled/>
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("promised_date")}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                        Promised Date
                        {sortedColumn === "promised_date" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular/> : <ArrowSortUpFilled/>
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("po_line_id")}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                       PO Line_Id
                        {sortedColumn === "po_line_id" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular/> : <ArrowSortUpFilled/>
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("po_distribution_id")}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                        PO Distribution Id
                        {sortedColumn === "po_distribution_id" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular/> : <ArrowSortUpFilled/>
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("line_location_id")}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                        Line Location Id
                        {sortedColumn === "line_location_id" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular/> : <ArrowSortUpFilled/>
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("inventory_item_id")}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                        Inventory Item Id
                        {sortedColumn === "inventory_item_id" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular/> : <ArrowSortUpFilled/>
                        )}
                      </TableHeaderCell>
                    </TableRow>
                  </TableHeader>


                  <TableBody style={themestate ? { color: "white" } : {  }}>
                    {sortedData.map((item) => (
                      <TableRow
                        key={item.id}
                        style={themestate ? { color: "white" } : {}}
                        className={
                          themestate ? "hovereffect dark" : "hovereffect"
                        }
                      >
                        <TableCell
                          style={{
                            maxWidth: "150px",
                            // minWidth: "100px", 
                            whiteSpace: "wrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            padding: "8px 16px",
                            boxSizing: "border-box",
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
                          {item.line_num}
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
                          {item.unit_price
                          }
                        </TableCell>
                        <TableCell
                          style={{
                            maxWidth: "300px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.amount_billed
                          }
                        </TableCell>
                        <TableCell
                          style={{
                            maxWidth: "300px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.order_type_lookup_code
                          }
                        </TableCell>
                        <TableCell
                          style={{
                            maxWidth: "300px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.purchase_basis}
                        </TableCell>
                        <TableCell
                          style={{
                            maxWidth: "300px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.category_name
                          }
                        </TableCell>
                        <TableCell
                          style={{
                            maxWidth: "300px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.closed_code}
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
                          {item.need_by_date}
                        </TableCell>
                        <TableCell
                          style={{
                            maxWidth: "300px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.promised_date}
                        </TableCell>
                        <TableCell
                          style={{
                            maxWidth: "300px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.po_line_id
                          }
                        </TableCell>
                        <TableCell
                          style={{
                            maxWidth: "300px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.po_distribution_id
                          }
                        </TableCell>
                        <TableCell
                          style={{
                            maxWidth: "300px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.line_location_id
                          }
                        </TableCell>
                        <TableCell
                          style={{
                            maxWidth: "300px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.inventory_item_id
                          }
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

export default StoreOpenPODetails;
