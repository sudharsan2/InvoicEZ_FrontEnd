// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   FolderRegular,
// //   EditRegular,
// //   OpenRegular,
// //   DocumentRegular,
// //   VideoRegular,
// // } from "@fluentui/react-icons";
// // import {
// //   Avatar,
// //   DataGridBody,
// //   DataGridRow,
// //   DataGrid,
// //   DataGridHeader,
// //   DataGridHeaderCell,
// //   DataGridCell,
// //   TableCellLayout,
// //   createTableColumn,
// // } from "@fluentui/react-components";
// // import { makeStyles, TabList, Tab } from "@fluentui/react-components";
// // import { ArrowClockwise28Regular } from "@fluentui/react-icons";
// // import Search from "./Search";
// // import TodoDrawer from "./TodoDrawer"; // Import TodoDrawer component
// // import RFQDrawer from "./RFQDrawer"; // Import RFQDrawer component
// // import CompareDrawer from "./CompareDrawer"; // Import CompareDrawer component
// // import DatePickerComponent from "./DatePicker";
// // import { CiFilter } from "react-icons/ci";
// // import {Divider} from "@fluentui/react-components";
// // import DropDown from "../components/DropDown";
// // import {
// //   Popover,
// //   PopoverSurface,
// //   PopoverTrigger,
// //   Button,
// //   // makeStyles,
// // } from "@fluentui/react-components";
// // import DropdownComponent from "../components/DropDown";
// // const useStyles = makeStyles({
// //   statusBullet: {
// //     display: "inline-block",
// //     width: "8px",
// //     height: "8px",
// //     borderRadius: "50%",
// //     marginRight: "8px",
// //   },
// //   statusRFQ: { backgroundColor: "yellow" },
// //   statusTodo: { backgroundColor: "red" },
// //   statusCompare: { backgroundColor: "green" },
// //   iconButtonContainer: {
// //     display: "flex",
// //     alignItems: "center",
// //     gap: "8px",
// //     marginTop: "4em",
// //     marginLeft: "2em",
// //     width:"25%"
// //   },
// //   iconButton: {
// //     display: "flex",
// //     alignItems: "center",
// //     backgroundColor: "transparent",
// //     border: "1px solid #fff",
// //     padding: "6px 12px",
// //     cursor: "pointer",
// //     gap: "8px",
// //   },
// //   icon: {
// //     color: "#1281d7",
// //     fontSize: "24px", // Adjust font size to match the ArrowClockwise icon
// //   },
// //   dataGridContainer: {
// //     overflowX: "auto",
// //     width: "90vw", 
// //   },
// // });

// // // Sample data
// // const items = [
// //   {
// //     file: { label: "Sudharsan", icon: <DocumentRegular /> },
// //     author: { label: "101245", status: "available" },
// //     lastUpdated: { label: "test", timestamp: 1 },
// //     Status: { label: "RFQ", icon: <EditRegular /> },
// //     Date: { label: "29 May 2023", timestamp: 1 },
// //     Supplierreply: { label: "8", timestamp: 1 },
// //   },
// //   {
// //     file: { label: "Sudharsan", icon: <FolderRegular /> },
// //     author: { label: "1023456", status: "busy" },
// //     lastUpdated: { label: "test", timestamp: 2 },
// //     Status: { label: "Todo", icon: <OpenRegular /> },
// //     Date: { label: "29 May 2023", timestamp: 1 },
// //     Supplierreply: { label: "8", timestamp: 1 },
// //   },
// //   {
// //     file: { label: "Sudharsan", icon: <VideoRegular /> },
// //     author: { label: "12345678", status: "away" },
// //     lastUpdated: { label: "test", timestamp: 2 },
// //     Status: { label: "Compare", icon: <OpenRegular /> },
// //     Date: { label: "29 May 2023", timestamp: 1 },
// //     Supplierreply: { label: "8", timestamp: 1 },
// //   },
// //   {
// //     file: { label: "Vijay", icon: <VideoRegular /> },
// //     author: { label: "12345678", status: "away" },
// //     lastUpdated: { label: "test", timestamp: 2 },
// //     Status: { label: "Todo", icon: <OpenRegular /> },
// //     Date: { label: "29 May 2023", timestamp: 1 },
// //     Supplierreply: { label: "8", timestamp: 1 },
// //   },
// // ];


// // const StatusCell = ({ statusLabel }) => {
// //   const styles = useStyles();
// //   const statusStyle =
// //     statusLabel === "RFQ"
// //       ? styles.statusRFQ
// //       : statusLabel === "Todo"
// //       ? styles.statusTodo
// //       : styles.statusCompare;

// //   return (
// //     <TableCellLayout>
// //       <span className={`${styles.statusBullet} ${statusStyle}`} />
// //       {statusLabel}
// //     </TableCellLayout>
// //   );
// // };

// // const ExampleContent = () => {
// //   const styles = useStyles();
// //   return (
// //     <div>
// //       <h2 style={{fontWeight:"normal"}}>Choose Suppliers</h2>

      
// //       <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "200px", flexDirection: "column" }}>
// //         <h3 style={{ fontWeight: "Normal" }}>Suppliers</h3>
// //         <DropdownComponent />
// //       </div>
// //       <button style={{width:"10%",border:"none",backgroundColor:"white",color:"#1281d7",cursor:"pointer",marginTop:"1em"}} >Submit</button>
// //     </div>
// //   );
// // };

// // const columns = [
// //   createTableColumn({
// //     columnId: "file",
// //     renderHeaderCell: () => "Buyer Name",
// //     renderCell: (item) => <TableCellLayout>{item.file.label}</TableCellLayout>,
// //   }),
// //   createTableColumn({
// //     columnId: "author",
// //     renderHeaderCell: () => "PR Number",
// //     renderCell: (item) => <TableCellLayout>{item.author.label}</TableCellLayout>,
// //   }),
// //   createTableColumn({
// //     columnId: "lastUpdated",
// //     renderHeaderCell: () => "Description",
// //     renderCell: (item) => item.lastUpdated.label,
// //   }),
// //   createTableColumn({
// //     columnId: "Status",
// //     renderHeaderCell: () => "Quantity",
// //     renderCell: (item) => <TableCellLayout>{}</TableCellLayout>,
// //   }),
// //   createTableColumn({
// //     columnId: "Date",
// //     renderHeaderCell: () => "Need By Date",
// //     renderCell: (item) => <TableCellLayout>{}</TableCellLayout>,
// //   }),
// //   createTableColumn({
// //     columnId: "Supplierreply",
// //     renderHeaderCell: () => "Received Date",
// //     renderCell: (item) => (
// //       <TableCellLayout>{}</TableCellLayout>
// //     ),
// //   }),
// //   createTableColumn({
// //     columnId: "Supplierreply",
// //     renderHeaderCell: () => "UOM",
// //     renderCell: (item) => (
// //       <TableCellLayout>{}</TableCellLayout>
// //     ),
// //   }),
// //   createTableColumn({
// //     columnId: "Supplierreply",
// //     renderHeaderCell: () => "Item",
// //     renderCell: (item) => (
// //       <TableCellLayout>{}</TableCellLayout>
// //     ),
// //   }),
// //   createTableColumn({
// //     columnId: "Supplierreply",
// //     renderHeaderCell: () => "Line",
// //     renderCell: (item) => (
// //       <TableCellLayout>{}</TableCellLayout>
// //     ),
// //   }),
// // ];

// // const QuotationTable = () => {
// //   const [popoverOpen, setPopoverOpen] = useState(false);
// //     const togglePopover = () => setPopoverOpen(!popoverOpen);
// //   const [selectedStatus, setSelectedStatus] = useState(null);
// //   const styles = useStyles();
// //   const [selectedRows, setSelectedRows] = useState(new Set());
// //   const handleRowClick = (e, item) => {

// //     if (e.target.type === "checkbox"){
// //       setSelectedStatus(item.Status.label);
// //     console.log("STATUS", selectedStatus);

// //     }
  
    
// //   };

// //     const handleSelectionChange = (event, data) => {
// //         console.log("handleSelectionChange", data.selectedItems);
// //         setSelectedRows(data.selectedItems);
// //       };

// //   return (
// //     <div>
// //       <TabList
// //         // defaultSelectedValue="tab1"
// //         appearance="subtle"
// //         style={{ marginLeft: "0vw", marginTop: "2vh" }}
// //       >
// //         <Tab
// //           value="tab1"
// //           style={{ border: "1px solid transparent", marginTop: "4em", }}
// //         >
// //           <h2 Style={{fontSize:"40px",fontWeight:"bold"}}>Quotation</h2>
// //         </Tab>

// //         <div className={styles.iconButtonContainer}>
// //           <button className={styles.iconButton}>
// //             <ArrowClockwise28Regular className={styles.icon} />
// //             <span>Refresh</span>
// //           </button>
// //           {selectedStatus === "Todo" && (
// //         <button
// //           style={{
// //             width: "100%",
// //             border: "none",
// //             backgroundColor: "white",
// //             color: "#1281d7",
// //             cursor: "pointer",
// //           }}
// //           onClick={togglePopover}
// //         >
// //           Choose Suppliers
// //         </button>
// //       )}
// //            {/* Popover */}
// //            {popoverOpen && (
// //   <Popover
// //     open={popoverOpen}
// //     onOpenChange={togglePopover}
// //     positioning={{ position: "right", align: "top" }}
// //   >
// //                   <PopoverTrigger disableButtonEnhancement>
// //                     <Button style={{ border: "none" }}></Button>
// //                   </PopoverTrigger>

// //                   <PopoverSurface
// //                     tabIndex={-1}
// //                     style={{
// //                       width: "50%",     
// //                       maxWidth: "300px",  
// //                       padding: "1.5em",  
                      
// //                     }}
// //                   >
// //                     <ExampleContent />
// //                   </PopoverSurface>
// //                 </Popover>
// //               )}
// //         </div>

// //         <Search placeholder="Search Requests" />
// //       </TabList>
// //       <div className={styles.dataGridContainer}>
// //       <Divider style={{marginTop:"1em",marginBottom:"3em"}}/>

// // <DataGrid items={items} columns={columns} selectionMode="multiselect">
// // <DataGridHeader>
// // <DataGridRow
// // selectionCell={{
// //   checkboxIndicator: { "aria-label": "Select all rows" },
// // }}
// // >
// // {({ renderHeaderCell }) => (
// //   <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
// // )}
// // </DataGridRow>
// // </DataGridHeader>
// // <DataGridBody>
// // {({ item, rowId }) => (
// // <DataGridRow
// //   key={rowId}
// //   // selectionCell={{
// //   //   checkboxIndicator: { "aria-label": "Select row" }
// //   // }}
// //   onClick={(e) => handleRowClick(e, item)} 
// // >
// //   {({ renderCell }) => (
// //     <DataGridCell>{renderCell(item)}</DataGridCell>
// //   )}
// // </DataGridRow>
// // )}
// // </DataGridBody>
// // </DataGrid>


// //       </div>
     

// //       {selectedStatus === "Todo" && <TodoDrawer />}
// //       {selectedStatus === "RFQ" && <RFQDrawer />}
// //       {selectedStatus === "Compare" && <CompareDrawer />}
// //     </div>
// //   );
// // };

// // export default QuotationTable;





// import React, { useMemo,useState } from "react";
// import {
//   DataGrid,
//   DataGridBody,
//   DataGridRow,
//   DataGridHeader,
//   DataGridHeaderCell,
//   DataGridCell,
//   TableCellLayout,
//   createTableColumn,
// } from "@fluentui/react-components";
// import { makeStyles, TabList, Tab } from "@fluentui/react-components";
// import Search from "./Search";
// import { ArrowClockwise28Regular } from "@fluentui/react-icons";
// import {Divider} from "@fluentui/react-components";
// import QuotationDrawer from "./QuotationDrawer";
// const useStyles = makeStyles({
//     statusBullet: {
//       display: "inline-block",
//       width: "8px",
//       height: "8px",
//       borderRadius: "50%",
//       marginRight: "8px",
//     },
//     statusAck: { backgroundColor: "green" },
//     statusTobe: { backgroundColor: "yellow" },
//     statusReject: { backgroundColor: "red" },
//     iconButtonContainer: {
//       display: "flex",
//       alignItems: "center",
//       gap: "8px",
//       marginTop: "4em",
//       marginLeft: "2em",
//     },
//     iconButton: {
//       display: "flex",
//       alignItems: "center",
//       backgroundColor: "transparent",
//       border: "1px solid #fff",
//       padding: "6px 12px",
//       cursor: "pointer",
//       gap: "8px",
//     },
//     icon: {
//       color: "#1281d7",
//       fontSize: "24px", // Adjust font size to match the ArrowClockwise icon
//     },
//   });
  
// const items = [
//   {
//     file: { label: "10" },
//     author: { label: "Rice" },
//     lastUpdated: { label: "test" },
//     lastUpdate: { label: "KG" },
//     Quantity: { label: "1000" },
//     NeedByDate: { label: "18 May 2023" },
//     Description: { label: "ABC" },
//     QuantityAmount:{label:"20"},
//     UnitPrice:{label:"1"},
//     Currency:{label:"INR"},
//     Tax:{label:"20%"},
//     NBD:{label:"May 10 2023"},
//     STO:{label:"Madurai"},
//     Remarks:{label:"Good"},
//     Request :{label:"May 7 2023 "},
//     Reshedule:{label:"Nov 10 2023"},
//     Remainder:{label:"Nov 8 2023"},
//     Status:{label:"Acknowledged"}
//   },
//   {
//     file: { label: "10" },
//     author: { label: "Rice" },
//     lastUpdated: { label: "test" },
//     lastUpdate: { label: "KG" },
//     Quantity: { label: "1000" },
//     NeedByDate: { label: "18 May 2023" },
//     Description: { label: "ABC" },
//     QuantityAmount:{label:"20"},
//     UnitPrice:{label:"1"},
//     Currency:{label:"INR"},
//     Tax:{label:"20%"},
//     NBD:{label:"May 10 2023"},
//     STO:{label:"Madurai"},
//     Remarks:{label:"Good"},
//     Request :{label:"May 7 2023 "},
//     Reshedule:{label:"Nov 10 2023"},
//     Remainder:{label:"Nov 8 2023"},
//     Status:{label:"Rejected"}
//   },
//   {
//     file: { label: "10" },
//     author: { label: "Rice" },
//     lastUpdated: { label: "test" },
//     lastUpdate: { label: "KG" },
//     Quantity: { label: "1000" },
//     NeedByDate: { label: "18 May 2023" },
//     Description: { label: "ABC" },
//     QuantityAmount:{label:"20"},
//     UnitPrice:{label:"1"},
//     Currency:{label:"INR"},
//     Tax:{label:"20%"},
//     NBD:{label:"May 10 2023"},
//     STO:{label:"Madurai"},
//     Remarks:{label:"Good"},
//     Request :{label:"May 7 2023 "},
//     Reshedule:{label:"Nov 10 2023"},
//     Remainder:{label:"Nov 8 2023"},
//     Status:{label:"To be Acknowledged"}
//   },
// ];



// const StatusCell = ({ statusLabel }) => {
//     const styles = useStyles();
//     const statusStyle =
//       statusLabel === "Acknowledged"
//         ? styles.statusAck
//         : statusLabel === "To be Acknowledged"
//         ? styles.statusTobe
//         : styles.statusReject;
  
//     return (
//       <TableCellLayout>
//         <span className={`${styles.statusBullet} ${statusStyle}`} />
//         {statusLabel}
//       </TableCellLayout>
//     );
//   };
// const columns = [
//   createTableColumn({
//     columnId: "file",
//     compare: (a, b) => a.file.label.localeCompare(b.file.label),
//     renderHeaderCell: () => "Buyer Name",
//     renderCell: (item) => (
//       <TableCellLayout style={{ maxWidth: "100px" }}>
//         {item.file.label}
//       </TableCellLayout>
//     ),
//   }),
//   createTableColumn({
//     columnId: "author",
//     compare: (a, b) => a.author.label.localeCompare(b.author.label),
//     renderHeaderCell: () => "PR Number",
//     renderCell: (item) => (
//       <TableCellLayout style={{ maxWidth: "150px" }}>
//         {item.author.label}
//       </TableCellLayout>
//     ),
//   }),
//   createTableColumn({
//     columnId: "lastUpdated",
//     renderHeaderCell: () => "Description",
//     renderCell: (item) => (
//       <TableCellLayout style={{ maxWidth: "200px" }}>
//         {item.lastUpdated.label}
//       </TableCellLayout>
//     ),
//   }),
//   createTableColumn({
//     columnId: "lastUpdate",
//     renderHeaderCell: () => "Quantity",
//     renderCell: (item) => (
//       <TableCellLayout style={{ maxWidth: "100px" }}>
//         {item.lastUpdate.label}
//       </TableCellLayout>
//     ),
//   }),
//   createTableColumn({
//     columnId: "Quantity",
//     renderHeaderCell: () => "Need By Date",
//     renderCell: (item) => (
//       <TableCellLayout style={{ maxWidth: "100px" }}>
//         {item.Quantity.label}
//       </TableCellLayout>
//     ),
//   }),
//   createTableColumn({
//     columnId: "Description",
//     renderHeaderCell: () => "Received Date",
//     renderCell: (item) => (
//       <TableCellLayout style={{ maxWidth: "150px" }}>
//         {item.Description.label}
//       </TableCellLayout>
//     ),
//   }),
//   createTableColumn({
//     columnId: "QuantityAmount",
//     renderHeaderCell: () => "UOM",
//     renderCell: (item) => (
//       <TableCellLayout style={{ maxWidth: "150px" }}>
//         {item.QuantityAmount.label}
//       </TableCellLayout>
//     ),
//   }),
//   createTableColumn({
//     columnId: "UnitPrice",
//     renderHeaderCell: () => "Item",
//     renderCell: (item) => (
//       <TableCellLayout style={{ maxWidth: "150px" }}>
//         {item.UnitPrice.label}
//       </TableCellLayout>
//     ),
//   }),
//   createTableColumn({
//     columnId: "Currency",
//     renderHeaderCell: () => "Line",
//     renderCell: (item) => (
//       <TableCellLayout style={{ maxWidth: "150px" }}>
//         {item.Currency.label}
//       </TableCellLayout>
//     ),
//   }),
 
// ];

// const QuotationTable = () => {
//     const styles = useStyles();
//     const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const defaultSortState = useMemo(
//     () => ({ sortColumn: "file", sortDirection: "ascending" }),
//     []
//   );

//   const gridContainerStyle = {
//     overflowX: "auto", 
//     width: "90vw", 
//   };

//   const handleRowClick = () => {
//     setIsDrawerOpen(true);
//     console.log("Status",isDrawerOpen)
//   };

//   return (
//     <div style={gridContainerStyle}>
//         <div>
//         <TabList
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
          
//         </div>

//         <Search placeholder="Search Requests"  style={{marginRight:"10em"}}/>
//       </TabList>
//       <div className={styles.dataGridContainer}>
//       <Divider style={{marginTop:"1em",marginBottom:"3em"}}/>
//         </div>
//       <DataGrid items={items} columns={columns} defaultSortState={defaultSortState}>
//   <DataGridHeader>
//     <DataGridRow>
//       {({ renderHeaderCell }) => (
//         <DataGridHeaderCell
//           style={{
//             maxWidth: "500vw", 
//               overflow: "visible",
//               whiteSpace: "normal",
//               wordBreak: "break-word",  
//             textOverflow: "clip", 
//           }}
//         >
//           {renderHeaderCell()}
//         </DataGridHeaderCell>
//       )}
//     </DataGridRow>
//   </DataGridHeader>
//   <DataGridBody>
//     {({ item, rowId }) => (
//       <DataGridRow key={rowId} onClick={handleRowClick}>
//         {({ renderCell }) => (
//           <DataGridCell
//             style={{
//               maxWidth: "200px", 
//               overflow: "visible",
//               whiteSpace: "normal",
//               wordBreak: "break-word",  
//             textOverflow: "clip", 
//             maxHeight:"300px"
//             }}
//           >
//             {renderCell(item)}
//           </DataGridCell>
//         )}
//       </DataGridRow>
//     )}
//   </DataGridBody>
// </DataGrid>
// </div>
// <QuotationDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
//     </div>
//   );
// };

// export default QuotationTable;



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
import { makeStyles, TabList, Tab, Divider, Button, Popover, PopoverSurface, PopoverTrigger } from "@fluentui/react-components";
import Search from "./Search";
import QuotationDrawer from "./QuotationDrawer";
import RFQDrawer from "./RFQDrawer";
import CompareDrawer from "./CompareDrawer";
import DatePickerComponent from "./DatePicker";
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
    renderHeaderCell: () => "Buyer Name",
    renderCell: (item) => <TableCellLayout>{item.lines[0].requestor}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "document_number",
    renderHeaderCell: () => "PR Number",
    renderCell: (item) => <TableCellLayout>{item.document_number}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "description",
    renderHeaderCell: () => "Description",
    renderCell: (item) => <TableCellLayout>{item.lines[0].description}</TableCellLayout>,
  }),
  // 
  
  createTableColumn({
    columnId: "status",
    renderHeaderCell: () => "Quantity",
    renderCell: (item) => <TableCellLayout>{item.lines[0].distributions[0].quantity}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "need_by_date",
    renderHeaderCell: () => "Need By Date",
    renderCell: (item) => <TableCellLayout>{item.lines[0].need_by_date}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "status",
    renderHeaderCell: () => "Status",
    renderCell: (item) => <TableCellLayout>{item.status}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "suppliersReplied",
    renderHeaderCell: () => "Received Date",
    renderCell: (item) => <TableCellLayout>{item.lines[0].last_update_date}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "suppliersReplied",
    renderHeaderCell: () => "UOM",
    renderCell: (item) => <TableCellLayout>{item.lines[0].uom}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "suppliersReplied",
    renderHeaderCell: () => "Line",
    renderCell: (item) => <TableCellLayout>{item.lines[0].line_number}</TableCellLayout>,
  }),
];

// Main component
const QuotationTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [items, setItems] = useState([]);
  const[userId,setUserID] = useState('');
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
  
  // Toggle Popover
  const togglePopover = () => setPopoverOpen(!popoverOpen);

  // Fetch data
  const fetchData = async () => {
    let userId=null;
    const token = localStorage.getItem("access_token");
    console.log(typeof token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
         userId = decodedToken.user_id;
         setUserID(userId);
        console.log("ID",userId);
        // const empIdFromToken = decodedToken.empId;
     
        
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
    try {
      const response = await axios.get(`http://172.235.21.99:57/user/pr-details/supplier/${userId}/`);
        
      
   
      const data = response.data;
      console.log("Status", data[0]?.status);
      // console.log("Data",data);
      
      
    
    
      // Map through the data to structure it as needed
      const mappedItems = data.flatMap((item) => {
        // Use lineData to check for lines or line_items
        const lineData = item.lines || item.line_items;
   
        if (lineData && lineData.length) {
          // Map over each line and create a new item for each line entry
          return lineData.map((line) => ({
            ...item,         // Copy all properties from the original item
            lines: [line],   // Replace 'lines' with a single line item array
          }));
        } else {
          // Handle case where there are no lines or line_items
          return {
            ...item,
            lines: [],       // Default to an empty array if no lines/line_items are found
          };
        }
      });

      const data1 = mappedItems.map((item) => {
        let status = "";  // Default status
    
        // Check if supplier_ids exists and has a length greater than 0
        if ("quotations" in item) {
            
            if(item.quotations.length==1)
            {
              status="To be Acknowledged";
            }
            else if(item.quotations.length==0 || item.quotations.length>1)
            {
              status="quotation";
            }
        } 
       
    
        // Set the status in the item
        item.status = status;
        return item;  // Return the modified item
    });
      
      setItems(data1);  // Set the processed items in state
      console.log("Mapped Items:", mappedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  

  useEffect(() => {
    fetchData();
    console.log("Items",items)
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
    console.log("status",item.status)
     console.log("items",item)
  };
 
 
  return (
    <div>
      <TabList appearance="subtle" style={{ marginLeft: "0vw", marginTop: "2vh" }}>
        <Tab value="tab1" style={{ border: "1px solid transparent", marginTop: "4em" }}>
          Quotation
        </Tab>
        <div className={styles.iconButtonContainer}>
          <button className={styles.iconButton} onClick={fetchData}>
            <ArrowClockwise28Regular className={styles.icon} />
            <span>Refresh</span>
          </button>
          {selectedStatus === "Todo" && (
            <button
              style={{ width: "100%", border: "none", backgroundColor: "white", color: "#1281d7", cursor: "pointer" }}
              onClick={togglePopover}
            >
              Choose Suppliers
            </button>
          )}
          {popoverOpen && (
            <Popover open={popoverOpen} onOpenChange={togglePopover} positioning={{ position: "right", align: "top" }}>
              <PopoverTrigger disableButtonEnhancement>
                <Button style={{ border: "none" }}></Button>
              </PopoverTrigger>
              <PopoverSurface tabIndex={-1} style={{ width: "50%", maxWidth: "300px", padding: "1.5em" }}>
                <div>
                  <h2 style={{ fontWeight: "normal" }}>Choose Suppliers</h2>
                  <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "200px", flexDirection: "column" }}>
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
        <Search placeholder="Search PO or Supplier" onSearchChange={handleSearchChange} />
      </TabList>
      <div className={styles.dataGridContainer}>
        <DataGrid items={items} columns={columns} selectionMode="multiselect">
          <DataGridHeader>
            <DataGridRow selectionCell={{ checkboxIndicator: { "aria-label": "Select all rows" } }}>
              {({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}
            </DataGridRow>
          </DataGridHeader>
          <DataGridBody>
            {({ item, rowId }) => (
              <DataGridRow key={rowId} onClick={() => handleRowClick(item)}>
                {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
              </DataGridRow>
            )}
          </DataGridBody>
        </DataGrid>
      </div>
      {selectedRowData && selectedRowData.status === "quotation" && <QuotationDrawer data={selectedRowData} userId={userId}/>}
      {selectedRowData && selectedRowData.status === "To be Acknowledged" && <AckDrawer data={selectedRowData} isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />}
      {/* <QuotationDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} /> */}
    </div>
  );
};

export default QuotationTable;

