// API connection
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowClockwise28Regular,
  Delete28Regular,
  TasksApp28Regular,
} from "@fluentui/react-icons";
import { ArrowSortUpFilled, ArrowSortDownRegular } from "@fluentui/react-icons";
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

// Define columns for the DataGrid
const columns = [
  createTableColumn({
    columnId: "po_number",
    renderHeaderCell: () => "PO Number",
    renderCell: (item) => <TableCellLayout>{item.po_number}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "po_type",
    renderHeaderCell: () => "PO Type",
    renderCell: (item) => <TableCellLayout>{item.po_type}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "po_status",
    renderHeaderCell: () => "PO Status",
    renderCell: (item) => <TableCellLayout>{item.po_status}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "supplier_name",
    renderHeaderCell: () => "Supplier Name",
    renderCell: (item) => (
      <TableCellLayout>{item.supplier_name}</TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "location",
    renderHeaderCell: () => "Location",
    renderCell: (item) => <TableCellLayout>{item.location}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "ship_to",
    renderHeaderCell: () => "Ship To",
    renderCell: (item) => <TableCellLayout>{item.ship_to}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "bill_to",
    renderHeaderCell: () => "Bill To",
    renderCell: (item) => <TableCellLayout>{item.bill_to}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "buyer_name",
    renderHeaderCell: () => "Buyer Name",
    renderCell: (item) => <TableCellLayout>{item.buyer_name}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "total_amount",
    renderHeaderCell: () => "Total Amount",
    renderCell: (item) => (
      <TableCellLayout>
        {item.total_amount !== null ? item.total_amount : "N/A"}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "status",
    renderHeaderCell: () => "Status",
    renderCell: (item) => (
      <TableCellLayout>{item.status || "N/A"}</TableCellLayout>
    ),
  }),
];

const StoreTable = ({setTableLength}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]); // State to hold API data
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [po_id, set_Po_id] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isInvoiceUploadRefreshed = useSelector(
    (state) => state.refresh.InvoiceUploadRefresh,
  );

  const [RefreshUpload, SetRefreshUpload] = useState(null);

  const [DeleteRefresh, SetDeleteRefresh] = useState(false);

  // Fetch data from the API when the component mounts
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get("https://invoicezapi.focusrtech.com:57/user/storetrue-invoice", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const fetchedItems = response.data; // Assuming data is in response.data
      console.log("fetchedItems", fetchedItems);
      // set_Po_id(fetchedItems[0]["po_headers"][0]["id"]);
      
      
      // Map fetched data to the format expected by DataGrid
      const mappedItems = fetchedItems.map((item, index) => {
        
           
      
        if (!item.po_headers || item.po_headers.length === 0) {
          console.warn(`No po_headers found for index ${index}`);
          return null; // Skip if no po_headers
        }
        
        const val = item.items.map((item)=>({
              Igst:item.Igst
        }));
       
        console.log("IGST",val);
      
        return item.po_headers.map((po_header) => ({
          
          
          Id:po_header.id,
          po_number: po_header.po_number,
          po_type: po_header.po_type,
          po_status: po_header.po_status,
          supplier_name: po_header.supplier_name,
          location: po_header.location,
          ship_to: po_header.ship_to,
          bill_to: po_header.bill_to,
          buyer_name: po_header.buyer_name,
          total_amount: po_header.total_amount,
          status: po_header.status,
          customer:item.CustomerName,
          invoice:item.InvoiceFile,
          Igst_val:val.Igst
          
          

        }));
      });
      // const flattenedMappedItems = mappedItems.flat().filter(Boolean);
      const flattenedMappedItems = mappedItems
  .flat() 
  .filter(Boolean)
  .sort((a, b) => a.po_number.localeCompare(b.po_number));

      setItems(flattenedMappedItems);
      setTableLength(flattenedMappedItems.length);
      console.log("Mapped Items",flattenedMappedItems);
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

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };
  // console.log("--------->",filteredItems)
  const filteredItems = items.filter((item) => {
    const searchLower = searchQuery?.trim().toLowerCase() || "";

    return (
      // item.InvoiceId?.toString().toLowerCase().includes(searchLower) ||
      // item.InvoiceNumber?.toString().toLowerCase().includes(searchLower) ||
      item.po_number?.toString().toLowerCase().includes(searchLower) ||
      item.po_type?.toLowerCase().includes(searchLower) ||
      item.po_status?.toLowerCase().includes(searchLower) ||
      item.supplier_name?.toLowerCase().includes(searchLower) ||
      item.location?.toLowerCase().includes(searchLower) ||
      item.ship_to?.toLowerCase().includes(searchLower) ||
      item.bill_to?.toLowerCase().includes(searchLower) ||
      item.buyer_name?.toLowerCase().includes(searchLower) ||
      item.total_amount?.toString().toLowerCase().includes(searchLower) ||
      item.status?.toLowerCase().includes(searchLower)
    );
  });

  const handleRowClick = (e, item) => {
    if (e.target.type !== "checkbox") {
      navigate(`/storedetails`, {
        state: { poNumber: item.po_number, Id: item.Id },
      });
      console.log("ItemId", item);
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
          axios.post(`https://invoicezapi.focusrtech.com:57/user/oracle-payload/${po_id}`),
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
        </button> */}

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
          onClick={fetchData}
        >
          <ArrowClockwise28Regular style={{ color: "#1281d7" }} />
          <span>Refresh</span>
        </button>

        <Search
          placeholder="Search PO or Supplier"
          onSearchChange={handleSearchChange}
        />
      </div>
      <div
        style={{
          height: "100vh",
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
    </>
  );
};

export default StoreTable;