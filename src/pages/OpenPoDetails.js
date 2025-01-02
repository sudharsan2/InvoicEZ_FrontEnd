import { useEffect, useState } from "react";
import React from "react";

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
  createTableColumn,
 
  Divider,
} from "@fluentui/react-components";

import { useLocation } from "react-router-dom";

import { ArrowSortUpFilled, ArrowSortDownRegular } from "@fluentui/react-icons";

const path = "/openpo";
const path2 = "/openpodet";
const path1 = "/dashboard";

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
  
  

  

  const styles = useStyles();
  const themestate = false;
  
  
  const location = useLocation();
  const { poNumber, Id ,po_type ,locations,totals,Status,po_items,Supplier,Buyer} = location.state || {};
  
 

  




  

  
  

  
  
  

  const [data, setData] = useState("");
 

  const handleTabSelect2 = (event, data) => {
    
    setSelectedTab(data.value);
  };

  

  

  


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

  
   useEffect(()=>{
     setData(po_items);
   },[])

   const needByDate = data?.[0]?.need_by_date;
   console.log("needByDate",needByDate);
   
   
   const [selectedtab, setSelectedTab] = React.useState("tab1");
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
  
  
 

  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const sortedData = [...data].sort((a, b) => {
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
      const aString = String(aValue).toLowerCase(); // Normalize for case-insensitive comparison
      const bString = String(bValue).toLowerCase();
      return sortDirection === "asc" ? aString.localeCompare(bString) : bString.localeCompare(aString);
    }

    
    if (isANumeric && !isBNumeric) return sortDirection === "asc" ? -1 : 1;
    if (!isANumeric && isBNumeric) return sortDirection === "asc" ? 1 : -1;

    return 0; 
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
                overflowX:"auto",
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
                        minWidth: "150px", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "space-between", 
                      }}>
                      Item Name
                        {sortedColumn === "item_name" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular style={{ width: "16px", height: "26px" }}/> : <ArrowSortUpFilled style={{ width: "16px", height: "16px" }}/>
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("line_num")}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        minWidth: "150px",
                      }}>
                      Line Number
                        {sortedColumn === "line_num" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular style={{ width: "16px", height: "16px" }}/> : <ArrowSortUpFilled style={{ width: "16px", height: "16px" }}/>
                        )}
                      </TableHeaderCell>
                      <TableHeaderCell {...headerSortProps("quantity")}style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}>
                      Quantity
                        {sortedColumn === "quantity" && (
                          sortDirection === "asc" ? <ArrowSortDownRegular/> : <ArrowSortUpFilled/>
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
                        minWidth: "150px", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "space-between", 
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



                  <TableBody style={themestate ? { color: "white" } : {}}>
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
