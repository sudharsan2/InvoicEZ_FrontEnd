import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  VideoRegular,
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
import { makeStyles, TabList, Tab } from "@fluentui/react-components";
import { ArrowClockwise28Regular } from "@fluentui/react-icons";
import Search from "./Search";
import TodoDrawer from "./TodoDrawer"; // Import TodoDrawer component
import RFQDrawer from "./RFQDrawer"; // Import RFQDrawer component
import CompareDrawer from "./CompareDrawer"; // Import CompareDrawer component
import DatePickerComponent from "./DatePicker";
import { CiFilter } from "react-icons/ci";
import {Divider} from "@fluentui/react-components";
import DropDown from "../components/DropDown";
import {
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Button,
  // makeStyles,
} from "@fluentui/react-components";
import DropdownComponent from "../components/DropDown";
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
    width:"25%"
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
    fontSize: "24px", // Adjust font size to match the ArrowClockwise icon
  },
  dataGridContainer: {
    overflowX: "auto",
    width: "90vw", 
  },
});

// Sample data
const items = [
  {
    file: { label: "Sudharsan", icon: <DocumentRegular /> },
    author: { label: "101245", status: "available" },
    lastUpdated: { label: "test", timestamp: 1 },
    Status: { label: "RFQ", icon: <EditRegular /> },
    Date: { label: "29 May 2023", timestamp: 1 },
    Supplierreply: { label: "8", timestamp: 1 },
  },
  {
    file: { label: "Sudharsan", icon: <FolderRegular /> },
    author: { label: "1023456", status: "busy" },
    lastUpdated: { label: "test", timestamp: 2 },
    Status: { label: "Todo", icon: <OpenRegular /> },
    Date: { label: "29 May 2023", timestamp: 1 },
    Supplierreply: { label: "8", timestamp: 1 },
  },
  {
    file: { label: "Sudharsan", icon: <VideoRegular /> },
    author: { label: "12345678", status: "away" },
    lastUpdated: { label: "test", timestamp: 2 },
    Status: { label: "Compare", icon: <OpenRegular /> },
    Date: { label: "29 May 2023", timestamp: 1 },
    Supplierreply: { label: "8", timestamp: 1 },
  },
  {
    file: { label: "Vijay", icon: <VideoRegular /> },
    author: { label: "12345678", status: "away" },
    lastUpdated: { label: "test", timestamp: 2 },
    Status: { label: "Todo", icon: <OpenRegular /> },
    Date: { label: "29 May 2023", timestamp: 1 },
    Supplierreply: { label: "8", timestamp: 1 },
  },
];


const StatusCell = ({ statusLabel }) => {
  const styles = useStyles();
  const statusStyle =
    statusLabel === "RFQ"
      ? styles.statusRFQ
      : statusLabel === "Todo"
      ? styles.statusTodo
      : styles.statusCompare;

  return (
    <TableCellLayout>
      <span className={`${styles.statusBullet} ${statusStyle}`} />
      {statusLabel}
    </TableCellLayout>
  );
};

const ExampleContent = () => {
  const styles = useStyles();
  return (
    <div>
      <h2 style={{fontWeight:"normal"}}>Choose Suppliers</h2>

      
      <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "200px", flexDirection: "column" }}>
        <h3 style={{ fontWeight: "Normal" }}>Suppliers</h3>
        <DropdownComponent />
      </div>
      <button style={{width:"10%",border:"none",backgroundColor:"white",color:"#1281d7",cursor:"pointer",marginTop:"1em"}} >Submit</button>
    </div>
  );
};

const columns = [
  createTableColumn({
    columnId: "file",
    renderHeaderCell: () => "Requester Name",
    renderCell: (item) => <TableCellLayout>{item.file.label}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "author",
    renderHeaderCell: () => "PR Number",
    renderCell: (item) => <TableCellLayout>{item.author.label}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "lastUpdated",
    renderHeaderCell: () => "Description",
    renderCell: (item) => item.lastUpdated.label,
  }),
  createTableColumn({
    columnId: "Status",
    renderHeaderCell: () => "Status",
    renderCell: (item) => <StatusCell statusLabel={item.Status.label} />,
  }),
  createTableColumn({
    columnId: "Date",
    renderHeaderCell: () => "Need By Date",
    renderCell: (item) => <TableCellLayout>{item.Date.label}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "Supplierreply",
    renderHeaderCell: () => "Suppliers Replied",
    renderCell: (item) => (
      <TableCellLayout>{item.Supplierreply.label}</TableCellLayout>
    ),
  }),
];

const LoopTable = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
    const togglePopover = () => setPopoverOpen(!popoverOpen);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const styles = useStyles();
  const [selectedRows, setSelectedRows] = useState(new Set());
  const handleRowClick = (e, item) => {

    if (e.target.type === "checkbox"){
      setSelectedStatus(item.Status.label);
    console.log("STATUS", selectedStatus);

    }
  
    
  };

    const handleSelectionChange = (event, data) => {
        console.log("handleSelectionChange", data.selectedItems);
        setSelectedRows(data.selectedItems);
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
          <button className={styles.iconButton}>
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
           {/* Popover */}
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
                    style={{
                      width: "50%",     
                      maxWidth: "300px",  
                      padding: "1.5em",  
                      
                    }}
                  >
                    <ExampleContent />
                  </PopoverSurface>
                </Popover>
              )}
        </div>

        <Search placeholder="Search PO or Supplier" />
      </TabList>
      <div className={styles.dataGridContainer}>
      <Divider style={{marginTop:"2em"}}/>

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
<DataGridRow
  key={rowId}
  // selectionCell={{
  //   checkboxIndicator: { "aria-label": "Select row" }
  // }}
  onClick={(e) => handleRowClick(e, item)} 
>
  {({ renderCell }) => (
    <DataGridCell>{renderCell(item)}</DataGridCell>
  )}
</DataGridRow>
)}
</DataGridBody>
</DataGrid>


      </div>
     

      {selectedStatus === "Todo" && <TodoDrawer />}
      {selectedStatus === "RFQ" && <RFQDrawer />}
      {selectedStatus === "Compare" && <CompareDrawer />}
    </div>
  );
};

export default LoopTable;





