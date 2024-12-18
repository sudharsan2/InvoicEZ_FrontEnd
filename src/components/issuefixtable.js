import * as React from "react";
import {
  ArrowClockwise24Regular,
  Delete24Regular,
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
import { useState, useEffect } from "react";
import { message } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { refreshActions } from "../Store/Store";

const columns = [
  createTableColumn({
    columnId: "invoiceNo",
    renderHeaderCell: () => "Invoice No",
    renderCell: (item) => <TableCellLayout>{item.invoiceNo}</TableCellLayout>, // Adjusted to match API structure
  }),
  createTableColumn({
    columnId: "supplier",
    renderHeaderCell: () => "Supplier",
    renderCell: (item) => <TableCellLayout>{item.supplier}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "numberOfLines",
    renderHeaderCell: () => "Number of Lines",
    renderCell: (item) => (
      <TableCellLayout>{item.numberOfLines}</TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "invoiceDate",
    renderHeaderCell: () => "Invoice Date",
    renderCell: (item) => <TableCellLayout>{item.invoiceDate}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "totalAmount",
    renderHeaderCell: () => "Total Amount",
    renderCell: (item) => <TableCellLayout>{item.totalAmount}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "statusVerified",
    renderHeaderCell: () => "Status Verified",
    renderCell: (item) => (
      <TableCellLayout>{item.statusVerified}</TableCellLayout>
    ),
  }),
];

const IssuefixTable = ({ height, setTableLength }) => {
  const [items, setItems] = useState([]); // Initialize items state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [rowselect,setRowSelect]=useState(true);
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const getNumberOfLines = (invoice) => {
    return invoice.items ? invoice.items.length : 0;
  };
  const [invid, setInvId] = useState("");

  const dispatch = useDispatch();

  const isInvoiceUploadRefreshed = useSelector(
    (state) => state.refresh.InvoiceUploadRefresh,
  );

  // useEffect(() => {
  //   fetch("https://invoicezapi.focusrtech.com:57/user/no-invoice-list")
  //     .then((response) => response.json())
  //     .then((data) => {

  //       const formattedItems = data.map((invoice) => ({
  //         invid: invoice.id,

  //         invoiceNo: invoice.InvoiceId, // Use "InvoiceId" for invoice number
  //         supplier: invoice.VendorName,
  //         numberOfLines: getNumberOfLines(invoice),
  //         invoiceDate: invoice.InvoiceDate,
  //         totalAmount: invoice.InvoiceTotal,
  //         statusVerified: invoice.statusVerified,
  //       }));
  //       console.log("Formatted Items:", formattedItems);
  //       setInvId(formattedItems.InvoiceId) // Debugging log
  //       setItems(formattedItems);
  //       setTableLength(formattedItems.length);
  //       console.log("height", height);

  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // },  [refreshKey]);

  const fetchData = (showMessage = false) => {
    if (showMessage) {
      message.success("Refreshing...");
    }
  
    const token = localStorage.getItem("access_token"); // Retrieve the token securely
  
    fetch("https://invoicezapi.focusrtech.com:57/user/no-invoice-list", {
      method: "GET", 
      headers: {
        "Content-Type": "application/json", 
        Authorization: `Bearer ${token}`, 
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const formattedItems = data.map((invoice) => ({
          invid: invoice.id,
          invoiceNo: invoice.InvoiceId, // Use "InvoiceId" for invoice number
          supplier: invoice.VendorName,
          numberOfLines: getNumberOfLines(invoice),
          invoiceDate: invoice.InvoiceDate,
          totalAmount: invoice.InvoiceTotal,
          statusVerified: invoice.statusVerified,
        }));
        console.log("Formatted Items:", formattedItems);
        setItems(formattedItems); // Set the fetched items
        setTableLength(formattedItems.length);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
    useEffect(() => {
    fetchData(); // Fetch the data when component is mounted
  }, [isInvoiceUploadRefreshed]);

  // const handleRefresh = () => {
  //   setRefreshKey((prevKey) => prevKey + 1); // Increment the refreshKey to trigger useEffect
  // };

  
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleRefreshClick = () => {
    fetchData(true); // Pass `true` to show the message when button is clicked
  };

  const handleDelete = () => {
    const token = localStorage.getItem("access_token");
    console.log("del");
    const idsToDelete = [...selectedRows]; // Convert Set to array
    console.log("IDs to delete:", idsToDelete);
  
    if (idsToDelete.length > 0) {
      const deletePromises = idsToDelete.map((id) => {
        console.log(`Deleting item with ID: ${id}`);
        console.log("//", filteredItems[id].invid);
        return fetch(
          `https://invoicezapi.focusrtech.com:57/user/delete-invoice/${filteredItems[id].invid}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`, // Add the authorization header
            },
          },
        );
      });
  
      Promise.all(deletePromises)
        .then((responses) => {
          const allDeleted = responses.every((response) => response.ok);
          if (allDeleted) {
            message.success("Successfully Deleted");
            const updatedItems = items.filter(
              (item) => !idsToDelete.includes(item.id),
            ); // Use item.id here
            setRowSelect(false);
            setItems(updatedItems);

            setSelectedRows((prev) => new Set([])); // Ensure state updates correctly
            dispatch(refreshActions.toggleInvoiceUploadRefresh());
          } else {
            throw new Error("Some deletions failed");
          }
        })
        .catch((error) => {
          console.error("Error deleting items:", error);
          message.error("Deletion failed");
        });
    } else {
      console.warn("No rows selected for deletion");
    }
  };
  
  const filteredItems = items.filter((item) => {
    return (
      item.invid
        ?.toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.invoiceNo
        ?.toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.supplier?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.numberOfLines
        ?.toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) || // Convert numberOfLines to string
      item.invoiceDate?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.totalAmount?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.statusVerified?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleRowClick = (e, item) => {
    if (e.target.type !== "checkbox") {
      navigate(`/issuefixdetails`, { state: { invoiceNo: item.invid } });
    }
  };

  const handleSelectionChange = (event, data) => {
    const newSelectedRows = new Set(selectedRows);
    
      data.selectedItems.forEach((item) => {
        // if (item) {
        //   // Ensure invid is defined
        newSelectedRows.add(item); // Store item.invid instead of item.invoiceNo
        // } else {
        //   console.warn("Selected item does not have an invid:", item);
        console.log(item);
      });
      setSelectedRows(newSelectedRows);

    
     // Update state
    // console.log("Selected IDs:", Array.from(newSelectedRows)); // Log selected IDs for debugging
  };


  const handleUnSelectionChange = (event, data) => {
    const newSelectedRows = new Set(selectedRows); // Create a copy of the selected rows
    data.selectedItems.forEach((item) => {
      // if (item) {
      //   // Ensure invid is defined
      newSelectedRows.add(item); // Store item.invid instead of item.invoiceNo
      // } else {
      //   console.warn("Selected item does not have an invid:", item);
      console.log(item);
    });
    setSelectedRows(newSelectedRows); // Update state
    // console.log("Selected IDs:", Array.from(newSelectedRows)); // Log selected IDs for debugging
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
            backgroundColor: "transparent",
            border: "1px solid #fff",
            padding: "6px 12px",
            cursor: "pointer",
            gap: "8px",
            marginLeft: "2em",
          }}
          onClick={() => handleDelete()}
        >
          <Delete24Regular style={{ color: "#1281d7" }} />
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
          // onClick={handleRefresh}
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
          height: `calc(73vh - ${height}px)`, // Set a fixed height for scrolling
          overflowY: "auto", // Enable vertical scrolling
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

export default IssuefixTable;
