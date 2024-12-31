

import React, { useState, useEffect } from "react";

import {
  ArrowClockwise28Regular,
} from "@fluentui/react-icons";
import {
 
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  createTableColumn,
  makeStyles,
  TabList,
  Tab,
  Button,
  Popover,
  PopoverSurface,
  PopoverTrigger,
} from "@fluentui/react-components";
import Search from "./Search";
import QuotationDrawer from "./QuotationDrawer";
import DropdownComponent from "../components/DropDown";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AckDrawer from "./AckDrawer";
const useStyles = makeStyles({
  statusBullet: {
    display: "inline-block",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    marginRight: "8px",
  },
  statusRFQ: { backgroundColor: "#ffd966" },
  statusTodo: { backgroundColor: "#ff6666" },
  statusCompare: { backgroundColor: "#00d96d" },
  iconButtonContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "4em",
    marginLeft: "2em",
    width: "25%",
  },
  iconButton: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "transparent",
    border: "1px solid #fff",
    padding: "6px 12px",
    cursor: "pointer",
    gap: "8px",
  },
  icon: {
    color: "#1281d7",
    fontSize: "24px",
  },
  dataGridContainer: {
    overflowX: "auto",
    width: "90vw",
  },
});

const StatusCell = ({ statusLabel }) => {
  const styles = useStyles();

  let statusStyle;
  if (statusLabel === "quotation") {
    statusStyle = styles.statusTodo;
  } else if (statusLabel === "To be Acknowledge") {
    statusStyle = styles.statusRFQ;
  } else {
    statusStyle = styles.statusCompare;
  }


  return (
    <TableCellLayout>
      <span className={`${styles.statusBullet} ${statusStyle}`} />
      {statusLabel}
    </TableCellLayout>
  );
};


const columns = [
  createTableColumn({
    columnId: "requestor",
    renderHeaderCell: () => "Buyer Name",
    renderCell: (item) => (
      <TableCellLayout>{item.line_items[0].requestor}</TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "document_number",
    renderHeaderCell: () => "PR Number",
    renderCell: (item) => (
      <TableCellLayout>{item.document_number}</TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "description",
    renderHeaderCell: () => "Description",
    renderCell: (item) => (
      <TableCellLayout>{item.line_items[0].description}</TableCellLayout>
    ),
  }),
  //

  createTableColumn({
    columnId: "status",
    renderHeaderCell: () => "Quantity",
    renderCell: (item) => (
      <TableCellLayout>
        {item.line_items[0].distributions[0].quantity}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "need_by_date",
    renderHeaderCell: () => "Need By Date",
    renderCell: (item) => (
      <TableCellLayout>{item.line_items[0].need_by_date}</TableCellLayout>
    ),
  }),
  

  
    createTableColumn({
      columnId: "status",
      renderHeaderCell: () => "Status",
      renderCell: (item) => <StatusCell statusLabel={item.status} />, // Use StatusCell component here
    }),
    
  createTableColumn({
    columnId: "suppliersReplied",
    renderHeaderCell: () => "Received Date",
    renderCell: (item) => (
      <TableCellLayout>{item.line_items[0].last_update_date}</TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "suppliersReplied",
    renderHeaderCell: () => "UOM",
    renderCell: (item) => (
      <TableCellLayout>{item.line_items[0].uom}</TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "suppliersReplied",
    renderHeaderCell: () => "Line",
    renderCell: (item) => (
      <TableCellLayout>{item.line_items[0].line_number}</TableCellLayout>
    ),
  }),
];



// Main component
const QuotationTable = ({setStatusCounts}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  
  const [items, setItems] = useState([]);
  const [userId, setUserID] = useState("");
  const styles = useStyles();
  const [selectedRowData, setSelectedRowData] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  useEffect(() => {
    if (selectedRowData && selectedRowData.status === "To be Acknowledged") {
      setIsDrawerOpen(true);
    } else {
      setIsDrawerOpen(false); // Close the drawer if the condition is not met
    }
  }, [selectedRowData]);

 
  const togglePopover = () => setPopoverOpen(!popoverOpen);

  
  const fetchData = async () => {
    const token = localStorage.getItem("access_token");
    let userId = null;
  
    if (token) {
      userId = getUserIdFromToken(token);
      if (!userId) return;
      setUserID(userId) 
    }
  
    try {
      const data = await fetchUserData(userId);
      const processedData = processData(data, userId);
      setItems(processedData);
  
      const { quotationCount, ackCount } = calculateStatusCounts(processedData);
      setStatusCounts({ quotationCount, ackCount });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const getUserIdFromToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.user_id;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };
  
  const fetchUserData = async (userId) => {
    const response = await axios.get(
      `http://172.235.21.99:5729/user/pr-details/supplier/${userId}/`
    );
    return response.data;
  };
  
  const processData = (data, userId) => {
    return data.map((item) => {
      item.status = determineStatus(item, userId);
      return item;
    });
  };
  
  const determineStatus = (item, userId) => {
    if (!item.quotations) return "quotation";
  
    const hasUserQuotation = item.quotations.some(
      (quotation) => quotation.supplier === userId
    );
  
    if (item.status === "YetAcknowledged") {
      return hasUserQuotation ? "To be Acknowledged" : "quotation";
    }
  
    return "quotation";
  };
  
  const calculateStatusCounts = (data) => {
    const quotationCount = data.filter((item) => item.status === "quotation").length;
    const ackCount = data.filter((item) => item.status === "To be Acknowledged").length;
    return { quotationCount, ackCount };
  };
  

  useEffect(() => {
    fetchData();
    console.log("Items", items);
  }, []);

  // Handle search
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  console.log("Search",searchQuery);

  const handleRowClick = (e,item) => {
    if(e.target.type==="checkbox")
    {
      return;
    }
    setSelectedRowData(null);

    setTimeout(() => {
      setSelectedRowData(item);
    }, 0);
       
    
    setSelectedStatus(item.status);
    console.log("status", item.status);
    console.log("items", item);
  };

  return (
    <div>
      <TabList
        appearance="subtle"
        style={{ marginLeft: "0vw", marginTop: "2vh" }}
      >
        <Tab
          value="tab1"
          style={{ border: "1px solid transparent", marginTop: "4em" }}
        >
          Quotation
        </Tab>
        <div className={styles.iconButtonContainer}>
          <button className={styles.iconButton} onClick={fetchData}>
            <ArrowClockwise28Regular className={styles.icon} />
            <span>Refresh</span>
          </button>
          {selectedStatus === "Todo" && (
            <button
              style={{
                width: "100%",
                border: "none",
                backgroundColor: "white",
                color: "#1281d7",
                cursor: "pointer",
              }}
              onClick={togglePopover}
            >
              Choose Suppliers
            </button>
          )}
          {popoverOpen && (
            <Popover
              open={popoverOpen}
              onOpenChange={togglePopover}
              positioning={{ position: "right", align: "top" }}
            >
              <PopoverTrigger disableButtonEnhancement>
                <Button style={{ border: "none" }}></Button>
              </PopoverTrigger>
              <PopoverSurface
                tabIndex={-1}
                style={{ width: "50%", maxWidth: "300px", padding: "1.5em" }}
              >
                <div>
                  <h2 style={{ fontWeight: "normal" }}>Choose Suppliers</h2>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      maxWidth: "200px",
                      flexDirection: "column",
                    }}
                  >
                    <h3 style={{ fontWeight: "Normal" }}>Suppliers</h3>
                    <DropdownComponent />
                  </div>
                  <button
                    style={{
                      width: "10%",
                      border: "none",
                      backgroundColor: "white",
                      color: "#1281d7",
                      cursor: "pointer",
                      marginTop: "1em",
                    }}
                  >
                    Submit
                  </button>
                </div>
              </PopoverSurface>
            </Popover>
          )}
        </div>
        <Search
          placeholder="Search PO or Supplier"
          onSearchChange={handleSearchChange}
        />
      </TabList>
      <div className={styles.dataGridContainer}>
        <DataGrid items={items} columns={columns} selectionMode="multiselect">
          <DataGridHeader>
            <DataGridRow
              selectionCell={{
                checkboxIndicator: { "aria-label": "Select all rows" },
              }}
            >
              {({ renderHeaderCell }) => (
                <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
              )}
            </DataGridRow>
          </DataGridHeader>
          <DataGridBody>
            {({ item, rowId }) => (
              <DataGridRow key={rowId} onClick={(e) => handleRowClick(e,item)}>
                {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
              </DataGridRow>
            )}
          </DataGridBody>
        </DataGrid>
      </div>
      {selectedRowData && selectedRowData.status === "quotation" && <QuotationDrawer data={selectedRowData} userId={userId} onClose={() => fetchData()}/>}
      {selectedRowData && selectedRowData.status === "To be Acknowledged" && <AckDrawer data={selectedRowData} isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} onClose={() => fetchData()}/>}
      
    </div>
  );
};

export default QuotationTable;
