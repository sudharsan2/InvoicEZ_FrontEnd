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



const columns = [
  createTableColumn({
    columnId: "line",
    
    renderHeaderCell: () => "Line",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "100px" }}>
        {item.lines[0].line_number}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "items",
    
    renderHeaderCell: () => "Item",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.lines[0].description}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "uom",
    renderHeaderCell: () => "UOM",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "100px" }}>
        {item.lines[0].uom}
      </TableCellLayout>
    ),
  }),
  createTableColumn({
    columnId: "Quantity",
    renderHeaderCell: () => "Quantity",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "100px" }}>
        {item.lines[0].quantity}
      </TableCellLayout>
    ),
  }),

  createTableColumn({
    columnId: "price",
    renderHeaderCell: () => "Price",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "100px" }}>
        {item.lines[0].price}
      </TableCellLayout>
    ),
  }),
  
  createTableColumn({
    columnId: "need_by_date",
    renderHeaderCell: () => "Need By Date",
    renderCell: (item) => (
      <TableCellLayout style={{ maxWidth: "150px" }}>
        {item.lines[0].need_by_date}
      </TableCellLayout>
    ),
  }),
];

const TodoTable = ({data}) => {
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
      <DataGrid items={[data]} columns={columns} defaultSortState={defaultSortState}>
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

export default TodoTable;



