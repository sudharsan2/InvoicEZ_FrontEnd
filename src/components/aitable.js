import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowClockwise28Regular,
  Delete28Regular,
  TasksApp28Regular,
} from "@fluentui/react-icons";
import { useLocation } from "react-router-dom";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState([]);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const navigate = useNavigate();

  const location2 = useLocation();
  const { invoiceNumber } = location2.state || {};
  console.log("inn2", invoiceNumber);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://10.10.15.15:5719/user/morethanone-invoice-list",
      );
      const fetchedItems = response.data;
      const inv = fetchedItems.InvoiceId;
      const mappedItems = fetchedItems.map((item) => ({
        Id: item.id || "NULL",
        InvoiceId: item.InvoiceId || "NULL",
        supplier_name: item.po_headers?.[0]?.supplier_name || "NULL",
        city: item.po_headers?.[0]?.location || "NULL",
        InvoiceDate: item.InvoiceDate || "NULL",
        InvoiceTotal: item.InvoiceTotal || "NULL",
        ship_to: item.po_headers?.[0]?.ship_to || "NULL",
      }));

      setItems(mappedItems);
      setTableLength(mappedItems.length);
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

    return (
      item.InvoiceId?.toString().toLowerCase().includes(searchLower) ||
      item.supplier_name?.toLowerCase().includes(searchLower) ||
      item.city?.toLowerCase().includes(searchLower) ||
      item.InvoiceDate?.toLowerCase().includes(searchLower) ||
      item.InvoiceTotal?.toLowerCase().includes(searchLower) ||
      item.ship_to?.toLowerCase().includes(searchLower)
    );
  });

  const handleRowClick = (e, item) => {
    if (e.target.type !== "checkbox") {
      navigate(`/aidetail`, { state: { invoiceNumber: item.Id } });
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
            `http://10.10.15.15:5719/user/delete-poheader/${filteredItems[item].po_number}`,
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
            `http://10.10.15.15:5719/user/approve-status/${filteredItems[item].po_number}`,
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
          onClick={fetchData}
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
        height: "400px", 
        overflowY: "auto",
        marginTop: "20px",
      }}>
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

      </div>

      
    </>
  );
};

export default AITable;
