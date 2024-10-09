import * as React from "react";
import { ArrowClockwise28Regular, Delete28Regular, TasksApp28Regular } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
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
import Search from "./Search"; // Assuming your search component is imported here
import { useState } from "react";

const items = [
  {
    file: { label: "13456" },
    author: { label: "Bluetech" },
    lastUpdated: { label: "chennai", timestamp: 1 },
    lastUpdate: { label: "12/03/2024" },
    TotalAmount: { label: "15000 INR" },
    InvoiceDate: { label: "12/03/2024" },
  },
  {
    file: { label: "13459" },
    author: { label: "Facebook" },
    lastUpdated: { label: "chennai", timestamp: 2 },
    lastUpdate: { label: "17/04/2024" },
    TotalAmount: { label: "15000 INR" },
    InvoiceDate: { label: "12/03/2024" },
  },
  {
    file: { label: "13465" },
    author: { label: "Intel" },
    lastUpdated: { label: "coimbatore", timestamp: 2 },
    lastUpdate: { label: "17/05/2024" },
    TotalAmount: { label: "16000 INR" },
    InvoiceDate: { label: "12/03/2024" },
  },
  {
    file: { label: "13466" },
    author: { label: "Shar_Supplier" },
    lastUpdated: { label: "Salem", timestamp: 3 },
    lastUpdate: { label: "27/06/2024" },
    TotalAmount: { label: "18000 INR" },
    InvoiceDate: { label: "12/03/2024" },
  },
  {
    file: { label: "13472" },
    author: { label: "Google" },
    lastUpdated: { label: "Madurai", timestamp: 3 },
    lastUpdate: { label: "7/04/2024" },
    TotalAmount: { label: "25000 INR" },
    InvoiceDate: { label: "12/03/2024" },
  },
  {
    file: { label: "13477" },
    author: { label: "Levin Technologies" },
    lastUpdated: { label: "Coimbatore", timestamp: 3 },
    lastUpdate: { label: "27/08/2024" },
    TotalAmount: { label: "45000 INR" },
    InvoiceDate: { label: "12/03/2024" },
  },
  {
    file: { label: "13489" },
    author: { label: "Jane Doe" },
    lastUpdated: { label: "Chennai", timestamp: 3 },
    lastUpdate: { label: "17/10/2024" },
    TotalAmount: { label: "35000 INR" },
    InvoiceDate: { label: "12/03/2024" },
  },
];



const columns = [
  createTableColumn({
    columnId: "file",
    renderHeaderCell: () => "PO Number",
    renderCell: (item) => <TableCellLayout>{item.file.label}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "author",
    renderHeaderCell: () => "Supplier",
    renderCell: (item) => <TableCellLayout>{item.author.label}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "lastUpdated",
    renderHeaderCell: () => "Site",
    renderCell: (item) => item.lastUpdated.label,
  }),
  createTableColumn({
    columnId: "lastUpdate",
    renderHeaderCell: () => "PO Date",
    renderCell: (item) => (
      <TableCellLayout>{item.lastUpdate.label}</TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "TotalAmount",
    renderHeaderCell: () => "Total Amount",
    renderCell: (item) => (
      <TableCellLayout>{item.TotalAmount.label}</TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "InvoiceDate",
    renderHeaderCell: () => "InvoiceDate",
    renderCell: (item) => (
      <TableCellLayout>{item.InvoiceDate.label}</TableCellLayout>
    ),
  }),
];

const ApproveTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState(new Set()); // Store selected row IDs
  const navigate = useNavigate();

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const filteredItems = items.filter((item) => {
    return (
      item.file.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lastUpdated.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lastUpdate.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.TotalAmount.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.InvoiceDate.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleRowClick = (e, item) => {
    
    if (e.target.type !== "checkbox") {
      navigate(`/approvepage`, { state: { poNumber: item.file.label } });
    }
  };

  const handleSelectionChange = (event, data) => {
    setSelectedRows(data.selectedItems);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          fontWeight: "bold",
          marginLeft: "-3em",
        }}
      >
        <button
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "transparent",
            border: "1px solid #fff",
            padding: "6px 12px",
            cursor: "pointer",
            gap: "8px", // space between icon and text
            marginLeft: "2em",
          }}
          onClick={() => alert("Update")}
        >
          <TasksApp28Regular style={{color:"#1281d7"}}/>
          <span>Approve</span>
        </button>

        <button
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "transparent",
            border: "1px solid #fff",
            padding: "6px 12px",
            cursor: "pointer",
            gap: "8px", // space between icon and text
            marginLeft: "2em",
          }}
          onClick={() => alert("Delete")}
        >
          <Delete28Regular style={{color:"#1281d7"}}/>
          <span>Delete</span>
        </button>

        <button
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "transparent",
            border: "1px solid #fff",
            padding: "6px 12px",
            borderRadius: "5px",
            cursor: "pointer",
            gap: "8px",
            marginLeft: "2em",
          }}
          onClick={() => alert("Refresh")}
        >
          <ArrowClockwise28Regular style={{color:"#1281d7"}}/>
          <span>Refresh</span>
        </button>

        <Search
          placeholder="Search Invoice or PO"
          onSearchChange={handleSearchChange}
        />
      </div>

      <DataGrid
        items={filteredItems}
        columns={columns}
        sortable
        selectionMode="multiselect"
        onSelectionChange={handleSelectionChange} // Handle row selection
        getRowId={(item) => item.file.label}
        focusMode="composite"
        style={{ minWidth: "550px" }}
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody>
          {({ item, rowId }) => (
            <DataGridRow
              key={rowId}
              onClick={(e) => handleRowClick(e, item)} // Handle row click
              selected={selectedRows.has(item.file.label)} // Handle row selection visually
            >
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </>
  );
};

export default ApproveTable;


// API connection 
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ArrowClockwise28Regular, Delete28Regular, TasksApp28Regular } from "@fluentui/react-icons";
// import { useNavigate } from "react-router-dom";
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
// import Search from "./Search"; // Assuming your search component is imported here

// // Define columns for the DataGrid
// const columns = [
//   createTableColumn({
//     columnId: "file",
//     renderHeaderCell: () => "PO Number",
//     renderCell: (item) => <TableCellLayout>{item.file.label}</TableCellLayout>,
//   }),
//   createTableColumn({
//     columnId: "author",
//     renderHeaderCell: () => "Supplier",
//     renderCell: (item) => <TableCellLayout>{item.author.label}</TableCellLayout>,
//   }),
//   createTableColumn({
//     columnId: "lastUpdated",
//     renderHeaderCell: () => "Site",
//     renderCell: (item) => item.lastUpdated.label,
//   }),
//   createTableColumn({
//     columnId: "lastUpdate",
//     renderHeaderCell: () => "PO Date",
//     renderCell: (item) => (
//       <TableCellLayout>{item.lastUpdate.label}</TableCellLayout>
//     ),
//   }),
//   createTableColumn({
//     columnId: "TotalAmount",
//     renderHeaderCell: () => "Total Amount",
//     renderCell: (item) => (
//       <TableCellLayout>{item.TotalAmount.label}</TableCellLayout>
//     ),
//   }),
//   createTableColumn({
//     columnId: "InvoiceDate",
//     renderHeaderCell: () => "Invoice Date",
//     renderCell: (item) => (
//       <TableCellLayout>{item.InvoiceDate.label}</TableCellLayout>
//     ),
//   }),
// ];

// const ApproveTable = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [items, setItems] = useState([]); // State to hold API data
//   const [selectedRows, setSelectedRows] = useState(new Set());
//   const navigate = useNavigate();

//   // Fetch data from the API when the component mounts
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("YOUR_API_ENDPOINT_HERE"); // Replace with your API URL
//         const fetchedItems = response.data; // Assuming data is in response.data
//         // Map fetched data to the format expected by DataGrid
//         const mappedItems = fetchedItems.map((item) => ({
//           file: { label: item.poNumber },
//           author: { label: item.supplier },
//           lastUpdated: { label: item.site },
//           lastUpdate: { label: item.poDate },
//           TotalAmount: { label: item.totalAmount },
//           InvoiceDate: { label: item.invoiceDate },
//         }));
//         setItems(mappedItems);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSearchChange = (value) => {
//     setSearchQuery(value);
//   };

//   const filteredItems = items.filter((item) => {
//     return (
//       item.file.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.author.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.lastUpdated.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.lastUpdate.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.TotalAmount.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.InvoiceDate.label.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   });

//   const handleRowClick = (e, item) => {
//     if (e.target.type !== "checkbox") {
//       navigate(`/approvepage`, { state: { poNumber: item.file.label } });
//     }
//   };

//   const handleSelectionChange = (event, data) => {
//     setSelectedRows(data.selectedItems);
//   };

//   return (
//     <>
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: "20px",
//           fontWeight: "bold",
//           marginLeft: "-3em",
//         }}
//       >
//         <button
//           style={{
//             display: "flex",
//             alignItems: "center",
//             backgroundColor: "transparent",
//             border: "1px solid #fff",
//             padding: "6px 12px",
//             cursor: "pointer",
//             gap: "8px",
//             marginLeft: "2em",
//           }}
//           onClick={() => alert("Approve")}
//         >
//           <TasksApp28Regular style={{ color: "#1281d7" }} />
//           <span>Approve</span>
//         </button>

//         <button
//           style={{
//             display: "flex",
//             alignItems: "center",
//             backgroundColor: "transparent",
//             border: "1px solid #fff",
//             padding: "6px 12px",
//             cursor: "pointer",
//             gap: "8px",
//             marginLeft: "2em",
//           }}
//           onClick={() => alert("Delete")}
//         >
//           <Delete28Regular style={{ color: "#1281d7" }} />
//           <span>Delete</span>
//         </button>

//         <button
//           style={{
//             display: "flex",
//             alignItems: "center",
//             backgroundColor: "transparent",
//             border: "1px solid #fff",
//             padding: "6px 12px",
//             borderRadius: "5px",
//             cursor: "pointer",
//             gap: "8px",
//             marginLeft: "2em",
//           }}
//           onClick={() => alert("Refresh")}
//         >
//           <ArrowClockwise28Regular style={{ color: "#1281d7" }} />
//           <span>Refresh</span>
//         </button>

//         <Search
//           placeholder="Search Invoice or PO"
//           onSearchChange={handleSearchChange}
//         />
//       </div>

//       <DataGrid
//         items={filteredItems}
//         columns={columns}
//         sortable
//         selectionMode="multiselect"
//         onSelectionChange={handleSelectionChange}
//         getRowId={(item) => item.file.label}
//         focusMode="composite"
//         style={{ minWidth: "550px" }}
//       >
//         <DataGridHeader>
//           <DataGridRow>
//             {({ renderHeaderCell }) => (
//               <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
//             )}
//           </DataGridRow>
//         </DataGridHeader>
//         <DataGridBody>
//           {({ item, rowId }) => (
//             <DataGridRow
//               key={rowId}
//               onClick={(e) => handleRowClick(e, item)}
//               selected={selectedRows.has(item.file.label)}
//             >
//               {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
//             </DataGridRow>
//           )}
//         </DataGridBody>
//       </DataGrid>
//     </>
//   );
// };

// export default ApproveTable;
