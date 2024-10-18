import * as React from "react";
import { ArrowClockwise28Regular, Delete28Regular } from "@fluentui/react-icons";
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
    renderCell: (item) => <TableCellLayout>{item.numberOfLines}</TableCellLayout>,
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
    renderCell: (item) => <TableCellLayout>{item.statusVerified}</TableCellLayout>,
  }),
];

const IssuefixTable = () => {
  const [items, setItems] = useState([]); // Initialize items state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState(new Set());
  const navigate = useNavigate();


  const getNumberOfLines = (invoice) => {
    return invoice.items ? invoice.items.length : 0;
  };

  
  // Fetch data from the API
  // Fetch data from the API
useEffect(() => {
  fetch("http://10.10.15.15:5719/user/no-invoice-list")
    .then((response) => response.json())
    .then((data) => {
      // Format data to match the table columns
      const formattedItems = data.map((invoice) => ({
        invid: invoice.id,  // Use the "id" field from the response
        invoiceNo: invoice.InvoiceId, // Use "InvoiceId" for invoice number
        supplier: invoice.VendorName,
        numberOfLines: getNumberOfLines(invoice),
        invoiceDate: invoice.InvoiceDate,
        totalAmount: invoice.InvoiceTotal,
        statusVerified: invoice.statusVerified,
      }));
      console.log("Formatted Items:", formattedItems); // Debugging log
      setItems(formattedItems);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}, []);

  

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };


  const handleDelete = () => {
    const idsToDelete = [...selectedRows]; // Convert Set to array
    console.log("IDs to delete:", idsToDelete);
  
    if (idsToDelete.length > 0) {
      const deletePromises = idsToDelete.map((id) => {
        if (id) { // Check if id is defined
          console.log(`Deleting item with ID: ${id}`);
          return fetch(`http://10.10.15.15:5719/user/delete-poheader/${id}`, {
            method: 'DELETE',
          });
        } else {
          console.warn("Attempting to delete an undefined ID");
          return Promise.resolve(); // Skip undefined IDs
        }
      });
  
      Promise.all(deletePromises)
        .then((responses) => {
          const allDeleted = responses.every(response => response.ok);
          if (allDeleted) {
            const updatedItems = items.filter(item => !idsToDelete.includes(item.id)); // Use item.id here
            setItems(updatedItems);
            setSelectedRows(new Set());
          } else {
            throw new Error("Some deletions failed");
          }
        })
        .catch((error) => {
          console.error("Error deleting items:", error);
        });
    } else {
      console.warn("No rows selected for deletion");
    }
  };
  
  


  const filteredItems = items.filter((item) => {
    return (
      item.invoiceNo?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplier?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.numberOfLines?.toString().toLowerCase().includes(searchQuery.toLowerCase()) || // Convert numberOfLines to string
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
    const newSelectedRows = new Set(selectedRows); // Create a copy of the selected rows
    data.selectedItems.forEach((item) => {
        if (item.invid) { // Ensure invid is defined
            newSelectedRows.add(item.invid); // Store item.invid instead of item.invoiceNo
        } else {
            console.warn("Selected item does not have an invid:", item);
        }
    });
    setSelectedRows(newSelectedRows); // Update state
    console.log("Selected IDs:", Array.from(newSelectedRows)); // Log selected IDs for debugging
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
            borderRadius: "5px",
            cursor: "pointer",
            gap: "8px",
            marginLeft: "2em",
          }}
          onClick={() => alert("Refresh")}
        >
          <ArrowClockwise28Regular style={{ color: "#1281d7" }} />
          <span>Refresh</span>
        </button>

        <Search
          placeholder="Search Invoice"
          onSearchChange={handleSearchChange}
        />
      </div>

      <DataGrid
  items={filteredItems}
  columns={columns}
  sortable
  selectionMode="multiselect"
  onSelectionChange={handleSelectionChange}
  getRowId={(item) => item.id} // Use item.id for unique identification
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
        onClick={(e) => handleRowClick(e, item)}
        selected={selectedRows.has(item.invid)} // Check selectedRows based on item.id
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

export default IssuefixTable;
