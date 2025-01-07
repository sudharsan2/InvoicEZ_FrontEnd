import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowClockwise24Regular,
  Delete24Regular,
  ArrowSortUpFilled, ArrowSortDownRegular
} from "@fluentui/react-icons";
import {useNavigate } from "react-router-dom";

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
import { message, notification } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { refreshActions } from "../Store/Store";

const columns = [
  createTableColumn({
    columnId: "InvoiceId",
    renderHeaderCell: () => "Invoice No",
    renderCell: (item) => <TableCellLayout>{item.InvoiceId}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "supplier_name",
    renderHeaderCell: () => "Supplier",
    renderCell: (item) => (
      <TableCellLayout>{item.supplier_name}</TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "city",
    renderHeaderCell: () => "Site",
    renderCell: (item) => <TableCellLayout>{item.city}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "InvoiceDate",
    renderHeaderCell: () => "Invoice Date",
    renderCell: (item) => <TableCellLayout>{item.InvoiceDate}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "InvoiceTotal",
    renderHeaderCell: () => "Total Amount",
    renderCell: (item) => (
      <TableCellLayout>{item.InvoiceTotal}</TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "ship_to",
    renderHeaderCell: () => "Number of Lines",
    renderCell: (item) => <TableCellLayout>{item.ship_to}</TableCellLayout>,
  }),
];

const AITable = ({ setTableLength }) => {


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [invoiceId, setInvoiceId] = useState(null);
  
 

  
  const InvoiceUploadRefresh = useSelector((state) => state.refresh.InvoiceUploadRefresh);
  const isInvoiceUploadRefreshed = useSelector(
    (state) => state.refresh.InvoiceUploadRefresh,
  );
  

  const fetchData = async (showMessage = false) => {
    if (showMessage) {
      message.success("Refreshing...");
    }
    try {
     

      const token = localStorage.getItem("access_token");
      const response = await axios.get("https://invoicezapi.focusrtech.com:57/user/morethanone-invoice-list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const fetchedItems = response.data;
      setInvoiceId(fetchedItems[0].id);
      console.log("Approve Inv id", invoiceId);
      const mappedItems = fetchedItems.map((item) => ({
        Id: item.id || "NULL",
        InvoiceId: item.InvoiceId || "NULL",
        supplier_name: item.VendorName || "NULL",
        city: item.po_headers?.[0]?.location || "NULL",
        InvoiceDate: item.InvoiceDate || "NULL",
        InvoiceTotal: item.InvoiceTotal || "NULL",
        ship_to: item.items.length || "NULL",
      }));

      setItems(mappedItems);
      setTableLength(mappedItems.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    console.log("InvoiceUploadRefresh has changed:", InvoiceUploadRefresh);
    fetchData();
  }, [isInvoiceUploadRefreshed]);

  

  const handleRefreshClick = () => {
    fetchData(true); 
  };

  



  const handleSearchChange = (value) => {
    setSearchQuery(value);
  
    const filteredItems = items.filter((item) => {
        const searchLower = searchQuery?.trim().toLowerCase() || "";
    
        return (
          item.Id?.toString().toLowerCase().includes(searchLower) ||
          item.InvoiceId?.toString().toLowerCase().includes(searchLower) ||
          item.supplier_name?.toLowerCase().includes(searchLower) ||
          item.city?.toLowerCase().includes(searchLower) ||
          item.InvoiceDate?.toLowerCase().includes(searchLower) ||
          item.InvoiceTotal?.toLowerCase().includes(searchLower) 
          
        );
      });
  
    setFilteredItems(filteredItems); 
  };


  const filteredItems = items.filter((item) => {
      const searchLower = searchQuery?.trim().toLowerCase() || "";
  
      return (
        item.Id?.toString().toLowerCase().includes(searchLower) ||
        item.InvoiceId?.toString().toLowerCase().includes(searchLower) ||
        item.supplier_name?.toLowerCase().includes(searchLower) ||
        item.city?.toLowerCase().includes(searchLower) ||
        item.InvoiceDate?.toLowerCase().includes(searchLower) ||
        item.InvoiceTotal?.toLowerCase().includes(searchLower) 
        
      );
    });
    
  const handleRowClick = (e, item) => {
    if (e.target.type !== "checkbox") {
      navigate(`/aidetail`, { state: { invoiceNumber: item.Id } });
    }
  };

  const handleSelectionChange = ( data) => {
    console.log("handleSelectionChange", data.selectedItems);
    setSelectedRows(data.selectedItems);
  };

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
            `https://invoicezapi.focusrtech.com:57/user/delete-invoice/${filteredItems[item].Id}`,
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
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)} 
          onClick={handleDeleteSelectedRows}
        >
          <Delete24Regular style={{ color: "#1281d7" }} />
          <span>Delete</span>
        </button>

        <button
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: isHovered2 ? "#e1e1e2" : "transparent", 
            border: "1px solid #fff",
            padding: "6px 12px",
            cursor: "pointer",
            gap: "8px",
            marginLeft: "2em",
          }}
          
          onMouseEnter={() => setIsHovered2(true)} 
          onMouseLeave={() => setIsHovered2(false)} 
          onClick={handleRefreshClick}
        >
          <ArrowClockwise24Regular style={{ color: "#1281d7" }} />
          <span>Refresh</span>
        </button>

        <Search
          placeholder="Search Invoice"
          onSearchChange={handleSearchChange}
        />
      </div>
      <div
        style={{
          height: "70vh",
          overflowY: "auto",
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

export default AITable;
