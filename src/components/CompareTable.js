import React, { useMemo } from "react";
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
    columnId: "file",
    compare: (a, b) => a.file.label.localeCompare(b.file.label),
    renderHeaderCell: () => "Line",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "100px" }}>
        {item.file.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "author",
    compare: (a, b) => a.author.label.localeCompare(b.author.label),
    renderHeaderCell: () => "Item",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.author.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "lastUpdated",
    renderHeaderCell: () => "Description",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "200px" }}>
        {item.lastUpdated.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "lastUpdate",
    renderHeaderCell: () => "UOM",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "100px" }}>
        {item.lastUpdate.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Quantity",
    renderHeaderCell: () => "Quantity",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "100px" }}>
        {item.Quantity.label}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "NeedByDate",
    renderHeaderCell: () => "Need By Date",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.NeedByDate.label}
      </TableCellLayout>
    ),
  }),
];

const CompareTable = () => {
  const defaultSortState = useMemo(
    () => ({ sortColumn: "file", sortDirection: "ascending" }),
    []
  );

  const gridContainerStyle = {
    overflowX: "hidden", // Prevents horizontal scrolling
    width: "100%", // Ensures grid fits the container
  };

  return (
    <div style={gridContainerStyle}>
      <DataGrid items={items} columns={columns} defaultSortState={defaultSortState}>
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

export default CompareTable;



