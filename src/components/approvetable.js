

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowClockwise24Regular,
  Delete24Regular,
  TasksApp24Regular,
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
import Search from "./Search"; 
import {  notification,message } from "antd"; 
import { useDispatch, useSelector } from "react-redux";
import { refreshActions } from "../Store/Store";


import { Modal } from "antd";
import WalkInCandidate from "./WalkinCandidate";
import { ArrowSortUpFilled, ArrowSortDownRegular,ShareIos24Filled } from "@fluentui/react-icons";
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
            case "Gate Entry":
              return {
                backgroundColor: "#074799",
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
 
];

const SummaryTable = ({
  setFixCount,
  setMatchCount,
  setTableLength,
  setMultiple_MatchCount,
  
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]); 
  const [selectedRows, setSelectedRows] = useState(new Set());
  
  const [isWalkinUpload, setIsWalkinUpload] = useState(false);

  const [newCandidate, setNewCandidate] = useState(false);
  const [filtered, setFilteredItems] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isrefresh, setIsRefresh] = useState(false);
  const [isupload, setIsUpload] = useState(false);
  const navigate = useNavigate();
  console.log("Walkin",isWalkinUpload);
  const dispatch = useDispatch();
  const isInvoiceUploadRefreshed = useSelector(
    (state) => state.refresh.InvoiceUploadRefresh,
  );

  const [RefreshUpload, SetRefreshUpload] = useState(null);
  console.log(RefreshUpload);
 

  
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
     
      let MatchCount = 0;
      let multiple_MatchCount = 0;
      let fixCount = 0;
      let gatelength = 0;

      const mappedItems = fetchedItems.map((item) => {
        let Status = "";

        if (item.po_headers.length === 0) {
          Status = "No Match Found";
          fixCount += 1;
        } 
        else if (item.po_headers.length === 1) {
          console.log("wertyuio");
          if (item.storeuser === true) {
            console.log("wertyuio123");
            Status = "Gate Entry";
            gatelength+=1;
          } else if (item.storeuser === false) {
            MatchCount += 1;
            Status = "Match Found";
            
          }
        }

         else if (item.po_headers.length > 1) {
          Status = "Multiple Match Found";
          multiple_MatchCount += 1;
        }
        

       

        return {
          id: item.id,
          supplier: item.VendorName,
          amount: item.InvoiceTotal,
          lines: item.items.length,
          buyer: item.CustomerName,
          Status: Status, 
          // Store:item.storeuser
        };
      });
      
      setFixCount(fixCount);
      setMatchCount(MatchCount);
      setMultiple_MatchCount(multiple_MatchCount);
      setTableLength(tablelength);
      
      setItems(mappedItems);

      console.log("MAP IN SUMMARY",mappedItems);
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
  
    const filteredItems = items.filter((item) => {
      const searchLower = value?.trim().toLowerCase() || ""; // Use the input value directly
  
      return (
        item.id?.toString().toLowerCase().includes(searchLower) ||
        item.supplier?.toString().toLowerCase().includes(searchLower) ||
        item.amount?.toString().toLowerCase().includes(searchLower) ||
        item.Status?.toString().toLowerCase().includes(searchLower) ||
        item.buyer?.toLowerCase().includes(searchLower) ||
        item.Store?.toLowerCase().includes(searchLower)
      );
    });
  
    setFilteredItems(filteredItems); 
  };
  // setFilteredItems(filteredItems)
  const filteredItems = items.filter((item) => {
    const searchLower = searchQuery?.trim().toLowerCase() || ""; // Use state value for searchQuery
  
    return (
      item.id?.toString().toLowerCase().includes(searchLower) ||
      item.supplier?.toString().toLowerCase().includes(searchLower) ||
      item.amount?.toString().toLowerCase().includes(searchLower) ||
      item.Status?.toString().toLowerCase().includes(searchLower) ||
      item.buyer?.toLowerCase().includes(searchLower) ||
      item.Store?.toLowerCase().includes(searchLower)
    );
  });



  
 

  const handleRowClick = (e, item) => {
    if (e.target.type !== "checkbox") {
      const status = item.Status;
      console.log("Status", status);

      if (status === "Match Found") {
        navigate("/approve", {
          state: { poNumber: item.po_number, Id: item.Id },
        });
      
      } 
      else if (status === "Gate Entry") {
        navigate("/gateentry", {
          state: { poNumber: item.po_number, Id: item.Id },
        });
      }else if (status === "No Match Found") {
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
          ), 
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
    

    const sortedItems = [...filtered].sort((a, b) => {
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
            backgroundColor: isDelete ? "#e1e1e2" : "transparent", 
            border: "1px solid #fff",
            padding: "6px 12px",
            cursor: "pointer",
            gap: "8px",
            marginLeft: "2em",
            transition: "background-color 0.2s ease", 
          }}
          onMouseEnter={() => setIsDelete(true)} 
          onMouseLeave={() => setIsDelete(false)} 
          onClick={handleDeleteSelectedRows} 
        >
          <Delete24Regular style={{ color: "#1281d7" }} />
          <span>Delete</span>
        </button>

        <button
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: isHovered ? "#e1e1e2" : "transparent", 
            border: "1px solid #fff",
            padding: "6px 12px",
            cursor: "pointer",
            gap: "8px",
            marginLeft: "2em",
            transition: "background-color 0.2s ease", 
          }}
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)} 
          onClick={handleApproveSelectedRows}
        >
          <TasksApp24Regular style={{ color: "#1281d7" }} />
          <span>Approve</span>
        </button>

        <button
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: isrefresh ? "#e1e1e2" : "transparent", 
            border: "1px solid #fff",
            padding: "6px 12px",
            cursor: "pointer",
            gap: "8px",
            marginLeft: "2em",
            transition: "background-color 0.2s ease", 
          }}
          onMouseEnter={() => setIsRefresh(true)} 
          onMouseLeave={() => setIsRefresh(false)} 
          // onClick={fetchData}
          onClick={handleRefreshClick}
        >
          <ArrowClockwise24Regular style={{ color: "#1281d7" }} />
          <span>Refresh</span>
        </button>

        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // Ensures alignment in case of larger button dimensions
            backgroundColor: isupload ? "#e1e1e2" : "transparent", 
            border: "1px solid #fff",
            padding: "6px 12px",
            cursor: "pointer",
            gap: "8px",
            marginLeft: "2em",
            whiteSpace: "nowrap", // Prevents wrapping of content
          }}
          onMouseEnter={() => setIsUpload(true)} 
          onMouseLeave={() => setIsUpload(false)} 
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
      key={items.length}
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
