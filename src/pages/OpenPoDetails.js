import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


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

import { useParams } from "react-router-dom";

import { ArrowSortUpFilled, ArrowSortDownRegular } from "@fluentui/react-icons";

const path = "/openpo";
const path2 = "/openpodet";
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

const OpenPODetails = () => {
  const location = useLocation();

  const { poNumber, po_type, locations, totals, Status, po_items, Supplier, Buyer, pono } = location.state || {};

  const [purchaseOrder, setPurchaseOrder] = useState({});
  const [purchaseOrderCalender, setPurchaseOrderCalender] = useState();



  const styles = useStyles();
  const themestate = false;

  const navigate = useNavigate();




  const [data, setData] = useState("");
  const [selectedtab, setSelectedTab] = React.useState("tab1");
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // ------Style----------

  const tabStyle = themestate ? "tab dark drawer" : "tab";
  const colorStyle = themestate ? "white" : "";
  const divStyle = { color: themestate ? "rgb(245,245,245)" : "" };
  const backStyle = themestate ? "#383838" : "white";
  const themeStyle = themestate ? "white" : "black";
  const tableRowStyle = themestate ? { color: "white", borderBottomColor: "#383838" } : {};
  const bodyStyle = themestate ? { color: "white" } : {};
  const divStyles = themestate ? "hovereffect dark" : "hovereffect"



  const handleTabSelect2 = (event, data) => {
    console.log("876", data.value);
    setSelectedTab(data.value);
  };


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
      maxWidth: column === "Description" ? "150px" : "200px", // Adjust width as needed
    },
  });

  const TableHeaderCellWithSort = ({ column, label, sortedColumn, sortDirection, headerSortProps }) => (
    <TableHeaderCell {...headerSortProps(column)}>
      {label}
      {sortedColumn === column && (
        sortDirection === "asc" ? <ArrowSortDownRegular /> : <ArrowSortUpFilled />
      )}
    </TableHeaderCell>
  );


  useEffect(() => {
    setData(po_items);
  }, [])

  useEffect(() => {
    // If location.state is undefined, fallback to fetching data

    console.log("purchaseOrder", purchaseOrder)
    if (pono) {
      const fetchPODetails = async () => {
        try {
          const response = await fetch(`https://invoicezapi.focusrtech.com:57/user/OpenPos/${pono}`);
          const data = await response.json();
          console.log("data", data)
          setPurchaseOrder(data);
          setPurchaseOrderCalender(data);
          setData(data.po_items);
        } catch (error) {
        }
      };

      fetchPODetails();
    } else {
      // If state exists, set the purchase order directly
      setPurchaseOrder({
        poNumber,
        poTotalAmount: "95090",
        poCurrency: "INR",
        poStatus: "Open",
        lineMatching: "FULL / Partial Line Items",
        customerAddress: "CustomerAddress",
        invoiceDate: "InvoiceDate",
        invoiceTotal: "InvoiceTotal",
        invoiceCurrency: "Invoice Currency",
        purchaseOrderNumberInInvoice: "PurchaseOrder Number in Invoice",
      });
    }
  }, [poNumber, navigate, pono,po_items]);

  if (!purchaseOrder) {
    return <div>Loading...</div>;
  }
  const needByDate = data?.[0]?.need_by_date;
  console.log("needByDate", needByDate);


  const compareNumeric = (aValue, bValue, direction) => {
    const aNumeric = parseFloat(aValue);
    const bNumeric = parseFloat(bValue);
    return direction === "asc" ? aNumeric - bNumeric : bNumeric - aNumeric;
  };

  const compareString = (aValue, bValue, direction) => {
    const aString = String(aValue).toLowerCase();
    const bString = String(bValue).toLowerCase();
    return direction === "asc" ? aString.localeCompare(bString) : bString.localeCompare(aString);
  };

  const isNumeric = (value) => !isNaN(parseFloat(value)) && isFinite(value);

  const getValueForSorting = (row, column) => row[column] || "";

  const sortByType = (aValue, bValue, sortDirection, type) => {
    if (type === "numeric") {
      return compareNumeric(aValue, bValue, sortDirection);
    }
    return compareString(aValue, bValue, sortDirection);
  };

  const compareValues = (aValue, bValue, isANumeric, isBNumeric, sortDirection) => {
    if (isANumeric && isBNumeric) {
      return sortByType(aValue, bValue, sortDirection, "numeric");
    }
    if (!isANumeric && !isBNumeric) {
      return sortByType(aValue, bValue, sortDirection, "string");
    }

    const directionMultiplier = sortDirection === "asc" ? -1 : 1;
    return isANumeric ? directionMultiplier : -directionMultiplier;
  };


  const sortedData = Array.isArray(data)
    ? [...data].sort((a, b) => {
      if (!sortedColumn) return 0;

      const aValue = getValueForSorting(a, sortedColumn);
      const bValue = getValueForSorting(b, sortedColumn);

      const isANumeric = isNumeric(aValue);
      const isBNumeric = isNumeric(bValue);

      return compareValues(aValue, bValue, isANumeric, isBNumeric, sortDirection);
    })
    : [];



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
              <BreadcrumbButton href={path}>Open PO</BreadcrumbButton>
            </BreadcrumbItem>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton href={path2}>PO:{poNumber || purchaseOrderCalender?.po_number}</BreadcrumbButton>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div style={{ maxHeight: "20vh" }}>
          <div className={styles.root}>
            <div className={styles.header}>


              <h2 style={{ margin: "20px 0 20px 0" }}>
                PO:{`${purchaseOrder?.poNumber || purchaseOrderCalender?.po_number}`}
              </h2>

              <div style={{ display: "flex", marginBottom: "20px" }}>
                <div
                  style={{
                    borderLeft: "5px solid #342d7c",
                    paddingLeft: "10px",
                  }}
                >
                  <p>Supplier</p>
                  <h2>{`${Supplier || purchaseOrderCalender?.supplier_name}`}</h2>

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
                  <h2>{`${Buyer || purchaseOrderCalender?.buyer_name}`}</h2>
                </div>
                <div
                  style={{
                    marginLeft: "3vw",
                    borderLeft: "5px solid #FF7F7F",
                    paddingLeft: "10px",
                  }}
                >
                  <p>Need By Date</p>
                  <h2>{needByDate || purchaseOrderCalender?.po_items[0].need_by_date}</h2>
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
                className={tabStyle}
                style={{ border: "1px solid transparent" }}
              >
                Header
              </Tab>
              <Tab
                value="tab2"
                className={tabStyle}
                style={{ border: "1px solid transparent" }}
              >
                Line Item
              </Tab>

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
                        color: { colorStyle }
                      }}
                    >
                      PO Number:
                    </div>
                    <div
                      className={styles.content}
                      style={divStyle}
                    >

                      {`${poNumber || purchaseOrderCalender?.po_number}`}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: { colorStyle }
                      }}
                    >
                      Vendor Address:
                    </div>
                    <div
                      className={styles.content}
                      style={divStyle}
                    >

                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: { colorStyle },
                      }}
                    >
                      PO Date:
                    </div>
                    <div
                      className={styles.content}
                      style={divStyle}
                    >

                      {`${needByDate || purchaseOrderCalender?.po_items[0].need_by_date}`}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: { colorStyle },
                      }}
                    >
                      PO Type:
                    </div>
                    <div
                      className={styles.content}
                      style={divStyle}
                    >

                      {`${po_type || purchaseOrderCalender?.po_type}`}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: { colorStyle },
                      }}
                    >
                      PO Total Amount:
                    </div>
                    <div
                      className={styles.content}
                      style={divStyle}
                    >
                      {`${totals || purchaseOrderCalender?.total_amount}`}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: { colorStyle },
                      }}
                    >
                      Location:
                    </div>
                    <div
                      className={styles.content}
                      style={divStyle}
                    >

                      {`${locations || purchaseOrderCalender?.location}`}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: { colorStyle },
                      }}
                    >
                      PO Currency:
                    </div>
                    <div
                      className={styles.content}
                      style={divStyle}
                    >
                      {`${purchaseOrder?.poCurrency || "INR"}`}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div
                      className={styles.heading}
                      style={{
                        fontWeight: "bold",
                        color: { colorStyle },
                      }}
                    >
                      PO Status:
                    </div>
                    <div
                      className={styles.content}
                      style={divStyle}
                    >
                      {`${Status || purchaseOrderCalender?.po_status}`}
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
                width: "90vw",
                display: "flex",
                overflowY: "auto",
                overflowX: "auto",
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
                      backgroundColor: { backStyle },
                      zIndex: 1,
                      color: { themeStyle },

                    }}
                  >

                    <TableRow
                      style={
                        tableRowStyle
                      }
                    >
                      <TableHeaderCellWithSort column="item_name" label="Item Name" sortedColumn={sortedColumn} sortDirection={sortDirection} headerSortProps={headerSortProps} />
                      <TableHeaderCellWithSort column="line_num" label="Line Number" sortedColumn={sortedColumn} sortDirection={sortDirection} headerSortProps={headerSortProps} />
                      <TableHeaderCellWithSort column="quantity" label="Quantity" sortedColumn={sortedColumn} sortDirection={sortDirection} headerSortProps={headerSortProps} />
                      <TableHeaderCellWithSort column="unit_price" label="Unit Price" sortedColumn={sortedColumn} sortDirection={sortDirection} headerSortProps={headerSortProps} />
                      <TableHeaderCellWithSort column="amount_billed" label="Amount Billed" sortedColumn={sortedColumn} sortDirection={sortDirection} headerSortProps={headerSortProps} />
                      <TableHeaderCellWithSort column="order_type_lookup_code" label=" Order Type" sortedColumn={sortedColumn} sortDirection={sortDirection} headerSortProps={headerSortProps} />
                      <TableHeaderCellWithSort column="purchase_basis" label="Purchase Basis" sortedColumn={sortedColumn} sortDirection={sortDirection} headerSortProps={headerSortProps} />
                      <TableHeaderCellWithSort column="category_name" label="Category Name" sortedColumn={sortedColumn} sortDirection={sortDirection} headerSortProps={headerSortProps} />
                      <TableHeaderCellWithSort column="category_name" label="Category Name" sortedColumn={sortedColumn} sortDirection={sortDirection} headerSortProps={headerSortProps} />
                      <TableHeaderCellWithSort column="item_description" label="Item Description" sortedColumn={sortedColumn} sortDirection={sortDirection} headerSortProps={headerSortProps} />
                      <TableHeaderCellWithSort column="need_by_date" label="Need By Date" sortedColumn={sortedColumn} sortDirection={sortDirection} headerSortProps={headerSortProps} />
                      <TableHeaderCellWithSort column="promised_date" label="Promised Date" sortedColumn={sortedColumn} sortDirection={sortDirection} headerSortProps={headerSortProps} />
                      <TableHeaderCellWithSort column="po_line_id" label="PO Line_Id" sortedColumn={sortedColumn} sortDirection={sortDirection} headerSortProps={headerSortProps} />
                      <TableHeaderCellWithSort column="po_distribution_id" label="PO Distribution Id" sortedColumn={sortedColumn} sortDirection={sortDirection} headerSortProps={headerSortProps} />
                      <TableHeaderCellWithSort column="line_location_id" label="Line Location Id" sortedColumn={sortedColumn} sortDirection={sortDirection} headerSortProps={headerSortProps} />
                      <TableHeaderCellWithSort column="inventory_item_id" label="Inventory Item Id" sortedColumn={sortedColumn} sortDirection={sortDirection} headerSortProps={headerSortProps} />
                    </TableRow>
                  </TableHeader>



                  <TableBody style={bodyStyle}>
                    {sortedData.map((item) => (
                      <TableRow
                        key={item.id}
                        style={bodyStyle}
                        className={
                          divStyles
                        }
                      >
                        <TableCell
                          style={{
                            maxWidth: "150px",

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

export default OpenPODetails;
