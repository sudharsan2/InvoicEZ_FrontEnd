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
import Search from "./Search"; 
import { Button, notification } from "antd"; 
import { ArrowDownload28Regular } from "@fluentui/react-icons";

const columns = [
  createTableColumn({
    columnId: "po_number",
    renderHeaderCell: () => "PO Number",
    renderCell: (item) => <TableCellLayout>{item.po_number}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "InvoiceId",
    renderHeaderCell: () => "Invoice Number",
    renderCell: (item) => <TableCellLayout>{item.invoice_number}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "po_type",
    renderHeaderCell: () => "PO Type",
    renderCell: (item) => <TableCellLayout>{item.po_type}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "VendorName",
    renderHeaderCell: () => "Vendor Name",
    renderCell: (item) => <TableCellLayout>{item.VendorName}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "supplier_name",
    renderHeaderCell: () => "Supplier Name",
    renderCell: (item) => <TableCellLayout>{item.supplier_name}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "ship_to",
    renderHeaderCell: () => "Ship To",
    renderCell: (item) => <TableCellLayout>{item.ship_to}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "InvoiceDate",
    renderHeaderCell: () => "Invoice Date",
    renderCell: (item) => <TableCellLayout>{item.InvoiceDate}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "promised_date",
    renderHeaderCell: () => "PO Date",
    renderCell: (item) => <TableCellLayout>{item.promised_date}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "InvoiceTotal",
    renderHeaderCell: () => "Invoice Total",
    renderCell: (item) => <TableCellLayout>{item.InvoiceTotal}</TableCellLayout>,
  }),
  createTableColumn({
    columnId: "total_amount",
    renderHeaderCell: () => "Total Amount",
    renderCell: (item) => <TableCellLayout>{item.total_amount}</TableCellLayout>,
  }),
];

 
const ApproveTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const navigate = useNavigate();
 
 
  
  const fetchData = async () => {
    try {
        const response = await axios.get(
            "http://10.10.15.15:5719/user/one-invoice-list"
        );
        const fetchedItems = response.data; // Assuming data is in response.data
        console.log("12345678",response.data);
        

        const mappedItems = fetchedItems.map((item) => ({
          po_number: item.po_headers?.[0]?.po_number || "NULL", // Accessing the first element of the po_headers array
          invoice_number: item.InvoiceId || "NULL", 
          po_type: item.po_headers?.[0]?.po_type || "NULL", // Accessing the first element of the po_headers array
          VendorName: item.VendorName || "NULL",
          supplier_name: item.po_headers?.[0]?.supplier_name || "NULL", // Accessing the first element of the po_headers array
          ship_to: item.po_headers?.[0]?.ship_to || "NULL", // Accessing the first element of the po_headers array
          InvoiceDate: item.InvoiceDate || "NULL",
          promised_date: item.po_headers?.[0]?.po_items?.[0]?.promised_date || "NULL",
          InvoiceTotal: item.InvoiceTotal || "NULL",
          total_amount: item.po_headers?.[0]?.total_amount || "NULL" // Accessing the first element of the po_headers array
      }));
      
      

        setItems(mappedItems);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
useEffect(() => {
  fetchData();
}, []);
 
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };
 
  const filteredItems = items.filter((item) => {
    const searchLower = searchQuery?.trim().toLowerCase() || "";
    const poHeader = item.po_headers?.[0];
    console.log("1233445",poHeader)
    return (
      item.po_number?.toString().toLowerCase().includes(searchLower) ||
      item.invoice_number?.toLowerCase().includes(searchLower) ||
      item.po_type?.toLowerCase().includes(searchLower) ||
      item. VendorName?.toLowerCase().includes(searchLower) ||
      item.supplier_name?.toLowerCase().includes(searchLower) ||
      item.ship_to?.toLowerCase().includes(searchLower) ||
      item.InvoiceDate?.toLowerCase().includes(searchLower) ||
      item.promised_date?.toLowerCase().includes(searchLower) ||
      item.InvoiceTotal?.toString().toLowerCase().includes(searchLower) ||
      item.total_amount?.toLowerCase().includes(searchLower)
    );
  });
 
  const handleRowClick = (e, item) => {
    if (e.target.type !== "checkbox") {
      navigate(`/approvepage`, { state: { poNumber: item.po_number } });
    }
  };
 
  const handleSelectionChange = (event, data) => {
    console.log("handleSelectionChange", data.selectedItems);
    setSelectedRows(data.selectedItems);
  };
 
  const handleDeleteSelectedRows = async () => {
    const selectedItemsArray = Array.from(selectedRows); // Convert Set to Array
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
 
      
      await Promise.all(
        selectedItemsArray.map((item) =>
          axios.delete(
            `http://10.10.15.15:5719/user/delete-poheader/${filteredItems[item].po_number}`
,
          ),
        ),
      );
 
   
      setItems(items.filter((item) => !selectedItemsArray.includes(item)));
 
   
      notification.success({
        message: "Successfully deleted",
       
      });
    } catch (error) {
      const supplierNames = selectedItemsArray
        .map((item) => item.supplier_name)
        .join(", ");
      notification.error({
        message: "Deletion Failed",
       
      });
    }
  };
 
 
 
 
  const handleApproveSelectedRows = async () => {
    const selectedItemsArray = Array.from(selectedRows); 
    if (selectedItemsArray.length === 0) {
      notification.warning({
        message: "No PO Selected",
        description: "Please select at least one PO to approve.",
      });
      return;
    }
 
    try {
      const poNumbers = selectedItemsArray
        .map((item) => item.po_number)
        .join(", ");
 
      
      await Promise.all(
        selectedItemsArray.map((item) =>
          axios.post(
            `http://10.10.15.15:5719/user/approve-status/${filteredItems[item].po_number}`
          ),
        ),
      );
 
     
      notification.success({
        message: "Successfully approved",
       
      });
    } catch (error) {
      const poNumbers = selectedItemsArray
        .map((item) => item.po_number)
        .join(", ");
      notification.error({
        message: "Approval Failed",
       
      });
    }
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
          onClick={handleDeleteSelectedRows}
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
 
      <DataGrid
        items={filteredItems}
        columns={columns}
        sortable
        selectionMode="multiselect"
        onSelectionChange={handleSelectionChange}
        getRowId={(_, index) => index}
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
              selected={selectedRows.has(rowId)}
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