// API connection
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowSortUpFilled, ArrowSortDownRegular,ArrowClockwise24Regular, } from "@fluentui/react-icons";
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

const HistoryTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]); // State to hold API data
  const [selectedRows, setSelectedRows] = useState(new Set());
  
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isInvoiceUploadRefreshed = useSelector(
    (state) => state.refresh.InvoiceUploadRefresh,
  );

  

  // Fetch data from the API when the component mounts
  const fetchData = async (showMessage = false) => {
    if (showMessage) {
      message.success("Refreshing...");
    }
    try {
      
      const token = localStorage.getItem("access_token");
      const response = await axios.get("https://invoicezapi.focusrtech.com:57/user/grn-history", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const fetchedItems = response.data; 
      console.log("fetchedItems", fetchedItems);
     

      const mappedItems = fetchedItems.map((item, index) => {
        

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

      console.log("MAP",mappedItems);

      setItems(mappedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  

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
      navigate(`/historypage`, {
        state: { poNumber: item.po_number, Id: item.Id },
      });
      console.log("ItemId", item.Id);
    }
  };

  const handleSelectionChange = (event, data) => {
    console.log("handleSelectionChange", data.selectedItems);
    setSelectedRows(data.selectedItems);
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

export default HistoryTable;
