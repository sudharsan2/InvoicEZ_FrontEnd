import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { refreshActions } from "../Store/Store";

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
    columnId: "distribution_number",
    renderHeaderCell: () => "Distribution Number",
    renderCell: (item) => (
      <TableCellLayout>{item.distribution_number}</TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "charge_account",
    renderHeaderCell: () => "Charge Account",
    renderCell: (item) => (
      <TableCellLayout>{item.charge_account}</TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "distribution_amount",
    renderHeaderCell: () => "Distribution Amount",
    renderCell: (item) => (
      <TableCellLayout>{item.distribution_amount}</TableCellLayout>
    ),
  }),
  // createTableColumn({
  //   columnId: "creation_date",
  //   renderHeaderCell: () => "Creation Date",
  //   renderCell: (item) => (
  //     <TableCellLayout>{item.creation_date}</TableCellLayout>
  //   ),
  // }),
  createTableColumn({
    columnId: "last_update_date",
    renderHeaderCell: () => "Last Update",
    renderCell: (item) => (
      <TableCellLayout>{item.last_update_date}</TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "purchase",
    renderHeaderCell: () => "Purchase",
    renderCell: (item) => (
      <TableCellLayout>{item.purchase}</TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "supplier",
    renderHeaderCell: () => "Supplier",
    renderCell: (item) => (
      <TableCellLayout>{item.supplier}</TableCellLayout>
    ),
  }),
];

// SupplierTable component
const SupplierTable = ({ data }) => {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const dispatch = useDispatch();

  const onSelectionChange = (e, data1) => {
    // Update selected rows based on selection
    const selected = data1.selectedItems;
    // console.log("Selected row data:", selected);
    const lastItem = Array.from(data1.selectedItems).pop();
    setSelectedRows(new Set(selected)); 
    // You can dispatch the selected data as needed
    dispatch(refreshActions.conformedSupplierValue(data.quotations[lastItem].supplier));
    console.log("Selected row data:", data.quotations[lastItem].supplier)
  };

  useEffect(() => {
    console.log("selected table quotation", data);
  }, [data]);

  return (
    <DataGrid
      items={data.quotations} // Use data.quotations directly
      columns={columns}
      selectionMode="multiple" // Enable multiple row selection
      selectedItems={selectedRows} // Bind selected rows
      onSelectionChange={onSelectionChange} // Handle selection change
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
