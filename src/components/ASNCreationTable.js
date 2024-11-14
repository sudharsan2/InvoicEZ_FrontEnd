import * as React from "react";
import {
  FolderRegular,
  EditRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
} from "@fluentui/react-icons";
import {
  Avatar,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  TableCellLayout,
  createTableColumn,
  Input,
} from "@fluentui/react-components";

const items = [
  {
    file: { label: "Meeting notes", icon: <DocumentRegular /> },
    author: { label: "Max Mustermann", status: "available" },
    lastUpdated: { label: "7h ago", timestamp: 1 },
    lastUpdate: { label: "You edited this", icon: <EditRegular /> },
    shipmentQuantity: 5,
  },
  // Additional item objects can go here...
];

const ASNCreateTable = () => {
  const [data, setData] = React.useState(items);

 
  const handleShipmentQuantityChange = (index, value) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], shipmentQuantity: value };
      return newData;
    });
  };

  const columns = [
    createTableColumn({
      columnId: "file",
      compare: (a, b) => a.file.label.localeCompare(b.file.label),
      renderHeaderCell: () => "Type",
      renderCell: (item) => (
        <TableCellLayout truncate >
         
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "author",
      compare: (a, b) => a.author.label.localeCompare(b.author.label),
      renderHeaderCell: () => "PO-Rev",
      renderCell: (item) => (
        <TableCellLayout
          truncate
          
        >
          
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "lastUpdated",
      compare: (a, b) => a.lastUpdated.timestamp - b.lastUpdated.timestamp,
      renderHeaderCell: () => "Release No",
      renderCell: (item) => (
        <TableCellLayout truncate></TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "lastUpdate",
      compare: (a, b) => a.lastUpdate.label.localeCompare(b.lastUpdate.label),
      renderHeaderCell: () => "Line Shipment No",
      renderCell: (item) => (
        <TableCellLayout truncate >
          
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "lastUpdate",
      compare: (a, b) => a.lastUpdate.label.localeCompare(b.lastUpdate.label),
      renderHeaderCell: () => "Ship To Org",
      renderCell: (item) => (
        <TableCellLayout truncate >
          
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "lastUpdate",
      compare: (a, b) => a.lastUpdate.label.localeCompare(b.lastUpdate.label),
      renderHeaderCell: () => "Item Code",
      renderCell: (item) => (
        <TableCellLayout truncate >
          
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "lastUpdate",
      compare: (a, b) => a.lastUpdate.label.localeCompare(b.lastUpdate.label),
      renderHeaderCell: () => "Description",
      renderCell: (item) => (
        <TableCellLayout truncate>
        
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "lastUpdate",
      compare: (a, b) => a.lastUpdate.label.localeCompare(b.lastUpdate.label),
      renderHeaderCell: () => "Ordered Qty/Amount",
      renderCell: (item) => (
        <TableCellLayout truncate >
          
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "lastUpdate",
      compare: (a, b) => a.lastUpdate.label.localeCompare(b.lastUpdate.label),
      renderHeaderCell: () => "Pending Qty/Amount",
      renderCell: (item) => (
        <TableCellLayout truncate >
          
        </TableCellLayout>
      ),
    }),
    createTableColumn({
        columnId: "shipmentQuantity",
        renderHeaderCell: () => "Shipment Quantity",
        renderCell: (item, rowIndex) => (
          <Input
            value={data[rowIndex]?.shipmentQuantity ?? ""}
            onChange={(e) => handleShipmentQuantityChange(rowIndex, e.target.value)}
            type="number"
            size="small"
            style={{ width: "100%" }}
          />
        ),
      }),
    createTableColumn({
      columnId: "lastUpdate",
      compare: (a, b) => a.lastUpdate.label.localeCompare(b.lastUpdate.label),
      renderHeaderCell: () => "Minimum Quantity",
      renderCell: (item) => (
        <TableCellLayout truncate >
          
        </TableCellLayout>
      ),
    }),
    createTableColumn({
      columnId: "lastUpdate",
      compare: (a, b) => a.lastUpdate.label.localeCompare(b.lastUpdate.label),
      renderHeaderCell: () => "Scheduled",
      renderCell: (item) => (
        <TableCellLayout truncate >
          
        </TableCellLayout>
      ),
    }),
  ];
  
  return (
    <div style={{ overflowX: "auto" }}>
      <DataGrid
        items={data}
        columns={columns}
        sortable
        getRowId={(item) => item.file.label}
        selectionMode="multiselect"
        resizableColumns
      >
        <DataGridHeader>
          <DataGridRow selectionCell={{ checkboxIndicator: { "aria-label": "Select all rows" } }}>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody>
          {({ item, rowId }) => (
            <DataGridRow key={rowId} selectionCell={{ checkboxIndicator: { "aria-label": "Select row" } }}>
              {({ renderCell }, rowIndex) => (
                <DataGridCell>{renderCell(item, rowIndex)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </div>
  );
};

export default ASNCreateTable;
