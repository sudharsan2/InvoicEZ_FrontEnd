import React, { useState, useEffect } from "react";
import {
  
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  createTableColumn,
} from "@fluentui/react-components";
import { useDispatch,  } from "react-redux";
import { refreshActions } from "../Store/Store";



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
    
    const selected = data1.selectedItems;
 
    const lastItem = Array.from(data1.selectedItems).pop();
    setSelectedRows(new Set(selected)); 
   
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
