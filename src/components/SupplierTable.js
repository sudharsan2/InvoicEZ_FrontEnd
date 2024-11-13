import React, { useState } from "react";
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from "@fluentui/react-icons";
import {
  PresenceBadgeStatus,
  Avatar,
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  createTableColumn,
} from "@fluentui/react-components";

// Sample data
const items = [
  {
    file: { label: "AB&CO", icon: <DocumentRegular /> },
    author: { label: "test-123", status: "available" },
    lastUpdated: { label: "29 May 2023", timestamp: 1 },
    lastUpdate: {
      label: "2000",
      icon: <EditRegular />,
    },
    Freight: { label: "Airborn", timestamp: 1 },
    Payment: { label: "29 May 2023", timestamp: 1 },
    Supplier: { label: "L1", timestamp: 1 },
  },
  
  
];

// Column definitions
const columns = [
  createTableColumn({
    columnId: "file",
    compare: (a, b) => a.file.label.localeCompare(b.file.label),
    renderHeaderCell: () => "Name",
    renderCell: (item) => (
      <TableCellLayout >{item.file.label}</TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "author",
    compare: (a, b) => a.author.label.localeCompare(b.author.label),
    renderHeaderCell: () => "Comments",
    renderCell: (item) => (
      <TableCellLayout
       
      >
        {item.author.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "lastUpdated",
    compare: (a, b) => a.lastUpdated.timestamp - b.lastUpdated.timestamp,
    renderHeaderCell: () => "Promised Date",
    renderCell: (item) => item.lastUpdated.label,
  }),
  createTableColumn({
    columnId: "lastUpdate",
    compare: (a, b) => a.lastUpdate.label.localeCompare(b.lastUpdate.label),
    renderHeaderCell: () => "Price",
    renderCell: (item) => (
      <TableCellLayout >
        {item.lastUpdate.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Freight",
    compare: (a, b) => a.lastUpdate.label.localeCompare(b.lastUpdate.label),
    renderHeaderCell: () => "Freight Term",
    renderCell: (item) => (
      <TableCellLayout>
        {item.Freight.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Payment",
    compare: (a, b) => a.lastUpdate.label.localeCompare(b.lastUpdate.label),
    renderHeaderCell: () => "Payment Term",
    renderCell: (item) => (
      <TableCellLayout >
        {item.Payment.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Supplier",
    compare: (a, b) => a.lastUpdate.label.localeCompare(b.lastUpdate.label),
    renderHeaderCell: () => "Supplier Ranking",
    renderCell: (item) => (
      <TableCellLayout >
        {item.Supplier.label}
      </TableCellLayout>
    ),
  }),
];

// SupplierTable component
const SupplierTable = () => {
  const [selectedRows, setSelectedRows] = useState(new Set([1]));

  const onSelectionChange = (e, data) => {
    setSelectedRows(data.selectedItems);
  };

  return (
    <DataGrid
      items={items}
      columns={columns}
      selectionMode="multiselect"
      selectedItems={selectedRows}
      onSelectionChange={onSelectionChange}
      style={{ minWidth: "550px" }}
    >
      <DataGridHeader>
        <DataGridRow
          selectionCell={{
            checkboxIndicator: { "aria-label": "Select all rows" },
          }}
        >
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody>
        {({ item, rowId }) => (
          <DataGridRow
            key={rowId}
            selectionCell={{
              checkboxIndicator: { "aria-label": "Select row" },
            }}
          >
            {({ renderCell }) => (
              <DataGridCell>{renderCell(item)}</DataGridCell>
            )}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};

export default SupplierTable;
