// // API connection
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   ArrowClockwise28Regular,
//   Delete28Regular,
//   TasksApp28Regular,
// } from "@fluentui/react-icons";
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
// import { Button, notification } from "antd"; // Import Ant Design components
// import { useDispatch, useSelector } from "react-redux";
// import { refreshActions } from "../Store/Store";

// // Define columns for the DataGrid
// const columns = [
//   createTableColumn({
//     columnId: "po_number",
//     renderHeaderCell: () => "PO Number",
//     renderCell: (item) => <TableCellLayout>{item.po_number}</TableCellLayout>,
//   }),
//   createTableColumn({
//     columnId: "po_type",
//     renderHeaderCell: () => "PO Type",
//     renderCell: (item) => <TableCellLayout>{item.po_type}</TableCellLayout>,
//   }),
//   createTableColumn({
//     columnId: "po_status",
//     renderHeaderCell: () => "PO Status",
//     renderCell: (item) => <TableCellLayout>{item.po_status}</TableCellLayout>,
//   }),
//   createTableColumn({
//     columnId: "supplier_name",
//     renderHeaderCell: () => "Supplier Name",
//     renderCell: (item) => (
//       <TableCellLayout>{item.supplier_name}</TableCellLayout>
//     ),
//   }),
//   createTableColumn({
//     columnId: "location",
//     renderHeaderCell: () => "Location",
//     renderCell: (item) => <TableCellLayout>{item.location}</TableCellLayout>,
//   }),
//   createTableColumn({
//     columnId: "ship_to",
//     renderHeaderCell: () => "Ship To",
//     renderCell: (item) => <TableCellLayout>{item.ship_to}</TableCellLayout>,
//   }),
//   createTableColumn({
//     columnId: "bill_to",
//     renderHeaderCell: () => "Bill To",
//     renderCell: (item) => <TableCellLayout>{item.bill_to}</TableCellLayout>,
//   }),
//   createTableColumn({
//     columnId: "buyer_name",
//     renderHeaderCell: () => "Buyer Name",
//     renderCell: (item) => <TableCellLayout>{item.buyer_name}</TableCellLayout>,
//   }),
//   createTableColumn({
//     columnId: "total_amount",
//     renderHeaderCell: () => "Total Amount",
//     renderCell: (item) => (
//       <TableCellLayout>
//         {item.total_amount !== null ? item.total_amount : "N/A"}
//       </TableCellLayout>
//     ),
//   }),
//   createTableColumn({
//     columnId: "status",
//     renderHeaderCell: () => "Status",
//     renderCell: (item) => (
//       <TableCellLayout>{item.status || "N/A"}</TableCellLayout>
//     ),
//   }),
// ];

// const ApproveTable = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [items, setItems] = useState([]); // State to hold API data
//   const [selectedRows, setSelectedRows] = useState(new Set());
//   const [po_id, set_Po_id] = useState("");
//   const navigate = useNavigate();

//   const dispatch = useDispatch();
//   const isInvoiceUploadRefreshed = useSelector(
//     (state) => state.refresh.InvoiceUploadRefresh,
//   );

//   const [RefreshUpload, SetRefreshUpload] = useState(null);

//   const [DeleteRefresh, SetDeleteRefresh] = useState(false);

//   // Fetch data from the API when the component mounts
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         "https://invoicezapi.focusrtech.com:57/user/one-invoice-list",
//       );
//       const fetchedItems = response.data; // Assuming data is in response.data
//       console.log("fetchedItems", fetchedItems);
//       set_Po_id(fetchedItems[0]["po_headers"][0]["id"]);
//       //  console.log("InvId",InvoiceNumber);
//       // Map fetched data to the format expected by DataGrid
//       const mappedItems = fetchedItems.map((item) => ({
//         Id: item.po_headers[0].id,
//         InvoiceId: item.id,
//         InvoiceNumber: item.InvoiceId,
//         po_number: item.po_headers[0].po_number,
//         po_type: item.po_headers[0].po_type,
//         po_status: item.po_headers[0].po_status,
//         supplier_name: item.po_headers[0].supplier_name,
//         location: item.po_headers[0].location,
//         ship_to: item.po_headers[0].ship_to,
//         bill_to: item.po_headers[0].bill_to,
//         buyer_name: item.po_headers[0].buyer_name,
//         total_amount: item.po_headers[0].total_amount,
//         status: item.po_headers[0].status,
//       }));

//       setItems(mappedItems);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     SetRefreshUpload(isInvoiceUploadRefreshed);
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [isInvoiceUploadRefreshed]);

//   const handleSearchChange = (value) => {
//     setSearchQuery(value);
//   };
//   // console.log("--------->",filteredItems)
//   const filteredItems = items.filter((item) => {
//     const searchLower = searchQuery?.trim().toLowerCase() || "";

//     return (
//       item.InvoiceId?.toString().toLowerCase().includes(searchLower) ||
//       item.InvoiceNumber?.toString().toLowerCase().includes(searchLower) ||
//       item.po_number?.toString().toLowerCase().includes(searchLower) ||
//       item.po_type?.toLowerCase().includes(searchLower) ||
//       item.po_status?.toLowerCase().includes(searchLower) ||
//       item.supplier_name?.toLowerCase().includes(searchLower) ||
//       item.location?.toLowerCase().includes(searchLower) ||
//       item.ship_to?.toLowerCase().includes(searchLower) ||
//       item.bill_to?.toLowerCase().includes(searchLower) ||
//       item.buyer_name?.toLowerCase().includes(searchLower) ||
//       item.total_amount?.toString().toLowerCase().includes(searchLower) ||
//       item.status?.toLowerCase().includes(searchLower)
//     );
//   });

//   const handleRowClick = (e, item) => {
//     if (e.target.type !== "checkbox") {
//       navigate(`/approvepage`, {
//         state: { poNumber: item.po_number, Id: item.Id },
//       });
//       console.log("ItemId", item.Id);
//     }
//   };

//   const handleSelectionChange = (event, data) => {
//     console.log("handleSelectionChange", data.selectedItems);
//     setSelectedRows(data.selectedItems);
//   };

//   //  delete API
//   const handleDeleteSelectedRows = async () => {
//     const selectedItemsArray = Array.from(selectedRows);
//     if (selectedItemsArray.length === 0) {
//       notification.warning({
//         message: "No PO Selected",
//         description: "Please select at least one PO to delete.",
//       });
//       return;
//     }

//     try {
//       const supplierNames = selectedItemsArray
//         .map((item) => item.supplier_name)
//         .join(", ");

//       const deletePromises = selectedItemsArray.map((item) =>
//         axios.delete(
//           `https://invoicezapi.focusrtech.com:57/user/delete-invoice/${filteredItems[item].InvoiceId}`,
//         ),
//       );

//       await Promise.all(deletePromises);

//       const newItems = items.filter(
//         (item) =>
//           !selectedItemsArray.some(
//             (selectedItem) => selectedItem.InvoiceId === item.InvoiceId,
//           ), // Ensure to compare InvoiceId
//       );

//       setItems(newItems);

//       notification.success({
//         message: "Successfully deleted",
//         description: `You have successfully deleted: ${supplierNames}`,
//       });

//       dispatch(refreshActions.toggleInvoiceUploadRefresh());
//     } catch (error) {
//       const supplierNames = selectedItemsArray
//         .map((item) => item.supplier_name)
//         .join(", ");
//       notification.error({
//         message: "Deletion Failed",
//         description: `Deletion Failed for: ${supplierNames}. ${error.response?.data?.message || "An error occurred."}`,
//       });
//     }
//   };

//   // Approve API

//   const handleApproveSelectedRows = async () => {
//     const selectedItemsArray = Array.from(selectedRows); // Convert Set to Array
//     if (selectedItemsArray.length === 0) {
//       notification.warning({
//         message: "No PO Selected",
//         description: "Please select at least one PO to Approve.",
//       });
//       return;
//     }

//     try {
//       const supplierNames = selectedItemsArray
//         .map((item) => item.supplier_name)
//         .join(", ");

//       // Make API call to delete selected POs
//       await Promise.all(
//         selectedItemsArray.map((item) =>
//           axios.post(`https://invoicezapi.focusrtech.com:57/user/oracle-payload/${po_id}`),
//         ),
//       );

//       // Remove deleted items from the state
//       setItems(items.filter((item) => !selectedItemsArray.includes(item)));

//       // Show success notification
//       notification.success({
//         message: "Successfully Approved",
//         description: `You have successfully approved: ${supplierNames}`,
//       });
//       dispatch(refreshActions.toggleInvoiceUploadRefresh());
//     } catch (error) {
//       const supplierNames = selectedItemsArray
//         .map((item) => item.supplier_name)
//         .join(", ");
//       notification.error({
//         message: "Approval Failed",
//         description: `Approval Failed for: ${supplierNames}. ${error.response?.data?.message || "An error occurred."}`,
//       });
//     }
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
//             height: "7vh",
//           }}
//           onClick={handleDeleteSelectedRows} // Call delete function
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
//             cursor: "pointer",
//             gap: "8px",
//             marginLeft: "2em",
//           }}
//           onClick={handleApproveSelectedRows}
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
//           onClick={fetchData}
//         >
//           <ArrowClockwise28Regular style={{ color: "#1281d7" }} />
//           <span>Refresh</span>
//         </button>

//         <Search
//           placeholder="Search PO or Supplier"
//           onSearchChange={handleSearchChange}
//         />
//       </div>
//       <div
//         style={{
//           height: "60vh",
//           overflow: "scroll",
//           marginTop: "20px",
//         }}
//       >
//         <DataGrid
//           items={filteredItems}
//           columns={columns}
//           sortable
//           selectionMode="multiselect"
//           onSelectionChange={handleSelectionChange}
//           getRowId={(_, index) => index}
//           focusMode="composite"
//           style={{ minWidth: "600px" }}
//         >
//           <DataGridHeader>
//             <DataGridRow>
//               {({ renderHeaderCell }) => (
//                 <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
//               )}
//             </DataGridRow>
//           </DataGridHeader>
//           <DataGridBody>
//             {({ item, rowId }) => (
//               <DataGridRow
//                 key={rowId}
//                 onClick={(e) => handleRowClick(e, item)}
//                 selected={selectedRows.has(rowId)}
//               >
//                 {({ renderCell }) => (
//                   <DataGridCell
//                     style={{
//                       wordWrap: "break-word",
//                       whiteSpace: "normal",
//                       overflow: "hidden",
//                     }}
//                   >
//                     {renderCell(item)}
//                   </DataGridCell>
//                 )}
//               </DataGridRow>
//             )}
//           </DataGridBody>
//         </DataGrid>
//       </div>
//     </>
//   );
// };

// export default ApproveTable;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowClockwise28Regular,
  Delete28Regular,
  TasksApp28Regular,
} from "@fluentui/react-icons";
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
import { Button, notification } from "antd"; // Import Ant Design components
import { useDispatch, useSelector } from "react-redux";
import { refreshActions } from "../Store/Store";
import {message} from "antd";
import { ShareIos24Filled } from "@fluentui/react-icons";
import { Modal } from "antd";
import WalkInCandidate from "./WalkinCandidate";
import { ArrowSortUpFilled, ArrowSortDownRegular } from "@fluentui/react-icons";
// Define columns for the DataGrid
const columns = [
  createTableColumn({
    columnId: "id",
    renderHeaderCell: () => "Invoice number ",
    renderCell: (item) => <TableCellLayout>{item.id}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "supplier",
    renderHeaderCell: () => "Supplier name ",
    renderCell: (item) => <TableCellLayout>{item.supplier}</TableCellLayout>,
  }),
  // createTableColumn({
  //   columnId: "po_status",
  //   renderHeaderCell: () => "Status",
  //   renderCell: (item) => <TableCellLayout>{item.po_status}</TableCellLayout>,
  // }),

  createTableColumn({
    columnId: "Status",
    renderHeaderCell: () => "Status",
    renderCell: (item) => {
      const getStatusStyle = (status) => {
        switch (status) {
          case "Match Found":
            return {
              backgroundColor: "#107c10",
              color: "#fff",
              borderRadius: "8px",
              textShadow: "0 1px 3px rgba(0,0,0,0.2)",
              padding: "4px 8px",
              textAlign: "center",
            };
          case "Multiple Match Found":
            return {
              backgroundColor: "#f2c661",
              color: "black",
              borderRadius: "8px",
              padding: "4px 8px",
              textAlign: "center",
            };
          case "No Match Found":
            return {
              backgroundColor: "#c50f1f",
              color: "white",
              borderRadius: "8px",
              padding: "4px 8px",
              textAlign: "center",
            };
          // default:
          //   return { backgroundColor: "gray", color: "white", borderRadius: "10px", padding: "4px 8px", textAlign: "center" };
        }
      };

      return (
        <TableCellLayout>
          <span style={getStatusStyle(item.Status)}>{item.Status}</span>
        </TableCellLayout>
      );
    },
  }),

  createTableColumn({
    columnId: "amount",
    renderHeaderCell: () => "Amount",
    renderCell: (item) => <TableCellLayout>{item.amount}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "lines",
    renderHeaderCell: () => "Total number of lines ",
    renderCell: (item) => <TableCellLayout>{item.lines}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "buyer",
    renderHeaderCell: () => "Buyer Name",
    renderCell: (item) => <TableCellLayout>{item.buyer}</TableCellLayout>,
  }),
  // createTableColumn({
  //   columnId: "",
  //   renderHeaderCell: () => "PO Number",
  //   renderCell: (item) => <TableCellLayout>{item.bill_to}</TableCellLayout>,
  // }),
];

const SummaryTable = ({
  setFixCount,
  setMatchCount,
  setTableLength,
  setMultiple_MatchCount,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]); // State to hold API data
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [po_id, set_Po_id] = useState("");
  const [isWalkinUpload, setIsWalkinUpload] = useState(false);
  const [newCandidate, setNewCandidate] = useState(false);
  const [filtered, setFilteredItems] = useState([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isInvoiceUploadRefreshed = useSelector(
    (state) => state.refresh.InvoiceUploadRefresh,
  );

  const [RefreshUpload, SetRefreshUpload] = useState(null);

  const [DeleteRefresh, SetDeleteRefresh] = useState(false);
  // let tableLength=fetchedItems.length;
  // Fetch data from the API when the component mounts
  const fetchData = async (showMessage = false) => {
    if (showMessage) {
      message.success("Refreshing...");
    }
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get("https://invoicezapi.focusrtech.com:57/user/invoices", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const fetchedItems = response.data; // Assuming data is in response.data
      console.log("fetchedItems Summary", fetchedItems);
      const tablelength = fetchedItems.length;
      console.log("Table length", tablelength);
      let Status = "";

      let MatchCount = 0;
      let multiple_MatchCount = 0;
      let fixCount = 0;

      const mappedItems = fetchedItems.map((item) => {
        let Status = "";

        if (item.po_headers.length === 0) {
          Status = "No Match Found";
          fixCount += 1;
        } else if (item.po_headers.length === 1) {
          Status = "Match Found";
          MatchCount += 1;
        } else if (item.po_headers.length > 1) {
          Status = "Multiple Match Found";
          multiple_MatchCount += 1;
        }

        // setTableLength(tablelength);
        // setFixCount(fixCount);
        // setMatchCount(MatchCount);
        // setMultiple_MatchCount(multiple_MatchCount);

        return {
          id: item.id,
          supplier: item.VendorName,
          amount: item.InvoiceTotal,
          lines: item.items.length,
          buyer: item.CustomerName,
          Status: Status, // Add Status to the mapped item
        };
      });
      console.log("FIX ", fixCount);
      console.log("Match", MatchCount);
      console.log("Multiple", multiple_MatchCount);
      setFixCount(fixCount);
      setMatchCount(MatchCount);
      setMultiple_MatchCount(multiple_MatchCount);
      setTableLength(tablelength);

      setItems(mappedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log("Fiiiii", items);

  useEffect(() => {
    SetRefreshUpload(isInvoiceUploadRefreshed);
  }, []);

  useEffect(() => {
    setFilteredItems(items); 
  }, [items])

  useEffect(() => {
    fetchData();
  }, [isInvoiceUploadRefreshed]);

  const handleRefreshClick = () => {
    fetchData(true); // Pass `true` to show the message when button is clicked
  };
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };
  // console.log("--------->",filteredItems)
  const filteredItems = items.filter((item) => {
    const searchLower = searchQuery?.trim().toLowerCase() || "";

    if (
      searchLower === "match" ||
      searchLower === "match found" ||
      searchLower === "matc"
    ) {
      return item.Status?.toString().toLowerCase() === "match found";
    }

    return (
      item.id?.toString().toLowerCase().includes(searchLower) ||
      item.supplier?.toString().toLowerCase().includes(searchLower) ||
      item.amount?.toString().toLowerCase().includes(searchLower) ||
      item.Status?.toString().toLowerCase().includes(searchLower) ||
      item.buyer?.toLowerCase().includes(searchLower)
    );
  });
  console.log("Filtered ", filteredItems);

  // const handleRowClick = (e, item) => {
  //   if (e.target.type !== "checkbox") {
  //     navigate(`/storedetails`, {
  //       state: { poNumber: item.po_number, Id: item.Id },
  //     });
  //     console.log("ItemId", item.Id);
  //   }
  // };

  const handleRowClick = (e, item) => {
    if (e.target.type !== "checkbox") {
      const status = item.Status;
      console.log("Status", status);

      if (status === "Match Found") {
        navigate("/approve", {
          state: { poNumber: item.po_number, Id: item.Id },
        });
      } else if (status === "No Match Found") {
        navigate("/issuefix", {
          state: { poNumber: item.po_number, Id: item.Id },
        });
      } else if (status === "Multiple Match Found") {
        navigate("/ai", { state: { poNumber: item.po_number, Id: item.Id } });
      }
    }
  };

  const handleSelectionChange = (event, data) => {
    console.log("handleSelectionChange", data.selectedItems);
    setSelectedRows(data.selectedItems);
  };

  //  delete API
  const handleDeleteSelectedRows = async () => {
    const selectedItemsArray = Array.from(selectedRows);
    if (selectedItemsArray.length === 0) {
      notification.warning({
        message: "No PO Selected",
        description: "Please select at least one PO to delete.",
      });
      return;
    }

    try {
      const supplierNames = selectedItemsArray
        .map((item) => item.supplier_name)
        .join(", ");

      // const deletePromises = selectedItemsArray.map((item) =>
      //   axios.delete(
      //     `https://invoicezapi.focusrtech.com:57/user/delete-invoice/${filteredItems[item].id}`,
      //   ),
      // );
      const token = localStorage.getItem("access_token");
      const deletePromises = selectedItemsArray.map((item) =>
        axios.delete(
          `https://invoicezapi.focusrtech.com:57/user/delete-invoice/${filteredItems[item].id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the authorization header
            },
          }
        )
      );

      await Promise.all(deletePromises);

      const newItems = items.filter(
        (item) =>
          !selectedItemsArray.some(
            (selectedItem) => selectedItem.InvoiceId === item.InvoiceId,
          ), // Ensure to compare InvoiceId
      );

      setItems(newItems);
      setSelectedRows(new Set());

      notification.success({
        message: "Successfully deleted",
        description: `You have successfully deleted: ${supplierNames}`,
      });

      dispatch(refreshActions.toggleInvoiceUploadRefresh());
    } catch (error) {
      const supplierNames = selectedItemsArray
        .map((item) => item.supplier_name)
        .join(", ");
      notification.error({
        message: "Deletion Failed",
        description: `Deletion Failed for: ${supplierNames}. ${error.response?.data?.message || "An error occurred."}`,
      });
    }
  };

  // Approve API

  const handleApproveSelectedRows = async () => {
    const selectedItemsArray = Array.from(selectedRows); // Convert Set to Array
    if (selectedItemsArray.length === 0) {
      notification.warning({
        message: "No PO Selected",
        description: "Please select at least one PO to Approve.",
      });
      return;
    }

    try {
      const supplierNames = selectedItemsArray
        .map((item) => item.supplier_name)
        .join(", ");

        const token = localStorage.getItem("access_token");
             await Promise.all(
        selectedItemsArray.map((item) =>
          axios.post(
            `https://invoicezapi.focusrtech.com:57/user/update-storeuser/${filteredItems[item].id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`, // Add the authorization header
              },
            }
          )
        )
      );
  

      // Remove deleted items from the state
      setItems(items.filter((item) => !selectedItemsArray.includes(item)));

      // Show success notification
      notification.success({
        message: "Successfully Approved",
        description: `You have successfully approved: ${supplierNames}`,
      });
      dispatch(refreshActions.toggleInvoiceUploadRefresh());
    } catch (error) {
      const supplierNames = selectedItemsArray
        .map((item) => item.supplier_name)
        .join(", ");
      notification.error({
        message: "Approval Failed",
        description: `Approval Failed for: ${supplierNames}. ${error.response?.data?.message || "An error occurred."}`,
      });
    }
  };

  const handleIsWalkinUpload = () => {
    console.log("yes it works");
    setIsWalkinUpload(true);
    setNewCandidate(false);
  };
  const handleNewCandidate = () => {
    setNewCandidate(false);
  };
  const handleNewCandidateBtn = () => {
    console.log("btn clicked");
    setNewCandidate(true);
  };


  const [sortState, setSortState] = useState({
    columnId: "",
    sortDirection: "ascending",
  });
  
  const handleSort = (columnId) => {
    let newSortDirection = "ascending";

    if (sortState.columnId === columnId) {
      newSortDirection =
        sortState.sortDirection === "ascending" ? "descending" : "ascending";
    }

    setSortState({ columnId, sortDirection: newSortDirection });
    

    const sortedItems = [...filteredItems].sort((a, b) => {
      const aValue = a[columnId];
      const bValue = b[columnId];

      if (aValue < bValue) return newSortDirection === "ascending" ? -1 : 1;
      if (aValue > bValue) return newSortDirection === "ascending" ? 1 : -1;
      return 0;
    });
    console.log("SORTED",sortedItems);
    
    setFilteredItems(sortedItems); 
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
            gap: "8px",
            marginLeft: "2em",
            height: "7vh",
          }}
          onClick={handleDeleteSelectedRows} // Call delete function
        >
          <Delete28Regular style={{ color: "#1281d7" }} />
          <span>Delete</span>
        </button>

        <button
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "transparent",
            border: "1px solid #fff",
            padding: "6px 12px",
            cursor: "pointer",
            gap: "8px",
            marginLeft: "2em",
          }}
          onClick={handleApproveSelectedRows}
        >
          <TasksApp28Regular style={{ color: "#1281d7" }} />
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
            gap: "8px",
            marginLeft: "2em",
          }}
          // onClick={fetchData}
          onClick={handleRefreshClick}
        >
          <ArrowClockwise28Regular style={{ color: "#1281d7" }} />
          <span>Refresh</span>
        </button>

        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // Ensures alignment in case of larger button dimensions
            backgroundColor: "transparent",
            border: "1px solid #fff",
            padding: "6px 12px",
            cursor: "pointer",
            gap: "8px",
            marginLeft: "2em",
            whiteSpace: "nowrap", // Prevents wrapping of content
          }}
          onClick={handleNewCandidateBtn}
        >
          <ShareIos24Filled style={{ color: "#1281d7" }} />
          {/* <TasksApp28Regular style={{ color: "#1281d7" }} /> */}
          <span>Upload-Invoice</span>
        </button>

        <Search
          placeholder="Search PO or Supplier"
          onSearchChange={handleSearchChange}
        />
      </div>
      <div
        style={{
          height: "60vh",
          overflow: "scroll",
          marginTop: "20px",
        }}
      >
        <DataGrid
      items={filtered}
      columns={columns}
      sortable
      selectionMode="multiselect"
      onSelectionChange={handleSelectionChange}
      getRowId={(_, index) => index}
      focusMode="composite"
      style={{ minWidth: "600px" }}
    >
      <DataGridHeader>
        <DataGridRow>
          {({ renderHeaderCell, columnId }) => (
            <DataGridHeaderCell
              onClick={() => handleSort(columnId)}
              style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
            >
              {renderHeaderCell()}
              {sortState.columnId === columnId &&
                (sortState.sortDirection === "ascending" ? (
                  <ArrowSortUpFilled style={{ marginLeft: "5px" }} />
                ) : (
                  <ArrowSortDownRegular style={{ marginLeft: "5px" }} />
                ))}
            </DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody>
        {({ item, rowId }) => (
          <DataGridRow
            key={rowId}
            onClick={(e) => handleRowClick(e, item)}
            selected={selectedRows.has(rowId)}
          >
            {({ renderCell }) => (
              <DataGridCell
                style={{
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  overflow: "hidden",
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

      <Modal
        open={newCandidate}
        onCancel={handleNewCandidate}
        width={540}
        footer={[]}
      >
        <WalkInCandidate isWalkinUpload={handleIsWalkinUpload} />
      </Modal>
    </>
  );
};

export default SummaryTable;
