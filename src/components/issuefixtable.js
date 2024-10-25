import * as React from "react";
import {
  ArrowClockwise28Regular,
  Delete28Regular,
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
import { useState, useEffect } from "react";
import { message } from "antd";
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

const IssuefixTable = ({ height ,setTableLength}) => {
  const [items, setItems] = useState([]); // Initialize items state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRows, setSelectedRows] = useState(new Set());
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const getNumberOfLines = (invoice) => {
    return invoice.items ? invoice.items.length : 0;
  };
  const[invid,setInvId]=useState("");
 
  // useEffect(() => {
  //   fetch("http://10.10.15.15:5719/user/no-invoice-list")
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


  const fetchData = () => {
    fetch("http://10.10.15.15:5719/user/no-invoice-list")
      .then((response) => response.json())
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
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    fetchData(); // Fetch the data when component is mounted
  }, []);

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Increment the refreshKey to trigger useEffect
  };
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleDelete = () => {
    console.log("del")
    const idsToDelete = [...selectedRows]; // Convert Set to array
    console.log("IDs to delete:", idsToDelete);

    if (idsToDelete.length > 0) {
      const deletePromises = idsToDelete.map((id) => {
        
          // Check if id is defined
          console.log(`Deleting item with ID: ${id}`);
          console.log("//",filteredItems[id].invid)
          return fetch(
            `http://10.10.15.15:5719/user/delete-invoice/${filteredItems[id].invid}`,
            {
              method: "DELETE",
            },
            

          );
        
          
      });

      Promise.all(deletePromises)
        .then((responses) => {
          const allDeleted = responses.every((response) => response.ok);
          if (allDeleted) {
            message.success(" successfully Deleted");
            const updatedItems = items.filter(
              (item) => !idsToDelete.includes(item.id),
            ); // Use item.id here
            setItems(updatedItems);
            setSelectedRows(new Set());
            fetchData();
           
          } else {
            throw new Error("Some deletions failed");
           
          }
        })
        .catch((error) => {
          console.error("Error deleting items:", error);
          message.error("  Deletion failed");
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
          onClick={handleRefresh}
        >
          <ArrowClockwise28Regular style={{ color: "#1281d7" }} />
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
      </div>
    </>
  );
};

export default IssuefixTable;
