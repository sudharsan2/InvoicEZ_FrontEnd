import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  VideoRegular,
  ArrowClockwise28Regular,
} from "@fluentui/react-icons";
import {
  Avatar,
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  createTableColumn,
} from "@fluentui/react-components";
import {
  makeStyles,
  TabList,
  Tab,
  Divider,
  Button,
  Popover,
  PopoverSurface,
  PopoverTrigger,
} from "@fluentui/react-components";
import Search from "./Search";
import TodoDrawer from "./TodoDrawer";
import RFQDrawer from "./RFQDrawer";
import CompareDrawer from "./CompareDrawer";
import DatePickerComponent from "./DatePicker";
import DropdownComponent from "../components/DropDown";
import axios from "axios";

const useStyles = makeStyles({
  statusBullet: {
    display: "inline-block",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    marginRight: "8px",
  },
  statusRFQ: { backgroundColor: "yellow" },
  statusTodo: { backgroundColor: "red" },
  statusCompare: { backgroundColor: "green" },
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

// Column definitions
const columns = [
  createTableColumn({
    columnId: "requestor",
    renderHeaderCell: () => "Requester Name",
    renderCell: (item) => (
      <TableCellLayout>{item.lines[0].requestor}</TableCellLayout>
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
    renderCell: (item) => <TableCellLayout>{item.description}</TableCellLayout>,
  }),
  //
  createTableColumn({
    columnId: "status",
    renderHeaderCell: () => "Status",
    renderCell: (item) => <TableCellLayout>{item.status}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "need_by_date",
    renderHeaderCell: () => "Need By Date",
    renderCell: (item) => (
      <TableCellLayout>{item.lines[0].need_by_date}</TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "suppliersReplied",
    renderHeaderCell: () => "Suppliers Replied",
    renderCell: (item) => (
      <TableCellLayout>{item.lines[0].supplier_ids}</TableCellLayout>
    ),
  }),
];

// Main component
const LoopTable = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [items, setItems] = useState([]);
  const styles = useStyles();
  const [selectedRowData, setSelectedRowData] = useState({});

  // Toggle Popover
  const togglePopover = () => setPopoverOpen(!popoverOpen);

  // Fetch data
  const fetchData = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/user/club-pr", {
        org_id: 821,
        from_date: "11/09/24",
        to_date: "11/09/25",
      });
      const data = response.data.details;
      console.log("Status", data[0]?.status);
      // console.log("Data",data);
      //
      const data2 = data.filter((item) => {
        return (
          item.status && item.status.trim().toLowerCase() !== "yetacknowledged"
        );
      });

      console.log("Status", data2);
      // const data2 = data.filter((item) => item.status != "YetAcknowledged");

      // Map through the data to structure it as needed
      const mappedItems = data2.flatMap((item) => {
        // Use lineData to check for lines or line_items
        const lineData = item.lines || item.line_items;
        if (lineData && lineData.length) {
          // Map over each line and create a new item for each line entry
          return lineData.map((line) => ({
            ...item, // Copy all properties from the original item
            lines: [line], // Replace 'lines' with a single line item array
          }));
        } else {
          // Handle case where there are no lines or line_items
          return {
            ...item,
            lines: [], // Default to an empty array if no lines/line_items are found
          };
        }
      });

      const data1 = mappedItems // Remove items with the specified status
        .map((item) => {
          let status = "Todo"; // Default status
          // Check if supplier_ids exists and has a length greater than 0
          if ("supplier_ids" in item.lines[0]) {
            status = "RFQ";
            if (item.quotations.length > 0) {
              status = "Compare";
            }
          }

          // Set the computed status in the item
          item.status = status;
          return item; // Return the modified item
        });

      setItems(data1); // Set the processed items in state
      console.log("Mapped Items:", mappedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    console.log("Items", items);
  }, []);

  // Handle search
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  // Filter items based on search
  const filteredItems = items.filter((item) => {
    const searchLower = searchQuery.trim().toLowerCase();
    return (
      item.lines[0].requestor.toLowerCase().includes(searchLower) ||
      item.document_number.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      item.status.toLowerCase().includes(searchLower) ||
      item.lines[0].need_by_date.toLowerCase().includes(searchLower) ||
      item.lines[0].supplier_ids.toString().toLowerCase().includes(searchLower)
    );
  });

  const handleRowClick = (item) => {
    setSelectedRowData(item);
    // setSelectedStatus(item.status);
    console.log("status", item.status);
    console.log("items", item);
  };
  return (
    <div>
      <TabList
        defaultSelectedValue="tab1"
        appearance="subtle"
        style={{ marginLeft: "0vw", marginTop: "2vh" }}
      >
        <Tab
          value="tab1"
          style={{ border: "1px solid transparent", marginTop: "4em" }}
        >
          PR
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
              <DataGridRow key={rowId} onClick={() => handleRowClick(item)}>
                {({ renderCell }) => (
                  <DataGridCell>{renderCell(item)}</DataGridCell>
                )}
              </DataGridRow>
            )}
          </DataGridBody>
        </DataGrid>
      </div>
      {selectedRowData && selectedRowData.status === "Todo" && (
        <TodoDrawer data={selectedRowData} />
      )}
      {selectedRowData && selectedRowData.status === "RFQ" && (
        <RFQDrawer data={selectedRowData} />
      )}
      {selectedRowData && selectedRowData.status === "Compare" && (
        <CompareDrawer data={selectedRowData} />
      )}
    </div>
  );
};

export default LoopTable;
