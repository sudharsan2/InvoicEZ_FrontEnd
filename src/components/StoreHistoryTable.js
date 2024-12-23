// API connection
import React, { useEffect, useState } from "react";
import { ArrowSortUpFilled, ArrowSortDownRegular } from "@fluentui/react-icons";
import axios from "axios";
import {
  ArrowClockwise24Regular,
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
import { message } from "antd";
// Define columns for the DataGrid
const columns = [
  createTableColumn({
    columnId: "grn_num",
    renderHeaderCell: () => "Generate Gate Entry Number",
    renderCell: (item) => <TableCellLayout>{item.grn_num}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "location",
    renderHeaderCell: () => "Location",
    renderCell: (item) => <TableCellLayout>{item.location}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "po_number",
    renderHeaderCell: () => "PO Number",
    renderCell: (item) => <TableCellLayout>{item.po_number}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "received_date",
    renderHeaderCell: () => "Received Date",
    renderCell: (item) => (
      <TableCellLayout>{item.received_date}</TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "supplier_name",
    renderHeaderCell: () => "Supplier Name",
    renderCell: (item) => (
      <TableCellLayout>{item.supplier_name}</TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "total_amount",
    renderHeaderCell: () => "Invoice Amount",
    renderCell: (item) => (
      <TableCellLayout>{item.total_amount}</TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "receipt",
    renderHeaderCell: () => "Receipt Number",
    renderCell: (item) => <TableCellLayout>{item.receipt}</TableCellLayout>,
  }),
];

const StoreHistoryTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]); // State to hold API data
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [po_id, set_Po_id] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isInvoiceUploadRefreshed = useSelector(
    (state) => state.refresh.InvoiceUploadRefresh,
  );

  const [RefreshUpload, SetRefreshUpload] = useState(null);

  const [DeleteRefresh, SetDeleteRefresh] = useState(false);

  // Fetch data from the API when the component mounts
  const fetchData = async (showMessage = false) => {
    if (showMessage) {
      message.success("Refreshing...");
    }
    try {
      // const response = await axios.get(
      //   "https://invoicezapi.focusrtech.com:57/user/grn-history",
      // );
      const token = localStorage.getItem("access_token");
      const response = await axios.get("https://invoicezapi.focusrtech.com:57/user/grn-history", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const fetchedItems = response.data; // Assuming data is in response.data
      console.log("fetchedItems", fetchedItems);
      // set_Po_id(fetchedItems[0]["po_headers"][0]["id"]);

      const mappedItems = fetchedItems.map((item, index) => {
        // Map over po_headers to get all po_numbers

        return {
          Id: item.po_headers && item.po_headers.length > 0 ? item.po_headers[0].id : null,
          grn_num: item.gate_entry_no,
          location: item.po_headers && item.po_headers.length > 0 ? item.po_headers[0].ship_to : null,
          po_number: item.po_headers && item.po_headers.length > 0 ? item.po_headers[0].po_number : null,
          received_date: item.receivedDate,
          supplier_name: item.VendorName,
          total_amount: item.InvoiceTotal,
          receipt: item.receipt_number,
        };
      });

      setItems(mappedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    SetRefreshUpload(isInvoiceUploadRefreshed);
  }, []);

  useEffect(() => {
    fetchData();
  }, [isInvoiceUploadRefreshed]);

  // const handleSearchChange = (value) => {
  //   setSearchQuery(value);
  // };
  // // console.log("--------->",filteredItems)
  // const filteredItems = items.filter((item) => {
  //   const searchLower = searchQuery?.trim().toLowerCase() || "";

  //   return (
  //     item.grn_num?.toString().toLowerCase().includes(searchLower) ||
  //     item.location?.toString().toLowerCase().includes(searchLower) ||
  //     item.po_number?.toString().toLowerCase().includes(searchLower) ||
  //     item.received_date?.toLowerCase().includes(searchLower) ||
  //     item.po_status?.toLowerCase().includes(searchLower) ||
  //     item.supplier_name?.toLowerCase().includes(searchLower) ||
  //     item.total_amount?.toLowerCase().includes(searchLower) ||
  //     item.receipt?.toLowerCase().includes(searchLower)
  //   );
  // })


  const handleSearchChange = (value) => {
    setSearchQuery(value);
  
    const filteredItems = items.filter((item) => {
      const searchLower = searchQuery?.trim().toLowerCase() || "";
  
      return (
        item.grn_num?.toString().toLowerCase().includes(searchLower) ||
        item.location?.toString().toLowerCase().includes(searchLower) ||
        item.po_number?.toString().toLowerCase().includes(searchLower) ||
        item.received_date?.toLowerCase().includes(searchLower) ||
        item.po_status?.toLowerCase().includes(searchLower) ||
        item.supplier_name?.toLowerCase().includes(searchLower) ||
        item.total_amount?.toLowerCase().includes(searchLower) ||
        item.receipt?.toLowerCase().includes(searchLower)
      );
    })
  
    setFilteredItems(filteredItems); 
  };







  const filteredItems = items.filter((item) => {
    const searchLower = searchQuery?.trim().toLowerCase() || "";

    return (
      item.grn_num?.toString().toLowerCase().includes(searchLower) ||
      item.location?.toString().toLowerCase().includes(searchLower) ||
      item.po_number?.toString().toLowerCase().includes(searchLower) ||
      item.received_date?.toLowerCase().includes(searchLower) ||
      item.po_status?.toLowerCase().includes(searchLower) ||
      item.supplier_name?.toLowerCase().includes(searchLower) ||
      item.total_amount?.toLowerCase().includes(searchLower) ||
      item.receipt?.toLowerCase().includes(searchLower)
    );
  })

  const handleRefreshClick = () => {
    fetchData(true); // Pass `true` to show the message when button is clicked
  };
  const handleRowClick = (e, item) => {
    if (e.target.type !== "checkbox") {
      navigate(`/storehistorydetails`, {
        state: { poNumber: item.po_number, Id: item.Id },
      });
      console.log("ItemId", item.Id);
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

      const deletePromises = selectedItemsArray.map((item) =>
        axios.delete(
          `https://invoicezapi.focusrtech.com:57/user/delete-invoice/${filteredItems[item].InvoiceId}`,
        ),
      );

      await Promise.all(deletePromises);

      const newItems = items.filter(
        (item) =>
          !selectedItemsArray.some(
            (selectedItem) => selectedItem.InvoiceId === item.InvoiceId,
          ), // Ensure to compare InvoiceId
      );

      setItems(newItems);

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

      // Make API call to delete selected POs
      await Promise.all(
        selectedItemsArray.map((item) =>
          axios.post(
            `https://invoicezapi.focusrtech.com:57/user/oracle-payload/${po_id}`,
          ),
        ),
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

  const [filtered, setFilteredItems] = useState([]);
  useEffect(() => {
    setFilteredItems(items); 
  }, [items])

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
        {/* <button
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
        </button> */}

        {/* <button
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
        </button> */}

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
          }}
          // onClick={fetchData}
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)} 
          onClick={handleRefreshClick}
        >
          <ArrowClockwise24Regular style={{ color: "#1281d7" }} />
          <span>Refresh</span>
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
    </>
  );
};

export default StoreHistoryTable;
