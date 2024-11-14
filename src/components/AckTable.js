import React, { useMemo,useEffect } from "react";
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

const items = [
  {
    file: { label: "10" },
    author: { label: "Rice" },
    lastUpdated: { label: "test" },
    lastUpdate: { label: "KG" },
    Quantity: { label: "1000" },
    NeedByDate: { label: "18 May 2023" },
  },
];

const columns = [
  createTableColumn({
    columnId: "line",
    // compare: (a, b) => a.file.label.localeCompare(b.file.label),
    renderHeaderCell: () => "Line",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "100px" }}>
        {item.line_number}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "items",
    // compare: (a, b) => a.author.label.localeCompare(b.author.label),
    renderHeaderCell: () => "Item",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.description}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "uom",
    renderHeaderCell: () => "UOM",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "100px" }}>
        {item.uom}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Quantity",
    renderHeaderCell: () => "Quantity",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "100px" }}>
        {item.quantity}
      </TableCellLayout>
    ),
  }),

  createTableColumn({
    columnId: "price",
    renderHeaderCell: () => "Price",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "100px" }}>
        {item.price}
      </TableCellLayout>
    ),
  }),
  
  createTableColumn({
    columnId: "need_by_date",
    renderHeaderCell: () => "Need By Date",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.need_by_date}
      </TableCellLayout>
    ),
  }),
];

const AckTable = ({data}) => {
  const defaultSortState = useMemo(
    () => ({ sortColumn: "file", sortDirection: "ascending" }),
    []
  );
  useEffect(() => {
    console.log("selected table", data);
 }, [data]);

  const gridContainerStyle = {
    overflowX: "hidden", // Prevents horizontal scrolling
    width: "100%", // Ensures grid fits the container
  };

  return (
    <div style={gridContainerStyle}>
      <DataGrid items={data.line_items} columns={columns} defaultSortState={defaultSortState}>
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody>
          {({ item, rowId }) => (
            <DataGridRow key={rowId}>
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </div>
  );
};

export default AckTable;


