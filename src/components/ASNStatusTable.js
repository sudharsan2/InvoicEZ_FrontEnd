// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FolderRegular,
//   EditRegular,
//   OpenRegular,
//   DocumentRegular,
//   VideoRegular,
// } from "@fluentui/react-icons";
// import {
//   Avatar,
//   DataGridBody,
//   DataGridRow,
//   DataGrid,
//   DataGridHeader,
//   DataGridHeaderCell,
//   DataGridCell,
//   TableCellLayout,
//   createTableColumn,
// } from "@fluentui/react-components";
// import { makeStyles, TabList, Tab } from "@fluentui/react-components";
// import { ArrowClockwise28Regular } from "@fluentui/react-icons";
// import Search from "./Search";
// import TodoDrawer from "./TodoDrawer"; // Import TodoDrawer component
// import RFQDrawer from "./RFQDrawer"; // Import RFQDrawer component
// import CompareDrawer from "./CompareDrawer"; // Import CompareDrawer component
// import DatePickerComponent from "./DatePicker";
// import { CiFilter } from "react-icons/ci";
// import {Divider} from "@fluentui/react-components";
// import DropDown from "../components/DropDown";
// import {
//   Popover,
//   PopoverSurface,
//   PopoverTrigger,
//   Button,
//   // makeStyles,
// } from "@fluentui/react-components";
// import DropdownComponent from "../components/DropDown";
// const useStyles = makeStyles({
//   statusBullet: {
//     display: "inline-block",
//     width: "8px",
//     height: "8px",
//     borderRadius: "50%",
//     marginRight: "8px",
//   },
//   statusRFQ: { backgroundColor: "yellow" },
//   statusTodo: { backgroundColor: "red" },
//   statusCompare: { backgroundColor: "green" },
//   iconButtonContainer: {
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//     marginTop: "4em",
//     marginLeft: "2em",
//     width:"25%"
//   },
//   iconButton: {
//     display: "flex",
//     alignItems: "center",
//     backgroundColor: "transparent",
//     border: "1px solid #fff",
//     padding: "6px 12px",
//     cursor: "pointer",
//     gap: "8px",
//   },
//   icon: {
//     color: "#1281d7",
//     fontSize: "24px", // Adjust font size to match the ArrowClockwise icon
//   },
//   dataGridContainer: {
//     overflowX: "auto",
//     width: "90vw", 
//   },
// });

// // Sample data
// const items = [
//   {
//     file: { label: "Sudharsan", icon: <DocumentRegular /> },
//     author: { label: "101245", status: "available" },
//     lastUpdated: { label: "test", timestamp: 1 },
//     Status: { label: "RFQ", icon: <EditRegular /> },
//     Date: { label: "29 May 2023", timestamp: 1 },
//     Supplierreply: { label: "8", timestamp: 1 },
//   },
//   {
//     file: { label: "Sudharsan", icon: <FolderRegular /> },
//     author: { label: "1023456", status: "busy" },
//     lastUpdated: { label: "test", timestamp: 2 },
//     Status: { label: "Todo", icon: <OpenRegular /> },
//     Date: { label: "29 May 2023", timestamp: 1 },
//     Supplierreply: { label: "8", timestamp: 1 },
//   },
//   {
//     file: { label: "Sudharsan", icon: <VideoRegular /> },
//     author: { label: "12345678", status: "away" },
//     lastUpdated: { label: "test", timestamp: 2 },
//     Status: { label: "Compare", icon: <OpenRegular /> },
//     Date: { label: "29 May 2023", timestamp: 1 },
//     Supplierreply: { label: "8", timestamp: 1 },
//   },
//   {
//     file: { label: "Vijay", icon: <VideoRegular /> },
//     author: { label: "12345678", status: "away" },
//     lastUpdated: { label: "test", timestamp: 2 },
//     Status: { label: "Todo", icon: <OpenRegular /> },
//     Date: { label: "29 May 2023", timestamp: 1 },
//     Supplierreply: { label: "8", timestamp: 1 },
//   },
// ];


// const StatusCell = ({ statusLabel }) => {
//   const styles = useStyles();
//   const statusStyle =
//     statusLabel === "RFQ"
//       ? styles.statusRFQ
//       : statusLabel === "Todo"
//       ? styles.statusTodo
//       : styles.statusCompare;

//   return (
//     <TableCellLayout>
//       <span className={`${styles.statusBullet} ${statusStyle}`} />
//       {statusLabel}
//     </TableCellLayout>
//   );
// };

// const ExampleContent = () => {
//   const styles = useStyles();
//   return (
//     <div>
//       <h2 style={{fontWeight:"normal"}}>Choose Suppliers</h2>

      
//       <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "200px", flexDirection: "column" }}>
//         <h3 style={{ fontWeight: "Normal" }}>Suppliers</h3>
//         <DropdownComponent />
//       </div>
//       <button style={{width:"10%",border:"none",backgroundColor:"white",color:"#1281d7",cursor:"pointer",marginTop:"1em"}} >Submit</button>
//     </div>
//   );
// };

// const columns = [
//   createTableColumn({
//     columnId: "file",
//     renderHeaderCell: () => "Buyer Name",
//     renderCell: (item) => <TableCellLayout>{item.file.label}</TableCellLayout>,
//   }),
//   createTableColumn({
//     columnId: "author",
//     renderHeaderCell: () => "PR Number",
//     renderCell: (item) => <TableCellLayout>{item.author.label}</TableCellLayout>,
//   }),
//   createTableColumn({
//     columnId: "lastUpdated",
//     renderHeaderCell: () => "Description",
//     renderCell: (item) => item.lastUpdated.label,
//   }),
//   createTableColumn({
//     columnId: "Status",
//     renderHeaderCell: () => "Quantity",
//     renderCell: (item) => <TableCellLayout>{}</TableCellLayout>,
//   }),
//   createTableColumn({
//     columnId: "Date",
//     renderHeaderCell: () => "Need By Date",
//     renderCell: (item) => <TableCellLayout>{}</TableCellLayout>,
//   }),
//   createTableColumn({
//     columnId: "Supplierreply",
//     renderHeaderCell: () => "Received Date",
//     renderCell: (item) => (
//       <TableCellLayout>{}</TableCellLayout>
//     ),
//   }),
//   createTableColumn({
//     columnId: "Supplierreply",
//     renderHeaderCell: () => "UOM",
//     renderCell: (item) => (
//       <TableCellLayout>{}</TableCellLayout>
//     ),
//   }),
//   createTableColumn({
//     columnId: "Supplierreply",
//     renderHeaderCell: () => "Item",
//     renderCell: (item) => (
//       <TableCellLayout>{}</TableCellLayout>
//     ),
//   }),
//   createTableColumn({
//     columnId: "Supplierreply",
//     renderHeaderCell: () => "Line",
//     renderCell: (item) => (
//       <TableCellLayout>{}</TableCellLayout>
//     ),
//   }),
// ];

// const QuotationTable = () => {
//   const [popoverOpen, setPopoverOpen] = useState(false);
//     const togglePopover = () => setPopoverOpen(!popoverOpen);
//   const [selectedStatus, setSelectedStatus] = useState(null);
//   const styles = useStyles();
//   const [selectedRows, setSelectedRows] = useState(new Set());
//   const handleRowClick = (e, item) => {

//     if (e.target.type === "checkbox"){
//       setSelectedStatus(item.Status.label);
//     console.log("STATUS", selectedStatus);

//     }
  
    
//   };

//     const handleSelectionChange = (event, data) => {
//         console.log("handleSelectionChange", data.selectedItems);
//         setSelectedRows(data.selectedItems);
//       };

//   return (
//     <div>
//       <TabList
//         // defaultSelectedValue="tab1"
//         appearance="subtle"
//         style={{ marginLeft: "0vw", marginTop: "2vh" }}
//       >
//         <Tab
//           value="tab1"
//           style={{ border: "1px solid transparent", marginTop: "4em", }}
//         >
//           <h2 Style={{fontSize:"40px",fontWeight:"bold"}}>Quotation</h2>
//         </Tab>

//         <div className={styles.iconButtonContainer}>
//           <button className={styles.iconButton}>
//             <ArrowClockwise28Regular className={styles.icon} />
//             <span>Refresh</span>
//           </button>
//           {selectedStatus === "Todo" && (
//         <button
//           style={{
//             width: "100%",
//             border: "none",
//             backgroundColor: "white",
//             color: "#1281d7",
//             cursor: "pointer",
//           }}
//           onClick={togglePopover}
//         >
//           Choose Suppliers
//         </button>
//       )}
//            {/* Popover */}
//            {popoverOpen && (
//   <Popover
//     open={popoverOpen}
//     onOpenChange={togglePopover}
//     positioning={{ position: "right", align: "top" }}
//   >
//                   <PopoverTrigger disableButtonEnhancement>
//                     <Button style={{ border: "none" }}></Button>
//                   </PopoverTrigger>

//                   <PopoverSurface
//                     tabIndex={-1}
//                     style={{
//                       width: "50%",     
//                       maxWidth: "300px",  
//                       padding: "1.5em",  
                      
//                     }}
//                   >
//                     <ExampleContent />
//                   </PopoverSurface>
//                 </Popover>
//               )}
//         </div>

//         <Search placeholder="Search Requests" />
//       </TabList>
//       <div className={styles.dataGridContainer}>
//       <Divider style={{marginTop:"1em",marginBottom:"3em"}}/>

// <DataGrid items={items} columns={columns} selectionMode="multiselect">
// <DataGridHeader>
// <DataGridRow
// selectionCell={{
//   checkboxIndicator: { "aria-label": "Select all rows" },
// }}
// >
// {({ renderHeaderCell }) => (
//   <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
// )}
// </DataGridRow>
// </DataGridHeader>
// <DataGridBody>
// {({ item, rowId }) => (
// <DataGridRow
//   key={rowId}
//   // selectionCell={{
//   //   checkboxIndicator: { "aria-label": "Select row" }
//   // }}
//   onClick={(e) => handleRowClick(e, item)} 
// >
//   {({ renderCell }) => (
//     <DataGridCell>{renderCell(item)}</DataGridCell>
//   )}
// </DataGridRow>
// )}
// </DataGridBody>
// </DataGrid>


//       </div>
     

//       {selectedStatus === "Todo" && <TodoDrawer />}
//       {selectedStatus === "RFQ" && <RFQDrawer />}
//       {selectedStatus === "Compare" && <CompareDrawer />}
//     </div>
//   );
// };

// export default QuotationTable;





import React, { useMemo,useState } from "react";
import {
  DataGrid,
  DataGridBody,
  DataGridRow,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  createTableColumn,
} from "@fluentui/react-components";
import { makeStyles, TabList, Tab } from "@fluentui/react-components";
import Search from "./Search";
import { ArrowClockwise28Regular ,ArrowUpload24Regular,Delete24Filled } from "@fluentui/react-icons";
import {Divider} from "@fluentui/react-components";
import ASNShipmentDrawer from "./ASNShipmentDrawer";
const useStyles = makeStyles({
    statusBullet: {
      display: "inline-block",
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      marginRight: "8px",
    },
    statusAck: { backgroundColor: "green" },
    statusTobe: { backgroundColor: "yellow" },
    statusReject: { backgroundColor: "red" },
    
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
  });
  
const items = [
  {
    file: { label: "10" },
    author: { label: "Rice" },
    lastUpdated: { label: "test" },
    lastUpdate: { label: "KG" },
    Quantity: { label: "1000" },
    NeedByDate: { label: "18 May 2023" },
    Description: { label: "ABC" },
    QuantityAmount:{label:"20"},
    UnitPrice:{label:"1"},
    Currency:{label:"INR"},
    Tax:{label:"20%"},
    NBD:{label:"May 10 2023"},
    STO:{label:"Madurai"},
    Remarks:{label:"Good"},
    Request :{label:"May 7 2023 "},
    Reshedule:{label:"Nov 10 2023"},
    Remainder:{label:"Nov 8 2023"},
    Status:{label:"Acknowledged"},
    download:{label:"",icon: <ArrowUpload24Regular />},
    upload:{label:"",icon: <ArrowUpload24Regular />},
    uploadcm:{label:"",icon:<ArrowUpload24Regular />},
    delete:{label:"",icon:<Delete24Filled />}
  },
  {
    file: { label: "10" },
    author: { label: "Rice" },
    lastUpdated: { label: "test" },
    lastUpdate: { label: "KG" },
    Quantity: { label: "1000" },
    NeedByDate: { label: "18 May 2023" },
    Description: { label: "ABC" },
    QuantityAmount:{label:"20"},
    UnitPrice:{label:"1"},
    Currency:{label:"INR"},
    Tax:{label:"20%"},
    NBD:{label:"May 10 2023"},
    STO:{label:"Madurai"},
    Remarks:{label:"Good"},
    Request :{label:"May 7 2023 "},
    Reshedule:{label:"Nov 10 2023"},
    Remainder:{label:"Nov 8 2023"},
    Status:{label:"Rejected"},
    download:{label:"",icon: <ArrowUpload24Regular />},
    upload:{label:"",icon: <ArrowUpload24Regular />},
    uploadcm:{label:"",icon:<ArrowUpload24Regular />},
    delete:{label:"",icon:<Delete24Filled />}
  },
  {
    file: { label: "10" },
    author: { label: "Rice" },
    lastUpdated: { label: "test" },
    lastUpdate: { label: "KG" },
    Quantity: { label: "1000" },
    NeedByDate: { label: "18 May 2023" },
    Description: { label: "ABC" },
    QuantityAmount:{label:"20"},
    UnitPrice:{label:"1"},
    Currency:{label:"INR"},
    Tax:{label:"20%"},
    NBD:{label:"May 10 2023"},
    STO:{label:"Madurai"},
    Remarks:{label:"Good"},
    Request :{label:"May 7 2023 "},
    Reshedule:{label:"Nov 10 2023"},
    Remainder:{label:"Nov 8 2023"},
    Status:{label:"To be Acknowledged"},
    download:{label:"",icon: <ArrowUpload24Regular />},
    upload:{label:"",icon: <ArrowUpload24Regular />},
    uploadcm:{label:"",icon:<ArrowUpload24Regular />},
    delete:{label:"",icon:<Delete24Filled />}
    
  },
];



const StatusCell = ({ statusLabel }) => {
    const styles = useStyles();
    const statusStyle =
      statusLabel === "Acknowledged"
        ? styles.statusAck
        : statusLabel === "To be Acknowledged"
        ? styles.statusTobe
        : styles.statusReject;
  
    return (
      <TableCellLayout>
        <span className={`${styles.statusBullet} ${statusStyle}`} />
        {statusLabel}
      </TableCellLayout>
    );
  };
//   const bundleIcon = {Delete24Filled ,Delete24Regular};
const columns = [
  createTableColumn({
    columnId: "file",
    compare: (a, b) => a.file.label.localeCompare(b.file.label),
    renderHeaderCell: () => "DO No.",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "100px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "author",
    compare: (a, b) => a.author.label.localeCompare(b.author.label),
    renderHeaderCell: () => "Supplier Number",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "lastUpdated",
    renderHeaderCell: () => "ASN Number",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "200px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "lastUpdate",
    renderHeaderCell: () => "Invoiced On",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "100px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Quantity",
    renderHeaderCell: () => "PO_Rev",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "100px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Description",
    renderHeaderCell: () => "Line Shipment No.",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "QuantityAmount",
    renderHeaderCell: () => "Item Code",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "UnitPrice",
    renderHeaderCell: () => "Description",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "UOM",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "Unit Price",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "Ordered",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "Shipped",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "Receipt No",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "Received",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "Accepted",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "Rejected",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "UOM",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "Cancelled",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "Invoice Status",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "DO Status",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "CM Status",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "Download PV",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}  media={item.download.icon}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "Upload Inv",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}  media={item.upload.icon}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "Upload CM",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }} media={item.upload.icon}>
        {}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Currency",
    renderHeaderCell: () => "Action",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }} media={item.delete.icon}>
        {}
      </TableCellLayout>
    ),
  }),
];

const ASNStatusTable = () => {
    const styles = useStyles();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const defaultSortState = useMemo(
    () => ({ sortColumn: "file", sortDirection: "ascending" }),
    []
  );

  const gridContainerStyle = {
    overflowX: "auto", 
    width: "90vw", 
  };

  const handleRowClick = () => {
    setIsDrawerOpen(true);
    console.log("Status",isDrawerOpen)
  };

  return (
    <div style={gridContainerStyle}>
        <div>
        <TabList
        // defaultSelectedValue="tab1"
        appearance="subtle"
        style={{ marginLeft: "0vw", marginTop: "2vh" }}
      >
        <Tab
          value="tab1"
          style={{ border: "1px solid transparent", marginTop: "4em", }}
        >
          <h2 Style={{fontSize:"40px",fontWeight:"bold"}}></h2>
        </Tab>

        <div style={{display:"flex",justifyContent:"flex-end",marginTop:"2em",width:"200%"}}>
          <button className={styles.iconButton}>
            <ArrowClockwise28Regular className={styles.icon} />
            <span>Refresh</span>
          </button>
          
        </div>

        <Search placeholder="Search Requests"  style={{marginRight:"10em"}}/>
      </TabList>
      <div className={styles.dataGridContainer}>
      <Divider style={{marginTop:"1em",marginBottom:"3em"}}/>
        </div>
      <DataGrid items={items} columns={columns} defaultSortState={defaultSortState}>
  <DataGridHeader>
    <DataGridRow>
      {({ renderHeaderCell }) => (
        <DataGridHeaderCell
          style={{
            width: "2em", 
            overflow: "hidden",
            whiteSpace: "nowrap",
           
          textOverflow: "ellipsis",
          }}
        >
          {renderHeaderCell()}
        </DataGridHeaderCell>
      )}
    </DataGridRow>
  </DataGridHeader>
  <DataGridBody>
    {({ item, rowId }) => (
      <DataGridRow key={rowId} onClick={handleRowClick}>
        {({ renderCell }) => (
          <DataGridCell
            style={{
              width: "2em", 
              overflow: "hidden",
              whiteSpace: "nowrap",
            textOverflow: "ellipsis", 
           
            }}
          >
            {renderCell(item)}
          </DataGridCell>
        )}
      </DataGridRow>
    )}
  </DataGridBody>
</DataGrid>
</div>
<ASNShipmentDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
    </div>
  );
};

export default ASNStatusTable;


